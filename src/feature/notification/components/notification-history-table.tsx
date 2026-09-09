import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye, Trash2, Send } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type PushNotification } from "../notification.data";
import { cn } from "@/lib/utils";

interface NotificationHistoryTableProps {
  notifications: PushNotification[];
  onView: (item: PushNotification) => void;
  onResend?: (item: PushNotification) => void;
  onDelete?: (item: PushNotification) => void;
}

export function NotificationHistoryTable({
  notifications,
  onView,
  onResend,
  onDelete,
}: NotificationHistoryTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(notifications.length / itemsPerPage));

  const paginatedItems = notifications.slice(
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
      <div className="overflow-x-auto min-h-[320px]">
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
              <th className="py-4 px-4 min-w-[240px]">Notification Title & S...</th>
              <th className="py-4 px-4 min-w-[140px]">Target Audience</th>
              <th className="py-4 px-4 min-w-[150px]">Type</th>
              <th className="py-4 px-4 min-w-[140px]">Sent At</th>
              <th className="py-4 px-4 min-w-[130px]">Audience Reach</th>
              <th className="py-4 px-4 min-w-[100px]">Open Rate</th>
              <th className="py-4 px-4 w-28 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--color-border-subtle)" }}>
            {paginatedItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  No broadcast push notifications logged.
                </td>
              </tr>
            ) : (
              paginatedItems.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onView(item)}
                  className="transition-colors hover:bg-[#142742]/70 cursor-pointer group"
                >
                  {/* Title & Subtitle */}
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span
                        className="text-sm font-semibold truncate max-w-[260px]"
                        style={{ color: "var(--color-text-primary-0)" }}
                      >
                        {item.title}
                      </span>
                      <span className="text-xs text-slate-400 truncate max-w-[260px] mt-0.5">
                        {item.subtitle}
                      </span>
                    </div>
                  </td>

                  {/* Target Audience */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 border border-teal-500/25">
                      {item.targetAudience}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="py-4 px-4 text-xs font-medium text-slate-200">
                    {item.category}
                  </td>

                  {/* Sent At */}
                  <td className="py-4 px-4 text-xs font-mono text-slate-400">
                    {item.sentAt}
                  </td>

                  {/* Audience Reach */}
                  <td className="py-4 px-4 text-xs text-slate-300 font-medium">
                    {item.audienceReach}
                  </td>

                  {/* Open Rate */}
                  <td className="py-4 px-4 text-xs text-slate-300 font-mono">
                    {item.openRate}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-semibold border capitalize",
                          item.status === "delivered"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                            : item.status === "broadcasting"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/25"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/25"
                        )}
                      >
                        {item.status === "broadcasting" && (
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                        )}
                        {item.status}
                      </span>

                      {/* Dropdown Menu */}
                      <div onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <button
                              id={`notif-opt-${item.id}`}
                              className="p-1 rounded text-slate-500 hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              •••
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-40 rounded-xl p-1 shadow-xl border bg-[#102035] border-[#1C3352] text-slate-200"
                          >
                            <DropdownMenuItem
                              onClick={() => onView(item)}
                              className="gap-2 text-xs rounded-lg cursor-pointer py-2 hover:bg-[#1C3352]"
                            >
                              <Eye className="h-3.5 w-3.5 text-blue-400" />
                              <span>View Payload</span>
                            </DropdownMenuItem>
                            {onResend && (
                              <DropdownMenuItem
                                onClick={() => onResend(item)}
                                className="gap-2 text-xs rounded-lg cursor-pointer py-2 hover:bg-[#1C3352]"
                              >
                                <Send className="h-3.5 w-3.5 text-amber-400" />
                                <span>Re-broadcast</span>
                              </DropdownMenuItem>
                            )}
                            {onDelete && (
                              <>
                                <DropdownMenuSeparator className="bg-[#1C3352]" />
                                <DropdownMenuItem
                                  onClick={() => onDelete(item)}
                                  className="gap-2 text-xs rounded-lg cursor-pointer py-2 text-red-400 hover:bg-red-500/10"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  <span>Delete Log</span>
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
          className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#142742] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

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
