import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

const Profile = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="p-6 bg-[#121212] min-h-screen text-white font-sans space-y-6">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-[#00E5FF]"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-[#00E5FF]">My Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="max-w-md w-full mx-auto bg-[#1E1E1E] rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-[#00E5FF] mb-4">Profile Details</h2>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-400">Name</p>
            <p className="text-base">Anoosha Habib</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Email</p>
            <p className="text-base">anoosha@example.com</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Designation</p>
            <p className="text-base">Frontend Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
