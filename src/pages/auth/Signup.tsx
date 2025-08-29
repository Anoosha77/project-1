import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { axiosInstanceAuth } from "@/@core/instances/instances";
import { toast } from "sonner";
import { z } from "zod";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "@/@core/api/auth"; // ✅ use your new function

const signupSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    const result = signupSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      result.error.issues.forEach((issue) => toast.error(issue.message));
      return;
    }

    setLoading(true);
    try {
      await axiosInstanceAuth.post("signup", {
        name,
        email,
        password,
      });

      toast.success("Signup successful! Check your email for the OTP.");
      localStorage.setItem("otp_email", email);
      navigate("/verify-otp", { replace: true });
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Signup handler
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      if (!credentialResponse.credential) {
        toast.error("No Google token received ❌");
        return;
      }

      const data = await googleLogin(credentialResponse.credential);

      const { accessToken, user } = data;
      if (accessToken && user) {
        localStorage.setItem("token", accessToken);
        toast.success("Google signup successful ✅");
        navigate("/dashboard", { replace: true });
      }
    } catch (err: any) {
      toast.error(err?.message || "Google signup failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] px-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-800 rounded-2xl bg-[#1E1E1E] text-white">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-[#00E5FF]">
            Create Account
          </CardTitle>
          <p className="text-sm text-gray-400">
            Sign up to start your journey
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#2A2A2A] text-white border-none focus:ring-2 focus:ring-[#00E5FF]"
          />
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#2A2A2A] text-white border-none focus:ring-2 focus:ring-[#00E5FF]"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#2A2A2A] text-white border-none focus:ring-2 focus:ring-[#00E5FF]"
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-[#2A2A2A] text-white border-none focus:ring-2 focus:ring-[#00E5FF]"
          />

          <Button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-[#00E5FF] hover:bg-cyan-400 text-black font-semibold rounded-lg transition-all duration-200"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>

          {/* 🔹 Google Signup button */}
          <div className="flex justify-center mt-3">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google signup failed ❌")}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 text-center">
          <p className="text-xs text-gray-500">
            By signing up, you agree to our{" "}
            <span className="underline cursor-pointer text-[#00E5FF]">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="underline cursor-pointer text-[#00E5FF]">
              Privacy Policy
            </span>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
