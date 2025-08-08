// src/pages/auth/Register.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);

  const handleSignup = () => {
    alert("Pretend to send signup request (not implemented yet)");
    setShowOtpField(true);
  };

  const handleVerifySignupOtp = () => {
    alert(`Pretend to verify OTP: ${otp} for ${email}`);
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-semibold mb-4">Register</h1>

      {!showOtpField ? (
        <>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="mb-2"
          />

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mb-2"
          />

          <Button onClick={handleSignup} className="w-full">
            Send Signup OTP
          </Button>
        </>
      ) : (
        <>
          <Input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="mb-2"
          />

          <Button onClick={handleVerifySignupOtp} className="w-full">
            Verify OTP
          </Button>
        </>
      )}
    </div>
  );
};

export default Register;
