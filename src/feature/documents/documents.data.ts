// ── Document Center Data and Types ──────────────────────────────────────────

export type DocumentCategory =
  | "All"
  | "Tariffs & Codes"
  | "Closed"
  | "Procedures & Forms"
  | "Bilateral Treaties"
  | "Exemptions";

export interface DocumentRecord {
  id: string;
  thumbnail: string;
  title: string;
  format: string; // e.g. "PDF"
  size: string;   // e.g. "2.4 MB"
  date: string;   // e.g. "Aug 2024"
  category: DocumentCategory;
  downloadUrl?: string;
  description?: string;
}

export const CATEGORIES: DocumentCategory[] = [
  "All",
  "Tariffs & Codes",
  "Closed",
  "Procedures & Forms",
  "Bilateral Treaties",
  "Exemptions",
];

export const INITIAL_DOCUMENTS: DocumentRecord[] = [
  {
    id: "doc-1",
    thumbnail: "/assets/news/cargo-ship.jpg",
    title: "Import/Export Clearance Guide 2024",
    format: "PDF",
    size: "2.4 MB",
    date: "Aug 2024",
    category: "Procedures & Forms",
  },
  {
    id: "doc-2",
    thumbnail: "/assets/news/cargo-ship.jpg",
    title: "Import/Export Clearance Guide 2024",
    format: "PDF",
    size: "2.4 MB",
    date: "Aug 2024",
    category: "Tariffs & Codes",
  },
  {
    id: "doc-3",
    thumbnail: "/assets/news/cargo-ship.jpg",
    title: "Import/Export Clearance Guide 2024",
    format: "PDF",
    size: "2.4 MB",
    date: "Aug 2024",
    category: "Bilateral Treaties",
  },
  {
    id: "doc-4",
    thumbnail: "/assets/news/cargo-ship.jpg",
    title: "Import/Export Clearance Guide 2024",
    format: "PDF",
    size: "2.4 MB",
    date: "Aug 2024",
    category: "Procedures & Forms",
  },
  {
    id: "doc-5",
    thumbnail: "/assets/news/cargo-ship.jpg",
    title: "Import/Export Clearance Guide 2024",
    format: "PDF",
    size: "2.4 MB",
    date: "Aug 2024",
    category: "Exemptions",
  },
  {
    id: "doc-6",
    thumbnail: "/assets/news/cargo-ship.jpg",
    title: "Import/Export Clearance Guide 2024",
    format: "PDF",
    size: "2.4 MB",
    date: "Aug 2024",
    category: "Tariffs & Codes",
  },
  {
    id: "doc-7",
    thumbnail: "/assets/news/cargo-ship.jpg",
    title: "Import/Export Clearance Guide 2024",
    format: "PDF",
    size: "2.4 MB",
    date: "Aug 2024",
    category: "Procedures & Forms",
  },
  {
    id: "doc-8",
    thumbnail: "/assets/news/cargo-ship.jpg",
    title: "Import/Export Clearance Guide 2024",
    format: "PDF",
    size: "2.4 MB",
    date: "Aug 2024",
    category: "Bilateral Treaties",
  },
  {
    id: "doc-9",
    thumbnail: "/assets/news/cargo-ship.jpg",
    title: "Import/Export Clearance Guide 2024",
    format: "PDF",
    size: "2.4 MB",
    date: "Aug 2024",
    category: "Exemptions",
  },
];
