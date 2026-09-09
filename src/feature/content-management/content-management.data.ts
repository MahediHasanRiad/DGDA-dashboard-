export interface ContentDocument {
  id: string;
  type: "privacy-policy" | "about-us" | "terms-and-condition";
  heroTitle: string;
  cardTitle: string;
  subtitle: string;
  content: string;
  lastUpdated?: string;
}

export const DEFAULT_CONTENT_DOCUMENTS: Record<
  "privacy-policy" | "about-us" | "terms-and-condition",
  ContentDocument
> = {
  "privacy-policy": {
    id: "doc-privacy-policy",
    type: "privacy-policy",
    heroTitle: "Privacy policy",
    cardTitle: "Privacy & Policy",
    subtitle: "Mobile operators submit discrepancy reports via the DGDA Mobile App.",
    content: `<h2>1. Data Collection and Usage</h2>
<p>The Direction Générale des Douanes et Accises (DGDA) collects information necessary for customs verification, tax identification number (NIF) validation, and electronic single-window clearance declarations.</p>
<h2>2. Confidentiality & Legal Compliance</h2>
<p>All operator submission data is secured under the DRC National Data Protection Act and international customs compliance protocols.</p>`,
    lastUpdated: "2026-09-01",
  },
  "about-us": {
    id: "doc-about-us",
    type: "about-us",
    heroTitle: "About Us",
    cardTitle: "About DGDA Customs Authority",
    subtitle: "Public institution managing customs declarations, trade facilitation, and excise revenues.",
    content: `<h2>About Direction Générale des Douanes et Accises (DGDA)</h2>
<p>The DGDA is the national customs authority of the Democratic Republic of the Congo, mandated with customs duty collection, national border security, international trade facilitation, and combatting illicit trafficking.</p>
<h2>Mission & Core Values</h2>
<p>Modernizing customs procedures through digital platforms, real-time ASYCUDA single-window integration, and transparent operator compliance.</p>`,
    lastUpdated: "2026-09-01",
  },
  "terms-and-condition": {
    id: "doc-terms-and-condition",
    type: "terms-and-condition",
    heroTitle: "Terms and Condition",
    cardTitle: "Terms & Conditions",
    subtitle: "Standard operating terms for digital customs filings and mobile app services.",
    content: `<h2>1. Acceptance of Terms</h2>
<p>By accessing the DGDA Mobile App and Single Window digital portals, registered economic operators agree to comply with the Congo Customs Code and regulatory directives.</p>
<h2>2. Operator Responsibilities</h2>
<p>Declarants must submit certified commercial invoices, bills of lading, and accurate cargo tariff classifications.</p>`,
    lastUpdated: "2026-09-01",
  },
};
