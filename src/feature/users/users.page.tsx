import { useState } from "react";
import { UsersHero } from "./components/users-hero";
import { UsersFilterBar, type StatusFilter } from "./components/users-filter-bar";
import { UsersTable } from "./components/users-table";

export default function UsersPage() {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("all");

  return (
    <div className="min-h-full p-6 space-y-5" style={{ backgroundColor: "var(--color-bg-primary-0)" }}>
      <UsersHero />
      <UsersFilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <UsersTable activeFilter={activeFilter} />
    </div>
  );
}
