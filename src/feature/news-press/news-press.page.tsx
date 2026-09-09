import { useState, useMemo } from "react";
import { NewsHero } from "./components/news-hero";
import { NewsStatCards } from "./components/news-stat-cards";
import { NewsFilterBar } from "./components/news-filter-bar";
import { NewsTable } from "./components/news-table";
import { ArticleModal } from "./components/article-modal";
import { DeleteConfirmModal } from "./components/delete-confirm-modal";
import {
  INITIAL_ARTICLES,
  type NewsArticle,
  type NewsFilter,
} from "./news-press.data";

export default function NewsPressPage() {
  const [articles, setArticles] = useState<NewsArticle[]>(INITIAL_ARTICLES);
  const [activeFilter, setActiveFilter] = useState<NewsFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [articleToEdit, setArticleToEdit] = useState<NewsArticle | null>(null);
  const [articleToDelete, setArticleToDelete] = useState<NewsArticle | null>(null);

  // Filtered and searched articles
  const filteredArticles = useMemo(() => {
    return articles.filter((item) => {
      const matchesFilter =
        activeFilter === "all" ||
        item.status.toLowerCase() === activeFilter.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [articles, activeFilter, searchQuery]);

  // Statistics calculation
  const totalPublished = useMemo(
    () => articles.filter((a) => a.status === "PUBLISHED").length,
    [articles]
  );
  const totalDrafts = useMemo(
    () => articles.filter((a) => a.status === "DRAFT").length,
    [articles]
  );

  // Handlers
  const handleAddNew = () => {
    setArticleToEdit(null);
    setIsArticleModalOpen(true);
  };

  const handleEdit = (article: NewsArticle) => {
    setArticleToEdit(article);
    setIsArticleModalOpen(true);
  };

  const handleDeletePrompt = (article: NewsArticle) => {
    setArticleToDelete(article);
  };

  const handleSaveArticle = (
    savedData: Omit<NewsArticle, "id" | "views"> & { id?: string }
  ) => {
    if (savedData.id) {
      // Edit existing
      setArticles((prev) =>
        prev.map((item) =>
          item.id === savedData.id
            ? {
                ...item,
                ...savedData,
              }
            : item
        )
      );
    } else {
      // Add new
      const newArticle: NewsArticle = {
        ...savedData,
        id: `art-${Date.now()}`,
        views: 0,
      };
      setArticles((prev) => [newArticle, ...prev]);
    }
  };

  const handleConfirmDelete = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div
      className="min-h-full p-6 space-y-6"
      style={{ backgroundColor: "var(--color-bg-primary-0)" }}
    >
      {/* Hero Banner */}
      <NewsHero />

      {/* 3D Stat Cards */}
      <NewsStatCards
        totalPublished={totalPublished > 0 ? 500 : 0}
        totalDrafts={totalDrafts > 0 ? 25 : 0}
        totalViews="10.9k"
      />

      {/* Filter and Action Bar */}
      <NewsFilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddNewArticle={handleAddNew}
      />

      {/* Main Table */}
      <NewsTable
        articles={filteredArticles}
        onAddNew={handleAddNew}
        onEdit={handleEdit}
        onDelete={handleDeletePrompt}
      />

      {/* Add / Edit Modal */}
      <ArticleModal
        isOpen={isArticleModalOpen}
        articleToEdit={articleToEdit}
        onClose={() => {
          setIsArticleModalOpen(false);
          setArticleToEdit(null);
        }}
        onSave={handleSaveArticle}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!articleToDelete}
        article={articleToDelete}
        onClose={() => setArticleToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
