import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { OfficeCard } from "./office-card";
import type { OfficeRecord } from "../offices.data";

// ── Types ──────────────────────────────────────────────────────────────────

interface OfficesGridProps {
  offices: OfficeRecord[];
  onEdit: (office: OfficeRecord) => void;
  onDelete: (office: OfficeRecord) => void;
  onViewDetails?: (office: OfficeRecord) => void;
}

const TOTAL_PAGES = 5;

// ── Grid Component ─────────────────────────────────────────────────────────

export function OfficesGrid({
  offices,
  onEdit,
  onDelete,
  onViewDetails,
}: OfficesGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-6">
      {/* 3-Column Grid */}
      {offices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {offices.map((office) => (
            <OfficeCard
              key={office.id}
              office={office}
              onEdit={onEdit}
              onDelete={onDelete}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <div
          className="rounded-2xl border p-12 text-center"
          style={{
            backgroundColor: "var(--color-bg-card)",
            borderColor: "var(--color-border-0)",
          }}
        >
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            No customs offices found matching the selected filter criteria.
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center justify-center sm:justify-end gap-1.5 pt-2">
        <button
          id="offices-prev-page-btn"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="flex h-7 w-7 items-center justify-center rounded-md transition-colors disabled:opacity-30"
          style={{ color: "var(--color-text-muted)" }}
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2} />
        </button>

        {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            id={`offices-page-${page}`}
            onClick={() => setCurrentPage(page)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-semibold transition-all"
            style={
              currentPage === page
                ? {
                    backgroundColor: "var(--color-accent-gold)",
                    color: "#0B1728",
                  }
                : {
                    backgroundColor: "transparent",
                    color: "var(--color-text-secondary)",
                  }
            }
            onMouseEnter={(e) => {
              if (currentPage !== page) e.currentTarget.style.backgroundColor = "var(--color-bg-card-hover)";
            }}
            onMouseLeave={(e) => {
              if (currentPage !== page) e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {page}
          </button>
        ))}

        <button
          id="offices-next-page-btn"
          onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
          disabled={currentPage === TOTAL_PAGES}
          className="flex h-7 w-7 items-center justify-center rounded-md transition-colors disabled:opacity-30"
          style={{ color: "var(--color-text-muted)" }}
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
