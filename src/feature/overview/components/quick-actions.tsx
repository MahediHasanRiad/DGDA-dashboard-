import {
  ShieldCheck,
  Newspaper,
  Upload,
  AlertCircle,
  BrainCircuit,
  ChevronRight,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
}

// ── Data ───────────────────────────────────────────────────────────────────

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "qa-nif",
    label: "Verify Pending NIFs",
    icon: <ShieldCheck className="h-5 w-5" strokeWidth={1.8} />,
    // href: "/users",
  },
  {
    id: "qa-news",
    label: "Publish News Bulletin",
    icon: <Newspaper className="h-5 w-5" strokeWidth={1.8} />,
    // href: "/news",
  },
  {
    id: "qa-pdf",
    label: "Upload Official PDF",
    icon: <Upload className="h-5 w-5" strokeWidth={1.8} />,
    // href: "/documents",
  },
  {
    id: "qa-report",
    label: "Report Incorrect Data",
    icon: <AlertCircle className="h-5 w-5" strokeWidth={1.8} />,
    // href: "/report",
  },
  {
    id: "qa-ai",
    label: "Train Agent IA RAG",
    icon: <BrainCircuit className="h-5 w-5" strokeWidth={1.8} />,
    // href: "/ai-trainer",
  },
];

// ── Sub-component: single row ──────────────────────────────────────────────

function ActionRow({ action }: { action: QuickAction }) {
  return (
    <a
      id={`quick-action-${action.id}`}
      className="group flex items-center justify-between rounded-xl border px-4 py-3 transition-all"
      style={{
        backgroundColor: "var(--color-bg-primary-0)",
        borderColor: "var(--color-border-subtle)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--color-bg-card-hover)";
        e.currentTarget.style.borderColor = "var(--color-border-0)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--color-bg-primary-0)";
        e.currentTarget.style.borderColor = "var(--color-border-subtle)";
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
          style={{
            backgroundColor: "var(--color-bg-card)",
            color: "var(--color-text-secondary)",
          }}
        >
          {action.icon}
        </span>
        <span
          className="text-sm font-medium"
          style={{ color: "var(--color-text-primary-0)" }}
        >
          {action.label}
        </span>
      </div>
      <ChevronRight
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        style={{ color: "var(--color-text-muted)" }}
        strokeWidth={2}
      />
    </a>
  );
}

// ── Exported panel ─────────────────────────────────────────────────────────

export function QuickActions() {
  return (
    <div
      className="rounded-2xl border p-5 shadow-sm"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border-0)",
      }}
    >
      <h2
        className="mb-4 text-base font-semibold"
        style={{ color: "var(--color-text-primary-0)" }}
      >
        Quick Actions
      </h2>

      <div className="flex flex-col gap-2">
        {QUICK_ACTIONS.map((action) => (
          <ActionRow key={action.id} action={action} />
        ))}
      </div>
    </div>
  );
}
