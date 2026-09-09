import { useState, useEffect } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { type DiscrepancyReport } from "../report-incorrect-data.data";

interface ReportReviewModalProps {
  isOpen: boolean;
  report: DiscrepancyReport | null;
  onClose: () => void;
  onResolve: (reportId: string, notes: string) => void;
}

export function ReportReviewModal({
  isOpen,
  report,
  onClose,
  onResolve,
}: ReportReviewModalProps) {
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    if (report) {
      setAdminNotes(report.adminNotes || "");
    } else {
      setAdminNotes("");
    }
  }, [report, isOpen]);

  if (!isOpen || !report) return null;

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onResolve(report.id, adminNotes.trim());
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(11, 23, 40, 0.82)",
        backdropFilter: "blur(6px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl shadow-2xl border p-6 sm:p-7 animate-in fade-in-50 zoom-in-95 duration-200"
        style={{
          backgroundColor: "var(--color-bg-card)",
          borderColor: "var(--color-border-0)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-[#1C3352]/60">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {report.reportCode}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Review Discrepancy Report
            </p>
          </div>

          {/* Close button (Red rounded square) */}
          <button
            id="close-report-modal-btn"
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white transition-opacity hover:opacity-85 shadow-sm"
            style={{ backgroundColor: "var(--color-accent-red)" }}
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleResolveSubmit} className="mt-5 space-y-4">
          {/* Metadata Grid */}
          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-400 font-medium">Reporting User:</span>
              <span className="text-slate-100 font-semibold">{report.reportingUser}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-400 font-medium">Email:</span>
              <span className="text-slate-100 font-mono text-xs">{report.email}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-400 font-medium">Telephone:</span>
              <span className="text-slate-100 font-mono text-xs">{report.telephone}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-400 font-medium">Submission Date:</span>
              <span className="text-slate-100 font-mono text-xs">{report.date}</span>
            </div>
          </div>

          {/* Description Block */}
          <div className="space-y-1.5 pt-2">
            <label className="block text-xs font-semibold text-slate-300">
              Description
            </label>
            <div className="rounded-xl p-3.5 text-xs sm:text-sm text-slate-200 bg-[#0B1728] border border-[#1C3352] leading-relaxed shadow-inner">
              {report.detailedDescription || report.description}
            </div>
          </div>

          {/* Admin Resolution & Audit Notes */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-semibold text-slate-300">
              Admin Resolution & Audit Notes
            </label>
            <textarea
              rows={3}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Provide resolution tactics, tariff rectification or database correction details..."
              className="w-full rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 bg-[#0B1728] border border-[#1C3352] focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none shadow-inner leading-relaxed"
            />
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1C3352]/60 mt-6">
            <button
              id="cancel-report-modal-btn"
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#1C3352] bg-[#162A43] hover:bg-[#1E375B] text-slate-300 text-xs sm:text-sm font-semibold transition-all hover:text-white"
            >
              Cancel
            </button>

            <button
              id="resolve-report-modal-btn"
              type="submit"
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1728] text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95"
            >
              <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
              <span>Resolve Discrepancy</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
