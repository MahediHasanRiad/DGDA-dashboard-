// ── Types ──────────────────────────────────────────────────────────────────

interface IncidentItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
}

// ── Data ───────────────────────────────────────────────────────────────────

const INCIDENTS: IncidentItem[] = [
  {
    id: "inc-1",
    title: "Verified corporate NIF for TransKatanga Logistics SARL",
    subtitle: "NIF: A1802934 · By Insp. J. Mukendi",
    badge: "PENDING",
    badgeColor: "#F59E0B",
  },
  {
    id: "inc-2",
    title: "Dispatched emergency push notification to 18,450 registered app users",
    subtitle: "ASYCUDA World Maintenance Alert · By Insp. J. Mukendi",
    badge: "PENDING",
    badgeColor: "#F59E0B",
  },
  {
    id: "inc-3",
    title: "Dispatched emergency push notification to 18,450 registered app users",
    subtitle: "ASYCUDA World Maintenance Alert · By Insp. J. Mukendi",
    badge: "PENDING",
    badgeColor: "#F59E0B",
  },
  {
    id: "inc-4",
    title: "Dispatched emergency push notification to 18,450 registered app users",
    subtitle: "ASYCUDA World Maintenance Alert · By Insp. J. Mukendi",
    badge: "PENDING",
    badgeColor: "#F59E0B",
  },
];

// ── Sub-component: single row ──────────────────────────────────────────────

function IncidentRow({ item }: { item: IncidentItem }) {
  return (
    <div
      className="flex items-start justify-between gap-3 rounded-xl border px-4 py-3 transition-colors"
      style={{
        backgroundColor: "var(--color-bg-primary-0)",
        borderColor: "var(--color-border-subtle)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-bg-card-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-bg-primary-0)")}
    >
      <div className="min-w-0 flex-1">
        <p
          className="truncate text-sm font-medium leading-snug"
          style={{ color: "var(--color-text-primary-0)" }}
        >
          {item.title}
        </p>
        <p className="mt-0.5 truncate text-xs" style={{ color: "var(--color-text-muted)" }}>
          {item.subtitle}
        </p>
      </div>
      <span
        className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase border"
        style={{
          backgroundColor: "var(--color-accent-gold-bg)",
          borderColor: "var(--color-accent-gold-border)",
          color: "var(--color-accent-gold)",
        }}
      >
        {item.badge}
      </span>
    </div>
  );
}

// ── Exported panel ─────────────────────────────────────────────────────────

export function RecentIncidents() {
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
        Recent incident
      </h2>

      <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
        {INCIDENTS.map((inc) => (
          <IncidentRow key={inc.id} item={inc} />
        ))}
      </div>
    </div>
  );
}
