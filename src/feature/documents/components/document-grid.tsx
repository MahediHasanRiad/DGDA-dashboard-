import { useState } from "react";
import { Pagination } from "@/shared/pagination";
import { DocumentCard } from "./document-card";
import type { DocumentRecord } from "../documents.data";

// ── Types ──────────────────────────────────────────────────────────────────

interface DocumentGridProps {
  documents: DocumentRecord[];
  onEdit: (doc: DocumentRecord) => void;
  onDelete: (doc: DocumentRecord) => void;
  onPreview?: (doc: DocumentRecord) => void;
}

const TOTAL_PAGES = 5;

// ── Grid Component ─────────────────────────────────────────────────────────

export function DocumentGrid({
  documents,
  onEdit,
  onDelete,
  onPreview,
}: DocumentGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-6">
      {/* 3-Column Responsive Grid */}
      {documents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onEdit={onEdit}
              onDelete={onDelete}
              onPreview={onPreview}
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
            No customs publications or documents found for this category.
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={setCurrentPage}
        align="end"
      />
    </div>
  );
}
