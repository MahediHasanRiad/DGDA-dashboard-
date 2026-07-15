import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Outlet } from "react-router";

import { MobileBottomTabs } from "./components/mobile-layout";

export default function Layout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="hidden lg:block">
        <AppSidebar />
      </div>

      <div>
        <Outlet />
      </div>

      {/* mobile tabs  */}
      <div>
        <MobileBottomTabs />
      </div>
    </SidebarProvider>
  );
}
