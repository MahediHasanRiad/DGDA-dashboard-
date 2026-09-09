import { useState } from "react";
import { toast } from "sonner";
import { FAQHeroBanner } from "./components/faq-hero-banner";
import { FAQTable } from "./components/faq-table";
import { FAQAddModal } from "./components/faq-add-modal";
import { FAQViewModal } from "./components/faq-view-modal";
import { INITIAL_FAQ_ITEMS, type FAQItem } from "./faq.data";

export default function FAQPage() {
  const [faqItems, setFaqItems] = useState<FAQItem[]>(INITIAL_FAQ_ITEMS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<FAQItem | null>(null);
  const [itemToView, setItemToView] = useState<FAQItem | null>(null);

  // Save (Create or Edit)
  const handleSaveFAQ = (data: Omit<FAQItem, "id" | "no"> & { id?: string }) => {
    if (data.id) {
      setFaqItems((prev) =>
        prev.map((item) =>
          item.id === data.id
            ? ({
                ...item,
                ...data,
              } as FAQItem)
            : item
        )
      );
      toast.success("FAQ updated successfully");
    } else {
      const newItem: FAQItem = {
        ...data,
        id: `faq-${Date.now()}`,
        no: faqItems.length + 1,
      };
      setFaqItems((prev) => [newItem, ...prev]);
      toast.success("New FAQ added successfully");
    }
  };

  // Toggle status
  const handleToggleStatus = (item: FAQItem) => {
    const nextStatus = item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    setFaqItems((prev) =>
      prev.map((f) => (f.id === item.id ? { ...f, status: nextStatus } : f))
    );
    toast.success(`FAQ marked as ${nextStatus.toLowerCase()}`);
  };

  // Delete
  const handleDelete = (item: FAQItem) => {
    setFaqItems((prev) => prev.filter((f) => f.id !== item.id));
    toast.success("FAQ item deleted");
  };

  return (
    <div
      className="min-h-full p-4 sm:p-6 space-y-5"
      style={{ backgroundColor: "var(--color-bg-primary-0)" }}
    >
      {/* 1. Hero Banner */}
      <FAQHeroBanner />

      {/* 2. Main FAQ Table */}
      <FAQTable
        items={faqItems}
        onAdd={() => {
          setItemToEdit(null);
          setIsAddModalOpen(true);
        }}
        onView={(item) => setItemToView(item)}
        onEdit={(item) => {
          setItemToEdit(item);
          setIsAddModalOpen(true);
        }}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
      />

      {/* 3. Add / Edit FAQ Modal */}
      <FAQAddModal
        isOpen={isAddModalOpen}
        itemToEdit={itemToEdit}
        onClose={() => {
          setIsAddModalOpen(false);
          setItemToEdit(null);
        }}
        onSave={handleSaveFAQ}
      />

      {/* 4. View FAQ Details Modal */}
      <FAQViewModal
        item={itemToView}
        onClose={() => setItemToView(null)}
        onEdit={(item) => {
          setItemToView(null);
          setItemToEdit(item);
          setIsAddModalOpen(true);
        }}
      />
    </div>
  );
}
