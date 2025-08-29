import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyResetOtp } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function VerifyReset() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const email = localStorage.getItem("reset_email");
  const navigate = useNavigate();
  const { mutate: verifyOtpMutate, isPending } = useVerifyResetOtp();

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto move forward
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Enter 6-digit OTP");
      return;
    }

    verifyOtpMutate(
      { email: email || "", otp: otpCode },
      {
        onSuccess: () => {
          toast.success("OTP verified ✅");
          navigate("/reset-password");
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Invalid OTP ❌");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <Card className="w-full max-w-md bg-[#1E1E1E] text-white border border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-center">Verify OTP</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="flex gap-2 justify-center">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-12 h-12 text-center rounded bg-[#2A2A2A] text-white text-lg outline-none focus:ring-2 focus:ring-[#00E5FF]"
              />
            ))}
          </div>
        <Button
  onClick={handleVerify}
  disabled={isPending}
  className="w-full bg-[#00E5FF] hover:bg-[#00E5FF] text-black font-semibold rounded-lg transition-all duration-200"
>
  {isPending ? "Verifying..." : "Verify OTP"}
</Button>

        </CardContent>
      </Card>
    </div>
  );
}
