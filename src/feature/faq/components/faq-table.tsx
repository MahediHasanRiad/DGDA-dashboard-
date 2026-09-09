import { useState } from "react";
import { Plus, MoreVertical, ChevronLeft, ChevronRight, Eye, Edit2, Trash2, CheckCircle2, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type FAQItem } from "../faq.data";
import { cn } from "@/lib/utils";

interface FAQTableProps {
  items: FAQItem[];
  onAdd: () => void;
  onView: (item: FAQItem) => void;
  onEdit: (item: FAQItem) => void;
  onToggleStatus: (item: FAQItem) => void;
  onDelete: (item: FAQItem) => void;
}

export function FAQTable({
  items,
  onAdd,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}: FAQTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 11;
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

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
      {/* Top Header Row of Card */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C3352]/60">
        <h2 className="text-lg font-bold text-white tracking-wide">
          FAQ
        </h2>

        <button
          id="add-faq-btn"
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1728] text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Add</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto min-h-[420px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className="border-b text-xs font-semibold tracking-wider select-none"
              style={{
                borderColor: "var(--color-border-0)",
                backgroundColor: "var(--color-bg-surface)",
                color: "var(--color-text-muted)",
              }}
            >
              <th className="py-4 px-6 w-16 text-center">NO</th>
              <th className="py-4 px-4 min-w-[260px]">Questions</th>
              <th className="py-4 px-4 min-w-[280px]">Answerer</th>
              <th className="py-4 px-4 w-28 text-center">Status</th>
              <th className="py-4 px-4 w-20 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--color-border-subtle)" }}>
            {paginatedItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400">
                  No FAQ records found. Click "+ Add" to create one.
                </td>
              </tr>
            ) : (
              paginatedItems.map((item, idx) => (
                <tr
                  key={item.id}
                  onClick={() => onView(item)}
                  className="transition-colors hover:bg-[#142742]/70 cursor-pointer group"
                >
                  {/* NO */}
                  <td className="py-4 px-6 text-center text-xs font-medium text-slate-400">
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </td>

                  {/* Question */}
                  <td className="py-4 px-4">
                    <span
                      className="text-xs sm:text-sm font-medium leading-snug line-clamp-2"
                      style={{ color: "var(--color-text-primary-0)" }}
                      title={item.question}
                    >
                      {item.question}
                    </span>
                  </td>

                  {/* Answerer / Answer */}
                  <td className="py-4 px-4">
                    <span
                      className="text-xs text-slate-300 line-clamp-1 leading-relaxed max-w-md"
                      title={item.answer}
                    >
                      {item.answer}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 text-center">
                    <span
                      className={cn(
                        "inline-flex items-center px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider border uppercase",
                        item.status === "ACTIVE"
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                      )}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td
                    className="py-4 px-4 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <button
                          id={`faq-action-${item.id}`}
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
                          <span>View FAQ</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onEdit(item)}
                          className="gap-2 text-xs rounded-lg cursor-pointer py-2 hover:bg-[#1C3352] hover:text-white"
                        >
                          <Edit2 className="h-3.5 w-3.5 text-amber-400" />
                          <span>Edit FAQ</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onToggleStatus(item)}
                          className="gap-2 text-xs rounded-lg cursor-pointer py-2 hover:bg-[#1C3352] hover:text-white"
                        >
                          {item.status === "ACTIVE" ? (
                            <>
                              <Clock className="h-3.5 w-3.5 text-amber-400" />
                              <span>Set Inactive</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                              <span>Set Active</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-[#1C3352]" />
                        <DropdownMenuItem
                          onClick={() => onDelete(item)}
                          className="gap-2 text-xs rounded-lg cursor-pointer py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div
        className="flex items-center justify-end px-6 py-4 border-t gap-1.5"
        style={{
          borderColor: "var(--color-border-0)",
          backgroundColor: "var(--color-bg-card)",
        }}
      >
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#142742] transition-colors cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={cn(
              "h-7 w-7 rounded-lg text-xs font-semibold transition-all flex items-center justify-center cursor-pointer",
              currentPage === pageNum
                ? "bg-[#F59E0B] text-[#0B1728] font-bold shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-[#142742]"
            )}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#142742] transition-colors cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
