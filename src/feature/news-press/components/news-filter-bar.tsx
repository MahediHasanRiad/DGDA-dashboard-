import { Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NewsFilter } from "../news-press.data";

// ── Types ──────────────────────────────────────────────────────────────────

interface NewsFilterBarProps {
  activeFilter: NewsFilter;
  onFilterChange: (filter: NewsFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddNewArticle: () => void;
}

const FILTER_TABS: { label: string; value: NewsFilter }[] = [
  { label: "All", value: "all" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
];

// ── Filter Bar Component ───────────────────────────────────────────────────

export function NewsFilterBar({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onAddNewArticle,
}: NewsFilterBarProps) {
  return (
    <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
      {/* ── Left side: Search & Filter Tabs ── */}
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        {/* Search input */}
        <div
          className="relative flex items-center rounded-xl border transition-colors focus-within:border-blue-500/60 w-full sm:w-auto flex-1 sm:flex-initial"
          style={{
            backgroundColor: "var(--color-bg-card)",
            borderColor: "var(--color-border-0)",
          }}
        >
          <Search
            className="absolute left-3.5 h-4 w-4 pointer-events-none"
            style={{ color: "var(--color-text-muted)" }}
          />
          <input
            id="news-search-input"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 w-full sm:w-64 rounded-xl bg-transparent pl-10 pr-4 text-sm focus:outline-none placeholder:text-slate-500"
            style={{ color: "var(--color-text-primary-0)" }}
          />
        </div>

        {/* Filter pill tabs */}
        <div
          className="flex items-center gap-1 p-1 rounded-xl border shrink-0"
          style={{
            backgroundColor: "var(--color-bg-card)",
            borderColor: "var(--color-border-0)",
          }}
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                id={`filter-tab-${tab.value}`}
                onClick={() => onFilterChange(tab.value)}
                className={cn(
                  "rounded-lg px-3 sm:px-3.5 py-1.5 text-xs font-semibold transition-all duration-150",
                  isActive
                    ? "shadow-sm"
                    : "hover:text-slate-200"
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

      {/* ── Right side: Add New Article button ── */}
      <button
        id="add-new-article-btn"
        onClick={onAddNewArticle}
        className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-150 hover:opacity-90 active:scale-95 shadow-md w-full sm:w-auto"
        style={{
          backgroundColor: "var(--color-accent-gold)",
          color: "#0B1728",
        }}
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
        <span>Add New Article</span>
      </button>
    </div>
  );
}
