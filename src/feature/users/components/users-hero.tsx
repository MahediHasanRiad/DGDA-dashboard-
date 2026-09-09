// ── Users Hero Banner ──────────────────────────────────────────────────────

export function UsersHero() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl px-8 py-7 shadow-md"
      style={{ background: "linear-gradient(135deg, #0D1B2E 0%, #1D3461 60%, #1E40AF 100%)" }}
    >
      {/* Decorative arcs */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-64 opacity-20"
        aria-hidden
      >
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">User & NIF Management</h1>
      <p className="text-blue-200 text-sm font-normal max-w-2xl leading-relaxed">
        Review registered mobile app economic operators and authenticate their corporate Tax
        Identification Numbers (NIF).
      </p>
    </div>
  );
}
