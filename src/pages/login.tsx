import { useState } from "react";
import { useLogin } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";
import { z } from "zod";
import { GoogleLogin } from "@react-oauth/google";   
import { googleLogin } from "@/@core/api/auth";      

const Login = () => {
  const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate: loginMutate, isPending: loginLoading } = useLogin();
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = () => {
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      result.error.issues.forEach((issue) => toast.error(issue.message));
      return;
    }

    loginMutate(
      { email, password },
      {
        onSuccess: (response) => {
          const { accessToken, user, message } = response.data;

          if (accessToken && user && user.verified) {
            localStorage.setItem("token", accessToken);
            setUser(user, accessToken);
            localStorage.removeItem("otp_email");
            toast.success("Login successful ");
            navigate("/dashboard", { replace: true });
          } else if (message?.includes("OTP sent")) {
            localStorage.setItem("otp_email", email);
            toast.success(" OTP sent to your email");
            navigate("/verify-otp", { replace: true });
          } else {
            toast.error("Unexpected login response ");
          }
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Login failed ");
        },
      }
    );
  };

  
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      if (!credentialResponse.credential) {
        toast.error("No Google token received ");
        return;
      }

      const data = await googleLogin(credentialResponse.credential); 
      const { accessToken, user } = data;

      if (accessToken && user) {
        localStorage.setItem("token", accessToken);
        setUser(user, accessToken);
        toast.success("Google login successful ");
        navigate("/dashboard", { replace: true });
      }
    } catch (err: any) {
      toast.error(err?.message || "Google login failed ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] px-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-800 rounded-2xl bg-[#1E1E1E] text-white">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-[#00E5FF]">
            Welcome Back
          </CardTitle>
          <p className="text-sm text-gray-400">
            Sign in to continue to your dashboard
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="bg-[#2A2A2A] text-white border-none focus:ring-2 focus:ring-[#00E5FF]"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-[#2A2A2A] text-white border-none focus:ring-2 focus:ring-[#00E5FF]"
          />

          <div className="flex justify-center">
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-xs text-[#00E5FF] hover:underline cursor-pointer"
            >
              Forgot Password?
            </span>
          </div>

          <Button
            onClick={handleLogin}
            disabled={loginLoading}
            className="w-full bg-[#00E5FF] hover:bg-cyan-400 text-black font-semibold rounded-lg transition-all duration-200"
          >
            {loginLoading ? "Logging in..." : "Login"}
          </Button>

          {/* 🔹 Google Login button */}
          <div className="flex justify-center mt-3">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google login failed ❌")}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 text-center">
          <p className="text-xs text-gray-500">
            By clicking continue, you agree to our{" "}
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

export default Login;
