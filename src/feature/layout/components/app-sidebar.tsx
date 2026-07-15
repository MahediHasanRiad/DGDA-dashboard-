import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Building2Icon,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";



const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/" },
];


export function AppSidebar() {
  const navigate = useNavigate();

  // customer all site list
  const { setOpenMobile } = useSidebar();

  // logout
  const logoutHandler = () => {
    localStorage.removeItem("access-token");
    navigate("/login");
  };


  return (
    <Sidebar
      collapsible="icon"
      className="border-l border-gray-200 bg-bg-primary-0"
    >
      <SidebarSeparator />

      {/* Nav items */}
      <SidebarContent className="px-2 py-2 bg-white ">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {navItems.map(({ label, icon: Icon, href }) => (
                  <SidebarMenuItem key={label} onClick={() => setOpenMobile(false)}>
                      <SidebarMenuButton
                      className="h-10 gap-3 rounded-md px-3 my-2 text-sm font-medium transition-colors hover:bg-white/80 hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-semibold"
                    >
                      <NavLink to={href}>
                        {({ isActive }) => (
                          <div
                            className={`
                            flex items-center w-full gap-3 px-3 py-2 my-0.5
                            border-l-4 rounded-r-md
                            transition-all duration-200 ease-in-out select-none
                            ${
                              isActive
                                ? "border-primary-0 rounded-md bg-white/80 shadow-sm pl-4"
                                : "border-transparent hover:border-primary/40 hover:bg-white/70 hover:pl-4"
                            }
                          `}
                          >
                            <Icon
                              className="h-4.5 w-4.5 shrink-0 text-current"
                              strokeWidth={isActive ? 2 : 1.6}
                            />
                            <span className="text-[15px] / font-medium leading-none">
                              {label}
                            </span>
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <div className="flex items-center gap-3 mt-6 mb-2">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Legal Documents
                  </span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
                <SidebarMenuButton
                  onClick={() => setOpenMobile(false)}
                  // tooltip={label}
                  className="h-10 gap-3 rounded-md px-3 my-2 text-sm font-medium transition-colors hover:bg-white/80 hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-semibold"
                >
                  <NavLink to={"/privacy-policy"}>
                    {({ isActive }) => (
                      <div
                        className={`
                            flex items-center w-full gap-3 px-3 py-2 my-0.5
                            border-l-4 rounded-r-md
                            transition-all duration-200 ease-in-out select-none
                            ${
                              isActive
                                ? "border-primary-0 rounded-md bg-white/80 shadow-sm pl-4 rounded"
                                : "border-transparent hover:border-primary/40 hover:bg-white/70 hover:pl-4"
                            }
                          `}
                      >
                        <ShieldCheck
                          className="h-[18px] w-[18px] shrink-0 text-current"
                          strokeWidth={isActive ? 2 : 1.6}
                        />
                        <span className="text-[15px] font-medium leading-none">
                          Side Content
                        </span>
                      </div>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenu>
           
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer: user profile with dropdown */}
      <SidebarFooter className="px-2 py-3 bg-white">
        <SidebarSeparator className="mb-3" />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage src="/avatars/admin.jpg" alt="Super Admin" />
                <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
                  SA
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col group-data-[collapsible=icon]:hidden">
                <span className="truncate text-sm font-semibold leading-tight text-sidebar-foreground">
                  name
                </span>
                <span className="truncate text-[11px] text-muted-foreground">
                  email
                </span>
              </div>
              <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            className="w-56"
            sideOffset={8}
          >
            <div className="flex items-center gap-2 px-2 py-1.5">
              <Avatar className="h-7 w-7">
                <AvatarImage src="/avatars/admin.jpg" alt="Super Admin" />
                <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
                  SA
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-xs font-semibold">name</span>
                <span className="text-[10px] text-muted-foreground">
                  email
                </span>
              </div>
            </div>
            <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 text-sm cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <Settings className="h-4 w-4 text-muted-foreground" />
                Profile
              </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 text-sm text-destructive focus:text-destructive cursor-pointer"
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
