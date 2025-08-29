import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPassword } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { mutate: forgotMutate, isPending } = useForgotPassword();

  const handleSubmit = () => {
    if (!email) {
      toast.error("Enter your email!");
      return;
    }

    forgotMutate(
      { email },
      {
        onSuccess: () => {
          localStorage.setItem("reset_email", email);
          toast.success("OTP sent to your email!");
          navigate("/verify-reset");
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Failed to send OTP");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <Card className="w-full max-w-md bg-[#1E1E1E] text-white border border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-center">Forgot Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#2A2A2A] text-white"
          />
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full bg-[#00E5FF] hover:bg-[#00E5FF] text-black font-semibold rounded-lg transition-all duration-200"
          >
            {isPending ? "Sending..." : "Send OTP"}
          </Button>

        </CardContent>
        <CardFooter className="text-center text-gray-400 text-sm">
          Back to{" "}
          <span onClick={() => navigate("/login")} className="text-[#00E5FF] cursor-pointer">
            Login
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
