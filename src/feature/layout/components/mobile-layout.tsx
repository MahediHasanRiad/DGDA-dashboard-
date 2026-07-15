import { Home, type LucideIcon, Building2, CalendarDays, Scroll, BadgeCheck } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavLink, useLocation } from "react-router";

interface TabItemType {
  value: string;
  to: string;
  text: string;
  Icon: LucideIcon;
  badgeCount?: number;
}

function TabValue({ Icon, text, value, to }: TabItemType) {
  return (
    <TabsTrigger
      value={value}
      className="flex flex-1 flex-col items-center justify-center gap-1.5 h-full bg-transparent text-gray-400 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent shadow-none border-b-2 border-transparent rounded-none transition-all duration-200 cursor-pointer"
    >
      <NavLink
        to={to}
        className="flex flex-col items-center justify-center w-full h-full text-current"
      >
        <div className="relative">
          <Icon className="h-5 w-5" />
        </div>
        <span className="block text-center text-[11px] font-semibold tracking-wide capitalize mt-0.5 max-w-full whitespace-normal">
          {text}
        </span>
      </NavLink>
    </TabsTrigger>
  );
}

export function MobileBottomTabs() {
  const location = useLocation();

  const currentTab =
    location.pathname === "/" ? "dashboard" : location.pathname.substring(1);

  return (
    <Tabs value={currentTab} className="w-full relative block ">
      <div className="block lg:hidden fixed bottom-0 left-0 right-0 z-50 h-20 border-t border-gray-100 bg-white/95 backdrop-blur px-2 shadow-[0_-4px_24px_rgba(0,0,0,0.04)] ">
        <TabsList className="grid grid-cols-5 h-full w-full items-center justify-between bg-transparent p-0 gap-1 max-w-lg mx-auto">
          <TabValue value="dashboard" to="/" Icon={Home} text="Dashboard" />
          <TabValue value="sites" to="/sites" Icon={Building2 } text="Sites" />
          <TabValue
            value="duty-schedule"
            to="/duty-schedule"
            Icon={CalendarDays }
            text="Schedule"
          />
          <TabValue value="reports" to="/reports" Icon={Scroll } text="Reports" />
          <TabValue
            value="leave-management"
            to="/leave-management"
            Icon={BadgeCheck }
            text="Leave Management"
          />
        </TabsList>
      </div>
    </Tabs>
  );
}
