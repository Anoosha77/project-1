import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyOtp, useResendOtp } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(180); // 3 min countdown
  const [resendEnabled, setResendEnabled] = useState(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();
  const storedEmail = localStorage.getItem("otp_email");

  const { mutate: verifyOtpMutate, isPending } = useVerifyOtp();
  const { mutate: resendOtpMutate } = useResendOtp();

  // Countdown logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setResendEnabled(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Input Handling
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // OTP Submit
  const handleSubmit = () => {
    const fullOtp = otp.join("");
    if (!storedEmail) return alert("No email found.");
    verifyOtpMutate(
      { email: storedEmail, otp: fullOtp },
      {
        onSuccess: () => {
          alert("✅ OTP Verified");
          localStorage.removeItem("otp_email");
          navigate("/dashboard");
        },
        onError: (err: any) => {
          alert(err?.response?.data?.message || "❌ Invalid OTP");
        },
      }
    );
  };

  // Resend with JWT Refresh
  const handleResend = async () => {
    if (!storedEmail) return alert("No email found for resend.");

    try {
      // Refresh JWT token before resend
      await axios.get("/api/v1/auth/refresh", { withCredentials: true });

      resendOtpMutate(storedEmail, {
        onSuccess: () => {
          alert("📨 OTP resent!");
          setTimeLeft(180); // Reset countdown
          setResendEnabled(false);
        },
        onError: (err: any) => {
          alert(err?.response?.data?.message || "⚠️ Failed to resend OTP");
        },
      });
    } catch (error: any) {
      alert("⚠️ Session expired. Please login again.");
      navigate("/login");
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-sm w-full p-6 border rounded-lg shadow bg-white">
        <h1 className="text-2xl font-semibold text-center mb-2">Verify OTP</h1>
        <p className="text-sm text-center text-muted-foreground mb-4">
          Enter the 6-digit code sent to <b>{storedEmail}</b>
        </p>

        <div className="flex justify-between gap-2 mb-6">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 text-center text-lg"
            />
          ))}
        </div>

        <Button onClick={handleSubmit} className="w-full" disabled={isPending}>
          {isPending ? "Verifying..." : "Verify"}
        </Button>

        <p className="mt-4 text-sm text-center text-muted-foreground">
          {resendEnabled ? (
            <>
              Didn’t receive the code?{" "}
              <span
                onClick={handleResend}
                className="text-blue-600 underline cursor-pointer"
              >
                Resend
              </span>
            </>
          ) : (
            <>Resend OTP in {formatTime(timeLeft)}</>
          )}
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
