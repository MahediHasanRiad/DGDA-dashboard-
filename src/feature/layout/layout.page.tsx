import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Outlet } from "react-router";

import { MobileBottomTabs } from "./components/mobile-layout";

export default function Layout() {
  return (
    <SidebarProvider defaultOpen={true} className="grid grid-cols-7">
      <div className="hidden lg:block bg-bg-secondary-0 col-span-1">
        <AppSidebar />
      </div>

      <div className="bg-bg-primary-0 col-span-6 min-h-screen">
        <Outlet />
      </div>

      {/* mobile tabs  */}
      <div>
        <MobileBottomTabs />
      </div>
    </SidebarProvider>
  );
}
