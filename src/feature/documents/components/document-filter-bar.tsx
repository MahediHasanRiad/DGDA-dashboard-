import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES, type DocumentCategory } from "../documents.data";

// ── Types ──────────────────────────────────────────────────────────────────

interface DocumentFilterBarProps {
  activeCategory: DocumentCategory;
  onCategoryChange: (category: DocumentCategory) => void;
  onAddNewDocument: () => void;
}

// ── Filter Bar Component ───────────────────────────────────────────────────

export function DocumentFilterBar({
  activeCategory,
  onCategoryChange,
  onAddNewDocument,
}: DocumentFilterBarProps) {
  return (
    <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
      {/* ── Left side: Category tabs ── */}
      <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-3 w-full sm:w-auto">
        <span className="text-xs font-semibold text-slate-300 shrink-0">
          Status:
        </span>
        <div
          className="flex items-center gap-1 p-1 rounded-xl border max-w-full overflow-x-auto no-scrollbar"
          style={{
            backgroundColor: "var(--color-bg-card)",
            borderColor: "var(--color-border-0)",
          }}
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                id={`doc-tab-${category.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                onClick={() => onCategoryChange(category)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150 shrink-0 whitespace-nowrap",
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
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Right side: Add button ── */}
      <button
        id="add-document-btn"
        onClick={onAddNewDocument}
        className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-150 hover:opacity-90 active:scale-95 shadow-md w-full sm:w-auto shrink-0"
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
