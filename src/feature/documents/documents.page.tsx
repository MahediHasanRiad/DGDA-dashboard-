import { useState, useMemo } from "react";
import { DocumentHero } from "./components/document-hero";
import { DocumentFilterBar } from "./components/document-filter-bar";
import { DocumentGrid } from "./components/document-grid";
import { DocumentModal } from "./components/document-modal";
import {
  INITIAL_DOCUMENTS,
  type DocumentRecord,
  type DocumentCategory,
} from "./documents.data";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentRecord[]>(INITIAL_DOCUMENTS);
  const [activeCategory, setActiveCategory] = useState<DocumentCategory>("All");

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentToEdit, setDocumentToEdit] = useState<DocumentRecord | null>(null);

  // Filtered documents
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      if (activeCategory === "All") return true;
      return doc.category === activeCategory;
    });
  }, [documents, activeCategory]);

  // Handlers
  const handleAddNew = () => {
    setDocumentToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (doc: DocumentRecord) => {
    setDocumentToEdit(doc);
    setIsModalOpen(true);
  };

  const handleDelete = (doc: DocumentRecord) => {
    setDocuments((prev) => prev.filter((d) => d.id !== doc.id));
  };

  const handleSaveDocument = (
    savedData: Omit<DocumentRecord, "id"> & { id?: string }
  ) => {
    if (savedData.id) {
      setDocuments((prev) =>
        prev.map((item) =>
          item.id === savedData.id
            ? ({
                ...item,
                ...savedData,
              } as DocumentRecord)
            : item
        )
      );
    } else {
      const newDoc: DocumentRecord = {
        ...savedData,
        id: `doc-${Date.now()}`,
      };
      setDocuments((prev) => [newDoc, ...prev]);
    }
  };

  return (
    <div
      className="min-h-full p-4 sm:p-6 space-y-4 sm:space-y-6"
      style={{ backgroundColor: "var(--color-bg-primary-0)" }}
    >
      {/* 1. Hero Banner */}
      <DocumentHero />

      {/* 2. Filter & Action Bar */}
      <DocumentFilterBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onAddNewDocument={handleAddNew}
      />

      {/* 3. 3-Column Responsive Grid with Pagination */}
      <DocumentGrid
        documents={filteredDocuments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* 4. Add / Edit Modal */}
      <DocumentModal
        isOpen={isModalOpen}
        documentToEdit={documentToEdit}
        onClose={() => {
          setIsModalOpen(false);
          setDocumentToEdit(null);
        }}
        onSave={handleSaveDocument}
      />
    </div>
  );
}
