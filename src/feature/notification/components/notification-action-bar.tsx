import { Plus, Search, Radio, CheckCircle2, Clock, ListFilter } from "lucide-react";
import { type NotificationStatusFilter } from "../notification.data";
import { cn } from "@/lib/utils";

interface NotificationActionBarProps {
  activeStatus: NotificationStatusFilter;
  onStatusChange: (status: NotificationStatusFilter) => void;
  totalCount: number;
  deliveredCount: number;
  broadcastingCount: number;
  scheduledCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCompose: () => void;
}

export function NotificationActionBar({
  activeStatus,
  onStatusChange,
  totalCount,
  deliveredCount,
  broadcastingCount,
  scheduledCount,
  searchQuery,
  onSearchChange,
  onOpenCompose,
}: NotificationActionBarProps) {
  const statusTabs: {
    key: NotificationStatusFilter;
    label: string;
    count: number;
    icon?: typeof CheckCircle2;
  }[] = [
    { key: "all", label: "All Broadcasts", count: totalCount },
    { key: "delivered", label: "Delivered", count: deliveredCount, icon: CheckCircle2 },
    { key: "broadcasting", label: "Broadcasting", count: broadcastingCount, icon: Radio },
    { key: "scheduled", label: "Scheduled", count: scheduledCount, icon: Clock },
  ];

  return (
    <div
      className="flex flex-col gap-4 rounded-2xl border px-5 py-4 shadow-md"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border-0)",
      }}
    >
      {/* Top Row: Status Filter Tabs & Compose Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold mr-1 text-slate-300">
            <ListFilter className="h-4 w-4 text-amber-400" />
            <span>Status:</span>
          </div>

          {statusTabs.map((tab) => {
            const isActive = activeStatus === tab.key;
            const Icon = tab.icon;

            return (
              <button
                key={tab.key}
                id={`filter-status-${tab.key}`}
                onClick={() => onStatusChange(tab.key)}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-150 border cursor-pointer",
                  isActive
                    ? "bg-[#F59E0B] text-[#0B1728] border-amber-500 shadow-sm font-bold"
                    : "bg-[#0B1728] text-slate-300 border-[#1C3352] hover:bg-[#142742] hover:text-white"
                )}
              >
                {Icon && (
                  <Icon
                    className={cn(
                      "h-3.5 w-3.5",
                      isActive
                        ? "text-[#0B1728]"
                        : tab.key === "delivered"
                        ? "text-emerald-400"
                        : tab.key === "broadcasting"
                        ? "text-amber-400 animate-pulse"
                        : "text-blue-400"
                    )}
                  />
                )}
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                    isActive
                      ? "bg-[#0B1728]/20 text-[#0B1728]"
                      : "bg-[#162A43] text-slate-300"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action: Compose Button */}
        <button
          id="open-compose-modal-btn"
          type="button"
          onClick={onOpenCompose}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1728] text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Compose Notification</span>
        </button>
      </div>

      {/* Bottom Row: Search */}
      <div className="relative w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, audience, category or keyword..."
          className="w-full rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 bg-[#0B1728] border border-[#1C3352] focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all shadow-inner"
        />
      </div>
    </div>
  );
}
