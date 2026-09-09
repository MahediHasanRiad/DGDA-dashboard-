import { ChevronRight, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import manImage from '../../../../public/assets/overview/man.png';
import paperImage from '../../../../public/assets/overview/paper.png';
import partnerImage from '../../../../public/assets/overview/partner.png';

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
    icon: partnerImage,
    iconAlt: "Partners & Sponsors",
  },
];

// ── Sub-component: single card ─────────────────────────────────────────────

function StatCardItem({ card }: { card: StatCard }) {
  return (
    <div
      id={`stat-card-${card.id}`}
      className="relative flex items-center gap-3 sm:gap-4 overflow-hidden rounded-2xl border p-4 sm:p-5 lg:p-6 shadow-sm transition-all hover:shadow-md"
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
          className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 xl:h-36 xl:w-36 object-contain drop-shadow-md transition-transform duration-200 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* ── Content (right) ── */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 justify-center">
        {/* Label */}
        <span
          className="text-xs sm:text-sm md:text-base font-medium leading-tight truncate"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {card.label}
        </span>

        {/* Big number */}
        <span
          className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight my-0.5 sm:my-1"
          style={{ color: "var(--color-text-primary-0)" }}
        >
          {card.value}
        </span>

        {/* Bottom row */}
        <div className="mt-1 sm:mt-2 flex items-center justify-between gap-1.5 flex-wrap sm:flex-nowrap">
          {/* Meta left */}
          <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
            {card.delta && (
              <span
                className={cn(
                  "flex items-center gap-1 text-[11px] sm:text-xs font-semibold truncate",
                  card.deltaPositive ? "text-emerald-400" : "text-rose-400"
                )}
              >
                <TrendingUp className="h-3 w-3 shrink-0" strokeWidth={2} />
                <span>{card.delta}</span>
              </span>
            )}

            {card.metaLeft && !card.delta && (
              <span
                className="text-[11px] sm:text-xs font-medium truncate max-w-[130px] sm:max-w-none"
                style={{ color: card.metaLeftColor ?? "var(--color-text-muted)" }}
                title={card.metaLeft}
              >
                {card.metaLeft}
              </span>
            )}

            {card.metaRight && (
              <>
                <span className="text-xs opacity-40 hidden sm:inline" style={{ color: "var(--color-text-muted)" }}>
                  |
                </span>
                <span className="text-[11px] sm:text-xs hidden sm:inline" style={{ color: "var(--color-text-muted)" }}>
                  {card.metaRight}
                </span>
              </>
            )}
          </div>

          {/* Action link */}
          <Link
            to={card.actionHref}
            className="flex shrink-0 items-center gap-0.5 text-xs font-semibold transition-colors hover:text-amber-400 ml-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <span>{card.actionLabel}</span>
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Exported grid ──────────────────────────────────────────────────────────

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
      {STAT_CARDS.map((card) => (
        <StatCardItem key={card.id} card={card} />
      ))}
    </div>
  );
}
