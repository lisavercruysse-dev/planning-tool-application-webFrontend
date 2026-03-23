import React, { useState, useCallback } from "react";
import useSWR from "swr";
import NotificationCard from "../components/notifications/NotificationCard";
import AsyncData from "../components/asyncData/AsyncData";
import { Bell, Filter, CheckCheck } from "lucide-react";
import { useAuth } from "../contexts/auth";
import * as notificatiesApi from "../api/notifications";
import { TYPE_LABELS } from "../api/notificationTypes";

export default function Notifications() {
  const { user } = useAuth();
  const [readFilter, setReadFilter] = useState("Alle");
  const [typeFilter, setTypeFilter] = useState("Alle types");

  const {
    data: notifications,
    isLoading,
    error,
    mutate,
  } = useSWR(user ? `notificaties-${user.id}` : null, () =>
    notificatiesApi.getNotifications(user.id),
  );

  const unreadCount = notifications
    ? notifications.filter((n) => !n.isRead).length
    : 0;

  const handleMarkAsRead = useCallback(
    async (id) => {
      await notificatiesApi.markAsRead(id);
      mutate(
        notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
        false,
      );
    },
    [notifications, mutate],
  );

  const handleMarkAllAsRead = useCallback(async () => {
    const unread = (notifications || []).filter((n) => !n.isRead);
    try {
      await Promise.all(unread.map((n) => notificatiesApi.markAsRead(n.id)));
      mutate(
        notifications.map((n) => ({ ...n, isRead: true })),
        false,
      );
    } catch {
      mutate();
    }
  }, [notifications, mutate]);

  const filteredNotifications = (notifications || []).filter((n) => {
    const matchesRead =
      readFilter === "Alle" ||
      (readFilter === "Ongelezen" && !n.isRead) ||
      (readFilter === "Gelezen" && n.isRead);
    const matchesType = typeFilter === "Alle types" || n.type === typeFilter;
    return matchesRead && matchesType;
  });

  return (
    <div className="p-4 md:p-8 w-full max-w-5xl mx-auto font-sans">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-medium text-gray-800">
          Meldingen
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Blijf up-to-date met al uw meldingen.
        </p>
      </div>

      {unreadCount > 0 && (
        <div className="flex items-center gap-3 p-4 bg-[#fdf3f3] border border-[#fad4d4] rounded-lg mb-6">
          <div className="bg-[#b64949] p-1.5 rounded-full">
            <Bell className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-800">
            Je hebt {unreadCount} ongelezen{" "}
            {unreadCount === 1 ? "melding" : "meldingen"}
          </span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-gray-200 rounded-lg mb-6 gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-gray-500">
            <Filter className="w-4 h-4" />
          </div>

          <select
            value={readFilter}
            onChange={(e) => setReadFilter(e.target.value)}
            className="w-full sm:w-40 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4863d6] focus:border-transparent"
          >
            <option value="Alle">Alle statussen</option>
            <option value="Ongelezen">Ongelezen</option>
            <option value="Gelezen">Gelezen</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full sm:w-40 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4863d6] focus:border-transparent"
          >
            <option value="Alle types">Alle types</option>
            {Object.entries(TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleMarkAllAsRead}
          disabled={unreadCount === 0}
          className={`flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium transition-colors w-full sm:w-auto justify-center ${
            unreadCount === 0
              ? "opacity-50 cursor-not-allowed text-gray-400"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          <CheckCheck className="w-4 h-4" />
          Alles als gelezen markeren
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-800">
            Meldingen ({filteredNotifications.length})
          </h2>
        </div>
        <div className="p-5">
          <AsyncData loading={isLoading} error={error}>
            {filteredNotifications.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">
                Er zijn geen meldingen die voldoen aan je filters.
              </p>
            ) : (
              filteredNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))
            )}
          </AsyncData>
        </div>
      </div>
    </div>
  );
}
