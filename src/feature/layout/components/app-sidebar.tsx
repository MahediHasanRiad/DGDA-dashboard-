import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  ShieldCheck,
  ChevronsUpDown,
  LogOut,
  Settings,
  Users,
  Layers,
  ChevronRight,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/" },
  { label: "User", icon: Users, href: "/user" },
  { label: "Package", icon: Layers, href: "/package" },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const { setOpenMobile, state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const logoutHandler = () => {
    localStorage.removeItem("access-token");
    navigate("/login");
  };

  return (
    <Sidebar collapsible="icon" className="border-r-bg-secondary-0">
      <SidebarSeparator />
      {/* Navigation Content */}
      <SidebarContent className="px-3 py-4 bg-bg-secondary-0">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map(({ label, icon: Icon, href }) => (
                <SidebarMenuItem
                  key={label}
                  onClick={() => setOpenMobile(false)}
                >
                  <SidebarMenuButton className="h-10 w-full rounded-lg p-0 transition-all duration-200">
                    <NavLink
                      to={href}
                      className={({ isActive }) => `
                        flex items-center w-full h-full gap-3 px-3 rounded-lg text-sm font-medium transition-all
                        ${
                          isActive
                            ? "bg-bg-primary-0/30 border-l-4 border-primary-0 text-text-primary-0 shadow-sm font-semibold"
                            : "text-text-primary-0 hover:bg-bg-primary-0/30 hover:text-text-primary-0"
                        }
                      `}
                    >
                      <Icon className="h-4.5 w-4.5 shrink-0" strokeWidth={2} />
                      <span className="truncate">{label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Legal Section Divider */}
              <div className="flex items-center gap-2 mt-6 mb-2 px-3 group-data-[collapsible=icon]:hidden">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-primary-0/60 block whitespace-nowrap">
                  Management
                </span>
                <div className="h-px w-full bg-bg-secondary-0" />
              </div>

              {/* Legal Sidebar Item */}
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  {/* The main interactive dropdown trigger element */}
                  <CollapsibleTrigger className={'w-full'}>
                    <SidebarMenuButton
                      className="h-10 w-full rounded-lg px-3 transition-all duration-200 text-text-primary-0 hover:bg-bg-primary-0/30"
                      tooltip="Legal Content"
                    >
                      <ShieldCheck
                        className="h-4.5 w-4.5 shrink-0"
                        strokeWidth={2}
                      />
                      <span className="truncate font-medium text-sm">
                        Legal Content
                      </span>
                      <ChevronRight className="float-right ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  {/* The hidden submenu list container */}
                  <CollapsibleContent className=''>
                    <SidebarMenuSub className="mx-0 min-w-full pl-6 mt-1 flex flex-col gap-1 border-none">
                      {/* 1. Privacy Policy Sub-Link */}
                      <SidebarMenuSubItem className="space-y-2 text-sm">
                        <SidebarMenuSubButton className="p-0 h-8">
                          <NavLink
                            to="/privacy-policy"
                            className={({ isActive }) => `
                              flex items-center w-full h-full px-3 text-xs rounded-md transition-all
                              ${
                                isActive
                                  ? "bg-bg-primary-0/30 text-text-primary-0 font-semibold border-l-2 border-primary-0"
                                  : "text-text-primary-0/80 hover:bg-bg-primary-0/20 hover:text-text-primary-0"
                              }
                            `}
                          >
                            Privacy Policy
                          </NavLink>
                        </SidebarMenuSubButton>
                        <SidebarMenuSubButton className="p-0 h-8">
                          <NavLink
                            to="/terms-and-condition"
                            className={({ isActive }) => `
                              flex items-center w-full h-full px-3 text-xs rounded-md transition-all
                              ${
                                isActive
                                  ? "bg-bg-primary-0/30 text-text-primary-0 font-semibold border-l-2 border-primary-0"
                                  : "text-text-primary-0/80 hover:bg-bg-primary-0/20 hover:text-text-primary-0"
                              }
                            `}
                          >
                            Terms and Condition
                          </NavLink>
                        </SidebarMenuSubButton>
                        <SidebarMenuSubButton className="p-0 h-8">
                          <NavLink
                            to="/cookie"
                            className={({ isActive }) => `
                              flex items-center w-full h-full px-3 text-xs rounded-md transition-all
                              ${
                                isActive
                                  ? "bg-bg-primary-0/30 text-text-primary-0 font-semibold border-l-2 border-primary-0"
                                  : "text-text-primary-0/80 hover:bg-bg-primary-0/20 hover:text-text-primary-0"
                              }
                            `}
                          >
                            Cookie
                          </NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                      {/* You can optionally append the matching sub-links here later */}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer: Profile Action Section */}
      <SidebarFooter className="p-3 bg-bg-secondary-0 border-t border-slate-100">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-all hover:bg-primary-0/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200 justify-center group-data-[collapsible=icon]:p-0">
              <Avatar className="h-8 w-8 shrink-0 border shadow-sm">
                <AvatarImage src="/avatars/admin.jpg" alt="Super Admin" />
                <AvatarFallback className="bg-slate-900 text-white text-xs font-bold">
                  SA
                </AvatarFallback>
              </Avatar>

              {!isCollapsed && (
                <>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-semibold text-text-primary-0 leading-tight">
                      Super Admin
                    </span>
                    <span className="truncate text-xs text-text-primary-0">
                      admin@wachio.com
                    </span>
                  </div>
                  <ChevronsUpDown className="h-4 w-4 shrink-0 text-text-primary-0" />
                </>
              )}
            </span>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="top"
            align="start"
            className="w-56 rounded-xl p-1 shadow-lg bg-bg-primary-0"
            sideOffset={12}
          >
            <div className="flex items-center gap-2.5 px-2.5 py-2">
              <Avatar className="h-8 w-8 border border-slate-100">
                <AvatarImage src="/avatars/admin.jpg" alt="Super Admin" />
                <AvatarFallback className="bg-bg-primary-0 text-white text-xs font-bold">
                  SA
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-text-primary-0 truncate">
                  Super Admin
                </span>
                <span className="text-[11px] text-slate-400 truncate">
                  admin@wachio.com
                </span>
              </div>
            </div>
            <DropdownMenuSeparator className="bg-bg-primary-0" />

            <DropdownMenuItem
              className="gap-2.5 text-sm rounded-lg text-text-primary-0 focus:text-text-primary-0 focus:bg-bg-secondary-0 bg-bg-primary-0 cursor-pointer py-2"
              onClick={() => navigate("/profile")}
            >
              <Settings className="h-4 w-4 text-slate-400" />
              Profile
            </DropdownMenuItem>

            {/* <DropdownMenuSeparator className="bg-bg-primary-0/50" /> */}

            <DropdownMenuItem
              className="gap-2.5 text-sm rounded-lg text-red-600 focus:text-red-700 focus:bg-bg-secondary-0 cursor-pointer py-2 font-medium"
              onClick={logoutHandler}
            >
              <LogOut className="h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
