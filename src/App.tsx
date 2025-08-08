import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import LoggedInLayout from "./layout/MainLayout";

import Login from "./pages/login";
import Otp from "./pages/Otp";
import Dashboard from "./pages/dashboard";
import Expenses from "./pages/expenses";
import Profile from "./pages/profile";
import Products from "@/pages/products";
import SettingsPage from "@/pages/SettingsPage";
import ProtectedRoute from "@/components/PrivateRoute";
import Signup from "@/pages/auth/Signup";
import VerifyOtp from "@/pages/auth/VerifyOtp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Public Routes with AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/verify-login-otp" element={<Otp />} />
        </Route>

        {/* 🔐 Protected Routes with Main Layout */}
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
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
