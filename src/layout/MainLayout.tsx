import { Outlet } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  ReceiptText,
  Package,
  User2,
  Settings,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

export default function LoggedInLayout() {
  const { pathname } = useLocation();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="flex items-left px-4 py-3 gap-2">
          <LogoWithCollapse />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavLink to="/dashboard" className="w-full">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive} tooltip="Dashboard">
                      <LayoutDashboard className="mr-2" />
                      <SidebarLabel>Dashboard</SidebarLabel>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <NavLink to="/expenses" className="w-full">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive} tooltip="Expenses">
                      <ReceiptText className="mr-2" />
                      <SidebarLabel>Expenses</SidebarLabel>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <NavLink to="/products" className="w-full">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive} tooltip="Products">
                      <Package className="mr-2" />
                      <SidebarLabel>Products</SidebarLabel>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <NavLink to="/profile" className="w-full">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive} tooltip="Profile">
                      <User2 className="mr-2" />
                      <SidebarLabel>Profile</SidebarLabel>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>

              {/* ✅ Settings Menu Item */}
              <SidebarMenuItem>
                <NavLink to="/settings" className="w-full">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive} tooltip="Settings">
                      <Settings className="mr-2" />
                      <SidebarLabel>Settings</SidebarLabel>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

const SidebarLabel = ({ children }: { children: React.ReactNode }) => {
  const { state } = useSidebar();
  if (state === "collapsed") return null;
  return <span>{children}</span>;
};

const LogoWithCollapse = () => {
  const { state } = useSidebar();
  return (
    <div className="flex items-center space-x-2">
      <Package className="w-6 h-6 text-primary" />
      {state === "expanded" && (
        <span className="text-xl font-bold tracking-tight">AS Digitech</span>
      )}
    </div>
  );
};
