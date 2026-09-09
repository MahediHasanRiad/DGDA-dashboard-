import { useState } from "react";
import { toast } from "sonner";
import { Save, CheckCircle2 } from "lucide-react";
import { ContentHeroBanner } from "./content-hero-banner";
import { ContentRichEditor } from "./content-rich-editor";
import { type ContentDocument } from "../content-management.data";

interface ContentPageLayoutProps {
  initialDocument: ContentDocument;
  onSave?: (updatedContent: string) => void;
}

export function ContentPageLayout({
  initialDocument,
  onSave,
}: ContentPageLayoutProps) {
  const [content, setContent] = useState(initialDocument.content);
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      onSave?.(content);
      toast.success(`${initialDocument.cardTitle} updated successfully!`);
    }, 450);
  };

  return (
    <div
      className="min-h-full p-4 sm:p-6 space-y-6"
      style={{ backgroundColor: "var(--color-bg-primary-0)" }}
    >
      {/* 1. Hero Banner */}
      <ContentHeroBanner
        title={initialDocument.heroTitle}
        subtitle={initialDocument.subtitle}
      />

      {/* 2. Main Content Card */}
      <div
        className="rounded-2xl border p-6 sm:p-8 shadow-lg"
        style={{
          backgroundColor: "var(--color-bg-card)",
          borderColor: "var(--color-border-0)",
        }}
      >
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Card Title */}
          <div className="pb-4 border-b border-[#1C3352]/60 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {initialDocument.cardTitle}
            </h2>
            <span className="text-xs text-slate-400">
              Live mobile in-app document
            </span>
          </div>

          {/* Rich Text Editor */}
          <ContentRichEditor
            label="Content"
            placeholder="Enter your main content here..."
            value={content}
            onChange={setContent}
            minHeight="360px"
          />

          {/* Action Button */}
          <div className="flex items-center justify-end pt-2">
            <button
              id="update-content-btn"
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-7 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-50 disabled:cursor-not-allowed text-[#0B1728] text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Save className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
                  <span>Update Content</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
