import { Trash2, X } from "lucide-react";
import type { NewsArticle } from "../news-press.data";

// ── Types ──────────────────────────────────────────────────────────────────

interface DeleteConfirmModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

// ── Modal Component ────────────────────────────────────────────────────────

export function DeleteConfirmModal({
  article,
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen || !article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(11,23,40,0.85)", backdropFilter: "blur(4px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border shadow-2xl p-6 space-y-4"
        style={{
          backgroundColor: "var(--color-bg-card)",
          borderColor: "var(--color-border-0)",
        }}
      >
        <div className="flex items-start justify-between">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl border"
            style={{
              backgroundColor: "var(--color-accent-red-bg)",
              borderColor: "var(--color-accent-red-border)",
              color: "var(--color-accent-red)",
            }}
          >
            <Trash2 className="h-5 w-5" strokeWidth={2} />
          </div>
          <button
            id="delete-modal-close-btn"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:text-white transition-colors"
            style={{ backgroundColor: "var(--color-bg-primary-0)" }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div>
          <h3
            className="text-base font-bold"
            style={{ color: "var(--color-text-primary-0)" }}
          >
            Delete Article?
          </h3>
          <p
            className="text-xs mt-1 leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Are you sure you want to delete <span className="font-semibold text-white">"{article.title}"</span>? This action cannot be undone.
          </p>
        </div>

        <div
          className="flex items-center justify-end gap-3 pt-3 border-t"
          style={{ borderColor: "var(--color-border-0)" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-xs font-semibold transition-colors hover:bg-slate-800"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Cancel
          </button>
          <button
            id="confirm-delete-btn"
            type="button"
            onClick={() => {
              onConfirm(article.id);
              onClose();
            }}
            className="rounded-xl px-4 py-2 text-xs font-semibold shadow-md transition-all hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: "var(--color-accent-red)",
              color: "#FFFFFF",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
