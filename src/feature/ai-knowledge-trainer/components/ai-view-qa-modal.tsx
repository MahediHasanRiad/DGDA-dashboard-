import { X, Sparkles, BookOpen, ShieldCheck, Tag } from "lucide-react";
import { type QAItem, getCategoryBadgeStyle } from "../ai-knowledge-trainer.data";

interface AIViewQAModalProps {
  item: QAItem | null;
  onClose: () => void;
  onEdit: (item: QAItem) => void;
}

export function AIViewQAModal({ item, onClose, onEdit }: AIViewQAModalProps) {
  if (!item) return null;

  const badgeStyle = getCategoryBadgeStyle(item.category);

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
        className="relative w-full max-w-xl rounded-2xl shadow-2xl border p-6 animate-in fade-in-50 zoom-in-95"
        style={{
          backgroundColor: "var(--color-bg-card)",
          borderColor: "var(--color-border-0)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#1C3352]/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Q&A Model Calibration Details</h2>
              <p className="text-xs text-slate-400">DGDA Mobile Agent Knowledge Pair</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white hover:opacity-85 transition-opacity"
            style={{ backgroundColor: "var(--color-accent-red)" }}
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div className="my-5 space-y-4">
          {/* Question */}
          <div className="p-3.5 rounded-xl bg-[#0B1728] border border-[#1C3352]">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Customs Procedure Question
            </span>
            <p className="text-sm font-medium text-white leading-relaxed">
              {item.question}
            </p>
          </div>

          {/* Metadata Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[#0B1728] border border-[#1C3352]">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-blue-400" />
                Category
              </span>
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                style={{
                  backgroundColor: badgeStyle.bg,
                  color: badgeStyle.text,
                  borderColor: badgeStyle.border,
                }}
              >
                {item.category}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#0B1728] border border-[#1C3352]">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Model Confidence
              </span>
              <span className="text-sm font-bold text-emerald-400">
                {item.confidence}% Verified
              </span>
            </div>
          </div>

          {/* Legal Reference */}
          <div className="p-3.5 rounded-xl bg-[#0B1728] border border-[#1C3352]">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-amber-400" />
              Legal Reference / Directive
            </span>
            <p className="text-sm font-mono text-amber-300">
              {item.legalReference}
            </p>
          </div>

          {/* Official Answer */}
          <div className="p-3.5 rounded-xl bg-[#0B1728] border border-[#1C3352]">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Official Answer / Guidance
            </span>
            <p className="text-sm text-slate-200 leading-relaxed">
              {item.officialAnswer}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1C3352]/60">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#1C3352] bg-[#162A43] text-slate-300 text-xs font-semibold hover:bg-[#1E375B] transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onEdit(item);
            }}
            className="px-5 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1728] text-xs font-bold transition-all shadow-sm"
          >
            Edit Q&A Pair
          </button>
        </div>
      </div>
    </div>
  );
}
