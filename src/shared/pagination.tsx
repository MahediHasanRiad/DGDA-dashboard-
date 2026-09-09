import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  align?: "start" | "center" | "end";
}

// ── Component ──────────────────────────────────────────────────────────────

export function PaginationField({
  currentPage,
  totalPages,
  onPageChange,
  className,
  align = "end",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | "ellipsis-start" | "ellipsis-end")[] => {
    const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis-start");
      }

      // Calculate middle page range
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis-end");
      }

      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    onPageChange(page);
  };

  const alignClass =
    align === "center"
      ? "justify-center"
      : align === "start"
      ? "justify-start"
      : "justify-center sm:justify-end";

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Pagination Navigation"
      className={cn(
        "flex flex-wrap items-center gap-1 sm:gap-1.5 select-none",
        alignClass,
        className
      )}
    >
      {/* ── Previous Page Button ── */}
      <button
        type="button"
        aria-label="Go to previous page"
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-md text-xs font-semibold transition-all duration-150",
          currentPage === 1
            ? "pointer-events-none opacity-30 cursor-not-allowed"
            : "hover:bg-[var(--color-bg-card-hover)] hover:text-white cursor-pointer"
        )}
        style={{ color: "var(--color-text-muted)" }}
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
      </button>

      {/* ── Page Number Buttons / Ellipses ── */}
      {pages.map((page, index) => {
        if (typeof page === "string") {
          return (
            <span
              key={`${page}-${index}`}
              className="flex h-7 w-7 items-center justify-center text-xs font-medium"
              style={{ color: "var(--color-text-muted)" }}
              aria-hidden
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </span>
          );
        }

        const isActive = currentPage === page;

        return (
          <button
            key={page}
            type="button"
            aria-current={isActive ? "page" : undefined}
            onClick={(e) => handlePageClick(e, page)}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-md text-xs font-semibold transition-all duration-150 cursor-pointer",
              isActive ? "shadow-sm font-bold scale-105" : "hover:text-white"
            )}
            style={
              isActive
                ? {
                    backgroundColor: "var(--color-accent-gold)",
                    color: "#0B1728",
                  }
                : {
                    backgroundColor: "transparent",
                    color: "var(--color-text-secondary)",
                  }
            }
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "var(--color-bg-card-hover)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            {page}
          </button>
        );
      })}

      {/* ── Next Page Button ── */}
      <button
        type="button"
        aria-label="Go to next page"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-md text-xs font-semibold transition-all duration-150",
          currentPage === totalPages
            ? "pointer-events-none opacity-30 cursor-not-allowed"
            : "hover:bg-[var(--color-bg-card-hover)] hover:text-white cursor-pointer"
        )}
        style={{ color: "var(--color-text-muted)" }}
      >
        <ChevronRight className="h-4 w-4" strokeWidth={2} />
      </button>
    </nav>
  );
}

// Alias export for versatility
export { PaginationField as Pagination };