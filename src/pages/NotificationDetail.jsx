import React, { useCallback } from "react";
import useSWR from "swr";
import { useParams, useNavigate } from "react-router";
import { Bell, ArrowLeft, Check, Calendar, Tag } from "lucide-react";
import AsyncData from "../components/asyncData/AsyncData";
import * as notificatiesApi from "../api/notifications";
import { TYPE_LABELS } from "../api/notificationTypes";

export default function NotificationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: notification,
    isLoading,
    error,
    mutate,
  } = useSWR(id ? `notificatie-${id}` : null, () =>
    notificatiesApi.getNotificationById(Number(id)),
  );

  const handleMarkAsRead = useCallback(async () => {
    await notificatiesApi.markAsRead(Number(id));
    mutate({ ...notification, isRead: true }, false);
  }, [id, notification, mutate]);

  return (
    <div className="p-4 md:p-8 w-full max-w-3xl mx-auto font-sans">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Terug naar meldingen
      </button>

      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-medium text-gray-800">
          Melding detail
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Bekijk de details van deze melding.
        </p>
      </div>

      <AsyncData loading={isLoading} error={error}>
        {notification && (
          <div
            className={`p-6 border rounded-xl shadow-sm ${
              notification.isRead
                ? "bg-white border-gray-200"
                : "bg-[#fdf3f3] border-[#fad4d4]"
            }`}
          >
            <div className="flex items-start gap-4 mb-6">
              <div
                className={`p-2 rounded-full ${
                  notification.isRead ? "bg-gray-100" : "bg-[#b64949]"
                }`}
              >
                <Bell
                  className={`w-5 h-5 ${
                    notification.isRead ? "text-gray-400" : "text-white"
                  }`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-base font-semibold text-gray-900">
                    {notification.title}
                  </h2>
                  {!notification.isRead && (
                    <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#b64949] text-white">
                      Ongelezen
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-700 mt-3 leading-relaxed">
                  {notification.description}
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{notification.time}</span>
                  </div>
                  {notification.type && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Tag className="w-3.5 h-3.5" />
                      <span>
                        {TYPE_LABELS[notification.type] ?? notification.type}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {!notification.isRead && (
              <div className="border-t border-gray-100 pt-4 flex justify-end">
                <button
                  onClick={handleMarkAsRead}
                  className="flex items-center gap-2 px-4 py-2 bg-[#b64949] text-white rounded-md text-sm font-medium hover:bg-[#9d3f3f] transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Markeren als gelezen
                </button>
              </div>
            )}
          </div>
        )}
      </AsyncData>
    </div>
  );
}
