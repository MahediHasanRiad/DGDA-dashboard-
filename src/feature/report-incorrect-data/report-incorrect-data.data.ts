export interface DiscrepancyReport {
  id: string;
  reportCode: string;
  reportingUser: string;
  email: string;
  telephone: string;
  date: string;
  description: string;
  detailedDescription?: string;
  status: "RESOLVED" | "PENDING" | "UNDER_REVIEW";
  adminNotes?: string;
}

export const INITIAL_DISCREPANCY_REPORTS: DiscrepancyReport[] = [
  {
    id: "rep-1",
    reportCode: "REP-2026-035",
    reportingUser: "Anton Müller",
    email: "brooklyn@devignwdg.com",
    telephone: "+49 1234566444",
    date: "12/03/2026",
    description: "Tariff code HS 8704 rate discrepancy",
    detailedDescription:
      "Kasumbalesa OSBP operating hours in app shows 08:00 - 18:00, but bilateral DRC-Zambia agreement has established 24/7 continuous transit clearance since last month.",
    status: "RESOLVED",
    adminNotes: "Updated operational schedule in central API and notified customs station chief.",
  },
  {
    id: "rep-2",
    reportCode: "REP-2026-036",
    reportingUser: "Maria Koch",
    email: "haley@devignsigo.com",
    telephone: "+49 1234560001",
    date: "11/03/2026",
    description: "Tariff code HS 8704 classification mismatch",
    detailedDescription:
      "Customs valuation for used commercial dump trucks under HS code 8704.10 is calculating 25% import duty instead of the 10% SADC preferential rate for certified SADC origin vehicles.",
    status: "PENDING",
  },
  {
    id: "rep-3",
    reportCode: "REP-2026-037",
    reportingUser: "Richard Schröder",
    email: "elena@devignssigo.com",
    telephone: "+49 1234561000",
    date: "10/03/2026",
    description: "Tariff code HS 8704 VAT exemption error",
    detailedDescription:
      "Mining equipment transit declarations are rejecting valid ANAPI investment code exemption certificate numbers despite valid approval dates.",
    status: "RESOLVED",
    adminNotes: "Fixed ANAPI validation regex in Sydonia++ connector.",
  },
  {
    id: "rep-4",
    reportCode: "REP-2026-038",
    reportingUser: "Paul Hoffmann",
    email: "diana@wraktb.io",
    telephone: "+49 1234565555",
    date: "09/03/2026",
    description: "Tariff code HS 8704 clearance fee formula",
    detailedDescription:
      "Matadi port terminal handling surcharges are showing outdated 2023 tariff calculation instead of the unified 2024 DGDA single-window fee structure.",
    status: "RESOLVED",
    adminNotes: "Tariff coefficient updated to 2024 rates.",
  },
  {
    id: "rep-5",
    reportCode: "REP-2026-039",
    reportingUser: "Ida Meyer",
    email: "gabrielle@horigowdg.com",
    telephone: "+49 1234563333",
    date: "08/03/2026",
    description: "Tariff code HS 8704 road maintenance tax",
    detailedDescription:
      "FONER toll tax is calculated twice for multi-axle transit trucks exiting through the Kasindi border post.",
    status: "PENDING",
  },
  {
    id: "rep-6",
    reportCode: "REP-2026-040",
    reportingUser: "Dora Schmidt",
    email: "gabriel@wraktb.io",
    telephone: "+49 1234568888",
    date: "07/03/2026",
    description: "Tariff code HS 8704 FERI validation timeout",
    detailedDescription:
      "Ogefrem FERI electronic loading certificate verification API encounters timeout errors during peak port hours.",
    status: "RESOLVED",
    adminNotes: "Increased gateway timeout and configured secondary endpoint.",
  },
  {
    id: "rep-7",
    reportCode: "REP-2026-041",
    reportingUser: "Emil Schneider",
    email: "emily@devignwdge.com",
    telephone: "+49 1234567777",
    date: "06/03/2026",
    description: "Tariff code HS 8704 inspection fee rebate",
    detailedDescription:
      "OCC inspection fee calculation fails to apply diplomatic status waiver for UN agency cargo declarations.",
    status: "RESOLVED",
    adminNotes: "Added UN diplomat code waiver clause to calculation logic.",
  },
  {
    id: "rep-8",
    reportCode: "REP-2026-042",
    reportingUser: "Julius Wagner",
    email: "isabella@devignedge.com",
    telephone: "+49 1234569866",
    date: "05/03/2026",
    description: "Tariff code HS 8704 temporary admission bond",
    detailedDescription:
      "T1 transit guarantee amount is displaying 110% of CIF value instead of the statutory 100% customs liability bond requirement.",
    status: "PENDING",
  },
];
