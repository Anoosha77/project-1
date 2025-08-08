// src/pages/Login.tsx
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate: loginMutate, isPending: loginLoading } = useLogin();

  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = () => {
    if (!email || !password) {
      alert("❗ Please enter both email and password");
      return;
    }

    loginMutate(
      { email, password },
      {
        onSuccess: (response) => {
          const { accessToken, user } = response.data;
          setUser(user, accessToken);

          alert("✅ Login successful");

          if (user.verified) {
            localStorage.removeItem("otp_email");
            navigate("/dashboard", { replace: true });
          } else {
            localStorage.setItem("otp_email", user.email);
            navigate("/verify-otp", { replace: true });
          }
        },
        onError: (error: any) => {
          console.error("❌ Login error:", error);
          alert(error?.response?.data?.message || "Login failed");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access the dashboard
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button
            onClick={handleLogin}
            disabled={loginLoading}
            className="w-full"
          >
            {loginLoading ? "Logging in..." : "Login"}
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          {/* <div className="text-sm text-muted-foreground text-center">
            Or continue with
          </div>
          <Button variant="outline" className="w-full">
            Google
          </Button> */}
          <p className="text-xs text-muted-foreground text-center mt-2">
            By clicking continue, you agree to our{" "}
            <span className="underline">Terms of Service</span> and{" "}
            <span className="underline">Privacy Policy</span>.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
