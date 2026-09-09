import { useState, useMemo } from "react";
import { toast } from "sonner";
import { ReportHeroBanner } from "./components/report-hero-banner";
import { ReportFilterBar, type ReportStatusFilter } from "./components/report-filter-bar";
import { ReportTable } from "./components/report-table";
import { ReportReviewModal } from "./components/report-review-modal";
import {
  INITIAL_DISCREPANCY_REPORTS,
  type DiscrepancyReport,
} from "./report-incorrect-data.data";

export default function ReportIncorrectDataPage() {
  const [reports, setReports] = useState<DiscrepancyReport[]>(
    INITIAL_DISCREPANCY_REPORTS
  );
  const [statusFilter, setStatusFilter] = useState<ReportStatusFilter>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<DiscrepancyReport | null>(
    null
  );
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Status counts
  const totalCount = reports.length;
  const resolvedCount = reports.filter((r) => r.status === "RESOLVED").length;
  const pendingCount = reports.filter((r) => r.status === "PENDING").length;

  // Filtered reports
  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      // Status match
      if (statusFilter !== "ALL" && report.status !== statusFilter) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesUser = report.reportingUser.toLowerCase().includes(q);
        const matchesEmail = report.email.toLowerCase().includes(q);
        const matchesCode = report.reportCode.toLowerCase().includes(q);
        const matchesDesc = report.description.toLowerCase().includes(q);
        return matchesUser || matchesEmail || matchesCode || matchesDesc;
      }
      return true;
    });
  }, [reports, statusFilter, searchQuery]);

  // Open modal for review
  const handleReview = (report: DiscrepancyReport) => {
    setSelectedReport(report);
    setIsReviewModalOpen(true);
  };

  // Toggle status directly from table menu
  const handleToggleStatus = (report: DiscrepancyReport) => {
    const nextStatus = report.status === "RESOLVED" ? "PENDING" : "RESOLVED";
    setReports((prev) =>
      prev.map((r) => (r.id === report.id ? { ...r, status: nextStatus } : r))
    );
    toast.success(
      `Report ${report.reportCode} marked as ${nextStatus.toLowerCase()}`
    );
  };

  // Resolve discrepancy with audit notes
  const handleResolve = (reportId: string, notes: string) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status: "RESOLVED",
              adminNotes: notes || r.adminNotes,
            }
          : r
      )
    );
    toast.success("Discrepancy report successfully resolved and logged");
  };

  // Delete report
  const handleDelete = (report: DiscrepancyReport) => {
    setReports((prev) => prev.filter((r) => r.id !== report.id));
    toast.success(`Report ${report.reportCode} deleted`);
  };

  return (
    <div
      className="min-h-full p-4 sm:p-6 space-y-5"
      style={{ backgroundColor: "var(--color-bg-primary-0)" }}
    >
      {/* 1. Hero Banner */}
      <ReportHeroBanner />

      {/* 2. Status Filter & Search Bar */}
      <ReportFilterBar
        activeStatus={statusFilter}
        onStatusChange={setStatusFilter}
        totalCount={totalCount}
        resolvedCount={resolvedCount}
        pendingCount={pendingCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 3. Main Discrepancy Reports Table */}
      <ReportTable
        reports={filteredReports}
        onReview={handleReview}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
      />

      {/* 4. Review & Resolve Modal */}
      <ReportReviewModal
        isOpen={isReviewModalOpen}
        report={selectedReport}
        onClose={() => {
          setIsReviewModalOpen(false);
          setSelectedReport(null);
        }}
        onResolve={handleResolve}
      />
    </div>
  );
}
