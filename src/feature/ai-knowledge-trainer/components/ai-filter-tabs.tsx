import { Plus, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabType = "custom-qa" | "regulatory-docs";

interface AIFilterTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  qaCount: number;
  docsCount: number;
  onOpenAddModal: () => void;
  onOpenTestConsole: () => void;
}

export function AIFilterTabs({
  activeTab,
  onTabChange,
  qaCount,
  docsCount,
  onOpenAddModal,
  onOpenTestConsole,
}: AIFilterTabsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
      {/* Left: Tab Switcher */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Tab: Custom Q&A Database */}
        <button
          onClick={() => onTabChange("custom-qa")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 shadow-sm",
            activeTab === "custom-qa"
              ? "bg-[#F59E0B] text-[#0B1728] shadow-amber-500/10 font-bold"
              : "bg-[#102035] text-slate-300 border border-[#1C3352] hover:bg-[#142742] hover:text-white"
          )}
        >
          <span>Custom Q&A Database</span>
          <span
            className={cn(
              "px-1.5 py-0.5 rounded-full text-[11px] font-bold",
              activeTab === "custom-qa"
                ? "bg-[#0B1728]/20 text-[#0B1728]"
                : "bg-slate-800 text-slate-300"
            )}
          >
            ({qaCount})
          </span>
        </button>

        {/* Tab: FAQ Regulatory Documents */}
        <button
          onClick={() => onTabChange("regulatory-docs")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 shadow-sm",
            activeTab === "regulatory-docs"
              ? "bg-[#F59E0B] text-[#0B1728] shadow-amber-500/10 font-bold"
              : "bg-[#102035] text-slate-300 border border-[#1C3352] hover:bg-[#142742] hover:text-white"
          )}
        >
          <span>FAQ Regulatory Documents</span>
          <span
            className={cn(
              "px-1.5 py-0.5 rounded-full text-[11px] font-bold",
              activeTab === "regulatory-docs"
                ? "bg-[#0B1728]/20 text-[#0B1728]"
                : "bg-slate-800 text-slate-300"
            )}
          >
            ({docsCount})
          </span>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
        {/* Test Agent AI Console */}
        <button
          onClick={onOpenTestConsole}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 border border-[#1C3352] bg-[#102035] text-slate-200 hover:bg-[#142742] hover:text-white hover:border-blue-500/40"
          title="Test Agent AI Console (Ctrl+K)"
        >
          <Bot className="h-4 w-4 text-blue-400 shrink-0" />
          <span>Test Agent AI Console</span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#0B1728] text-[10px] font-mono text-slate-400 border border-[#1C3352]">
            Ctrl+K
          </kbd>
        </button>

        {/* Add Custom Q&A Button */}
        <button
          id="add-custom-qa-btn"
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-150 bg-[#F59E0B] text-[#0B1728] hover:bg-[#D97706] shadow-sm active:scale-95 shrink-0"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Add Custom Q&A</span>
        </button>
      </div>
    </div>
  );
}
