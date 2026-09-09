import { useState, useEffect } from "react";
import { X, ChevronDown, Plus } from "lucide-react";
import { type FAQItem, type FAQStatus } from "../faq.data";

interface FAQAddModalProps {
  isOpen: boolean;
  itemToEdit: FAQItem | null;
  onClose: () => void;
  onSave: (data: Omit<FAQItem, "id" | "no"> & { id?: string }) => void;
}

export function FAQAddModal({
  isOpen,
  itemToEdit,
  onClose,
  onSave,
}: FAQAddModalProps) {
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<FAQStatus>("ACTIVE");
  const [answer, setAnswer] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (itemToEdit) {
      setQuestion(itemToEdit.question);
      setStatus(itemToEdit.status);
      setAnswer(itemToEdit.answer);
    } else {
      setQuestion("");
      setStatus("ACTIVE");
      setAnswer("");
    }
    setErrors({});
  }, [itemToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!question.trim()) {
      newErrors.question = "Please enter question";
    }
    if (!answer.trim()) {
      newErrors.answer = "Please enter answer";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...(itemToEdit ? { id: itemToEdit.id } : {}),
      question: question.trim(),
      status,
      answer: answer.trim(),
    });

    onClose();
  };

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
        className="relative w-full max-w-xl rounded-2xl shadow-2xl border p-6 sm:p-7 animate-in fade-in-50 zoom-in-95"
        style={{
          backgroundColor: "var(--color-bg-card)",
          borderColor: "var(--color-border-0)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-[#1C3352]/60">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              FAQ
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
              {itemToEdit ? "Edit FAQ" : "Add new FAQ"}
            </h2>
          </div>

          {/* Close button (Red rounded square) */}
          <button
            id="close-faq-modal-btn"
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white transition-opacity hover:opacity-85 shadow-sm cursor-pointer"
            style={{ backgroundColor: "var(--color-accent-red)" }}
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Row 1: Questions & Status in 2 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Questions */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Questions
              </label>
              <input
                type="text"
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  if (errors.question) setErrors((prev) => ({ ...prev, question: "" }));
                }}
                placeholder="Enter Questions And Fare"
                className="w-full rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0F172A] placeholder:text-slate-500 bg-[#E8F0FE] border border-slate-300/60 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-inner font-medium"
              />
              {errors.question && (
                <span className="text-[11px] text-red-400 font-medium block">
                  {errors.question}
                </span>
              )}
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Status
              </label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as FAQStatus)}
                  className="w-full appearance-none rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0F172A] bg-[#E8F0FE] border border-slate-300/60 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-inner pr-10 cursor-pointer font-medium"
                >
                  <option value="ACTIVE" className="text-slate-900 bg-white">
                    Active
                  </option>
                  <option value="INACTIVE" className="text-slate-900 bg-white">
                    Inactive
                  </option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Answerer / Answer */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Answerer
            </label>
            <textarea
              rows={3}
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (errors.answer) setErrors((prev) => ({ ...prev, answer: "" }));
              }}
              placeholder="Answer..."
              className="w-full rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0F172A] placeholder:text-slate-500 bg-[#E8F0FE] border border-slate-300/60 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none shadow-inner leading-relaxed"
            />
            {errors.answer && (
              <span className="text-[11px] text-red-400 font-medium block">
                {errors.answer}
              </span>
            )}
          </div>

          {/* Footer Submit Button */}
          <div className="pt-3">
            <button
              id="submit-faq-btn"
              type="submit"
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1728] text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span>{itemToEdit ? "Update Faq" : "Create Faq"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
