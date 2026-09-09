import { useState } from "react";
import {
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  Clock,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type DiscrepancyReport } from "../report-incorrect-data.data";
import { cn } from "@/lib/utils";

interface ReportTableProps {
  reports: DiscrepancyReport[];
  onReview: (report: DiscrepancyReport) => void;
  onToggleStatus: (report: DiscrepancyReport) => void;
  onDelete: (report: DiscrepancyReport) => void;
}

export function ReportTable({
  reports,
  onReview,
  onToggleStatus,
  onDelete,
}: ReportTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(reports.length / itemsPerPage));

  const paginatedReports = reports.slice(
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
      <div className="overflow-x-auto min-h-[440px]">
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
              <th className="py-4 px-4 min-w-[160px]">Reporting User</th>
              <th className="py-4 px-4 min-w-[180px]">Email</th>
              <th className="py-4 px-4 min-w-[140px]">Telephone</th>
              <th className="py-4 px-4 min-w-[110px]">Date</th>
              <th className="py-4 px-4 min-w-[200px]">Description</th>
              <th className="py-4 px-4 w-28 text-center">Status</th>
              <th className="py-4 px-4 w-16 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--color-border-subtle)" }}>
            {paginatedReports.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  No discrepancy reports found.
                </td>
              </tr>
            ) : (
              paginatedReports.map((report) => (
                <tr
                  key={report.id}
                  onClick={() => onReview(report)}
                  className="transition-colors hover:bg-[#142742]/70 cursor-pointer group"
                >
                  {/* Reporting User */}
                  <td className="py-4 px-4 font-medium text-sm text-slate-200 group-hover:text-white">
                    {report.reportingUser}
                  </td>

                  {/* Email */}
                  <td className="py-4 px-4 text-xs font-mono text-slate-400 truncate max-w-[180px]">
                    {report.email}
                  </td>

                  {/* Telephone */}
                  <td className="py-4 px-4 text-xs font-mono text-slate-300">
                    {report.telephone}
                  </td>

                  {/* Date */}
                  <td className="py-4 px-4 text-xs text-slate-400 font-mono">
                    {report.date}
                  </td>

                  {/* Description */}
                  <td className="py-4 px-4 text-xs text-slate-300 truncate max-w-[220px]">
                    "{report.description}..."
                  </td>

                  {/* Status Pill Badge */}
                  <td className="py-4 px-4 text-center">
                    <span
                      className={cn(
                        "inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wide border uppercase",
                        report.status === "RESOLVED"
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                      )}
                    >
                      {report.status}
                    </span>
                  </td>

                  {/* Actions Dropdown */}
                  <td
                    className="py-4 px-4 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <button
                          id={`report-action-${report.id}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1C3352] transition-colors"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-48 rounded-xl p-1 shadow-xl border bg-[#102035] border-[#1C3352] text-slate-200"
                      >
                        <DropdownMenuItem
                          onClick={() => onReview(report)}
                          className="gap-2 text-xs rounded-lg cursor-pointer py-2 hover:bg-[#1C3352] hover:text-white"
                        >
                          <Eye className="h-3.5 w-3.5 text-blue-400" />
                          <span>Review Report</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onToggleStatus(report)}
                          className="gap-2 text-xs rounded-lg cursor-pointer py-2 hover:bg-[#1C3352] hover:text-white"
                        >
                          {report.status === "RESOLVED" ? (
                            <>
                              <Clock className="h-3.5 w-3.5 text-amber-400" />
                              <span>Mark as Pending</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                              <span>Mark as Resolved</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-[#1C3352]" />
                        <DropdownMenuItem
                          onClick={() => onDelete(report)}
                          className="gap-2 text-xs rounded-lg cursor-pointer py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete Report</span>
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
