import { TrendingUp } from "lucide-react";
import manImage from "/assets/overview/man.png";
import paperImage from "/assets/overview/paper.png";
import partnerImage from "/assets/overview/partner.png";

// ── Types ──────────────────────────────────────────────────────────────────

export interface NewsStatCard {
  id: string;
  label: string;
  value: string;
  subtext: string;
  isPositive?: boolean;
  isMuted?: boolean;
  icon: string;
  iconAlt: string;
}

interface NewsStatCardsProps {
  totalPublished?: number;
  totalDrafts?: number;
  totalViews?: string;
}

// ── Sub-component: single stat card ────────────────────────────────────────

function NewsStatCardItem({ card }: { card: NewsStatCard }) {
  return (
    <div
      id={`news-stat-card-${card.id}`}
      className="relative flex items-center gap-5 overflow-hidden rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border-0)",
      }}
    >
      {/* 3D Icon illustration */}
      <div className="shrink-0 flex items-center justify-center">
        <img
          src={card.icon}
          alt={card.iconAlt}
          className="h-28 w-28 object-contain drop-shadow-md"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <span
          className="text-sm font-medium leading-tight"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {card.label}
        </span>

        <span
          className="text-3xl lg:text-4xl font-extrabold tracking-tight"
          style={{ color: "var(--color-text-primary-0)" }}
        >
          {card.value}
        </span>

        <div className="mt-1 flex items-center gap-1.5">
          {card.isPositive ? (
            <span
              className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: "var(--color-accent-green)" }}
            >
              <TrendingUp className="h-3 w-3 shrink-0" strokeWidth={2.5} />
              {card.subtext}
            </span>
          ) : (
            <span
              className="text-xs font-normal"
              style={{ color: "var(--color-text-muted)" }}
            >
              {card.subtext}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Exported Stat Cards Grid ───────────────────────────────────────────────

export function NewsStatCards({
  totalPublished = 500,
  totalDrafts = 25,
  totalViews = "10.9k",
}: NewsStatCardsProps) {
  const cards: NewsStatCard[] = [
    {
      id: "total-published",
      label: "Total Published",
      value: String(totalPublished),
      subtext: "+ 16 this month",
      isPositive: true,
      icon: manImage,
      iconAlt: "Total Published",
    },
    {
      id: "drafts",
      label: "Drafts",
      value: String(totalDrafts),
      subtext: "Not publish",
      isMuted: true,
      icon: paperImage,
      iconAlt: "Drafts",
    },
    {
      id: "app-views",
      label: "App Views",
      value: totalViews,
      subtext: "82% engagement",
      isPositive: true,
      icon: partnerImage,
      iconAlt: "App Views",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <NewsStatCardItem key={card.id} card={card} />
      ))}
    </div>
  );
}
