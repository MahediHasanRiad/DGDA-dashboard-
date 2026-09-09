// ── News & Press Data and Types ──────────────────────────────────────────────

export type ArticleStatus = "PUBLISHED" | "DRAFT";
export type NewsFilter = "all" | "published" | "draft";

export interface NewsArticle {
  id: string;
  thumbnail: string;
  title: string;
  author: string;
  category: string;
  publishDate: string;
  status: ArticleStatus;
  views: number;
  content?: string;
}

export const INITIAL_ARTICLES: NewsArticle[] = [
  {
    id: "art-1",
    thumbnail: "/assets/news/cargo-ship.jpg",
    title: "Modernization of Maritime Port Logistics",
    author: "By Direction des Systèmes d'Information DGDA",
    category: "Customs Regulations",
    publishDate: "12/03/2026",
    status: "PUBLISHED",
    views: 4820,
    content: "Implementation of accelerated clearance procedures for maritime cargo arriving at primary seaports.",
  },
  {
    id: "art-2",
    thumbnail: "/assets/news/cargo-ship.jpg",
    title: "New Automated Inspection Requirements",
    author: "By Direction des Systèmes d'Information DGDA",
    category: "Notice to Importers",
    publishDate: "10/03/2026",
    status: "PUBLISHED",
    views: 4820,
    content: "All registered importers must submit electronic manifests 48 hours prior to vessel docking.",
  },
  {
    id: "art-3",
    thumbnail: "/assets/news/cargo-ship.jpg",
    title: "Updated Harmonized Tariff Schedules Q1",
    author: "By Direction des Systèmes d'Information DGDA",
    category: "Tariff Updates",
    publishDate: "08/03/2026",
    status: "PUBLISHED",
    views: 4820,
    content: "Review revised custom duty rates applied to renewable energy equipment and agricultural inputs.",
  },
  {
    id: "art-4",
    thumbnail: "/assets/news/cargo-ship.jpg",
    title: "Streamlined Cross-Border Cargo Clearance",
    author: "By Direction des Systèmes d'Information DGDA",
    category: "Border Operations",
    publishDate: "05/03/2026",
    status: "PUBLISHED",
    views: 4820,
    content: "Single-window digital verification expanded to Eastern border customs checkpoints.",
  },
  {
    id: "art-5",
    thumbnail: "/assets/news/cargo-ship.jpg",
    title: "Enhanced Security Protocol for Container Terminals",
    author: "By Direction des Systèmes d'Information DGDA",
    category: "Border Operations",
    publishDate: "01/03/2026",
    status: "PUBLISHED",
    views: 4820,
    content: "Deployment of smart scanner units across regional container terminals to deter contraband.",
  },
  {
    id: "art-6",
    thumbnail: "/assets/news/cargo-ship.jpg",
    title: "Customs Transit Trade Electronic Seal Rollout",
    author: "By Direction des Systèmes d'Information DGDA",
    category: "Border Operations",
    publishDate: "27/02/2026",
    status: "PUBLISHED",
    views: 4820,
    content: "GPS-enabled electronic cargo tracking seals are now mandatory for all transiting freight corridors.",
  },
  {
    id: "art-7",
    thumbnail: "/assets/news/cargo-ship.jpg",
    title: "DGDA NIF Digital Verification Integration",
    author: "By Direction des Systèmes d'Information DGDA",
    category: "Border Operations",
    publishDate: "22/02/2026",
    status: "PUBLISHED",
    views: 4820,
    content: "Direct API integration between the DGDA portal and corporate tax registry for real-time validation.",
  },
  {
    id: "art-8",
    thumbnail: "/assets/news/cargo-ship.jpg",
    title: "Upcoming Guidelines on Air Freight Expedited Lane",
    author: "By Direction des Systèmes d'Information DGDA",
    category: "Border Operations",
    publishDate: "18/02/2026",
    status: "DRAFT",
    views: 4820,
    content: "Draft guidelines for pre-approved priority air freight consignments undergoing review.",
  },
];

export const CATEGORIES = [
  "Customs Regulations",
  "Notice to Importers",
  "Tariff Updates",
  "Border Operations",
  "Trade Facilitation",
  "General Announcements",
];
