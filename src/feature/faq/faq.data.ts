export type FAQStatus = "ACTIVE" | "INACTIVE";

export interface FAQItem {
  id: string;
  no: number;
  question: string;
  answer: string;
  status: FAQStatus;
  updatedAt?: string;
}

export const INITIAL_FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    no: 1,
    question: "Which areas do you deliver to?",
    answer: "Currently, we are delivering to all major customs border posts including Matadi, Kasumbalesa, Goma, and Kinshasa Ndjili.",
    status: "ACTIVE",
  },
  {
    id: "faq-2",
    no: 2,
    question: "Which areas do you deliver to?",
    answer: "Currently, we are delivering across all provincial DGDA directorates and authorized dry port terminals.",
    status: "ACTIVE",
  },
  {
    id: "faq-3",
    no: 3,
    question: "Which areas do you deliver to?",
    answer: "Currently, we are delivering real-time tariff status to all registered mobile app operators in DRC.",
    status: "ACTIVE",
  },
  {
    id: "faq-4",
    no: 4,
    question: "Which areas do you deliver to?",
    answer: "Currently, we are delivering expedited electronic release notes at all maritime inspection stations.",
    status: "ACTIVE",
  },
  {
    id: "faq-5",
    no: 5,
    question: "Which areas do you deliver to?",
    answer: "Currently, we are delivering clearance documentation guidance for transit corridors T1.",
    status: "ACTIVE",
  },
  {
    id: "faq-6",
    no: 6,
    question: "Which areas do you deliver to?",
    answer: "Currently, we are delivering automated SMS and push notifications for cleared declarations.",
    status: "ACTIVE",
  },
  {
    id: "faq-7",
    no: 7,
    question: "Which areas do you deliver to?",
    answer: "Currently, we are delivering 24/7 technical support for Sydonia single window integrations.",
    status: "ACTIVE",
  },
  {
    id: "faq-8",
    no: 8,
    question: "Which areas do you deliver to?",
    answer: "Currently, we are delivering certified NIF verification for corporate declarants.",
    status: "ACTIVE",
  },
  {
    id: "faq-9",
    no: 9,
    question: "Which areas do you deliver to?",
    answer: "Currently, we are delivering immediate alert broadcasts for port operational schedule changes.",
    status: "ACTIVE",
  },
  {
    id: "faq-10",
    no: 10,
    question: "Which areas do you deliver to?",
    answer: "Currently, we are delivering legal citation breakdowns for customs valuation appeals.",
    status: "ACTIVE",
  },
  {
    id: "faq-11",
    no: 11,
    question: "Which areas do you deliver to?",
    answer: "Currently, we are delivering bilingual French-English regulatory guidelines for foreign operators.",
    status: "ACTIVE",
  },
];
