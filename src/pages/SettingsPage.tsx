import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="max-w-md w-full mx-auto mt-10 p-6 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      {/* Toggle Dark Mode */}
      <div className="flex items-center justify-between mb-6">
        <Label htmlFor="dark-mode-toggle" className="text-base">
          Enable Dark Mode
        </Label>
        <Switch
          id="dark-mode-toggle"
          checked={darkMode}
          onCheckedChange={setDarkMode}
        />
      </div>

      {/* Change Password */}
      <div className="space-y-4">
        <Label htmlFor="password" className="text-base">
          Change Password
        </Label>
        <Input id="password" type="password" placeholder="New Password" />
        <Button>Update Password</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
