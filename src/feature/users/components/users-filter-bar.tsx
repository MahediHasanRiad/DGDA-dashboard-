import { ListFilter, CheckCircle2, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────

export type StatusFilter = "all" | "verified" | "pending";

interface FilterTab {
  key: StatusFilter;
  label: string;
  count: number;
  icon?: typeof CheckCircle2;
}

interface UsersFilterBarProps {
  activeFilter: StatusFilter;
  onFilterChange: (filter: StatusFilter) => void;
}

// ── Data ───────────────────────────────────────────────────────────────────

const FILTER_TABS: FilterTab[] = [
  { key: "all", label: "All", count: 6, icon: Users },
  { key: "verified", label: "Verified", count: 4, icon: CheckCircle2 },
  { key: "pending", label: "Pending", count: 2, icon: Clock },
];

const COUNT_MAP: Record<StatusFilter, number> = {
  all: 6,
  verified: 4,
  pending: 2,
};

// ── Component ──────────────────────────────────────────────────────────────

export function UsersFilterBar({ activeFilter, onFilterChange }: UsersFilterBarProps) {
  const total = COUNT_MAP[activeFilter];

  return (
    <div
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border p-3.5 sm:px-5 sm:py-3.5 shadow-md"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border-0)",
      }}
    >
      {/* Left: Filter tabs with Status label */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold mr-1 text-slate-300">
          <ListFilter className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400" />
          <span>Status:</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.key;
            const Icon = tab.icon;

            return (
              <button
                key={tab.key}
                id={`filter-tab-${tab.key}`}
                type="button"
                onClick={() => onFilterChange(tab.key)}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 border cursor-pointer active:scale-95",
                  isActive
                    ? "bg-[#F59E0B] text-[#0B1728] border-amber-500 shadow-sm font-bold"
                    : "bg-[#0B1728] text-slate-300 border-[#1C3352] hover:bg-[#142742] hover:text-white"
                )}
              >
                {Icon && (
                  <Icon
                    className={cn(
                      "h-3 w-3 sm:h-3.5 sm:w-3.5",
                      isActive
                        ? "text-[#0B1728]"
                        : tab.key === "verified"
                        ? "text-emerald-400"
                        : tab.key === "pending"
                        ? "text-amber-400"
                        : "text-blue-400"
                    )}
                  />
                )}
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "px-1.5 py-0.2 rounded-full text-[10px] font-bold",
                    isActive
                      ? "bg-[#0B1728]/20 text-[#0B1728]"
                      : "bg-[#162A43] text-slate-300"
                  )}
                >
                  ({tab.count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Dynamic count summary */}
      <span className="text-xs sm:text-sm text-slate-400">
        Showing{" "}
        <span className="font-bold text-slate-100">
          {total}
        </span>{" "}
        registered operators
      </span>
    </div>
  );
}
