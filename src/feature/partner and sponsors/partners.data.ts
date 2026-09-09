// ── Types & Mock Data for Partners & Sponsors ──────────────────────────────

export type PartnerCategory =
  | "All"
  | "Partners"
  | "Sponsors"
  | "Logistics"
  | "Banking"
  | "Insurance";

export interface PartnerRecord {
  id: string;
  name: string;
  category: PartnerCategory;
  tier: string;
  logoUrl: string;
  website?: string;
  status: "Active" | "Inactive";
  createdAt: string;
}

export const PARTNER_CATEGORIES: PartnerCategory[] = [
  "All",
  "Partners",
  "Sponsors",
  "Logistics",
  "Banking",
  "Insurance",
];

// Clean SVGs for partner logos
const RAWBANK_LOGO = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40"><rect width="160" height="40" fill="white"/><polygon points="12,8 24,20 12,32 18,32 30,20 18,8" fill="%23EAB308"/><text x="40" y="26" font-family="Arial, sans-serif" font-weight="900" font-size="16" fill="%23DC2626">RAW<tspan fill="%231E293B">BANK</tspan></text></svg>`;

const TMB_LOGO = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40"><rect width="160" height="40" fill="white"/><circle cx="20" cy="20" r="12" fill="%231E3A8A"/><path d="M14 20 L20 14 L24 22 L28 17" stroke="white" stroke-width="2" fill="none"/><text x="40" y="24" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="%231E3A8A">TMB</text><text x="40" y="32" font-family="Arial, sans-serif" font-size="6" fill="%2364748B" font-weight="600">TRUST MERCHANT BANK</text></svg>`;

const MAERSK_LOGO = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40"><rect width="160" height="40" fill="white"/><polygon points="20,10 23,17 30,17 25,21 27,28 20,24 13,28 15,21 10,17 17,17" fill="%230284C7"/><text x="36" y="25" font-family="Arial, sans-serif" font-weight="800" font-size="14" fill="%230F172A">MAERSK <tspan font-size="9" fill="%230284C7">LINE</tspan></text></svg>`;

const BOLLORE_LOGO = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40"><rect width="160" height="40" fill="white"/><path d="M12 28 C18 10, 26 10, 32 28" stroke="%23DC2626" stroke-width="2.5" fill="none"/><text x="38" y="24" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="%230284C7">BOLLORÉ</text><text x="38" y="32" font-family="Arial, sans-serif" font-size="6" fill="%23DC2626" font-weight="700">AFRICA LOGISTICS</text></svg>`;

const SAHAM_LOGO = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40"><rect width="160" height="40" fill="white"/><rect x="12" y="10" width="18" height="20" rx="3" fill="%23059669"/><path d="M15 15 L27 25 M27 15 L15 25" stroke="white" stroke-width="2"/><text x="38" y="23" font-family="Arial, sans-serif" font-weight="900" font-size="14" fill="%231E293B">SAHAM</text><text x="38" y="31" font-family="Arial, sans-serif" font-size="6" fill="%23059669" font-weight="600">ASSURANCE</text></svg>`;

export const INITIAL_PARTNERS: PartnerRecord[] = [
  {
    id: "partner-1",
    name: "Rawbank",
    category: "Banking",
    tier: "Official Partner",
    logoUrl: RAWBANK_LOGO,
    website: "https://www.rawbank.com",
    status: "Active",
    createdAt: "Jan 2024",
  },
  {
    id: "partner-2",
    name: "Trust Merchant Bank (TMB)",
    category: "Banking",
    tier: "Official Partner",
    logoUrl: TMB_LOGO,
    website: "https://www.tmb.cd",
    status: "Active",
    createdAt: "Feb 2024",
  },
  {
    id: "partner-3",
    name: "Maersk Logistics",
    category: "Logistics",
    tier: "Logistics Official Partner",
    logoUrl: MAERSK_LOGO,
    website: "https://www.maersk.com",
    status: "Active",
    createdAt: "Mar 2024",
  },
  {
    id: "partner-4",
    name: "Bolloré Africa Logistics",
    category: "Logistics",
    tier: "Official Partner",
    logoUrl: BOLLORE_LOGO,
    website: "https://www.bollore-transport-logistics.com",
    status: "Active",
    createdAt: "Apr 2024",
  },
  {
    id: "partner-5",
    name: "Saham Assurance",
    category: "Insurance",
    tier: "Official Partner",
    logoUrl: SAHAM_LOGO,
    website: "https://www.sahamassurance.com",
    status: "Active",
    createdAt: "May 2024",
  },
];
