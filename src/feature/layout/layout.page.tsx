import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      
      <main className="flex-1 bg-bg-primary-0 min-h-screen w-full overflow-x-hidden">
        <div className="flex h-12 items-center border-b border-slate-100 bg-bg-primary-0 px-4 lg:hidden">
          <SidebarTrigger />
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}