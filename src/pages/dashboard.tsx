// app/dashboard/page.tsx or wherever your DashboardPage is
"use client";

import ChartArea from "@/components/chart/ChartArea";
import ChartPie from "@/components/chart/ChartPie";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export default function DashboardPage() {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="p-6 space-y-6">
      {/* 👇 Heading with hamburger */}
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <p className="text-muted-foreground">Overview of your application.</p>

      {/* 👇 Grid for charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Area Chart spans two columns */}
        <div className="col-span-1 md:col-span-2">
          <ChartArea />
        </div>

        {/* Pie Chart added instead of "Bar coming soon..." */}
        <div className="col-span-1">
          <ChartPie />
        </div>
      </div>
    </div>
  );
}
