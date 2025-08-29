import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResetPassword } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("reset_email");
  const { mutate: resetMutate, isPending } = useResetPassword();

  const handleReset = () => {
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    resetMutate(
      { email: email || "", newPassword },
      {
        onSuccess: () => {
          toast.success("Password reset successful ✅");
          localStorage.removeItem("reset_email");
          navigate("/login");
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Failed to reset password ❌");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <Card className="w-full max-w-md bg-[#1E1E1E] text-white border border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-center">Reset Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-[#2A2A2A] text-white"
          />
          <Input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-[#2A2A2A] text-white"
          />
          <Button
            onClick={handleReset}
            disabled={isPending}
            className="w-full bg-[#00E5FF] text-black"
          >
            {isPending ? "Resetting..." : "Reset Password"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
