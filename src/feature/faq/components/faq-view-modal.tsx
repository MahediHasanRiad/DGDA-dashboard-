import { X, HelpCircle, CheckCircle2, Clock } from "lucide-react";
import { type FAQItem } from "../faq.data";

interface FAQViewModalProps {
  item: FAQItem | null;
  onClose: () => void;
  onEdit: (item: FAQItem) => void;
}

export function FAQViewModal({ item, onClose, onEdit }: FAQViewModalProps) {
  if (!item) return null;

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
        className="relative w-full max-w-lg rounded-2xl shadow-2xl border p-6 animate-in fade-in-50 zoom-in-95"
        style={{
          backgroundColor: "var(--color-bg-card)",
          borderColor: "var(--color-border-0)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#1C3352]/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">FAQ Details #{item.no}</h2>
              <p className="text-xs text-slate-400">DGDA Mobile Knowledge Base</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white hover:opacity-85 transition-opacity cursor-pointer"
            style={{ backgroundColor: "var(--color-accent-red)" }}
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div className="my-5 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0B1728] border border-[#1C3352]">
            <span className="text-xs font-semibold text-slate-400">Status</span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold border ${
                item.status === "ACTIVE"
                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                  : "bg-amber-500/15 text-amber-400 border-amber-500/30"
              }`}
            >
              {item.status === "ACTIVE" ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <Clock className="h-3.5 w-3.5" />
              )}
              {item.status}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B1728] border border-[#1C3352]">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Question
            </span>
            <p className="text-sm font-semibold text-white leading-relaxed">
              {item.question}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B1728] border border-[#1C3352]">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Answerer
            </span>
            <p className="text-sm text-slate-200 leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1C3352]/60">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#1C3352] bg-[#162A43] text-slate-300 text-xs font-semibold hover:bg-[#1E375B] transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onEdit(item);
            }}
            className="px-5 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1728] text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            Edit FAQ
          </button>
        </div>
      </div>
    </div>
  );
}
