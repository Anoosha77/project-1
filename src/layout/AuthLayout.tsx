import React from "react"
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default AuthLayout


// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarHeader,
//   SidebarInset,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarProvider,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { Outlet, NavLink, useLocation } from "react-router-dom";
// import { LayoutDashboard, ReceiptText, User2, Landmark, Package } from "lucide-react";


// export default function MainLayout() {
//   const { pathname } = useLocation();

//   return ( 
//     <SidebarProvider>
//       <Sidebar>
//         <SidebarHeader className="flex items-left px-4 py-3 gap-2">
//           <LogoWithCollapse />
//         </SidebarHeader>

//         <SidebarContent>
//           <SidebarGroup>
//             <SidebarMenu>
//               <SidebarMenuItem>
//                 <NavLink to="/dashboard" className="w-full">
//                   {({ isActive }) => (
//                     <SidebarMenuButton isActive={isActive} tooltip="Dashboard">
//                       <LayoutDashboard className="mr-2" />
//                       <SidebarLabel>Dashboard</SidebarLabel>
//                     </SidebarMenuButton>
//                   )}
//                 </NavLink>
//               </SidebarMenuItem>

//               <SidebarMenuItem>
//                 <NavLink to="/expenses" className="w-full">
//                   {({ isActive }) => (
//                     <SidebarMenuButton isActive={isActive} tooltip="Expenses">
//                       <ReceiptText className="mr-2" />
//                       <SidebarLabel>Expenses</SidebarLabel>
//                     </SidebarMenuButton>
//                   )}
//                 </NavLink>
//               </SidebarMenuItem>

//               <SidebarMenuItem>
//                 <NavLink to="/profile" className="w-full">
//                   {({ isActive }) => (
//                     <SidebarMenuButton isActive={isActive} tooltip="Profile">
//                       <User2 className="mr-2" />
//                       <SidebarLabel>Profile</SidebarLabel>
//                     </SidebarMenuButton>
//                   )}
//                 </NavLink>
//               </SidebarMenuItem>
//               <SidebarMenuItem>
//                 <NavLink to="/products" className="w-full">
//                   {({ isActive }) => (
//                     <SidebarMenuButton isActive={isActive} tooltip="Products">
//                       <Package className="mr-2" />
//                       <SidebarLabel>Products</SidebarLabel>
//                     </SidebarMenuButton>
//                   )}
//                 </NavLink>
//               </SidebarMenuItem>
//             </SidebarMenu>
//           </SidebarGroup>
//         </SidebarContent>
//       </Sidebar>

//       <SidebarInset>
//         <Outlet />
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }

// // 🔽 Show text only when expanded
// const SidebarLabel = ({ children }: { children: React.ReactNode }) => {
//   const { state } = useSidebar();

//   if (state === "collapsed") return null;
//   return <span>{children}</span>;
// };

// // 🔽 Logo
// const LogoWithCollapse = () => {
//   const { state } = useSidebar();

//   return (
//     <div className="flex items-center space-x-2">
//       <Landmark className="w-6 h-6 text-primary" />
//       {state === "expanded" && (
//         <span className="text-xl font-bold tracking-tight">AS Digitech</span>
//       )}
//     </div>
//   );
// };
