import React, { useState, useEffect, useRef } from "react";
import { X, Upload, Plus } from "lucide-react";
import { PARTNER_CATEGORIES, type PartnerRecord, type PartnerCategory } from "../partners.data";

// ── Types ──────────────────────────────────────────────────────────────────

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (partner: Omit<PartnerRecord, "id"> & { id?: string }) => void;
  partnerToEdit?: PartnerRecord | null;
}

// ── Component ──────────────────────────────────────────────────────────────

export function PartnerModal({
  isOpen,
  onClose,
  onSave,
  partnerToEdit,
}: PartnerModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<PartnerCategory>("Partners");
  const [tier, setTier] = useState("Official Partner");
  const [website, setWebsite] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (partnerToEdit) {
      setName(partnerToEdit.name);
      setCategory(partnerToEdit.category);
      setTier(partnerToEdit.tier || "Official Partner");
      setWebsite(partnerToEdit.website || "");
      setLogoUrl(partnerToEdit.logoUrl);
      setLogoPreview(partnerToEdit.logoUrl);
    } else {
      setName("");
      setCategory("Partners");
      setTier("Official Partner");
      setWebsite("");
      setLogoUrl("");
      setLogoPreview(null);
    }
  }, [partnerToEdit, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoUrl(result);
        setLogoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLogoUrl("");
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    const currentMonthYear = `${months[now.getMonth()]} ${now.getFullYear()}`;

    // Fallback logo if none uploaded
    const defaultLogo = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40"><rect width="160" height="40" fill="white"/><text x="20" y="25" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="%231E3A8A">${encodeURIComponent(
      name.trim().slice(0, 16)
    )}</text></svg>`;

    onSave({
      id: partnerToEdit?.id,
      name: name.trim(),
      category: category === "All" ? "Partners" : category,
      tier: tier.trim() || "Official Partner",
      website: website.trim() || undefined,
      logoUrl: logoUrl || defaultLogo,
      status: partnerToEdit?.status || "Active",
      createdAt: partnerToEdit?.createdAt || currentMonthYear,
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
        className="relative w-full max-w-xl my-4 sm:my-8 rounded-2xl sm:rounded-3xl border shadow-2xl p-5 sm:p-8 text-left max-h-[92vh] overflow-y-auto"
        style={{
          backgroundColor: "#102035",
          borderColor: "var(--color-border-0)",
        }}
      >
        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-3 mb-5 sm:mb-6">
          <div className="min-w-0 flex-1">
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-snug"
              style={{ color: "var(--color-text-primary-0)" }}
            >
              {partnerToEdit ? "Edit Listing or Campaign" : "Add Listing or Campaign"}
            </h2>
            <p
              className="text-xs sm:text-sm mt-1 sm:mt-1.5 font-normal leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Publishes business profile or advertising banner to the DGDA Mobile App.
            </p>
          </div>

          {/* Red square close button */}
          <button
            id="partner-modal-close-btn"
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg text-white shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            style={{ backgroundColor: "#EF4444" }}
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
          </button>
        </div>

        {/* ── Form Body ── */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* 1. Category */}
          <div>
            <label
              htmlFor="partner-category-select"
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--color-text-primary-0)" }}
            >
              Category
            </label>
            <select
              id="partner-category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value as PartnerCategory)}
              className="w-full rounded-xl px-4 py-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner cursor-pointer"
              style={{
                backgroundColor: "#DCE6F2",
                color: "#0F172A",
                border: "1px solid #C4D3E5",
              }}
            >
              {PARTNER_CATEGORIES.filter((c) => c !== "All").map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Company Name */}
          <div>
            <label
              htmlFor="partner-name-input"
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--color-text-primary-0)" }}
            >
              Company Name <span className="text-red-400">*</span>
            </label>
            <input
              id="partner-name-input"
              type="text"
              required
              placeholder="Bollore RDC or Rawbank"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-500 shadow-inner"
              style={{
                backgroundColor: "#DCE6F2",
                color: "#0F172A",
                border: "1px solid #C4D3E5",
              }}
            />
          </div>

          {/* 3. Partner Tier / Tag */}
          <div>
            <label
              htmlFor="partner-tier-input"
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--color-text-primary-0)" }}
            >
              Partner Tag / Tier
            </label>
            <input
              id="partner-tier-input"
              type="text"
              placeholder="Official Partner, Logistics Partner, Gold Sponsor"
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-500 shadow-inner"
              style={{
                backgroundColor: "#DCE6F2",
                color: "#0F172A",
                border: "1px solid #C4D3E5",
              }}
            />
          </div>

          {/* 4. Image Upload Box */}
          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--color-text-primary-0)" }}
            >
              Image
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
              className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed py-7 sm:py-9 px-3 sm:px-6 transition-all cursor-pointer group"
              style={{
                borderColor: "#23426A",
                backgroundColor: "#0B1728",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#3B82F6")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#23426A")}
            >
              {logoPreview && (
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

              {logoPreview ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-16 w-36 sm:h-20 sm:w-44 items-center justify-center rounded-xl bg-white p-3 shadow-md border border-slate-200/20 overflow-hidden">
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Click to replace logo
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
              className="w-full sm:w-auto rounded-xl px-6 py-2.5 text-xs sm:text-sm font-semibold transition-colors hover:bg-slate-300 shadow-sm text-center cursor-pointer"
              style={{
                backgroundColor: "#CBD5E1",
                color: "#0B1728",
              }}
            >
              Cancel
            </button>
            <button
              id="partner-submit-btn"
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-xl px-6 py-2.5 text-xs sm:text-sm font-bold shadow-md transition-all hover:opacity-90 active:scale-95 text-center cursor-pointer"
              style={{
                backgroundColor: "var(--color-accent-gold)",
                color: "#0B1728",
              }}
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              <span>Save & Publish</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
