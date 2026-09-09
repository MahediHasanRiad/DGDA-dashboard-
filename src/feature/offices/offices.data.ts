// ── DGDA Offices & Directory Data and Types ─────────────────────────────────

export type OfficeStatus = "OPEN" | "CLOSED";
export type StatusFilter = "all" | "open" | "closed";

export interface OfficeRecord {
  id: string;
  codeBadge: string;
  name: string;
  type: string;
  customsOffice: string;
  corridorHours: string;
  stationCode: string;
  region: string;
  authority: string;
  juxtaposedPost: string;
  tags: string[];
  phone: string;
  status: OfficeStatus;
}

export const REGIONS = [
  "All Regions",
  "Kongo Central",
  "Haut-Katanga",
  "Kinshasa",
  "Nord-Kivu",
  "Sud-Kivu",
  "Lualaba",
  "Ituri",
];

export const INITIAL_OFFICES: OfficeRecord[] = [
  {
    id: "off-1",
    codeBadge: "[CDMAT]",
    name: "Matadi Port",
    type: "Primary Maritime Port",
    customsOffice: "Matadi Port Customs Office",
    corridorHours: "24/7 Commercial Corridors",
    stationCode: "CD-STN-421",
    region: "Kongo Central (Matadi,Boma,Lufu)",
    authority: "Inspecteur Principal",
    juxtaposedPost: "Poste Frontalier Juxtaposé DRC-Zambia, Kasumbalesa",
    tags: ["Import", "Export", "Transit", "Maritime Port", "Border Post"],
    phone: "+243 81 234 5678",
    status: "OPEN",
  },
  {
    id: "off-2",
    codeBadge: "[CDMAT]",
    name: "Matadi Port",
    type: "Primary Maritime Port",
    customsOffice: "Matadi Port Customs Office",
    corridorHours: "24/7 Commercial Corridors",
    stationCode: "CD-STN-421",
    region: "Kongo Central (Matadi,Boma,Lufu)",
    authority: "Inspecteur Principal",
    juxtaposedPost: "Poste Frontalier Juxtaposé DRC-Zambia, Kasumbalesa",
    tags: ["Import", "Export", "Transit", "Maritime Port", "Border Post"],
    phone: "+243 81 234 5678",
    status: "OPEN",
  },
  {
    id: "off-3",
    codeBadge: "[CDMAT]",
    name: "Matadi Port",
    type: "Primary Maritime Port",
    customsOffice: "Matadi Port Customs Office",
    corridorHours: "24/7 Commercial Corridors",
    stationCode: "CD-STN-421",
    region: "Kongo Central (Matadi,Boma,Lufu)",
    authority: "Inspecteur Principal",
    juxtaposedPost: "Poste Frontalier Juxtaposé DRC-Zambia, Kasumbalesa",
    tags: ["Import", "Export", "Transit", "Maritime Port", "Border Post"],
    phone: "+243 81 234 5678",
    status: "OPEN",
  },
  {
    id: "off-4",
    codeBadge: "[CDMAT]",
    name: "Matadi Port",
    type: "Primary Maritime Port",
    customsOffice: "Matadi Port Customs Office",
    corridorHours: "24/7 Commercial Corridors",
    stationCode: "CD-STN-421",
    region: "Kongo Central (Matadi,Boma,Lufu)",
    authority: "Inspecteur Principal",
    juxtaposedPost: "Poste Frontalier Juxtaposé DRC-Zambia, Kasumbalesa",
    tags: ["Import", "Export", "Transit", "Maritime Port", "Border Post"],
    phone: "+243 81 234 5678",
    status: "OPEN",
  },
  {
    id: "off-5",
    codeBadge: "[CDMAT]",
    name: "Matadi Port",
    type: "Primary Maritime Port",
    customsOffice: "Matadi Port Customs Office",
    corridorHours: "24/7 Commercial Corridors",
    stationCode: "CD-STN-421",
    region: "Kongo Central (Matadi,Boma,Lufu)",
    authority: "Inspecteur Principal",
    juxtaposedPost: "Poste Frontalier Juxtaposé DRC-Zambia, Kasumbalesa",
    tags: ["Import", "Export", "Transit", "Maritime Port", "Border Post"],
    phone: "+243 81 234 5678",
    status: "OPEN",
  },
  {
    id: "off-6",
    codeBadge: "[CDMAT]",
    name: "Matadi Port",
    type: "Primary Maritime Port",
    customsOffice: "Matadi Port Customs Office",
    corridorHours: "24/7 Commercial Corridors",
    stationCode: "CD-STN-421",
    region: "Kongo Central (Matadi,Boma,Lufu)",
    authority: "Inspecteur Principal",
    juxtaposedPost: "Poste Frontalier Juxtaposé DRC-Zambia, Kasumbalesa",
    tags: ["Import", "Export", "Transit", "Maritime Port", "Border Post"],
    phone: "+243 81 234 5678",
    status: "OPEN",
  },
];
