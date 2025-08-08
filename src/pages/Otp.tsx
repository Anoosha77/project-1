import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyOtp, useResendOtp } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Otp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  const storedEmail = localStorage.getItem("otp_email");

  const { mutate: verifyOtpMutate, isPending } = useVerifyOtp();
  const { mutate: resendOtpMutate } = useResendOtp();

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

  const handleResend = () => {
    if (!storedEmail) return alert("No email to resend OTP.");
    resendOtpMutate(storedEmail, {
      onSuccess: () => alert("📨 OTP resent!"),
      onError: () => alert("⚠️ Failed to resend OTP"),
    });
  };

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-semibold text-center mb-4">Verify OTP</h1>
      <p className="text-center text-sm text-muted-foreground mb-6">
        Enter the 6-digit code sent to your email.
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
        Didn't receive code?{" "}
        <span
          onClick={handleResend}
          className="text-blue-500 underline cursor-pointer"
        >
          Resend
        </span>
      </p>
    </div>
  );
};

export default Otp;
