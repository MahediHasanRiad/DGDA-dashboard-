import { useState } from "react";
import { Download, MoreVertical, Eye, Edit3, Trash2 } from "lucide-react";
import type { DocumentRecord } from "../documents.data";

// ── Types ──────────────────────────────────────────────────────────────────

interface DocumentCardProps {
  document: DocumentRecord;
  onEdit: (doc: DocumentRecord) => void;
  onDelete: (doc: DocumentRecord) => void;
  onPreview?: (doc: DocumentRecord) => void;
}

// ── Card Component ─────────────────────────────────────────────────────────

export function DocumentCard({
  document,
  onEdit,
  onDelete,
  onPreview,
}: DocumentCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDownload = () => {
    // Simulated PDF download trigger
    const blob = new Blob([`DGDA Official Document: ${document.title}`], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${document.title.toLowerCase().replace(/\s+/g, "-")}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      id={`document-card-${document.id}`}
      className="relative flex flex-col justify-between rounded-2xl border p-4 sm:p-5 shadow-sm transition-all hover:shadow-md hover:border-blue-500/40"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border-0)",
      }}
    >
      {/* ── Top Info Row ── */}
      <div className="flex items-start sm:items-center gap-3 sm:gap-3.5 mb-3.5 sm:mb-4">
        {/* Thumbnail Image */}
        <div className="shrink-0">
          <img
            src={document.thumbnail}
            alt={document.title}
            className="h-12 w-14 sm:h-12 sm:w-16 rounded-xl object-cover border shadow-sm"
            style={{ borderColor: "var(--color-border-0)" }}
          />
        </div>

        {/* Title and Metadata */}
        <div className="min-w-0 flex-1">
          <h3
            className="text-xs sm:text-sm font-bold leading-snug line-clamp-2"
            style={{ color: "var(--color-text-primary-0)" }}
            title={document.title}
          >
            {document.title}
          </h3>
          <div
            className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 text-[11px] font-normal"
            style={{ color: "var(--color-text-muted)" }}
          >
            <span>{document.format}</span>
            <span>•</span>
            <span>{document.size}</span>
            <span>•</span>
            <span>{document.date}</span>
          </div>
        </div>
      </div>

      {/* ── Bottom Action Row ── */}
      <div className="flex items-center gap-2 pt-2 border-t" style={{ borderColor: "var(--color-border-subtle)" }}>
        {/* Download PDF Button */}
        <button
          id={`download-btn-${document.id}`}
          onClick={handleDownload}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-bold shadow-sm transition-all hover:opacity-90 active:scale-95"
          style={{
            backgroundColor: "var(--color-accent-gold)",
            color: "#0B1728",
          }}
        >
          <Download className="h-3.5 w-3.5" strokeWidth={2.2} />
          <span>Download Pdf</span>
        </button>

        {/* 3-dots Menu Button */}
        <div className="relative">
          <button
            id={`doc-menu-btn-${document.id}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border transition-colors"
            style={{
              backgroundColor: "var(--color-bg-primary-0)",
              borderColor: "var(--color-border-0)",
              color: "var(--color-text-muted)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-bg-card-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-bg-primary-0)")}
          >
            <MoreVertical className="h-4 w-4" strokeWidth={2} />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} />
              <div
                className="absolute right-0 bottom-full mb-1 z-30 w-32 rounded-xl border py-1 shadow-2xl backdrop-blur-md"
                style={{
                  backgroundColor: "#13243C",
                  borderColor: "var(--color-border-0)",
                }}
              >
                <button
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-[#1A3150] hover:text-white"
                  onClick={() => {
                    setMenuOpen(false);
                    if (onPreview) {
                      onPreview(document);
                    } else {
                      handleDownload();
                    }
                  }}
                >
                  <Eye className="h-3.5 w-3.5 text-blue-400" />
                  Preview
                </button>
                <button
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-[#1A3150] hover:text-amber-400"
                  onClick={() => {
                    setMenuOpen(false);
                    onEdit(document);
                  }}
                >
                  <Edit3 className="h-3.5 w-3.5 text-amber-400" />
                  Edit
                </button>
                <button
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-[#1A3150] hover:text-rose-400"
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete(document);
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5 text-rose-400" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
