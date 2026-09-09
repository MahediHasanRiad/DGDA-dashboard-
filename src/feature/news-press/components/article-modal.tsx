import React, { useState, useEffect, useRef } from "react";
import { X, Upload } from "lucide-react";
import { RichTextEditor } from "./rich-text-editor";
import type { NewsArticle, ArticleStatus } from "../news-press.data";

// ── Types ──────────────────────────────────────────────────────────────────

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: Omit<NewsArticle, "id" | "views"> & { id?: string }) => void;
  articleToEdit?: NewsArticle | null;
}

// ── Modal Component ────────────────────────────────────────────────────────

export function ArticleModal({
  isOpen,
  onClose,
  onSave,
  articleToEdit,
}: ArticleModalProps) {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState<string>("/assets/news/cargo-ship.jpg");
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>("/assets/news/cargo-ship.jpg");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("By Direction des Systèmes d'Information DGDA");
  const [category, setCategory] = useState("Customs Regulations");
  const [status, setStatus] = useState<ArticleStatus>("PUBLISHED");
  const [publishDate, setPublishDate] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (articleToEdit) {
      setTitle(articleToEdit.title);
      setAuthor(articleToEdit.author);
      setCategory(articleToEdit.category);
      setStatus(articleToEdit.status);
      setPublishDate(articleToEdit.publishDate);
      setThumbnail(articleToEdit.thumbnail);
      setThumbnailPreview(articleToEdit.thumbnail);
      setContent(articleToEdit.content ?? "");
    } else {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      setTitle("");
      setAuthor("By Direction des Systèmes d'Information DGDA");
      setCategory("Customs Regulations");
      setStatus("PUBLISHED");
      setPublishDate(`${dd}/${mm}/${yyyy}`);
      setThumbnail("/assets/news/cargo-ship.jpg");
      setThumbnailPreview(null);
      setContent("");
    }
  }, [articleToEdit, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setThumbnail(result);
        setThumbnailPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setThumbnail("/assets/news/cargo-ship.jpg");
    setThumbnailPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: articleToEdit?.id,
      title: title.trim(),
      author: author.trim() || "By Direction des Systèmes d'Information DGDA",
      category: category || "Customs Regulations",
      status: status || "PUBLISHED",
      publishDate: publishDate || "DD/MM/YYYY",
      thumbnail: thumbnail || "/assets/news/cargo-ship.jpg",
      content: content.trim(),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      style={{ backgroundColor: "rgba(8, 16, 28, 0.88)", backdropFilter: "blur(6px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-3xl my-8 rounded-3xl border shadow-2xl p-6 sm:p-9 text-left"
        style={{
          backgroundColor: "#102035",
          borderColor: "var(--color-border-0)",
        }}
      >
        {/* ── Top Header ── */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="min-w-0">
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight"
              style={{ color: "var(--color-text-primary-0)" }}
            >
              {articleToEdit ? "Edit News Article" : "Create News Article"}
            </h2>
            <p
              className="text-xs sm:text-sm mt-1.5 font-normal"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Feeds the DGDA Mobile App news carousel and trade regulatory bulletin.
            </p>
          </div>

          {/* Red square close button matching screenshot */}
          <button
            id="article-modal-close-btn"
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white shadow-md transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#EF4444" }}
          >
            <X className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>

        {/* ── Form Body ── */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. Article Title */}
          <div>
            <label
              htmlFor="article-title-input"
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--color-text-primary-0)" }}
            >
              Article Title *
            </label>
            <input
              id="article-title-input"
              type="text"
              required
              placeholder="enter value"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-500 shadow-inner"
              style={{
                backgroundColor: "#DCE6F2",
                color: "#0F172A",
                border: "1px solid #C4D3E5",
              }}
            />
          </div>

          {/* 2. Thumbnail Image Upload & Selection */}
          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--color-text-primary-0)" }}
            >
              Thumbnail Image Upload & Selection
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed py-10 px-6 transition-all cursor-pointer group"
              style={{
                borderColor: "#23426A",
                backgroundColor: "#0B1728",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#3B82F6")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#23426A")}
            >
              {/* Optional top-right red X button */}
              {thumbnailPreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-md text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "rgba(239, 68, 68, 0.8)" }}
                  title="Remove image"
                >
                  <X className="h-4 w-4" strokeWidth={2.5} />
                </button>
              )}

              {thumbnailPreview ? (
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={thumbnailPreview}
                    alt="Preview"
                    className="h-28 w-44 rounded-xl object-cover border shadow-md"
                    style={{ borderColor: "var(--color-border-0)" }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Click to change image
                  </span>
                </div>
              ) : (
                <>
                  {/* Yellow upload square button */}
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md transition-transform group-hover:scale-105"
                    style={{ backgroundColor: "#F59E0B" }}
                  >
                    <Upload className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <span
                    className="mt-3 text-xs font-medium"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Click to browse
                  </span>
                </>
              )}
            </div>
          </div>

          {/* 3. Article Body (Rich Text) with Library-driven Quill Editor */}
          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--color-text-primary-0)" }}
            >
              Article Body (Rich Text) *
            </label>

            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Enter your main content here..."
            />
          </div>

          {/* ── Footer Buttons ── */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-6 py-2.5 text-xs sm:text-sm font-semibold transition-colors hover:bg-slate-300 shadow-sm"
              style={{
                backgroundColor: "#CBD5E1",
                color: "#0B1728",
              }}
            >
              Cancel
            </button>
            <button
              id="article-publish-btn"
              type="submit"
              className="rounded-lg px-7 py-2.5 text-xs sm:text-sm font-semibold transition-all hover:opacity-90 active:scale-95 shadow-md"
              style={{
                backgroundColor: "#F59E0B",
                color: "#0B1728",
              }}
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
