import { Search, CheckCircle2, Clock, ListFilter } from "lucide-react";
import { cn } from "@/lib/utils";

export type ReportStatusFilter = "ALL" | "RESOLVED" | "PENDING";

interface ReportFilterBarProps {
  activeStatus: ReportStatusFilter;
  onStatusChange: (status: ReportStatusFilter) => void;
  totalCount: number;
  resolvedCount: number;
  pendingCount: number;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function ReportFilterBar({
  activeStatus,
  onStatusChange,
  totalCount,
  resolvedCount,
  pendingCount,
  searchQuery = "",
  onSearchChange,
}: ReportFilterBarProps) {
  const tabs: {
    key: ReportStatusFilter;
    label: string;
    count: number;
    icon?: typeof CheckCircle2;
  }[] = [
    { key: "ALL", label: "All Reports", count: totalCount },
    { key: "RESOLVED", label: "Resolved", count: resolvedCount, icon: CheckCircle2 },
    { key: "PENDING", label: "Pending", count: pendingCount, icon: Clock },
  ];

  return (
    <div
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border px-5 py-3 shadow-md"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border-0)",
      }}
    >
      {/* Left: Filter Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold mr-1 text-slate-300">
          <ListFilter className="h-4 w-4 text-amber-400" />
          <span>Status:</span>
        </div>

        {tabs.map((tab) => {
          const isActive = activeStatus === tab.key;
          const Icon = tab.icon;

          return (
            <button
              key={tab.key}
              id={`filter-report-${tab.key.toLowerCase()}`}
              onClick={() => onStatusChange(tab.key)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 border",
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
                      : tab.key === "RESOLVED"
                      ? "text-emerald-400"
                      : "text-amber-400"
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

      {/* Right: Quick Search */}
      {onSearchChange && (
        <div className="relative min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by user, email, or report..."
            className="w-full rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 bg-[#0B1728] border border-[#1C3352] focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
          />
        </div>
      )}
    </div>
  );
}
