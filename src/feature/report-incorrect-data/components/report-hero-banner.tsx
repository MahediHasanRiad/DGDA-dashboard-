export function ReportHeroBanner() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl px-8 py-7 shadow-lg border"
      style={{
        background: "linear-gradient(135deg, #0D1B2E 0%, #152A4A 60%, #1B3B6F 100%)",
        borderColor: "var(--color-border-0)",
      }}
    >
      {/* Decorative concentric circular arcs */}
      <div
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-44 w-52 opacity-25 flex items-center justify-center"
        aria-hidden
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-blue-300"
        >
          <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="2" opacity="0.8" />
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" opacity="0.6" />
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
          <circle cx="100" cy="100" r="110" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.2" />
        </svg>
      </div>

      <div className="relative z-10 max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Report Incorrect Data
        </h1>
        <p className="text-blue-200/90 text-sm font-normal leading-relaxed">
          Mobile operators submit discrepancy reports via the DGDA Mobile App.
        </p>
      </div>
    </div>
  );
}
