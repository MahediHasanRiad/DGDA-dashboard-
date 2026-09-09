import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────

export type StatusFilter = "all" | "verified" | "pending";

interface FilterTab {
  key: StatusFilter;
  label: string;
  count: number;
}

interface UsersFilterBarProps {
  activeFilter: StatusFilter;
  onFilterChange: (filter: StatusFilter) => void;
}

// ── Data ───────────────────────────────────────────────────────────────────

const FILTER_TABS: FilterTab[] = [
  { key: "all",      label: "All",      count: 6 },
  { key: "verified", label: "Verified", count: 4 },
  { key: "pending",  label: "Pending",  count: 2 },
];

const COUNT_MAP: Record<StatusFilter, number> = {
  all:      6,
  verified: 4,
  pending:  2,
};

// ── Component ──────────────────────────────────────────────────────────────

export function UsersFilterBar({ activeFilter, onFilterChange }: UsersFilterBarProps) {
  const total = COUNT_MAP[activeFilter];

  return (
    <div
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border px-5 py-3"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border-0)",
      }}
    >
      {/* Left: filter tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="text-sm font-semibold mr-1"
          style={{ color: "var(--color-text-primary-0)" }}
        >
          Status:
        </span>

        {FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab.key;
          return (
            <button
              key={tab.key}
              id={`filter-tab-${tab.key}`}
              onClick={() => onFilterChange(tab.key)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150"
              )}
              style={
                isActive
                  ? { backgroundColor: "var(--color-accent-gold)", color: "#0B1728" }
                  : { backgroundColor: "var(--color-bg-primary-0)", color: "var(--color-text-secondary)" }
              }
              onMouseEnter={(e) => {
                if (!isActive)
                  e.currentTarget.style.backgroundColor = "var(--color-bg-card-hover)";
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  e.currentTarget.style.backgroundColor = "var(--color-bg-primary-0)";
              }}
            >
              {tab.label} ({tab.count})
              {isActive && <span className="text-xs leading-none font-bold"> •</span>}
            </button>
          );
        })}
      </div>

      {/* Right: dynamic total */}
      <span className="text-sm whitespace-nowrap" style={{ color: "var(--color-text-muted)" }}>
        Showing{" "}
        <span className="font-semibold" style={{ color: "var(--color-text-secondary)" }}>
          {total}
        </span>{" "}
        registered economic operators
      </span>
    </div>
  );
}
