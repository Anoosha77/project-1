import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner"; // ✅ using shadcn toast
import { changePassword } from "@/@core/api/auth";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();
  const logout = useUserStore((state) => state.logout);

  // ✅ Default dark mode
  const [lightMode, setLightMode] = useState(
    localStorage.getItem("theme") === "light"
  );

  // 🔐 Change password states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await changePassword({ oldPassword, newPassword });

      toast.success(res.data.message || "Password changed successfully");

      // ✅ Reset form after success
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // ✅ Optional: Logout after password change
      handleLogout();
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.error || "Failed to change password";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lightMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [lightMode]);

  return (
    <div className="p-6 space-y-6 font-sans bg-[#121212] min-h-screen text-white">
      {/* Header with Hamburger */}
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-[#00E5FF]"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-[#00E5FF]">Settings</h1>
      </div>

      {/* Settings Card */}
      <div className="max-w-md w-full mx-auto space-y-6 bg-[#1E1E1E] p-6 rounded-lg border border-gray-700">
        {/* Toggle Light Mode */}
        <div className="flex items-center justify-between">
          <Label htmlFor="light-mode-toggle" className="text-base text-white">
            Enable Light Mode
          </Label>
          <Switch
            id="light-mode-toggle"
            checked={lightMode}
            onCheckedChange={setLightMode}
          />
        </div>

        {/* Change Password Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-[#00E5FF] text-black hover:bg-cyan-400">
              Change Password
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md bg-[#1E1E1E] text-white border border-gray-700">
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="bg-[#2A2A2A] text-white border-gray-600"
              />
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-[#2A2A2A] text-white border-gray-600"
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-[#2A2A2A] text-white border-gray-600"
              />
            </div>

            <DialogFooter>
              <Button
                onClick={handleChangePassword}
                disabled={loading}
                className="w-full bg-[#00E5FF] text-black hover:bg-cyan-400"
              >
                {loading ? "Changing..." : "Change Password"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full bg-red-600 hover:bg-red-700"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
