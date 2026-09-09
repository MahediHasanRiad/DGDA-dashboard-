import { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  MoreVertical,
  Edit3,
  Trash2,
  Info,
} from "lucide-react";
import type { OfficeRecord } from "../offices.data";

// ── Types ──────────────────────────────────────────────────────────────────

interface OfficeCardProps {
  office: OfficeRecord;
  onEdit: (office: OfficeRecord) => void;
  onDelete: (office: OfficeRecord) => void;
  onViewDetails?: (office: OfficeRecord) => void;
}

// ── Card Component ─────────────────────────────────────────────────────────

export function OfficeCard({
  office,
  onEdit,
  onDelete,
  onViewDetails,
}: OfficeCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isOpen = office.status === "OPEN";

  return (
    <div
      id={`office-card-${office.id}`}
      className="relative flex flex-col justify-between rounded-2xl border p-5 shadow-sm transition-all hover:shadow-md hover:border-blue-500/40"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border-0)",
      }}
    >
      {/* ── Top Badges Row ── */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-xs font-bold tracking-wide"
            style={{ color: "var(--color-accent-gold)" }}
          >
            {office.codeBadge}
          </span>
          <span
            className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider border"
            style={
              isOpen
                ? {
                    backgroundColor: "rgba(34, 197, 94, 0.12)",
                    borderColor: "rgba(34, 197, 94, 0.35)",
                    color: "var(--color-accent-green)",
                  }
                : {
                    backgroundColor: "rgba(239, 68, 68, 0.12)",
                    borderColor: "rgba(239, 68, 68, 0.35)",
                    color: "var(--color-accent-red)",
                  }
            }
          >
            {office.status}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-3.5">
          <h3
            className="text-base font-bold leading-snug"
            style={{ color: "var(--color-text-primary-0)" }}
          >
            {office.name}
          </h3>
          <p
            className="text-[11px] font-medium"
            style={{ color: "var(--color-text-muted)" }}
          >
            {office.type}
          </p>
        </div>

        {/* Info Rows with Icons */}
        <div className="space-y-1.5 mb-3.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500/15 text-rose-400">
              <MapPin className="h-2.5 w-2.5" strokeWidth={2.5} />
            </span>
            <span style={{ color: "var(--color-text-secondary)" }}>
              {office.customsOffice}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/15 text-amber-400">
              <Clock className="h-2.5 w-2.5" strokeWidth={2.5} />
            </span>
            <span style={{ color: "var(--color-text-secondary)" }}>
              {office.corridorHours}
            </span>
          </div>
        </div>

        {/* Structured Location & Authority Details */}
        <div
          className="space-y-0.5 text-[11px] mb-4"
          style={{ color: "var(--color-text-muted)" }}
        >
          <p className="font-mono text-[10px] text-slate-400">{office.stationCode}</p>
          <p style={{ color: "var(--color-text-secondary)" }}>{office.region}</p>
          <p className="italic text-slate-400">{office.authority}</p>
          <p className="text-[10px] leading-tight text-slate-400 mt-1">
            {office.juxtaposedPost}
          </p>
        </div>

        {/* Capability Tags */}
        <div className="flex flex-wrap gap-1 mb-5">
          {office.tags.map((tag) => (
            <span
              key={tag}
              className="rounded px-2 py-0.5 text-[9px] font-medium border"
              style={{
                backgroundColor: "#0B1728",
                borderColor: "var(--color-border-subtle)",
                color: "var(--color-text-secondary)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Bottom Action Row ── */}
      <div className="flex items-center gap-2 pt-2 border-t" style={{ borderColor: "var(--color-border-subtle)" }}>
        {/* Phone Button */}
        <a
          href={`tel:${office.phone}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold shadow-sm transition-all hover:opacity-90 active:scale-95"
          style={{
            backgroundColor: "var(--color-accent-gold)",
            color: "#0B1728",
          }}
        >
          <Phone className="h-3.5 w-3.5" fill="#0B1728" strokeWidth={1.5} />
          <span>{office.phone}</span>
        </a>

        {/* 3-dots Menu Button */}
        <div className="relative">
          <button
            id={`office-menu-btn-${office.id}`}
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
                {onViewDetails && (
                  <button
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-[#1A3150] hover:text-white"
                    onClick={() => {
                      setMenuOpen(false);
                      onViewDetails(office);
                    }}
                  >
                    <Info className="h-3.5 w-3.5 text-blue-400" />
                    Details
                  </button>
                )}
                <button
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-[#1A3150] hover:text-amber-400"
                  onClick={() => {
                    setMenuOpen(false);
                    onEdit(office);
                  }}
                >
                  <Edit3 className="h-3.5 w-3.5 text-amber-400" />
                  Edit
                </button>
                <button
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-[#1A3150] hover:text-rose-400"
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete(office);
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
