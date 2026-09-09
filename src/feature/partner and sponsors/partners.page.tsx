import { useState, useMemo } from "react";
import { PartnersHero } from "./components/partners-hero";
import { PartnersFilterBar } from "./components/partners-filter-bar";
import { PartnersGrid } from "./components/partners-grid";
import { PartnerModal } from "./components/partner-modal";
import {
  INITIAL_PARTNERS,
  type PartnerRecord,
  type PartnerCategory,
} from "./partners.data";

export default function PartnersPage() {
  const [partners, setPartners] = useState<PartnerRecord[]>(INITIAL_PARTNERS);
  const [activeCategory, setActiveCategory] = useState<PartnerCategory>("Partners");

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partnerToEdit, setPartnerToEdit] = useState<PartnerRecord | null>(null);

  // Filtered partners
  const filteredPartners = useMemo(() => {
    return partners.filter((partner) => {
      if (activeCategory === "All") return true;
      if (activeCategory === "Partners") return partner.category === "Banking" || partner.category === "Logistics" || partner.category === "Insurance" || partner.category === "Partners";
      return partner.category === activeCategory;
    });
  }, [partners, activeCategory]);

  // Handlers
  const handleAddNew = () => {
    setPartnerToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (partner: PartnerRecord) => {
    setPartnerToEdit(partner);
    setIsModalOpen(true);
  };

  const handleDelete = (partner: PartnerRecord) => {
    setPartners((prev) => prev.filter((p) => p.id !== partner.id));
  };

  const handleSavePartner = (
    savedData: Omit<PartnerRecord, "id"> & { id?: string }
  ) => {
    if (savedData.id) {
      setPartners((prev) =>
        prev.map((item) =>
          item.id === savedData.id
            ? ({
                ...item,
                ...savedData,
              } as PartnerRecord)
            : item
        )
      );
    } else {
      const newPartner: PartnerRecord = {
        ...savedData,
        id: `partner-${Date.now()}`,
      };
      setPartners((prev) => [newPartner, ...prev]);
    }
  };

  return (
    <div
      className="min-h-full p-4 sm:p-6 space-y-4 sm:space-y-6"
      style={{ backgroundColor: "var(--color-bg-primary-0)" }}
    >
      {/* 1. Hero Banner */}
      <PartnersHero />

      {/* 2. Filter & Action Bar */}
      <PartnersFilterBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onAddNewPartner={handleAddNew}
      />

      {/* 3. 4-Column Responsive Grid with Pagination */}
      <PartnersGrid
        partners={filteredPartners}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* 4. Add / Edit Modal */}
      <PartnerModal
        isOpen={isModalOpen}
        partnerToEdit={partnerToEdit}
        onClose={() => {
          setIsModalOpen(false);
          setPartnerToEdit(null);
        }}
        onSave={handleSavePartner}
      />
    </div>
  );
}
