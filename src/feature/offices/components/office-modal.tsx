import { useState, useEffect } from "react";
import { X, Check, Plus, ChevronDown } from "lucide-react";
import { REGIONS, type OfficeRecord, type OfficeStatus } from "../offices.data";

// ── Types ──────────────────────────────────────────────────────────────────

interface OfficeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (office: Omit<OfficeRecord, "id"> & { id?: string }) => void;
  officeToEdit?: OfficeRecord | null;
}

const AVAILABLE_TAGS = [
  "Import",
  "Export",
  "Transit",
  "Maritime Port",
  "Border Post",
  "Airport Terminal",
  "Dry Port",
];

// ── Modal Component ────────────────────────────────────────────────────────

export function OfficeModal({
  isOpen,
  onClose,
  onSave,
  officeToEdit,
}: OfficeModalProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<OfficeStatus>("OPEN");
  const [stationCode, setStationCode] = useState("CD-STN-437");
  const [operatingHours, setOperatingHours] = useState("24/7 Continuous Clearance");
  const [phone, setPhone] = useState("+243 81 500 2424");
  const [region, setRegion] = useState(REGIONS[1]);
  const [bureauHead, setBureauHead] = useState("Inspecteur Principal");
  const [physicalAddress, setPhysicalAddress] = useState("Zone Portuaire / Frontalière");
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Import",
    "Export",
    "Border Post",
    "Airport Terminal",
    "Dry Port",
  ]);

  useEffect(() => {
    if (officeToEdit) {
      setName(officeToEdit.name);
      setStatus(officeToEdit.status);
      setStationCode(officeToEdit.stationCode);
      setOperatingHours(officeToEdit.corridorHours);
      setPhone(officeToEdit.phone);
      setRegion(officeToEdit.region.split(" ")[0] || REGIONS[1]);
      setBureauHead(officeToEdit.authority);
      setPhysicalAddress(officeToEdit.customsOffice);
      setSelectedTags(officeToEdit.tags);
    } else {
      setName("");
      setStatus("OPEN");
      setStationCode("CD-STN-437");
      setOperatingHours("24/7 Continuous Clearance");
      setPhone("+243 81 500 2424");
      setRegion(REGIONS[1]);
      setBureauHead("Inspecteur Principal");
      setPhysicalAddress("Zone Portuaire / Frontalière");
      setSelectedTags([
        "Import",
        "Export",
        "Border Post",
        "Airport Terminal",
        "Dry Port",
      ]);
    }
  }, [officeToEdit, isOpen]);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id: officeToEdit?.id,
      codeBadge: `[${(stationCode.split("-")[1] || "CDMAT").toUpperCase()}]`,
      name: name.trim(),
      type: "Primary Maritime Port",
      customsOffice: physicalAddress.trim() || `${name} Customs Office`,
      corridorHours: operatingHours.trim(),
      stationCode: stationCode.trim(),
      region: `${region} (Matadi,Boma,Lufu)`,
      authority: bureauHead.trim(),
      juxtaposedPost: "Poste Frontalier Juxtaposé DRC-Zambia, Kasumbalesa",
      tags: selectedTags.length ? selectedTags : ["Import", "Export"],
      phone: phone.trim(),
      status,
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
        className="relative w-full max-w-2xl my-6 sm:my-8 rounded-2xl sm:rounded-3xl border shadow-2xl p-4 sm:p-8 text-left max-h-[92vh] overflow-y-auto"
        style={{
          backgroundColor: "#102035",
          borderColor: "var(--color-border-0)",
        }}
      >
        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-3 mb-5 sm:mb-6">
          <div className="min-w-0">
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight"
              style={{ color: "var(--color-text-primary-0)" }}
            >
              {officeToEdit ? officeToEdit.name : "Jean-Luc Kazadi"}
            </h2>
            <p
              className="text-xs sm:text-sm mt-1 font-normal"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {officeToEdit
                ? `${officeToEdit.type} · ${officeToEdit.stationCode}`
                : "FCustoms Broker · Member since 2026-06-12"}
            </p>
          </div>

          {/* Red square close button */}
          <button
            id="office-modal-close-btn"
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg text-white shadow-md transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#EF4444" }}
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
          </button>
        </div>

        {/* ── Form Body ── */}
        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
          {/* 1. Office Name */}
          <div>
            <label
              htmlFor="office-name-input"
              className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
              style={{ color: "var(--color-text-primary-0)" }}
            >
              Office Name *
            </label>
            <input
              id="office-name-input"
              type="text"
              required
              placeholder="e.g. Matadi Maritime port Customs Bureas"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-500 shadow-inner"
              style={{
                backgroundColor: "#DCE6F2",
                color: "#0F172A",
                border: "1px solid #C4D3E5",
              }}
            />
          </div>

          {/* 2. Open / Closed Status Toggle & Customs Station Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: "var(--color-text-primary-0)" }}
              >
                Open / Closed Status Toggle *
              </label>
              <div className="relative">
                <select
                  id="office-status-toggle"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as OfficeStatus)}
                  className="w-full appearance-none rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer shadow-inner pr-10"
                  style={{
                    backgroundColor: "#DCE6F2",
                    color: "#0F172A",
                    border: "1px solid #C4D3E5",
                  }}
                >
                  <option value="OPEN">Currently Operating:</option>
                  <option value="CLOSED">Currently Closed:</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
              </div>
            </div>

            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: "var(--color-text-primary-0)" }}
              >
                Customs Station Code *
              </label>
              <input
                id="office-station-code"
                type="text"
                required
                placeholder="CD-STN-437"
                value={stationCode}
                onChange={(e) => setStationCode(e.target.value)}
                className="w-full rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-500 shadow-inner"
                style={{
                  backgroundColor: "#DCE6F2",
                  color: "#0F172A",
                  border: "1px solid #C4D3E5",
                }}
              />
            </div>
          </div>

          {/* 3. Operating Hours & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: "var(--color-text-primary-0)" }}
              >
                Operating Hours *
              </label>
              <input
                id="office-operating-hours"
                type="text"
                required
                placeholder="24/7 Continuous Clearance"
                value={operatingHours}
                onChange={(e) => setOperatingHours(e.target.value)}
                className="w-full rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-500 shadow-inner"
                style={{
                  backgroundColor: "#DCE6F2",
                  color: "#0F172A",
                  border: "1px solid #C4D3E5",
                }}
              />
            </div>

            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: "var(--color-text-primary-0)" }}
              >
                Phone Number *
              </label>
              <input
                id="office-phone-number"
                type="text"
                required
                placeholder="+243 81 500 2424"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-500 shadow-inner"
                style={{
                  backgroundColor: "#DCE6F2",
                  color: "#0F172A",
                  border: "1px solid #C4D3E5",
                }}
              />
            </div>
          </div>

          {/* 4. Region / Province & Bureau Head / Manager */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: "var(--color-text-primary-0)" }}
              >
                Region / Province
              </label>
              <div className="relative">
                <select
                  id="office-region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full appearance-none rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer shadow-inner pr-10"
                  style={{
                    backgroundColor: "#DCE6F2",
                    color: "#0F172A",
                    border: "1px solid #C4D3E5",
                  }}
                >
                  {REGIONS.filter((r) => r !== "All Regions").map((r) => (
                    <option key={r} value={r}>
                      {r} (Matadi,Boma,Lufu)
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
              </div>
            </div>

            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: "var(--color-text-primary-0)" }}
              >
                Bureau Head / Manager
              </label>
              <input
                id="office-bureau-head"
                type="text"
                placeholder="Inspecteur Principal"
                value={bureauHead}
                onChange={(e) => setBureauHead(e.target.value)}
                className="w-full rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-500 shadow-inner"
                style={{
                  backgroundColor: "#DCE6F2",
                  color: "#0F172A",
                  border: "1px solid #C4D3E5",
                }}
              />
            </div>
          </div>

          {/* 5. Physical Office Address */}
          <div>
            <label
              htmlFor="office-address-input"
              className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
              style={{ color: "var(--color-text-primary-0)" }}
            >
              Physical Office Address
            </label>
            <input
              id="office-address-input"
              type="text"
              placeholder="Zone Portuaire / Frontalière"
              value={physicalAddress}
              onChange={(e) => setPhysicalAddress(e.target.value)}
              className="w-full rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-500 shadow-inner"
              style={{
                backgroundColor: "#DCE6F2",
                color: "#0F172A",
                border: "1px solid #C4D3E5",
              }}
            />
          </div>

          {/* 6. Customs Regimes & Facility Tags (Select Multiple) */}
          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--color-text-primary-0)" }}
            >
              Customs Regimes & Facility Tags (Select Multiple)
            </label>

            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    id={`tag-toggle-${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => toggleTag(tag)}
                    className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold transition-all duration-150 active:scale-95 shadow-sm"
                    style={
                      isSelected
                        ? {
                            backgroundColor: "#DCE6F2",
                            color: "#0F172A",
                            border: "1px solid #C4D3E5",
                          }
                        : {
                            backgroundColor: "#0B1728",
                            color: "var(--color-text-secondary)",
                            border: "1px solid #1C3352",
                          }
                    }
                  >
                    {isSelected ? (
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    ) : (
                      <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                    )}
                    <span>{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Bottom Action Buttons ── */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-[#1C3352]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-6 py-2.5 text-xs sm:text-sm font-semibold transition-colors hover:bg-slate-300 shadow-sm text-center"
              style={{
                backgroundColor: "#CBD5E1",
                color: "#0B1728",
              }}
            >
              Cancel
            </button>
            <button
              id="office-submit-btn"
              type="submit"
              className="rounded-xl px-6 py-2.5 text-xs sm:text-sm font-bold shadow-md transition-all hover:opacity-90 active:scale-95 text-center"
              style={{
                backgroundColor: "var(--color-accent-gold)",
                color: "#0B1728",
              }}
            >
              {officeToEdit ? "Save Changes" : "Add Services Area"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
