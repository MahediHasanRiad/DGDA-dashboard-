import { HeroBanner } from "./components/hero-banner";
import { StatCards } from "./components/stat-cards";
import { RecentIncidents } from "./components/recent-incidents";
import { QuickActions } from "./components/quick-actions";

export default function OverviewPage() {
  return (
    <div
      className="p-6 space-y-6 min-h-full"
      style={{ backgroundColor: "var(--color-bg-primary-0)" }}
    >
      <HeroBanner />
      <StatCards />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RecentIncidents />
        </div>
        <div className="lg:col-span-2">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
