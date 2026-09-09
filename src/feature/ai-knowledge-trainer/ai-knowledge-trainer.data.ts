export interface QAItem {
  id: string;
  question: string;
  category:
    | "Customs Clearance"
    | "Tariff & Classification"
    | "Vehicle Import"
    | "Exemptions"
    | "Transit Permits"
    | "Valuation & Duties"
    | string;
  legalReference: string;
  officialAnswer: string;
  confidence: number;
  status: "active" | "training" | "draft";
  updatedAt: string;
}

export interface RegulatoryDoc {
  id: string;
  title: string;
  docNumber: string;
  category: string;
  fileSize: string;
  lastSync: string;
  status: "synced" | "indexing";
}

export const QA_CATEGORIES = [
  "Customs Clearance",
  "Tariff & Classification",
  "Vehicle Import",
  "Exemptions",
  "Transit Permits",
  "Valuation & Duties",
  "General Inquiries",
] as const;

export const INITIAL_QA_ITEMS: QAItem[] = [
  {
    id: "qa-1",
    question: "What mandatory documents are required for clearing commercial goods at Matadi port?",
    category: "Customs Clearance",
    legalReference: "Code des Douanes RDC Art. 84",
    officialAnswer: "Under Article 84 of the Congo Customs Code, commercial clearance requires the Commercial Invoice, Bill of Lading (B/L), FERI Certificate, and Tax ID.",
    confidence: 98,
    status: "active",
    updatedAt: "2024-09-08",
  },
  {
    id: "qa-2",
    question: "How does an enterprise apply for preferential customs tariff under SADC agreement?",
    category: "Tariff & Classification",
    legalReference: "Protocole Commercial SADC Art. 12",
    officialAnswer: "Customs duties in the DRC are assessed based on CIF value. SADC preferential rates require EUR.1 or SADC Certificate of Origin validated by DGDA.",
    confidence: 96,
    status: "active",
    updatedAt: "2024-09-07",
  },
  {
    id: "qa-3",
    question: "What is the procedure for importing vehicles older than 10 years into DRC?",
    category: "Vehicle Import",
    legalReference: "Décret Primature N° 12/041",
    officialAnswer: "Vehicles must satisfy the maximum age limit of 10 years (Decree 12/041). Special exemption requires Ministry of Finance & DGDA authorization.",
    confidence: 95,
    status: "active",
    updatedAt: "2024-09-06",
  },
  {
    id: "qa-4",
    question: "How does an enterprise apply for duty exemption under the Investment Code?",
    category: "Exemptions",
    legalReference: "Loi N° 004/2002 Portant Code des Investissements",
    officialAnswer: "Enterprises approved by the National Investment Promotion Agency (ANAPI) submit Article 77 exemption certificate alongside the Sydonia declaration.",
    confidence: 92,
    status: "active",
    updatedAt: "2024-09-05",
  },
  {
    id: "qa-5",
    question: "What is the transit clearance regime (T1) and required customs collateral?",
    category: "Transit Permits",
    legalReference: "Instruction Administrative DGDA/DG/019",
    officialAnswer: "Transit under bond (Déclaration T1) mandates bank guarantee or authorized transit bond securing 100% of applicable duties and taxes.",
    confidence: 97,
    status: "active",
    updatedAt: "2024-09-04",
  },
];

export const INITIAL_REGULATORY_DOCS: RegulatoryDoc[] = [
  {
    id: "doc-1",
    title: "Règlement Douanier DGDA 2024 - Procédures Générales de Dédouanement",
    docNumber: "DOC-2024-REG-01",
    category: "Customs Clearance",
    fileSize: "2.4 MB",
    lastSync: "2024-09-08 14:30",
    status: "synced",
  },
  {
    id: "doc-2",
    title: "Tarif Douanier Commun de la RDC et Nomenclature SH 2024",
    docNumber: "DOC-2024-TAR-09",
    category: "Tariff & Classification",
    fileSize: "5.8 MB",
    lastSync: "2024-09-07 10:15",
    status: "synced",
  },
  {
    id: "doc-3",
    title: "Guide Officiel des Exonérations Fiscales et Douanières ANAPI",
    docNumber: "DOC-2023-EXO-14",
    category: "Exemptions",
    fileSize: "1.9 MB",
    lastSync: "2024-09-05 16:45",
    status: "synced",
  },
  {
    id: "doc-4",
    title: "Directives Nationales sur le Régime de Transit International T1",
    docNumber: "DOC-2024-TRN-03",
    category: "Transit Permits",
    fileSize: "3.1 MB",
    lastSync: "2024-09-04 11:20",
    status: "synced",
  },
];

export function getCategoryBadgeStyle(category: string): {
  bg: string;
  text: string;
  border: string;
} {
  switch (category) {
    case "Customs Clearance":
      return {
        bg: "rgba(20, 184, 166, 0.12)",
        text: "#2DD4BF",
        border: "rgba(20, 184, 166, 0.3)",
      };
    case "Tariff & Classification":
      return {
        bg: "rgba(59, 130, 246, 0.12)",
        text: "#60A5FA",
        border: "rgba(59, 130, 246, 0.3)",
      };
    case "Vehicle Import":
      return {
        bg: "rgba(52, 211, 153, 0.12)",
        text: "#34D399",
        border: "rgba(52, 211, 153, 0.3)",
      };
    case "Exemptions":
      return {
        bg: "rgba(74, 222, 128, 0.12)",
        text: "#4ADE80",
        border: "rgba(74, 222, 128, 0.3)",
      };
    case "Transit Permits":
      return {
        bg: "rgba(45, 212, 191, 0.12)",
        text: "#2DD4BF",
        border: "rgba(45, 212, 191, 0.3)",
      };
    case "Valuation & Duties":
      return {
        bg: "rgba(245, 158, 11, 0.12)",
        text: "#FBBF24",
        border: "rgba(245, 158, 11, 0.3)",
      };
    default:
      return {
        bg: "rgba(148, 163, 184, 0.12)",
        text: "#94A3B8",
        border: "rgba(148, 163, 184, 0.3)",
      };
  }
}
