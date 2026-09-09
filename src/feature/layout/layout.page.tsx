import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Outlet, useLocation } from "react-router";
import { Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router";

/** Map route paths → human-readable header titles */
const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/users": "Dashboard",
  "/news": "Dashboard",
  "/offices": "Dashboard",
  "/documents": "Dashboard",
  "/partners": "Dashboard",
  "/ai-trainer": "Dashboard",
  "/ai-knowledge-trainer": "Dashboard",
  "/report": "Dashboard",
  "/report-incorrect-data": "Dashboard",
  "/notifications": "Dashboard",
  "/notification": "Dashboard",
  "/content": "Dashboard",
  "/profile": "Dashboard",
};

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = PAGE_TITLES[location.pathname] ?? "Dashboard";

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />

      <div className="flex flex-col flex-1 min-h-screen min-w-0 overflow-x-hidden" style={{ backgroundColor: "var(--color-bg-primary-0)" }}>
        {/* ── Top Header Bar ── */}
        <header
          className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b px-4 shadow-sm"
          style={{
            backgroundColor: "var(--color-bg-header)",
            borderColor: "var(--color-border-0)",
          }}
        >
          {/* Left: mobile trigger + page title */}
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-slate-400 hover:text-slate-200 lg:hidden" />
            <span
              className="text-sm font-semibold tracking-wide"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {pageTitle}
            </span>
          </div>

          {/* Right: notification bell + user dropdown */}
          <div className="flex items-center gap-3">
            {/* Bell */}
            <button
              id="header-notification-btn"
              className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#13243C]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <Bell className="h-5 w-5" strokeWidth={1.8} />
              {/* red dot */}
              <span
                className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full ring-2 ring-[#0B1728]"
                style={{ backgroundColor: "var(--color-accent-red)" }}
              />
            </button>

            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <button
                  id="header-user-menu-btn"
                  className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-[#13243C]"
                >
                  <Avatar className="h-7 w-7 border border-blue-500/30">
                    <AvatarFallback
                      className="text-xs font-bold text-white"
                      style={{ backgroundColor: "var(--color-primary-0)" }}
                    >
                      A
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className="hidden sm:block text-sm font-medium"
                    style={{ color: "var(--color-text-primary-0)" }}
                  >
                    Admin User
                  </span>
                  <ChevronDown
                    className="h-3.5 w-3.5 hidden sm:block"
                    style={{ color: "var(--color-text-muted)" }}
                    strokeWidth={2}
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-52 rounded-xl p-1 shadow-xl border"
                style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border-0)" }}
              >
                <div className="flex items-center gap-2.5 px-2.5 py-2">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src="/avatars/admin.jpg" alt="Admin User" />
                    <AvatarFallback
                      className="text-xs font-bold text-white"
                      style={{ backgroundColor: "var(--color-primary-0)" }}
                    >
                      A
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold truncate" style={{ color: "var(--color-text-primary-0)" }}>
                      Admin User
                    </span>
                    <span className="text-[11px] truncate" style={{ color: "var(--color-text-muted)" }}>
                      admin@platform.com
                    </span>
                  </div>
                </div>
                <DropdownMenuSeparator style={{ backgroundColor: "var(--color-border-0)" }} />
                <DropdownMenuItem
                  className="gap-2 text-sm rounded-lg cursor-pointer py-2"
                  onClick={() => navigate("/profile")}
                >
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-2 text-sm rounded-lg cursor-pointer py-2 font-medium"
                  style={{ color: "var(--color-accent-red)" }}
                  onClick={() => {
                    localStorage.removeItem("access-token");
                    navigate("/login");
                  }}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* ── Page Content ── */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}