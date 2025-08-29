import ChartArea from "@/components/chart/ChartArea";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import PerformanceTable from "@/components/PerformanceTable";
import { useUserStore } from "@/store/userStore";

export default function DashboardPage() {
  const { toggleSidebar } = useSidebar();
  const user = useUserStore((state) => state.user);
  const currentRole = user?.role;

  return (
    <div className="p-6 space-y-6 bg-[#121212] min-h-screen text-white">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-[#00E5FF] hover:bg-[#2A2A2A]"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-[#00E5FF]">
          Dashboard
        </h1>
      </div>

      <p className="text-gray-400">Overview of your application.</p>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentRole === "admin" && (
          <>
            <div className="col-span-1 md:col-span-2">
              <ChartArea />
            </div>
            <div className="col-span-1">
              <PerformanceTable />
            </div>
          </>
        )}

        {currentRole === "user" && (
          <div className="p-6 bg-[#1E1E1E] shadow rounded-xl border border-gray-800">
            <h2 className="text-lg font-semibold text-[#00E5FF]">
              Welcome to user dashboard
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
