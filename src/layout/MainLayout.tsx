import { Outlet } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
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
  Users,
  Settings,
  FolderKanban,
  ChevronRight
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

export default function LoggedInLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#121212]">
        {/* Fixed Sidebar */}
        <div className="fixed h-full z-10 w-[var(--sidebar-width)]">
          <Sidebar>
            <SidebarHeader className="flex items-center px-4 py-4 gap-2 border-b border-gray-800 bg-[#1E1E1E]">
              <LogoWithCollapse />
            </SidebarHeader>

            <SidebarContent className="bg-[#121212] p-2 h-[calc(100%-64px)]">
              <SidebarGroup>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <NavLink to="/dashboard" className="w-full">
                      {({ isActive }) => (
                        <SidebarMenuButton 
                          isActive={isActive} 
                          tooltip="Dashboard"
                          className={`
                            ${isActive ? 'bg-[#00E5FF]/10 border-l-2 border-[#00E5FF]' : 'bg-transparent'}
                            hover:bg-[#00E5FF]/10 hover:border-l-2 hover:border-[#00E5FF]/50
                            transition-all duration-200
                            pl-3
                          `}
                        >
                          <LayoutDashboard className={`mr-2 ${isActive ? 'text-[#00E5FF]' : 'text-gray-400'}`} />
                          <SidebarLabel isActive={isActive}>Dashboard</SidebarLabel>
                          {isActive && <ChevronRight className="ml-auto h-4 w-4 text-[#00E5FF]" />}
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <NavLink to="/expenses" className="w-full">
                      {({ isActive }) => (
                        <SidebarMenuButton 
                          isActive={isActive} 
                          tooltip="Expenses"
                          className={`
                            ${isActive ? 'bg-[#00E5FF]/10 border-l-2 border-[#00E5FF]' : 'bg-transparent'}
                            hover:bg-[#00E5FF]/10 hover:border-l-2 hover:border-[#00E5FF]/50
                            transition-all duration-200
                            pl-3
                          `}
                        >
                          <ReceiptText className={`mr-2 ${isActive ? 'text-[#00E5FF]' : 'text-gray-400'}`} />
                          <SidebarLabel isActive={isActive}>Expenses</SidebarLabel>
                          {isActive && <ChevronRight className="ml-auto h-4 w-4 text-[#00E5FF]" />}
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <NavLink to="/products" className="w-full">
                      {({ isActive }) => (
                        <SidebarMenuButton 
                          isActive={isActive} 
                          tooltip="Products"
                          className={`
                            ${isActive ? 'bg-[#00E5FF]/10 border-l-2 border-[#00E5FF]' : 'bg-transparent'}
                            hover:bg-[#00E5FF]/10 hover:border-l-2 hover:border-[#00E5FF]/50
                            transition-all duration-200
                            pl-3
                          `}
                        >
                          <Package className={`mr-2 ${isActive ? 'text-[#00E5FF]' : 'text-gray-400'}`} />
                          <SidebarLabel isActive={isActive}>Products</SidebarLabel>
                          {isActive && <ChevronRight className="ml-auto h-4 w-4 text-[#00E5FF]" />}
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <NavLink to="/categories" className="w-full">
                      {({ isActive }) => (
                        <SidebarMenuButton 
                          isActive={isActive} 
                          tooltip="Categories"
                          className={`
                            ${isActive ? 'bg-[#00E5FF]/10 border-l-2 border-[#00E5FF]' : 'bg-transparent'}
                            hover:bg-[#00E5FF]/10 hover:border-l-2 hover:border-[#00E5FF]/50
                            transition-all duration-200
                            pl-3
                          `}
                        >
                          <FolderKanban className={`mr-2 ${isActive ? 'text-[#00E5FF]' : 'text-gray-400'}`} />
                          <SidebarLabel isActive={isActive}>Categories</SidebarLabel>
                          {isActive && <ChevronRight className="ml-auto h-4 w-4 text-[#00E5FF]" />}
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <NavLink to="/users" className="w-full">
                      {({ isActive }) => (
                        <SidebarMenuButton 
                          isActive={isActive} 
                          tooltip="Users"
                          className={`
                            ${isActive ? 'bg-[#00E5FF]/10 border-l-2 border-[#00E5FF]' : 'bg-transparent'}
                            hover:bg-[#00E5FF]/10 hover:border-l-2 hover:border-[#00E5FF]/50
                            transition-all duration-200
                            pl-3
                          `}
                        >
                          <Users className={`mr-2 ${isActive ? 'text-[#00E5FF]' : 'text-gray-400'}`} />
                          <SidebarLabel isActive={isActive}>Users</SidebarLabel>
                          {isActive && <ChevronRight className="ml-auto h-4 w-4 text-[#00E5FF]" />}
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>

                  {/* <SidebarMenuItem>
                    <NavLink to="/profile" className="w-full">
                      {({ isActive }) => (
                        <SidebarMenuButton 
                          isActive={isActive} 
                          tooltip="Profile"
                          className={`
                            ${isActive ? 'bg-[#00E5FF]/10 border-l-2 border-[#00E5FF]' : 'bg-transparent'}
                            hover:bg-[#00E5FF]/10 hover:border-l-2 hover:border-[#00E5FF]/50
                            transition-all duration-200
                            pl-3
                          `}
                        >
                          <User2 className={`mr-2 ${isActive ? 'text-[#00E5FF]' : 'text-gray-400'}`} />
                          <SidebarLabel isActive={isActive}>Profile</SidebarLabel>
                          {isActive && <ChevronRight className="ml-auto h-4 w-4 text-[#00E5FF]" />}
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem> */}

                  <SidebarMenuItem>
                    <NavLink to="/settings" className="w-full">
                      {({ isActive }) => (
                        <SidebarMenuButton 
                          isActive={isActive} 
                          tooltip="Settings"
                          className={`
                            ${isActive ? 'bg-[#00E5FF]/10 border-l-2 border-[#00E5FF]' : 'bg-transparent'}
                            hover:bg-[#00E5FF]/10 hover:border-l-2 hover:border-[#00E5FF]/50
                            transition-all duration-200
                            pl-3
                          `}
                        >
                          <Settings className={`mr-2 ${isActive ? 'text-[#00E5FF]' : 'text-gray-400'}`} />
                          <SidebarLabel isActive={isActive}>Settings</SidebarLabel>
                          {isActive && <ChevronRight className="ml-auto h-4 w-4 text-[#00E5FF]" />}
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </div>

        {/* Main Content Area */}
        <main 
          className="flex-1 overflow-auto ml-[var(--sidebar-width)] bg-[#121212] text-gray-100"
          style={{ minHeight: '100vh' }}
        >
          <ErrorBoundary fallback={<div className="p-6 text-red-500">Error loading content</div>}>
            <div className="p-6">
              <Outlet />
            </div>
          </ErrorBoundary>
        </main>
      </div>
    </SidebarProvider>
  );
}

const SidebarLabel = ({ children, isActive }: { children: React.ReactNode, isActive?: boolean }) => {
  const { state } = useSidebar();
  if (state === "collapsed") return null;
  return (
    <span className={`${isActive ? 'text-[#00E5FF]' : 'text-gray-300'} font-medium`}>
      {children}
    </span>
  );
};

const LogoWithCollapse = () => {
  const { state } = useSidebar();
  return (
    <div className="flex items-center space-x-2">
      <Package className="w-6 h-6 text-[#00E5FF]" />
      {state === "expanded" && (
        <span className="text-xl font-bold tracking-tight text-[#00E5FF]">AS Digitech</span>
      )}
    </div>
  );
};