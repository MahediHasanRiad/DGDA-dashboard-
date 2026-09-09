import React, { useState, useEffect, useRef } from "react";
import { X, Upload, FileText } from "lucide-react";
import type { DocumentRecord, DocumentCategory } from "../documents.data";

// ── Types ──────────────────────────────────────────────────────────────────

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (doc: Omit<DocumentRecord, "id"> & { id?: string }) => void;
  documentToEdit?: DocumentRecord | null;
}

// ── Modal Component ────────────────────────────────────────────────────────

export function DocumentModal({
  isOpen,
  onClose,
  onSave,
  documentToEdit,
}: DocumentModalProps) {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("/assets/news/cargo-ship.jpg");
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>("/assets/news/cargo-ship.jpg");
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);
  const [pdfFileSize, setPdfFileSize] = useState("2.4 MB");
  const [category, setCategory] = useState<DocumentCategory>("Procedures & Forms");

  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (documentToEdit) {
      setTitle(documentToEdit.title);
      setThumbnail(documentToEdit.thumbnail);
      setThumbnailPreview(documentToEdit.thumbnail);
      setPdfFileName(`${documentToEdit.title}.pdf`);
      setPdfFileSize(documentToEdit.size);
      setCategory(documentToEdit.category);
    } else {
      setTitle("");
      setThumbnail("/assets/news/cargo-ship.jpg");
      setThumbnailPreview(null);
      setPdfFileName(null);
      setPdfFileSize("2.4 MB");
      setCategory("Procedures & Forms");
    }
  }, [documentToEdit, isOpen]);

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
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFileName(file.name);
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
      setPdfFileSize(`${sizeInMB} MB`);
    }
  };

  const handleRemovePdf = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPdfFileName(null);
    if (pdfInputRef.current) {
      pdfInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    const currentMonthYear = `${months[now.getMonth()]} ${now.getFullYear()}`;

    onSave({
      id: documentToEdit?.id,
      title: title.trim(),
      category: category === "All" ? "Procedures & Forms" : category,
      format: "PDF",
      size: pdfFileSize || "2.4 MB",
      date: documentToEdit?.date || currentMonthYear,
      thumbnail: thumbnail || "/assets/news/cargo-ship.jpg",
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      style={{ backgroundColor: "rgba(8, 16, 28, 0.88)", backdropFilter: "blur(6px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-xl my-4 sm:my-8 rounded-2xl sm:rounded-3xl border shadow-2xl p-4 sm:p-7 md:p-8 text-left max-h-[92vh] overflow-y-auto"
        style={{
          backgroundColor: "#102035",
          borderColor: "var(--color-border-0)",
        }}
      >
        {/* ── Top Header ── */}
        <div className="flex items-start justify-between gap-3 mb-4 sm:mb-6">
          <div className="min-w-0 flex-1">
            <h2
              className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight leading-snug"
              style={{ color: "var(--color-text-primary-0)" }}
            >
              Upload Official Customs Document
            </h2>
            <p
              className="text-xs sm:text-sm mt-1 sm:mt-1.5 font-normal leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Publishes PDF file to the DGDA Mobile App's "DGDA Services Document" section.
            </p>
          </div>

          {/* Red square close button */}
          <button
            id="doc-modal-close-btn"
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg text-white shadow-md transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#EF4444" }}
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
          </button>
        </div>

        {/* ── Form Body ── */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* 1. Pdf Title */}
          <div>
            <label
              htmlFor="doc-title-input"
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--color-text-primary-0)" }}
            >
              Pdf title
            </label>
            <input
              id="doc-title-input"
              type="text"
              required
              placeholder="Matadi Maritime port Customs Bureas"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-500 shadow-inner"
              style={{
                backgroundColor: "#DCE6F2",
                color: "#0F172A",
                border: "1px solid #C4D3E5",
              }}
            />
          </div>

          {/* 2. Thumbnail Image Upload Box */}
          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--color-text-primary-0)" }}
            >
              Thumbnail Image
            </label>

            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            <div
              onClick={() => imageInputRef.current?.click()}
              className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed py-6 sm:py-9 px-3 sm:px-6 transition-all cursor-pointer group"
              style={{
                borderColor: "#23426A",
                backgroundColor: "#0B1728",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#3B82F6")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#23426A")}
            >
              {thumbnailPreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-md text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "rgba(239, 68, 68, 0.8)" }}
                  title="Remove image"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>
              )}

              {thumbnailPreview ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="h-20 w-32 sm:h-24 sm:w-40 rounded-xl object-cover border shadow-md"
                    style={{ borderColor: "var(--color-border-0)" }}
                  />
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Click to change thumbnail
                  </span>
                </div>
              ) : (
                <>
                  <div
                    className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl text-white shadow-md transition-transform group-hover:scale-105"
                    style={{ backgroundColor: "#F59E0B" }}
                  >
                    <Upload className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <span
                    className="mt-2 text-xs font-medium"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Click to browse
                  </span>
                </>
              )}
            </div>
          </div>

          {/* 3. Upload PDF Box */}
          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--color-text-primary-0)" }}
            >
              Upload pdf
            </label>

            <input
              ref={pdfInputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={handlePdfUpload}
            />

            <div
              onClick={() => pdfInputRef.current?.click()}
              className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed py-6 sm:py-9 px-3 sm:px-6 transition-all cursor-pointer group"
              style={{
                borderColor: "#23426A",
                backgroundColor: "#0B1728",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#3B82F6")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#23426A")}
            >
              {pdfFileName && (
                <button
                  type="button"
                  onClick={handleRemovePdf}
                  className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-md text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "rgba(239, 68, 68, 0.8)" }}
                  title="Remove PDF"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>
              )}

              {pdfFileName ? (
                <div className="flex flex-col items-center gap-2 max-w-full">
                  <div className="flex items-center gap-2 rounded-xl px-3 sm:px-4 py-2 bg-[#13243C] border border-[#1C3352] max-w-full">
                    <FileText className="h-5 w-5 text-amber-400 shrink-0" />
                    <span className="text-xs font-semibold text-white truncate max-w-[140px] sm:max-w-[220px]">
                      {pdfFileName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">
                      ({pdfFileSize})
                    </span>
                  </div>
                  <span
                    className="text-[11px] font-medium text-center"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Click to replace PDF file
                  </span>
                </div>
              ) : (
                <>
                  <div
                    className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl text-white shadow-md transition-transform group-hover:scale-105"
                    style={{ backgroundColor: "#F59E0B" }}
                  >
                    <Upload className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <span
                    className="mt-2 text-xs font-medium"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Click to browse
                  </span>
                </>
              )}
            </div>
          </div>

          {/* ── Footer Buttons ── */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-3 border-t border-[#1C3352]">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto rounded-xl px-6 py-2.5 text-xs sm:text-sm font-semibold transition-colors hover:bg-slate-300 shadow-sm text-center"
              style={{
                backgroundColor: "#CBD5E1",
                color: "#0B1728",
              }}
            >
              Cancel
            </button>
            <button
              id="doc-submit-btn"
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-xs sm:text-sm font-bold shadow-md transition-all hover:opacity-90 active:scale-95 text-center"
              style={{
                backgroundColor: "var(--color-accent-gold)",
                color: "#0B1728",
              }}
            >
              <Upload className="h-4 w-4" strokeWidth={2.2} />
              <span>Upload & Publish To App</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
