import { useState, useEffect } from "react";
import { X, Plus, ChevronDown } from "lucide-react";
import { type QAItem, QA_CATEGORIES } from "../ai-knowledge-trainer.data";

interface AIAddQAModalProps {
  isOpen: boolean;
  itemToEdit: QAItem | null;
  onClose: () => void;
  onSave: (data: Omit<QAItem, "id"> & { id?: string }) => void;
}

export function AIAddQAModal({
  isOpen,
  itemToEdit,
  onClose,
  onSave,
}: AIAddQAModalProps) {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState<string>("Customs Clearance");
  const [legalReference, setLegalReference] = useState("");
  const [officialAnswer, setOfficialAnswer] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (itemToEdit) {
      setQuestion(itemToEdit.question);
      setCategory(itemToEdit.category);
      setLegalReference(itemToEdit.legalReference);
      setOfficialAnswer(itemToEdit.officialAnswer);
    } else {
      setQuestion("");
      setCategory("Customs Clearance");
      setLegalReference("");
      setOfficialAnswer("");
    }
    setErrors({});
  }, [itemToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!question.trim()) {
      newErrors.question = "Please enter the customs procedure question";
    }
    if (!category) {
      newErrors.category = "Please select a category";
    }
    if (!legalReference.trim()) {
      newErrors.legalReference = "Please specify legal reference / directive";
    }
    if (!officialAnswer.trim()) {
      newErrors.officialAnswer = "Please provide the official answer / guidance";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...(itemToEdit ? { id: itemToEdit.id } : {}),
      question: question.trim(),
      category,
      legalReference: legalReference.trim(),
      officialAnswer: officialAnswer.trim(),
      confidence: itemToEdit?.confidence ?? 98,
      status: itemToEdit?.status ?? "active",
      updatedAt: new Date().toISOString().split("T")[0],
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
        className="relative w-full max-w-2xl rounded-2xl shadow-2xl border p-6 sm:p-7 animate-in fade-in-50 zoom-in-95 duration-200"
        style={{
          backgroundColor: "var(--color-bg-card)",
          borderColor: "var(--color-border-0)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-[#1C3352]/60">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {itemToEdit ? "Edit Custom Q&A Pair" : "Add Custom Q&A to Agent IA"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Train the AI assistant with verified customs answers and legal code references.
            </p>
          </div>

          {/* Close button (Red rounded square) */}
          <button
            id="close-qa-modal-btn"
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white transition-opacity hover:opacity-85 shadow-sm"
            style={{ backgroundColor: "var(--color-accent-red)" }}
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Field 1: Customs Procedure Question */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-slate-300">
              Customs Procedure Question <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                if (errors.question) setErrors((prev) => ({ ...prev, question: "" }));
              }}
              placeholder="e.g. What are the rules for temporary admission of vehicles / equipment?"
              className="w-full rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder:text-slate-500 bg-[#E8F0FE] border border-slate-300/60 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-inner"
            />
            {errors.question && (
              <span className="text-[11px] text-red-400 font-medium block">
                {errors.question}
              </span>
            )}
          </div>

          {/* Field 2 & 3: Category and Legal Reference in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-semibold text-slate-300">
                Category <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    if (errors.category) setErrors((prev) => ({ ...prev, category: "" }));
                  }}
                  className="w-full appearance-none rounded-xl px-4 py-3 text-sm text-[#0F172A] bg-[#E8F0FE] border border-slate-300/60 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-inner pr-10 cursor-pointer font-medium"
                >
                  {QA_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="text-slate-900 bg-white">
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
              {errors.category && (
                <span className="text-[11px] text-red-400 font-medium block">
                  {errors.category}
                </span>
              )}
            </div>

            {/* Legal Reference */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-semibold text-slate-300">
                Legal Reference / Directive <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={legalReference}
                onChange={(e) => {
                  setLegalReference(e.target.value);
                  if (errors.legalReference)
                    setErrors((prev) => ({ ...prev, legalReference: "" }));
                }}
                placeholder="Code des Douanes RDC Art. 84"
                className="w-full rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder:text-slate-500 bg-[#E8F0FE] border border-slate-300/60 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-inner"
              />
              {errors.legalReference && (
                <span className="text-[11px] text-red-400 font-medium block">
                  {errors.legalReference}
                </span>
              )}
            </div>
          </div>

          {/* Field 4: Official Answer / Guidance */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-slate-300">
              Official Answer / Guidance <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={4}
              value={officialAnswer}
              onChange={(e) => {
                setOfficialAnswer(e.target.value);
                if (errors.officialAnswer)
                  setErrors((prev) => ({ ...prev, officialAnswer: "" }));
              }}
              placeholder="Provide the exact, structured answer that the AI assistant should reply to mobile users..."
              className="w-full rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder:text-slate-500 bg-[#E8F0FE] border border-slate-300/60 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none shadow-inner leading-relaxed"
            />
            {errors.officialAnswer && (
              <span className="text-[11px] text-red-400 font-medium block">
                {errors.officialAnswer}
              </span>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1C3352]/60 mt-6">
            <button
              id="cancel-qa-btn"
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#1C3352] bg-[#162A43] hover:bg-[#1E375B] text-slate-300 text-xs sm:text-sm font-semibold transition-all hover:text-white"
            >
              Cancel
            </button>

            <button
              id="save-qa-btn"
              type="submit"
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1728] text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span>Save To AI Model</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
