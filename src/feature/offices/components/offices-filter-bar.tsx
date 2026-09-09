import { Plus, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { REGIONS, type StatusFilter } from "../offices.data";

// ── Types ──────────────────────────────────────────────────────────────────

interface OfficesFilterBarProps {
  activeStatus: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  onAddNewArea: () => void;
}

const STATUS_TABS: { label: string; value: StatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "open", value: "open" },
  { label: "Closed", value: "closed" },
];

// ── Filter Bar Component ───────────────────────────────────────────────────

export function OfficesFilterBar({
  activeStatus,
  onStatusChange,
  selectedRegion,
  onRegionChange,
  onAddNewArea,
}: OfficesFilterBarProps) {
  return (
    <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
      {/* ── Left side: Status tabs and Region selector ── */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-6">
        {/* Status filter group */}
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-semibold text-slate-300 mr-1 shrink-0"
          >
            Status:
          </span>
          <div
            className="flex items-center gap-1 p-1 rounded-xl border"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderColor: "var(--color-border-0)",
            }}
          >
            {STATUS_TABS.map((tab) => {
              const isActive = activeStatus === tab.value;
              return (
                <button
                  key={tab.value}
                  id={`office-status-${tab.value}`}
                  onClick={() => onStatusChange(tab.value)}
                  className={cn(
                    "rounded-lg px-3 py-1 text-xs font-semibold transition-all duration-150",
                    isActive ? "shadow-sm" : "hover:text-slate-200"
                  )}
                  style={
                    isActive
                      ? {
                          backgroundColor: "var(--color-accent-gold)",
                          color: "#0B1728",
                        }
                      : {
                          backgroundColor: "transparent",
                          color: "var(--color-text-secondary)",
                        }
                  }
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Region dropdown */}
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-semibold text-slate-300 shrink-0"
          >
            Region:
          </span>
          <div className="relative">
            <select
              id="office-region-select"
              value={selectedRegion}
              onChange={(e) => onRegionChange(e.target.value)}
              className="appearance-none rounded-xl border px-3 py-1.5 pr-8 text-xs font-medium focus:outline-none cursor-pointer"
              style={{
                backgroundColor: "var(--color-bg-card)",
                borderColor: "var(--color-border-0)",
                color: "var(--color-text-primary-0)",
              }}
            >
              {REGIONS.map((region) => (
                <option
                  key={region}
                  value={region}
                  className="bg-[#102035] text-white"
                >
                  {region}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* ── Right side: Add Services Area button ── */}
      <button
        id="add-services-area-btn"
        onClick={onAddNewArea}
        className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-150 hover:opacity-90 active:scale-95 shadow-md w-full sm:w-auto"
        style={{
          backgroundColor: "var(--color-accent-gold)",
          color: "#0B1728",
        }}
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
        <span>Add Services Area</span>
      </button>
    </div>
  );
}
