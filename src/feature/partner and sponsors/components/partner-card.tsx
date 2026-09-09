import { useState } from "react";
import { MoreVertical, Edit3, Trash2, ExternalLink } from "lucide-react";
import type { PartnerRecord } from "../partners.data";

// ── Types ──────────────────────────────────────────────────────────────────

interface PartnerCardProps {
  partner: PartnerRecord;
  onEdit: (partner: PartnerRecord) => void;
  onDelete: (partner: PartnerRecord) => void;
}

// ── Component ──────────────────────────────────────────────────────────────

export function PartnerCard({
  partner,
  onEdit,
  onDelete,
}: PartnerCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      id={`partner-card-${partner.id}`}
      className="relative flex items-center justify-between gap-3 rounded-2xl border p-3 sm:p-4 shadow-sm transition-all hover:shadow-md hover:border-blue-500/40"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border-0)",
      }}
    >
      {/* ── Left side: Logo Box ── */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="flex h-11 w-24 sm:h-12 sm:w-28 shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-sm border border-slate-200/20 overflow-hidden">
          <img
            src={partner.logoUrl}
            alt={partner.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* ── Partner Tier / Name ── */}
        <div className="min-w-0 flex-1">
          <p
            className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2"
            style={{ color: "var(--color-text-primary-0)" }}
            title={partner.tier}
          >
            {partner.tier}
          </p>
          <span
            className="text-[11px] font-normal block truncate"
            style={{ color: "var(--color-text-muted)" }}
          >
            {partner.name}
          </span>
        </div>
      </div>

      {/* ── Right side: 3-dots Menu ── */}
      <div className="relative shrink-0">
        <button
          id={`partner-menu-btn-${partner.id}`}
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border transition-colors cursor-pointer"
          style={{
            backgroundColor: "var(--color-bg-primary-0)",
            borderColor: "var(--color-border-0)",
            color: "var(--color-text-muted)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--color-bg-card-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--color-bg-primary-0)")
          }
        >
          <MoreVertical className="h-4 w-4" strokeWidth={2} />
        </button>

        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-20"
              onClick={() => setMenuOpen(false)}
            />
            <div
              className="absolute right-0 top-full mt-1.5 z-30 w-36 rounded-xl border py-1 shadow-2xl backdrop-blur-md"
              style={{
                backgroundColor: "#13243C",
                borderColor: "var(--color-border-0)",
              }}
            >
              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-[#1A3150] hover:text-blue-400"
                  onClick={() => setMenuOpen(false)}
                >
                  <ExternalLink className="h-3.5 w-3.5 text-blue-400" />
                  Visit Link
                </a>
              )}
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-[#1A3150] hover:text-amber-400"
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(partner);
                }}
              >
                <Edit3 className="h-3.5 w-3.5 text-amber-400" />
                Edit
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-[#1A3150] hover:text-rose-400"
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(partner);
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
  );
}
