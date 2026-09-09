import { useState } from "react";
import {
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit2,
  Trash2,
  Sparkles,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type QAItem, getCategoryBadgeStyle } from "../ai-knowledge-trainer.data";
import { cn } from "@/lib/utils";

interface AIQATableProps {
  items: QAItem[];
  onView: (item: QAItem) => void;
  onEdit: (item: QAItem) => void;
  onDelete: (item: QAItem) => void;
  onRetrain?: (item: QAItem) => void;
}

export function AIQATable({
  items,
  onView,
  onEdit,
  onDelete,
  onRetrain,
}: AIQATableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  // Current page slice
  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      className="rounded-2xl border overflow-hidden shadow-lg flex flex-col"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border-0)",
      }}
    >
      {/* Table Container */}
      <div className="overflow-x-auto min-h-[360px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className="border-b text-xs font-semibold tracking-wider uppercase select-none"
              style={{
                borderColor: "var(--color-border-0)",
                backgroundColor: "var(--color-bg-surface)",
                color: "var(--color-text-muted)",
              }}
            >
              <th className="py-4 px-4 w-16 text-center">Status</th>
              <th className="py-4 px-4 min-w-[260px]">Customs Question</th>
              <th className="py-4 px-4 min-w-[180px]">Category</th>
              <th className="py-4 px-4 min-w-[280px]">Official Answer & Legal...</th>
              <th className="py-4 px-4 w-28 text-center">Confidence</th>
              <th className="py-4 px-4 w-20 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--color-border-subtle)" }}>
            {paginatedItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  No Q&A training pairs found in the model database.
                </td>
              </tr>
            ) : (
              paginatedItems.map((item) => {
                const badgeStyle = getCategoryBadgeStyle(item.category);

                return (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-[#142742]/70 group"
                  >
                    {/* Status Column */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                        </span>
                      </div>
                    </td>

                    {/* Customs Question */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span
                          className="text-sm font-medium leading-snug line-clamp-2"
                          style={{ color: "var(--color-text-primary-0)" }}
                          title={item.question}
                        >
                          {item.question}
                        </span>
                        {item.legalReference && (
                          <span className="text-[11px] text-slate-400 mt-1 font-mono">
                            Ref: {item.legalReference}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border"
                        style={{
                          backgroundColor: badgeStyle.bg,
                          color: badgeStyle.text,
                          borderColor: badgeStyle.border,
                        }}
                      >
                        {item.category}
                      </span>
                    </td>

                    {/* Official Answer & Legal */}
                    <td className="py-4 px-4">
                      <p
                        className="text-xs text-slate-300 line-clamp-2 leading-relaxed max-w-md"
                        title={item.officialAnswer}
                      >
                        {item.officialAnswer}
                      </p>
                    </td>

                    {/* Confidence */}
                    <td className="py-4 px-4 text-center">
                      <span
                        className="inline-block text-xs font-semibold px-2 py-1 rounded bg-[#0B1728] border border-[#1C3352]"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {item.confidence}%
                      </span>
                    </td>

                    {/* Actions Menu */}
                    <td className="py-4 px-4 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <button
                            id={`actions-menu-${item.id}`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1C3352] transition-colors"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-44 rounded-xl p-1 shadow-xl border bg-[#102035] border-[#1C3352] text-slate-200"
                        >
                          <DropdownMenuItem
                            onClick={() => onView(item)}
                            className="gap-2 text-xs rounded-lg cursor-pointer py-2 hover:bg-[#1C3352] hover:text-white"
                          >
                            <Eye className="h-3.5 w-3.5 text-blue-400" />
                            <span>View Full Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onEdit(item)}
                            className="gap-2 text-xs rounded-lg cursor-pointer py-2 hover:bg-[#1C3352] hover:text-white"
                          >
                            <Edit2 className="h-3.5 w-3.5 text-amber-400" />
                            <span>Edit Q&A Pair</span>
                          </DropdownMenuItem>
                          {onRetrain && (
                            <DropdownMenuItem
                              onClick={() => onRetrain(item)}
                              className="gap-2 text-xs rounded-lg cursor-pointer py-2 hover:bg-[#1C3352] hover:text-white"
                            >
                              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                              <span>Re-calibrate Model</span>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator className="bg-[#1C3352]" />
                          <DropdownMenuItem
                            onClick={() => onDelete(item)}
                            className="gap-2 text-xs rounded-lg cursor-pointer py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete from Model</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div
        className="flex items-center justify-end px-6 py-4 border-t gap-1.5"
        style={{
          borderColor: "var(--color-border-0)",
          backgroundColor: "var(--color-bg-card)",
        }}
      >
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#142742] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page numbers */}
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={cn(
              "h-7 w-7 rounded-lg text-xs font-semibold transition-all flex items-center justify-center",
              currentPage === pageNum
                ? "bg-[#F59E0B] text-[#0B1728] font-bold shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-[#142742]"
            )}
          >
            {pageNum}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#142742] transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
