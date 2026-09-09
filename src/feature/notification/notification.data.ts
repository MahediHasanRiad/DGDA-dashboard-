export type TargetAudience = "All Users" | "Importers" | "Exporters" | "Customs Brokers";

export type NotificationCategory =
  | "Operational Alert"
  | "System Maintenance"
  | "Regulatory Update"
  | "Urgent Bulletin";

export type BroadcastPriority =
  | "High Priority (Immediate Ingress)"
  | "Normal Priority"
  | "Low / Informational";

export type NotificationStatus = "delivered" | "broadcasting" | "scheduled";

export type NotificationStatusFilter = "all" | "delivered" | "broadcasting" | "scheduled";

export interface PushNotification {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  targetAudience: TargetAudience;
  category: NotificationCategory;
  priority: BroadcastPriority;
  sentAt: string;
  audienceReach: string;
  openRate: string;
  status: NotificationStatus;
}

export const TARGET_AUDIENCES: TargetAudience[] = [
  "All Users",
  "Importers",
  "Exporters",
  "Customs Brokers",
];

export const NOTIFICATION_CATEGORIES: NotificationCategory[] = [
  "Operational Alert",
  "System Maintenance",
  "Regulatory Update",
  "Urgent Bulletin",
];

export const BROADCAST_PRIORITIES: BroadcastPriority[] = [
  "High Priority (Immediate Ingress)",
  "Normal Priority",
  "Low / Informational",
];

export const QUICK_TEMPLATES = {
  ASYCUDA: {
    title: "Notice: ASYCUDA World System Maintenance at Matadi Port",
    category: "System Maintenance" as NotificationCategory,
    priority: "High Priority (Immediate Ingress)" as BroadcastPriority,
    targetAudience: "All Users" as TargetAudience,
    body: "Please be advised that ASYCUDA World customs processing server will undergo scheduled maintenance tonight from 22:00 to 02:00 GMT. All electronic declaration submissions will temporarily queue during this window.",
  },
  "Matadi Gate": {
    title: "Notice: Matadi Port Gate 3 Temporary Traffic Rerouting",
    category: "Operational Alert" as NotificationCategory,
    priority: "High Priority (Immediate Ingress)" as BroadcastPriority,
    targetAudience: "Importers" as TargetAudience,
    body: "Customs clearance gates and container inspection bays 4-6 at Matadi port are operating under temporary single-lane ingress due to gantry crane maintenance. Expect minor queue delays.",
  },
};

export const INITIAL_NOTIFICATIONS: PushNotification[] = [
  {
    id: "notif-1",
    title: "Notice: Matadi Port Gate 3 Temporary Traffic Rerouting",
    subtitle: "Customs clearance gates and container inspection bays...",
    body: "Customs clearance gates and container inspection bays 4-6 at Matadi port are operating under temporary single-lane ingress due to gantry crane maintenance.",
    targetAudience: "Importers",
    category: "Operational Alert",
    priority: "High Priority (Immediate Ingress)",
    sentAt: "Just now",
    audienceReach: "2,840 devices",
    openRate: "0%",
    status: "delivered",
  },
  {
    id: "notif-2",
    title: "Notice: Matadi Port Gate System Scheduled Upgrade",
    subtitle: "Customs clearance gates and technical core update...",
    body: "Core ASYCUDA database nodes updated to version 4.2. Response times for Sydonia declarations improved by 40%.",
    targetAudience: "Importers",
    category: "System Maintenance",
    priority: "Normal Priority",
    sentAt: "2026-09-02 14:30",
    audienceReach: "18,450 devices",
    openRate: "72.1%",
    status: "delivered",
  },
  {
    id: "notif-3",
    title: "Live Queue: Kasumbalesa Heavy Vehicle Border Dispatch",
    subtitle: "Active border broadcast transmission in progress...",
    body: "Transiting convoy clearing lane 2 with priority escort under SADC one-stop border protocol.",
    targetAudience: "Customs Brokers",
    category: "Urgent Bulletin",
    priority: "High Priority (Immediate Ingress)",
    sentAt: "Transmitting...",
    audienceReach: "4,120 devices",
    openRate: "18.4%",
    status: "broadcasting",
  },
  {
    id: "notif-4",
    title: "Notice: Matadi Port Gate New SADC Tariff Guidelines",
    subtitle: "Customs clearance gates and tariff protocol directives...",
    body: "Revised documentation requirements for SADC preferential certificates of origin effective immediately at all maritime border offices.",
    targetAudience: "Customs Brokers",
    category: "Regulatory Update",
    priority: "High Priority (Immediate Ingress)",
    sentAt: "2026-08-29 09:15",
    audienceReach: "8,920 devices",
    openRate: "84.2%",
    status: "delivered",
  },
  {
    id: "notif-5",
    title: "Scheduled Release: Q4 Custom Valuation Guidelines Directive",
    subtitle: "Scheduled for automated dispatch at 08:00 AM...",
    body: "Release of updated official DGDA reference valuation catalog for imported heavy machinery and electronic components.",
    targetAudience: "All Users",
    category: "Regulatory Update",
    priority: "Normal Priority",
    sentAt: "Tomorrow, 08:00",
    audienceReach: "24,850 devices",
    openRate: "--",
    status: "scheduled",
  },
  {
    id: "notif-6",
    title: "Notice: Matadi Port Gate Export Ingress Express Lanes",
    subtitle: "Customs clearance gates and fast-track perishable export lanes...",
    body: "Dedicated priority green lane opened for agricultural perishable commodity containers exiting via Matadi terminal.",
    targetAudience: "Exporters",
    category: "Operational Alert",
    priority: "Normal Priority",
    sentAt: "2026-08-20 11:00",
    audienceReach: "12,400 devices",
    openRate: "72.1%",
    status: "delivered",
  },
];
