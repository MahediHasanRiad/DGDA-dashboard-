// ── Document Center Hero Banner ──────────────────────────────────────────────

export function DocumentHero() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl px-5 py-5 sm:px-8 sm:py-7 shadow-md"
      style={{ background: "linear-gradient(135deg, #0D1B2E 0%, #1D3461 60%, #1E40AF 100%)" }}
    >
      {/* Decorative concentric arcs */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-48 sm:w-64 opacity-20 sm:opacity-25"
        aria-hidden
      >
        <svg viewBox="0 0 200 160" fill="none" className="h-full w-full">
          <circle cx="160" cy="80" r="70" stroke="#93C5FD" strokeWidth="1.5" fill="none" />
          <circle cx="160" cy="80" r="50" stroke="#93C5FD" strokeWidth="1" fill="none" />
          <circle cx="160" cy="80" r="30" stroke="#93C5FD" strokeWidth="0.8" fill="none" />
        </svg>
      </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5 sm:mb-2">
        Document Center
      </h1>
      <p className="text-blue-200 text-xs sm:text-sm font-normal max-w-2xl leading-relaxed">
        Official customs publications and regulatory documents feeding the DGDA Mobile App.
      </p>
    </div>
  );
}
