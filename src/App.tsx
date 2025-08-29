import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import LoggedInLayout from "./layout/MainLayout";

import Login from "./pages/login";
import Otp from "./pages/Otp";
import Dashboard from "./pages/dashboard";
import Expenses from "./pages/expenses";
import Profile from "./pages/profile";
import Products from "@/pages/products";   // ✅ Capitalized file name
import Categories from "@/pages/categories"; // ✅ Match file we created

import Users from "./pages/users";
import SettingsPage from "@/pages/SettingsPage";
import ProtectedRoute from "@/components/PrivateRoute";
import Signup from "@/pages/auth/Signup";
import VerifyOtp from "@/pages/auth/VerifyOtp";
import ForgotPassword from "@/pages/ForgotPassword";
import VerifyReset from "@/pages/VerifyReset";
import ResetPassword from "@/pages/ResetPassword";

import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <BrowserRouter>
      <Toaster />

      <Routes>
        {/* 🔓 Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/verify-login-otp" element={<Otp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/verify-reset" element={<VerifyReset />} />
  <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* 🔐 Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <LoggedInLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
