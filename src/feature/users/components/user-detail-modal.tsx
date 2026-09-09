import { X, CheckCircle, XCircle } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

export interface UserDetail {
  id: string;
  name: string;
  role: string;
  memberSince: string;
  company: string;
  nif: string;
  email: string;
  phone: string;
  completedDeclarations: number;
  status: "VERIFIED" | "PENDING";
}

interface UserDetailModalProps {
  user: UserDetail | null;
  onClose: () => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

// ── Sub-component: detail row ──────────────────────────────────────────────

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-start justify-between gap-4 py-3 border-b last:border-0"
      style={{ borderColor: "var(--color-border-0)" }}
    >
      <span
        className="text-sm shrink-0 min-w-[180px]"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {label}
      </span>
      <span
        className="text-sm font-semibold text-right"
        style={{ color: "var(--color-text-primary-0)" }}
      >
        {value}
      </span>
    </div>
  );
}

// ── Modal component ────────────────────────────────────────────────────────

export function UserDetailModal({
  user,
  onClose,
  onApprove,
  onReject,
}: UserDetailModalProps) {
  if (!user) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(11,23,40,0.8)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal card */}
      <div
        className="relative w-full max-w-lg rounded-2xl shadow-2xl border"
        style={{
          backgroundColor: "var(--color-bg-card)",
          borderColor: "var(--color-border-0)",
        }}
      >
        {/* ── Header ── */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <div>
            <h2
              className="text-xl font-bold"
              style={{ color: "var(--color-text-primary-0)" }}
            >
              {user.name}
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>
              {user.role} · Member since {user.memberSince}
            </p>
          </div>
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white transition-opacity hover:opacity-80"
            style={{ backgroundColor: "var(--color-accent-red)" }}
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* ── Body ── */}
        <div
          className="mx-6 rounded-xl px-4 py-1 mb-4 border"
          style={{
            backgroundColor: "var(--color-bg-primary-0)",
            borderColor: "var(--color-border-subtle)",
          }}
        >
          <DetailRow label="Corporate Entity:" value={user.company} />
          <DetailRow label="Official Tax ID (NIF):" value={user.nif} />
          <DetailRow label="Email Address:" value={user.email} />
          <DetailRow label="Telephone:" value={user.phone} />
          <DetailRow
            label="Completed Declarations:"
            value={`${user.completedDeclarations} processed`}
          />
        </div>

        {/* ── Footer ── */}
        <div
          className="flex items-center justify-end gap-3 px-6 py-4 border-t rounded-b-2xl"
          style={{
            borderColor: "var(--color-border-0)",
            backgroundColor: "var(--color-bg-primary-0)",
          }}
        >
          <button
            id="modal-reject-btn"
            onClick={() => { onReject?.(user.id); onClose(); }}
            className="flex items-center gap-1.5 rounded-lg border px-5 py-2 text-sm font-semibold transition-all hover:opacity-80"
            style={{
              borderColor: "var(--color-accent-red-border)",
              backgroundColor: "var(--color-accent-red-bg)",
              color: "var(--color-accent-red)",
            }}
          >
            <XCircle className="h-4 w-4" strokeWidth={2} />
            Reject
          </button>
          <button
            id="modal-approve-btn"
            onClick={() => { onApprove?.(user.id); onClose(); }}
            className="flex items-center gap-1.5 rounded-lg px-5 py-2 text-sm font-semibold transition-all hover:opacity-90 shadow-sm"
            style={{ backgroundColor: "var(--color-accent-gold)", color: "#0B1728" }}
          >
            <CheckCircle className="h-4 w-4" strokeWidth={2} />
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
