import { useState } from "react";
import { Plus, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PARTNER_CATEGORIES, type PartnerCategory } from "../partners.data";

// ── Types ──────────────────────────────────────────────────────────────────

interface PartnersFilterBarProps {
  activeCategory: PartnerCategory;
  onCategoryChange: (category: PartnerCategory) => void;
  onAddNewPartner: () => void;
}

// ── Component ──────────────────────────────────────────────────────────────

export function PartnersFilterBar({
  activeCategory,
  onCategoryChange,
  onAddNewPartner,
}: PartnersFilterBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
      {/* ── Left side: Category Dropdown ── */}
      <div className="flex items-center gap-2.5">
        <span className="text-xs sm:text-sm font-semibold text-slate-300 shrink-0">
          Category:
        </span>

        {/* Dropdown Menu */}
        <div className="relative">
          <button
            id="partner-category-dropdown-btn"
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-medium border shadow-sm transition-all focus:outline-none"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderColor: "var(--color-border-0)",
              color: "var(--color-text-primary-0)",
            }}
          >
            <span>{activeCategory}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-slate-400 transition-transform duration-150",
                dropdownOpen && "rotate-180"
              )}
            />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setDropdownOpen(false)}
              />
              <div
                className="absolute left-0 top-full mt-1.5 z-30 w-44 rounded-xl border py-1.5 shadow-2xl backdrop-blur-md"
                style={{
                  backgroundColor: "#13243C",
                  borderColor: "var(--color-border-0)",
                }}
              >
                {PARTNER_CATEGORIES.map((cat) => {
                  const isSelected = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        onCategoryChange(cat);
                        setDropdownOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between px-3.5 py-2 text-xs font-medium transition-colors text-left",
                        isSelected
                          ? "bg-[var(--color-accent-gold)] text-[#0B1728] font-bold"
                          : "text-slate-200 hover:bg-[#1A3150] hover:text-white"
                      )}
                    >
                      <span>{cat}</span>
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Right side: Add Button ── */}
      <button
        id="add-partner-btn"
        type="button"
        onClick={onAddNewPartner}
        className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-150 hover:opacity-90 active:scale-95 shadow-md w-full sm:w-auto shrink-0"
        style={{
          backgroundColor: "var(--color-accent-gold)",
          color: "#0B1728",
        }}
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
        <span>Add Recommended Business</span>
      </button>
    </div>
  );
}
