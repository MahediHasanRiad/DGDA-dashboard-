import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AIHeroBanner } from "./components/ai-hero-banner";
import { AIFilterTabs, type TabType } from "./components/ai-filter-tabs";
import { AIQATable } from "./components/ai-qa-table";
import { AIRegulatoryDocsTable } from "./components/ai-regulatory-docs-table";
import { AIAddQAModal } from "./components/ai-add-qa-modal";
import { AIViewQAModal } from "./components/ai-view-qa-modal";
import { AITestConsoleModal } from "./components/ai-test-console-modal";
import {
  INITIAL_QA_ITEMS,
  INITIAL_REGULATORY_DOCS,
  type QAItem,
  type RegulatoryDoc,
} from "./ai-knowledge-trainer.data";

export default function AIKnowledgeTrainerPage() {
  const [activeTab, setActiveTab] = useState<TabType>("custom-qa");
  const [qaItems, setQaItems] = useState<QAItem[]>(INITIAL_QA_ITEMS);
  const [regulatoryDocs, setRegulatoryDocs] = useState<RegulatoryDoc[]>(
    INITIAL_REGULATORY_DOCS
  );

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<QAItem | null>(null);
  const [itemToView, setItemToView] = useState<QAItem | null>(null);
  const [isTestConsoleOpen, setIsTestConsoleOpen] = useState(false);

  // Keyboard shortcut Ctrl+K / Cmd+K to open Test Console
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsTestConsoleOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Save (Create or Update) Q&A handler
  const handleSaveQA = (savedData: Omit<QAItem, "id"> & { id?: string }) => {
    if (savedData.id) {
      setQaItems((prev) =>
        prev.map((item) =>
          item.id === savedData.id
            ? ({
                ...item,
                ...savedData,
              } as QAItem)
            : item
        )
      );
      toast.success("Q&A Pair updated and synced to Agent IA model");
    } else {
      const newItem: QAItem = {
        ...savedData,
        id: `qa-${Date.now()}`,
      };
      setQaItems((prev) => [newItem, ...prev]);
      toast.success("Custom Q&A successfully saved to Agent IA model");
    }
  };

  // Delete Q&A
  const handleDeleteQA = (item: QAItem) => {
    setQaItems((prev) => prev.filter((q) => q.id !== item.id));
    toast.success("Q&A Pair removed from model database");
  };

  // Recalibrate item
  const handleRetrainQA = (item: QAItem) => {
    toast.info(`Recalibrating intent weights for: "${item.question.slice(0, 30)}..."`);
    setTimeout(() => {
      setQaItems((prev) =>
        prev.map((q) =>
          q.id === item.id ? { ...q, confidence: Math.min(99, q.confidence + 1) } : q
        )
      );
      toast.success("Agent IA weights re-calibrated (+1% confidence)");
    }, 600);
  };

  // Regulatory Docs Actions
  const handleSyncDoc = (doc: RegulatoryDoc) => {
    toast.info(`Re-indexing vector embeddings for: ${doc.title}...`);
    setTimeout(() => {
      setRegulatoryDocs((prev) =>
        prev.map((d) =>
          d.id === doc.id
            ? {
                ...d,
                lastSync: new Date().toISOString().replace("T", " ").slice(0, 16),
              }
            : d
        )
      );
      toast.success("Vector embeddings successfully indexed");
    }, 700);
  };

  const handleDeleteDoc = (doc: RegulatoryDoc) => {
    setRegulatoryDocs((prev) => prev.filter((d) => d.id !== doc.id));
    toast.success("Regulatory document removed from knowledge base");
  };

  return (
    <div
      className="min-h-full p-4 sm:p-6 space-y-5"
      style={{ backgroundColor: "var(--color-bg-primary-0)" }}
    >
      {/* 1. Hero Banner with Concentric Radar Soundwave */}
      <AIHeroBanner />

      {/* 2. Filter Tabs & Action Bar */}
      <AIFilterTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        qaCount={qaItems.length}
        docsCount={regulatoryDocs.length}
        onOpenAddModal={() => {
          setItemToEdit(null);
          setIsAddModalOpen(true);
        }}
        onOpenTestConsole={() => setIsTestConsoleOpen(true)}
      />

      {/* 3. Main Data Content (Tabs) */}
      {activeTab === "custom-qa" ? (
        <AIQATable
          items={qaItems}
          onView={(item) => setItemToView(item)}
          onEdit={(item) => {
            setItemToEdit(item);
            setIsAddModalOpen(true);
          }}
          onDelete={handleDeleteQA}
          onRetrain={handleRetrainQA}
        />
      ) : (
        <AIRegulatoryDocsTable
          docs={regulatoryDocs}
          onSync={handleSyncDoc}
          onDelete={handleDeleteDoc}
        />
      )}

      {/* 4. Add / Edit Q&A Modal */}
      <AIAddQAModal
        isOpen={isAddModalOpen}
        itemToEdit={itemToEdit}
        onClose={() => {
          setIsAddModalOpen(false);
          setItemToEdit(null);
        }}
        onSave={handleSaveQA}
      />

      {/* 5. View Details Modal */}
      <AIViewQAModal
        item={itemToView}
        onClose={() => setItemToView(null)}
        onEdit={(item) => {
          setItemToView(null);
          setItemToEdit(item);
          setIsAddModalOpen(true);
        }}
      />

      {/* 6. Live Agent IA Test Console Modal */}
      <AITestConsoleModal
        isOpen={isTestConsoleOpen}
        onClose={() => setIsTestConsoleOpen(false)}
        knowledgeBase={qaItems}
      />
    </div>
  );
}
