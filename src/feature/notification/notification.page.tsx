import { useState, useMemo } from "react";
import { toast } from "sonner";
import { NotificationHeroBanner } from "./components/notification-hero-banner";
import { NotificationActionBar } from "./components/notification-action-bar";
import { NotificationComposeModal } from "./components/notification-compose-modal";
import { NotificationHistoryTable } from "./components/notification-history-table";
import { NotificationDetailModal } from "./components/notification-detail-modal";
import {
  INITIAL_NOTIFICATIONS,
  type PushNotification,
  type NotificationStatusFilter,
} from "./notification.data";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<PushNotification[]>(
    INITIAL_NOTIFICATIONS
  );
  const [statusFilter, setStatusFilter] =
    useState<NotificationStatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<PushNotification | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Status counts
  const totalCount = notifications.length;
  const deliveredCount = notifications.filter(
    (n) => n.status === "delivered"
  ).length;
  const broadcastingCount = notifications.filter(
    (n) => n.status === "broadcasting"
  ).length;
  const scheduledCount = notifications.filter(
    (n) => n.status === "scheduled"
  ).length;

  // Filtered notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      // Status filter
      if (statusFilter !== "all" && n.status !== statusFilter) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = n.title.toLowerCase().includes(q);
        const matchesAudience = n.targetAudience.toLowerCase().includes(q);
        const matchesCategory = n.category.toLowerCase().includes(q);
        const matchesBody = n.body.toLowerCase().includes(q);
        return matchesTitle || matchesAudience || matchesCategory || matchesBody;
      }
      return true;
    });
  }, [notifications, statusFilter, searchQuery]);

  // Send new broadcast notification from modal
  const handleSendNotification = (
    data: Omit<
      PushNotification,
      "id" | "sentAt" | "audienceReach" | "openRate" | "status"
    >
  ) => {
    const audienceReachMap: Record<string, string> = {
      "All Users": "24,850 devices",
      Importers: "8,450 devices",
      Exporters: "6,200 devices",
      "Customs Brokers": "3,800 devices",
    };

    const newNotification: PushNotification = {
      ...data,
      id: `notif-${Date.now()}`,
      sentAt: "Just now",
      audienceReach:
        audienceReachMap[data.targetAudience] || "12,000 devices",
      openRate: "0%",
      status: "delivered",
    };

    setNotifications((prev) => [newNotification, ...prev]);
    toast.success(
      `Push notification broadcasted to ${newNotification.audienceReach} (${data.targetAudience})`
    );
  };

  // View modal
  const handleView = (item: PushNotification) => {
    setSelectedNotification(item);
    setIsDetailModalOpen(true);
  };

  // Resend notification
  const handleResend = (item: PushNotification) => {
    toast.info(`Re-broadcasting alert: "${item.title.slice(0, 35)}..."`);
    setTimeout(() => {
      const cloned: PushNotification = {
        ...item,
        id: `notif-${Date.now()}`,
        sentAt: "Just now",
        openRate: "0%",
      };
      setNotifications((prev) => [cloned, ...prev]);
      toast.success("Broadcast successfully delivered to active devices");
    }, 600);
  };

  // Delete notification log
  const handleDelete = (item: PushNotification) => {
    setNotifications((prev) => prev.filter((n) => n.id !== item.id));
    toast.success("Notification log removed from history");
  };

  return (
    <div
      className="min-h-full p-4 sm:p-6 space-y-5"
      style={{ backgroundColor: "var(--color-bg-primary-0)" }}
    >
      {/* 1. Hero Banner */}
      <NotificationHeroBanner />

      {/* 2. Action Bar with Status Filter Tabs & Compose Button */}
      <NotificationActionBar
        activeStatus={statusFilter}
        onStatusChange={setStatusFilter}
        totalCount={totalCount}
        deliveredCount={deliveredCount}
        broadcastingCount={broadcastingCount}
        scheduledCount={scheduledCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCompose={() => setIsComposeModalOpen(true)}
      />

      {/* 3. Notification Broadcast History Table */}
      <NotificationHistoryTable
        notifications={filteredNotifications}
        onView={handleView}
        onResend={handleResend}
        onDelete={handleDelete}
      />

      {/* 4. Compose Mobile Notification Modal */}
      <NotificationComposeModal
        isOpen={isComposeModalOpen}
        onClose={() => setIsComposeModalOpen(false)}
        onSend={handleSendNotification}
      />

      {/* 5. Notification Detail & Device Preview Modal */}
      <NotificationDetailModal
        isOpen={isDetailModalOpen}
        notification={selectedNotification}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedNotification(null);
        }}
        onResend={handleResend}
      />
    </div>
  );
}
