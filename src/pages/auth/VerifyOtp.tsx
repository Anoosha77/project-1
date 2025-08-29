import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyOtp, useResendOtp } from "@/hooks/useAuth";
import { useUserStore } from "@/store/userStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(180);
  const [resendEnabled, setResendEnabled] = useState(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();
  const storedEmail = localStorage.getItem("otp_email");

  const setUser = useUserStore((state) => state.setUser);
  const { mutate: verifyOtpMutate, isPending } = useVerifyOtp();
  const { mutate: resendOtpMutate, isPending: resendPending } = useResendOtp();

  useEffect(() => {
    if (timeLeft <= 0) {
      setResendEnabled(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

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

  const handleSubmit = () => {
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) return toast.error("Please enter the full 6-digit OTP");
    if (!storedEmail) return toast.error("No email found for verification");

    verifyOtpMutate(
      { email: storedEmail, otp: fullOtp },
      {
        onSuccess: (data) => {
          toast.success("✅ OTP Verified");

          const { accessToken, user } = data.data || {};
          if (accessToken && user) {
            localStorage.setItem("token", accessToken);
            setUser(user, accessToken);
          }

          localStorage.removeItem("otp_email");
          navigate("/dashboard", { replace: true });
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "❌ Invalid OTP");
        },
      }
    );
  };

  const handleResend = () => {
    if (!storedEmail) return toast.error("No email found for resend");

    resendOtpMutate(storedEmail, {
      onSuccess: () => {
        toast.success("📨 OTP resent!");
        setTimeLeft(180);
        setResendEnabled(false);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "⚠️ Failed to resend OTP");
      },
    });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] px-4">
      <div className="max-w-sm w-full p-6 border rounded-2xl shadow-lg bg-[#1E1E1E] text-white">
        <h1 className="text-2xl font-semibold text-center mb-2">Verify OTP</h1>
        <p className="text-sm text-center text-gray-400 mb-4">
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
    className="w-10 h-12 text-center text-lg bg-[#2A2A2A] text-white border-none focus:ring-2 focus:ring-[#00E5FF]"
  />
))}
        </div>

        <Button onClick={handleSubmit} className="w-full bg-[#00E5FF] hover:bg-cyan-400 text-black font-semibold rounded-lg transition-all duration-200" disabled={isPending}>
          {isPending ? "Verifying..." : "Verify"}
        </Button>

        <p className="mt-4 text-sm text-center text-gray-400">
          {resendEnabled ? (
            <>
              Didn’t receive the code?{" "}
              <span
                onClick={handleResend}
                className={`${
                  resendPending
                    ? "opacity-50 cursor-not-allowed"
                    : "text-[#00E5FF] underline cursor-pointer"
                }`}
              >
                {resendPending ? "Sending..." : "Resend"}
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