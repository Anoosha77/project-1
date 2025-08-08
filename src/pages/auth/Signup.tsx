// src/pages/Signup.tsx
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

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !name || !password || !confirmPassword) {
      alert("❗ All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("❗ Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axiosInstanceAuth.post("signup", {
        name,
        email,
        password,
      });

      alert("✅ Signup successful! Please check your email for the OTP.");
      localStorage.setItem("otp_email", email); // Save for verification
      navigate("/verify-otp", { replace: true });
    } catch (error: any) {
      console.error("Signup error:", error);
      alert(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create your account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button onClick={handleSignup} disabled={loading} className="w-full">
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </CardContent>

        <CardFooter>
          <p className="text-xs text-muted-foreground text-center w-full">
            By signing up, you agree to our{" "}
            <span className="underline">Terms of Service</span> and{" "}
            <span className="underline">Privacy Policy</span>.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
