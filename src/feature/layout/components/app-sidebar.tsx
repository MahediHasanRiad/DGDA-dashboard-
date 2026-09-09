import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Users,
  Newspaper,
  Building2,
  FileText,
  Handshake,
  BrainCircuit,
  AlertTriangle,
  Bell,
  Layers,
  HelpCircle,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { label: "Dashboard Overview", icon: LayoutDashboard, href: "/" },
  { label: "User & NIF Management", icon: Users, href: "/users" },
  { label: "News & Press Manager", icon: Newspaper, href: "/news" },
  { label: "DGDA Offices & Directory", icon: Building2, href: "/offices" },
  { label: "Document Center", icon: FileText, href: "/documents" },
  { label: "Partners & Sponsors", icon: Handshake, href: "/partners" },
  { label: "AI Knowledge Trainer", icon: BrainCircuit, href: "/ai-trainer" },
  { label: "Report Incorrect Data", icon: AlertTriangle, href: "/report" },
  { label: "Push Notifications", icon: Bell, href: "/notifications" },
  { label: "FAQ", icon: HelpCircle, href: "/faq" },
];

const contentSubItems = [
  { label: "Privacy policy", icon: ShieldAlert, href: "/privacy-policy" },
  { label: "About us", icon: Building2, href: "/about-us" },
  { label: "Terms and condition", icon: FileText, href: "/terms-and-condition" },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const isContentActive =
    location.pathname.startsWith("/faq") ||
    location.pathname.startsWith("/privacy-policy") ||
    location.pathname.startsWith("/terms-and-condition") ||
    location.pathname.startsWith("/cookie");

  const [isContentOpen, setIsContentOpen] = useState(true);

  const logoutHandler = () => {
    localStorage.removeItem("access-token");
    navigate("/login");
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0"
      style={{ backgroundColor: "var(--color-sidebar-bg)" }}
    >
      {/* ── Logo Header ── */}
      <SidebarHeader
        className="px-4 py-5 border-b"
        style={{
          borderColor: "var(--color-sidebar-border)",
          backgroundColor: "var(--color-sidebar-bg)",
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Shield / crest icon */}
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-lg"
            style={{
              background: "linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L3 6V12C3 16.97 7.02 21.61 12 23C16.98 21.61 21 16.97 21 12V6L12 2Z"
                fill="#FBBF24"
                stroke="#F59E0B"
                strokeWidth="0.5"
              />
              <path
                d="M12 5L5 8.5V12C5 15.87 8.14 19.42 12 20.7C15.86 19.42 19 15.87 19 12V8.5L12 5Z"
                fill="#1D4ED8"
              />
              <text
                x="12"
                y="15"
                textAnchor="middle"
                fill="white"
                fontSize="7"
                fontWeight="bold"
                fontFamily="Inter, sans-serif"
              >
                DG
              </text>
            </svg>
          </div>

          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span
                className="text-sm font-bold leading-tight"
                style={{ color: "#F8FAFC" }}
              >
                DGDA
              </span>
              <span
                className="text-[10px] leading-tight"
                style={{ color: "var(--color-sidebar-text)" }}
              >
                Direction Générale
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* ── Nav Content ── */}
      <SidebarContent
        className="px-2 py-3"
        style={{ backgroundColor: "var(--color-sidebar-bg)" }}
      >
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {mainNavItems.map(({ label, icon: Icon, href }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton
                    className="h-9 w-full rounded-lg p-0 transition-all duration-150 hover:bg-transparent"
                    tooltip={label}
                  >
                    <NavLink
                      to={href}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center w-full h-full gap-3 px-3 rounded-lg text-[13px] font-medium transition-all duration-150 border",
                          isActive
                            ? "border-[#F59E0B] text-white font-semibold shadow-sm"
                            : "border-transparent hover:bg-[#13243C]"
                        )
                      }
                      style={({ isActive }) =>
                        isActive
                          ? {
                              backgroundColor: "rgba(245, 158, 11, 0.08)",
                              color: "#FFFFFF",
                            }
                          : { color: "var(--color-sidebar-text)" }
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon
                            className="h-4 w-4 shrink-0 transition-colors"
                            style={{
                              color: isActive
                                ? "var(--color-accent-gold)"
                                : "inherit",
                            }}
                            strokeWidth={1.8}
                          />
                          <span className="truncate">{label}</span>
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* ── Content Manager Accordion ── */}
              <SidebarMenuItem>
                <button
                  type="button"
                  onClick={() => setIsContentOpen((prev) => !prev)}
                  className={cn(
                    "flex items-center justify-between w-full h-9 px-3 rounded-lg text-[13px] font-medium transition-all duration-150 border cursor-pointer",
                    isContentActive
                      ? "border-transparent text-white font-semibold bg-[#13243C]"
                      : "border-transparent text-slate-400 hover:bg-[#13243C] hover:text-slate-200"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Layers className="h-4 w-4 shrink-0" strokeWidth={1.8} />
                    {!isCollapsed && (
                      <span className="truncate">Content Manager</span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <div>
                      {isContentOpen ? (
                        <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                      )}
                    </div>
                  )}
                </button>

                {/* Sub-menu Items */}
                {isContentOpen && !isCollapsed && (
                  <div className="pl-6 pt-1 space-y-0.5">
                    {contentSubItems.map(({ label, icon: Icon, href }) => (
                      <NavLink
                        key={label}
                        to={href}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center w-full h-8 gap-2.5 px-3 rounded-lg text-[12px] font-medium transition-all duration-150 border",
                            isActive
                              ? "border-[#F59E0B] text-white font-semibold bg-[rgba(245,158,11,0.08)] shadow-sm"
                              : "border-transparent text-slate-400 hover:bg-[#13243C] hover:text-slate-200"
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <Icon
                              className="h-3.5 w-3.5 shrink-0"
                              style={{
                                color: isActive
                                  ? "var(--color-accent-gold)"
                                  : "inherit",
                              }}
                              strokeWidth={1.8}
                            />
                            <span className="truncate">{label}</span>
                          </>
                        )}
                      </NavLink>
                    ))}
                  </div>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer: User + Sign Out ── */}
      <SidebarFooter
        className="p-3 border-t"
        style={{
          backgroundColor: "var(--color-sidebar-bg)",
          borderColor: "var(--color-sidebar-border)",
        }}
      >
        {/* User info row */}
        <div className="flex items-center gap-2.5 px-1 mb-2 min-w-0">
          <Avatar className="h-8 w-8 shrink-0 border-2 border-blue-700">
            <AvatarImage src="/avatars/admin.jpg" alt="Super Admin" />
            <AvatarFallback
              className="text-xs font-bold text-white"
              style={{ backgroundColor: "var(--color-primary-0)" }}
            >
              SA
            </AvatarFallback>
          </Avatar>

          {!isCollapsed && (
            <div className="flex min-w-0 flex-col">
              <span
                className="truncate text-sm font-semibold leading-tight"
                style={{ color: "#F8FAFC" }}
              >
                Super Admin
              </span>
              <span
                className="truncate text-[11px] leading-tight"
                style={{ color: "var(--color-sidebar-text)" }}
              >
                Admin@platform.co...
              </span>
            </div>
          )}
        </div>

        {/* Sign Out button */}
        <button
          onClick={logoutHandler}
          className={[
            "flex items-center justify-center gap-2 w-full rounded-lg py-2 text-sm font-semibold transition-all duration-150 hover:opacity-90 active:scale-95 cursor-pointer",
            isCollapsed ? "px-2" : "px-3",
          ].join(" ")}
          style={{ backgroundColor: "var(--color-accent-red)", color: "#fff" }}
        >
          <LogOut className="h-4 w-4 shrink-0" strokeWidth={2} />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
