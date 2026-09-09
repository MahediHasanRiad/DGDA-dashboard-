import { useState } from "react";
import { X, Send, Bot, Sparkles } from "lucide-react";
import { type QAItem } from "../ai-knowledge-trainer.data";

interface AITestConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  knowledgeBase: QAItem[];
}

export function AITestConsoleModal({
  isOpen,
  onClose,
  knowledgeBase,
}: AITestConsoleModalProps) {
  const [query, setQuery] = useState("");
  const [responseState, setResponseState] = useState<{
    isLoading: boolean;
    result: QAItem | null;
    matched: boolean;
  } | null>(null);

  if (!isOpen) return null;

  const handleRunQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setResponseState({ isLoading: true, result: null, matched: false });

    setTimeout(() => {
      const lower = query.toLowerCase();
      // Search matching item in knowledgeBase
      const matchedItem = knowledgeBase.find((item) =>
        item.question.toLowerCase().includes(lower) ||
        lower.split(" ").some((word) => word.length > 3 && item.question.toLowerCase().includes(word)) ||
        item.category.toLowerCase().includes(lower)
      );

      if (matchedItem) {
        setResponseState({
          isLoading: false,
          result: matchedItem,
          matched: true,
        });
      } else {
        setResponseState({
          isLoading: false,
          result: {
            id: "fallback",
            question: query,
            category: "General Inquiries",
            legalReference: "Code Général des Douanes RDC",
            officialAnswer:
              "For this specific query, the AI Model utilizes generalized customs protocol guidelines. Please consult the nearest DGDA customs bureau for specialized declaration validation.",
            confidence: 84,
            status: "active",
            updatedAt: "Live",
          },
          matched: false,
        });
      }
    }, 450);
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
        className="relative w-full max-w-2xl rounded-2xl shadow-2xl border p-6 animate-in fade-in-50 zoom-in-95"
        style={{
          backgroundColor: "var(--color-bg-card)",
          borderColor: "var(--color-border-0)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#1C3352]/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Agent IA Live Test Console</h2>
              <p className="text-xs text-slate-400">
                Simulate mobile app user questions against the trained customs model
              </p>
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

        {/* Query Input */}
        <form onSubmit={handleRunQuery} className="mt-5">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. What documents are needed for clearance at Matadi port?"
              className="w-full rounded-xl pl-4 pr-24 py-3.5 text-sm text-[#0F172A] placeholder:text-slate-500 bg-[#E8F0FE] border border-slate-300/60 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-inner font-medium"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-40 disabled:cursor-not-allowed text-[#0B1728] text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Ask AI</span>
            </button>
          </div>
        </form>

        {/* Quick sample chips */}
        <div className="flex items-center gap-1.5 flex-wrap mt-3">
          <span className="text-[11px] text-slate-400">Quick test:</span>
          {knowledgeBase.slice(0, 3).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setQuery(item.question);
              }}
              className="text-[11px] text-blue-300 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 rounded-md px-2 py-0.5 transition-colors truncate max-w-[200px]"
            >
              {item.question}
            </button>
          ))}
        </div>

        {/* Result area */}
        <div className="mt-5 min-h-[160px] rounded-xl bg-[#0B1728] border border-[#1C3352] p-4 flex flex-col justify-center">
          {responseState?.isLoading ? (
            <div className="flex flex-col items-center justify-center py-6 gap-2 text-slate-400">
              <Sparkles className="h-6 w-6 text-amber-400 animate-spin" />
              <span className="text-xs">Querying Agent IA Knowledge Base...</span>
            </div>
          ) : responseState?.result ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span> */}
                  {/* <span className="text-xs font-semibold text-emerald-400">
                    {responseState.matched ? "Exact Knowledge Match" : "Generalized Retrieval"}
                  </span> */}
                </div>
                {/* <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Confidence: {responseState.result.confidence}%
                </span> */}
              </div>

              <div className="p-3 rounded-lg bg-[#102035] border border-[#1C3352] text-xs sm:text-sm text-slate-200 leading-relaxed">
                {responseState.result.officialAnswer}
              </div>

              <div className="flex items-center gap-2 text-xs text-amber-300/90 font-mono">
                <span>Legal Ref:</span>
                <span className="font-semibold">{responseState.result.legalReference}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500 text-xs">
              Type a customs question or select a quick test question above to simulate agent response.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 mt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#162A43] hover:bg-[#1E375B] text-slate-300 text-xs font-semibold transition-colors"
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
}
