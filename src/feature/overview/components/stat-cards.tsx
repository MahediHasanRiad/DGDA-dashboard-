import { ChevronRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import manImage from '../../../../public/assets/overview/man.png'
import paperImage from '../../../../public/assets/overview/paper.png'
import partnerImage from '../../../../public/assets/overview/partner.png'

// ── Types ──────────────────────────────────────────────────────────────────

interface StatCard {
  id: string;
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  metaLeft?: string;
  metaLeftColor?: string;
  metaRight?: string;
  actionLabel: string;
  actionHref: string;
  icon: string;
  iconAlt: string;
}

// ── Data ───────────────────────────────────────────────────────────────────

const STAT_CARDS: StatCard[] = [
  {
    id: "total-users",
    label: "Total User",
    value: "15k",
    delta: "+ 14.2% this month",
    deltaPositive: true,
    actionLabel: "Manage",
    actionHref: "/users",
    // 3-D style person avatar
    icon: manImage,
    iconAlt: "Total Users",
  },
  {
    id: "active-docs",
    label: "Active news & docs",
    value: "25",
    metaLeft: "5 Articles",
    metaRight: "6 PDFs",
    actionLabel: "View",
    actionHref: "/news",
    // 3-D style document / page
    icon: paperImage,
    iconAlt: "Active news and docs",
  },
  {
    id: "partners",
    label: "Partners & Sponsors",
    value: "6",
    metaLeft: "Ports, Banks & Logistics",
    metaLeftColor: "#22C55E",
    actionLabel: "Directory",
    actionHref: "/partners",
    // 3-D style handshake
    icon: partnerImage,
    iconAlt: "Partners & Sponsors",
  },
];

// ── Sub-component: single card ─────────────────────────────────────────────

function StatCardItem({ card }: { card: StatCard }) {
  return (
    <div
      id={`stat-card-${card.id}`}
      className="relative flex items-center gap-4 overflow-hidden rounded-2xl border p-7 shadow-sm transition-all hover:shadow-md"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border-0)",
      }}
    >
      {/* ── Icon (left) ── */}
      <div className="shrink-0 flex items-center justify-center">
        <img
          src={card.icon}
          alt={card.iconAlt}
          className="h-40 w-40 object-contain drop-shadow-lg"
          loading="lazy"
        />
      </div>

      {/* ── Content (right) ── */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {/* Label */}
        <span
          className="text-md font-medium leading-tight"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {card.label}
        </span>

        {/* Big number */}
        <span
          className="text-4xl font-bold leading-tight"
          style={{ color: "var(--color-text-primary-0)" }}
        >
          {card.value}
        </span>

        {/* Bottom row */}
        <div className="mt-2 flex items-center justify-between gap-2">
          {/* Meta left */}
          <div className="flex items-center gap-1.5 min-w-0">
            {card.delta && (
              <span
                className={cn(
                  "flex items-center gap-1 text-xs font-semibold truncate",
                  card.deltaPositive ? "text-emerald-400" : "text-rose-400"
                )}
              >
                <TrendingUp className="h-3 w-3 shrink-0" strokeWidth={2} />
                {card.delta}
              </span>
            )}

            {card.metaLeft && !card.delta && (
              <span
                className="text-xs font-medium truncate"
                style={{ color: card.metaLeftColor ?? "var(--color-text-muted)" }}
              >
                {card.metaLeft}
              </span>
            )}

            {card.metaRight && (
              <>
                <span className="text-xs opacity-40" style={{ color: "var(--color-text-muted)" }}>|</span>
                <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{card.metaRight}</span>
              </>
            )}
          </div>

          {/* Action link */}
          <a
            href={card.actionHref}
            className="flex shrink-0 items-center gap-0.5 text-xs font-semibold transition-colors hover:text-blue-400"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {card.actionLabel}
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Exported grid ──────────────────────────────────────────────────────────

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {STAT_CARDS.map((card) => (
        <StatCardItem key={card.id} card={card} />
      ))}
    </div>
  );
}
