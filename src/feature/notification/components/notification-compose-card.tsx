import { useState } from "react";
import { Send, ChevronDown, Sparkles } from "lucide-react";
import {
  type TargetAudience,
  type NotificationCategory,
  type BroadcastPriority,
  type PushNotification,
  TARGET_AUDIENCES,
  NOTIFICATION_CATEGORIES,
  BROADCAST_PRIORITIES,
  QUICK_TEMPLATES,
} from "../notification.data";
import { cn } from "@/lib/utils";

interface NotificationComposeCardProps {
  onSend: (notification: Omit<PushNotification, "id" | "sentAt" | "audienceReach" | "openRate" | "status">) => void;
}

export function NotificationComposeCard({ onSend }: NotificationComposeCardProps) {
  const [targetAudience, setTargetAudience] = useState<TargetAudience>("All Users");
  const [category, setCategory] = useState<NotificationCategory>("Operational Alert");
  const [priority, setPriority] = useState<BroadcastPriority>("High Priority (Immediate Ingress)");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleQuickLoad = (templateKey: "ASYCUDA" | "Matadi Gate") => {
    const template = QUICK_TEMPLATES[templateKey];
    setTitle(template.title);
    setBody(template.body);
    setCategory(template.category);
    setPriority(template.priority);
    setTargetAudience(template.targetAudience);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Please enter notification title";
    }
    if (!body.trim()) {
      newErrors.body = "Please enter message body";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSend({
      title: title.trim(),
      subtitle: body.trim().slice(0, 50) + "...",
      body: body.trim(),
      targetAudience,
      category,
      priority,
    });

    // Reset fields
    setTitle("");
    setBody("");
    setErrors({});
  };

  return (
    <div
      className="rounded-2xl border p-6 sm:p-7 shadow-lg"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border-0)",
      }}
    >
      {/* Card Header & Quick Load */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#1C3352]/60">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Compose Mobile Notification
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Delivers to locked screens and in-app alerts
          </p>
        </div>

        {/* Quick load template buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            Quick load:
          </span>
          <button
            type="button"
            onClick={() => handleQuickLoad("ASYCUDA")}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-900 hover:bg-white transition-all shadow-sm active:scale-95"
          >
            ASYCUDA
          </button>
          <button
            type="button"
            onClick={() => handleQuickLoad("Matadi Gate")}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-[#0B1728] border border-[#1C3352] text-slate-300 hover:text-white hover:bg-[#142742] transition-all active:scale-95"
          >
            Matadi Gate
          </button>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {/* Target Audience Segment */}
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-slate-300">
            Target Audience Segment <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TARGET_AUDIENCES.map((audience) => {
              const isSelected = targetAudience === audience;
              return (
                <button
                  key={audience}
                  type="button"
                  onClick={() => setTargetAudience(audience)}
                  className={cn(
                    "py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all text-center border",
                    isSelected
                      ? "bg-[#E8F0FE] text-slate-900 border-white font-bold shadow-sm"
                      : "bg-[#0B1728] text-slate-400 border-[#1C3352] hover:text-slate-200 hover:bg-[#142742]"
                  )}
                >
                  {audience}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Selects: Category & Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Notification Category */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-slate-300">
              Notification Category <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NotificationCategory)}
                className="w-full appearance-none rounded-xl px-4 py-3 text-sm text-[#0F172A] bg-[#E8F0FE] border border-slate-300/60 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-inner pr-10 cursor-pointer font-medium"
              >
                {NOTIFICATION_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="text-slate-900 bg-white">
                    {cat}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Broadcast Priority */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-slate-300">
              Broadcast Priority <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as BroadcastPriority)}
                className="w-full appearance-none rounded-xl px-4 py-3 text-sm text-[#0F172A] bg-[#E8F0FE] border border-slate-300/60 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-inner pr-10 cursor-pointer font-medium"
              >
                {BROADCAST_PRIORITIES.map((p) => (
                  <option key={p} value={p} className="text-slate-900 bg-white">
                    {p}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Title */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-300">
            Notification title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
            }}
            placeholder="e.g. Urgent: ASYCUDA World System Maintenance at Matadi Port"
            className="w-full rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder:text-slate-500 bg-[#E8F0FE] border border-slate-300/60 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-inner font-medium"
          />
          {errors.title && (
            <span className="text-[11px] text-red-400 font-medium block">
              {errors.title}
            </span>
          )}
        </div>

        {/* Message Body */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-300">
            Message Body <span className="text-red-400">*</span>
          </label>
          <textarea
            rows={4}
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              if (errors.body) setErrors((prev) => ({ ...prev, body: "" }));
            }}
            placeholder="Type the message body to be displayed on users devices..."
            className="w-full rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder:text-slate-500 bg-[#E8F0FE] border border-slate-300/60 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none shadow-inner leading-relaxed"
          />
          {errors.body && (
            <span className="text-[11px] text-red-400 font-medium block">
              {errors.body}
            </span>
          )}
        </div>

        {/* Send Button */}
        <div className="pt-2">
          <button
            id="send-notification-btn"
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1728] text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Send className="h-4 w-4" />
            <span>Send Notification</span>
          </button>
        </div>
      </form>
    </div>
  );
}
