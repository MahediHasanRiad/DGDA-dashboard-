import { useState, useMemo } from "react";
import { OfficesHero } from "./components/offices-hero";
import { OfficesFilterBar } from "./components/offices-filter-bar";
import { OfficesGrid } from "./components/offices-grid";
import { OfficeModal } from "./components/office-modal";
import {
  INITIAL_OFFICES,
  type OfficeRecord,
  type StatusFilter,
} from "./offices.data";

export default function OfficesPage() {
  const [offices, setOffices] = useState<OfficeRecord[]>(INITIAL_OFFICES);
  const [activeStatus, setActiveStatus] = useState<StatusFilter>("all");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [officeToEdit, setOfficeToEdit] = useState<OfficeRecord | null>(null);

  // Filtered offices based on status and region
  const filteredOffices = useMemo(() => {
    return offices.filter((item) => {
      const matchesStatus =
        activeStatus === "all" ||
        item.status.toLowerCase() === activeStatus.toLowerCase();

      const matchesRegion =
        selectedRegion === "All Regions" ||
        item.region.toLowerCase().includes(selectedRegion.toLowerCase());

      return matchesStatus && matchesRegion;
    });
  }, [offices, activeStatus, selectedRegion]);

  // Handlers
  const handleAddNew = () => {
    setOfficeToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (office: OfficeRecord) => {
    setOfficeToEdit(office);
    setIsModalOpen(true);
  };

  const handleDelete = (office: OfficeRecord) => {
    setOffices((prev) => prev.filter((o) => o.id !== office.id));
  };

  const handleSaveOffice = (
    savedData: Omit<OfficeRecord, "id"> & { id?: string }
  ) => {
    if (savedData.id) {
      setOffices((prev) =>
        prev.map((item) =>
          item.id === savedData.id
            ? ({
                ...item,
                ...savedData,
              } as OfficeRecord)
            : item
        )
      );
    } else {
      const newOffice: OfficeRecord = {
        ...savedData,
        id: `off-${Date.now()}`,
      };
      setOffices((prev) => [newOffice, ...prev]);
    }
  };

  return (
    <div
      className="min-h-full p-4 sm:p-6 space-y-4 sm:space-y-6"
      style={{ backgroundColor: "var(--color-bg-primary-0)" }}
    >
      {/* 1. Hero Banner */}
      <OfficesHero />

      {/* 2. Filter & Action Bar */}
      <OfficesFilterBar
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        onAddNewArea={handleAddNew}
      />

      {/* 3. Responsive 3-Column Grid */}
      <OfficesGrid
        offices={filteredOffices}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* 4. Add / Edit Modal */}
      <OfficeModal
        isOpen={isModalOpen}
        officeToEdit={officeToEdit}
        onClose={() => {
          setIsModalOpen(false);
          setOfficeToEdit(null);
        }}
        onSave={handleSaveOffice}
      />
    </div>
  );
}
