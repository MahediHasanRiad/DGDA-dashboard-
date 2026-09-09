import { useState } from "react";
import { MoreVertical, PlusCircle, Edit3, Trash2 } from "lucide-react";
import { Pagination } from "@/shared/pagination";
import type { NewsArticle, ArticleStatus } from "../news-press.data";

// ── Types ──────────────────────────────────────────────────────────────────

interface NewsTableProps {
  articles: NewsArticle[];
  onAddNew: () => void;
  onEdit: (article: NewsArticle) => void;
  onDelete: (article: NewsArticle) => void;
}

const TABLE_HEADERS = [
  "Thumb",
  "News Title",
  "Category",
  "Publish Date",
  "Status",
  "Views",
  "Actions",
];

const TOTAL_PAGES = 5;

// ── Sub-components ─────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ArticleStatus }) {
  const isPublished = status === "PUBLISHED";
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-0.5 text-[10px] font-bold tracking-wider uppercase border"
      style={
        isPublished
          ? {
              backgroundColor: "rgba(34, 197, 94, 0.12)",
              borderColor: "rgba(34, 197, 94, 0.35)",
              color: "var(--color-accent-green)",
            }
          : {
              backgroundColor: "rgba(245, 158, 11, 0.12)",
              borderColor: "rgba(245, 158, 11, 0.35)",
              color: "var(--color-accent-gold)",
            }
      }
    >
      {status}
    </span>
  );
}

function ActionMenu({
  article,
  onAddNew,
  onEdit,
  onDelete,
}: {
  article: NewsArticle;
  onAddNew: () => void;
  onEdit: (a: NewsArticle) => void;
  onDelete: (a: NewsArticle) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        id={`news-action-btn-${article.id}`}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
        style={{ color: "var(--color-text-muted)" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-bg-card-hover)")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
      >
        <MoreVertical className="h-4 w-4" strokeWidth={2} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div
            id={`news-dropdown-${article.id}`}
            className="absolute right-0 z-30 mt-1 w-32 rounded-xl border py-1 shadow-2xl backdrop-blur-md"
            style={{
              backgroundColor: "#13243C",
              borderColor: "var(--color-border-0)",
            }}
          >
            {/* Add action */}
            <button
              className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-bg-card-hover)";
                e.currentTarget.style.color = "var(--color-text-primary-0)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--color-text-secondary)";
              }}
              onClick={() => {
                setOpen(false);
                onAddNew();
              }}
            >
              <PlusCircle className="h-3.5 w-3.5 text-blue-400" strokeWidth={1.8} />
              Add
            </button>

            {/* Edit action */}
            <button
              className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-bg-card-hover)";
                e.currentTarget.style.color = "var(--color-accent-gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--color-text-secondary)";
              }}
              onClick={() => {
                setOpen(false);
                onEdit(article);
              }}
            >
              <Edit3 className="h-3.5 w-3.5 text-amber-400" strokeWidth={1.8} />
              Edit
            </button>

            {/* Delete action */}
            <button
              className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-bg-card-hover)";
                e.currentTarget.style.color = "var(--color-accent-red)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--color-text-secondary)";
              }}
              onClick={() => {
                setOpen(false);
                onDelete(article);
              }}
            >
              <Trash2 className="h-3.5 w-3.5 text-rose-400" strokeWidth={1.8} />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function TableRowItem({
  article,
  onAddNew,
  onEdit,
  onDelete,
}: {
  article: NewsArticle;
  onAddNew: () => void;
  onEdit: (a: NewsArticle) => void;
  onDelete: (a: NewsArticle) => void;
}) {
  return (
    <tr
      className="border-b transition-colors"
      style={{ borderColor: "var(--color-border-subtle)" }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-bg-card-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      {/* Thumb */}
      <td className="px-5 py-3">
        <div className="flex items-center">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="h-10 w-14 rounded-lg object-cover border"
            style={{ borderColor: "var(--color-border-0)" }}
          />
        </div>
      </td>

      {/* News Title & Author */}
      <td className="px-5 py-3">
        <div className="flex flex-col min-w-[200px] max-w-sm">
          <span
            className="text-xs font-semibold leading-tight line-clamp-1"
            style={{ color: "var(--color-text-primary-0)" }}
            title={article.title}
          >
            {article.title}
          </span>
          <span
            className="text-[11px] font-normal leading-tight mt-0.5 line-clamp-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            {article.author}
          </span>
        </div>
      </td>

      {/* Category */}
      <td className="px-5 py-3">
        <span
          className="text-xs font-normal"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {article.category}
        </span>
      </td>

      {/* Publish Date */}
      <td className="px-5 py-3">
        <span
          className="text-xs font-normal font-mono"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {article.publishDate}
        </span>
      </td>

      {/* Status */}
      <td className="px-5 py-3">
        <StatusBadge status={article.status} />
      </td>

      {/* Views */}
      <td className="px-5 py-3">
        <span
          className="text-xs font-normal"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {article.views.toLocaleString()}
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-3">
        <ActionMenu
          article={article}
          onAddNew={onAddNew}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}

// ── Main Table Component ───────────────────────────────────────────────────

export function NewsTable({
  articles,
  onAddNew,
  onEdit,
  onDelete,
}: NewsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div
      className="rounded-2xl border shadow-sm overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border-0)",
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left">
          <thead>
            <tr
              style={{
                backgroundColor: "var(--color-bg-primary-0)",
                borderBottom: "1px solid var(--color-border-0)",
              }}
            >
              {TABLE_HEADERS.map((col) => (
                <th
                  key={col}
                  className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {articles.length > 0 ? (
              articles.map((article) => (
                <TableRowItem
                  key={article.id}
                  article={article}
                  onAddNew={onAddNew}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={TABLE_HEADERS.length}
                  className="px-5 py-12 text-center text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  No news articles found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div
        className="px-4 py-3 sm:px-5 sm:py-3.5 border-t"
        style={{ borderColor: "var(--color-border-0)" }}
      >
        <Pagination
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onPageChange={setCurrentPage}
          align="end"
        />
      </div>
    </div>
  );
}
