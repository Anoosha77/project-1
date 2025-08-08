import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

const Profile = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="p-6">
      {/* 👇 Inline heading with hamburger */}
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">My Profile</h1>
      </div>

      {/* 👇 Profile Card */}
      <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Name</p>
            <p className="text-base">Anoosha Habib</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-base">anoosha@example.com</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Designation</p>
            <p className="text-base">Frontend Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
