import { useState } from "react";
import { Pagination } from "@/shared/pagination";
import { PartnerCard } from "./partner-card";
import type { PartnerRecord } from "../partners.data";

// ── Types ──────────────────────────────────────────────────────────────────

interface PartnersGridProps {
  partners: PartnerRecord[];
  onEdit: (partner: PartnerRecord) => void;
  onDelete: (partner: PartnerRecord) => void;
}

const TOTAL_PAGES = 5;

// ── Component ──────────────────────────────────────────────────────────────

export function PartnersGrid({
  partners,
  onEdit,
  onDelete,
}: PartnersGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-6">
      {/* 4-Column Responsive Grid */}
      {partners.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {partners.map((partner) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              onEdit={onEdit}
              onDelete={onDelete}
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
            No recommended businesses or advertisers found for this category.
          </p>
        </div>
      )}

      {/* Shared Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={setCurrentPage}
        align="end"
      />
    </div>
  );
}
