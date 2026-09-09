import { X, Bell, Send, CheckCircle2, Users, Smartphone } from "lucide-react";
import { type PushNotification } from "../notification.data";

interface NotificationDetailModalProps {
  isOpen: boolean;
  notification: PushNotification | null;
  onClose: () => void;
  onResend?: (item: PushNotification) => void;
}

export function NotificationDetailModal({
  isOpen,
  notification,
  onClose,
  onResend,
}: NotificationDetailModalProps) {
  if (!isOpen || !notification) return null;

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
        <div className="flex items-start justify-between pb-4 border-b border-[#1C3352]/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Notification Broadcast Details
              </h2>
              <p className="text-xs text-slate-400">
                Delivered to DGDA Mobile Network
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

        {/* Content */}
        <div className="my-5 space-y-4">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-[#0B1728] border border-[#1C3352]">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <Users className="h-3 w-3 text-teal-400" /> Target
              </span>
              <span className="text-xs font-bold text-teal-300">
                {notification.targetAudience}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#0B1728] border border-[#1C3352]">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <Smartphone className="h-3 w-3 text-blue-400" /> Reach
              </span>
              <span className="text-xs font-bold text-blue-300">
                {notification.audienceReach}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#0B1728] border border-[#1C3352]">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Open Rate
              </span>
              <span className="text-xs font-bold text-emerald-300">
                {notification.openRate}
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="p-3.5 rounded-xl bg-[#0B1728] border border-[#1C3352]">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Broadcast Title
            </span>
            <p className="text-sm font-bold text-white">
              {notification.title}
            </p>
          </div>

          {/* Simulated Lock Screen Preview */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#0B1728] to-[#15253B] border border-[#1C3352]">
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Smartphone className="h-3.5 w-3.5" /> Mobile Lockscreen In-App Alert Preview
            </span>
            <div className="p-3 rounded-lg bg-[#102035]/90 border border-blue-500/20 shadow-md">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-blue-400">DGDA Mobile</span>
                  <span className="text-[10px] text-slate-500">• {notification.sentAt}</span>
                </div>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300">
                  {notification.category}
                </span>
              </div>
              <p className="text-xs font-semibold text-white mb-1">{notification.title}</p>
              <p className="text-xs text-slate-300 leading-relaxed">{notification.body}</p>
            </div>
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
          {onResend && (
            <button
              onClick={() => {
                onResend(notification);
                onClose();
              }}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1728] text-xs font-bold transition-all shadow-sm"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Re-send Alert</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
