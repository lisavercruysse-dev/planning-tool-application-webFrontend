import React from "react";
import NotificationCard from "../components/notifications/NotificationCard";
import { mockNotifications } from "../api/mock_notifications";

export default function Notifications() {
  return (
    <div className="p-4 md:p-8 w-full max-w-6xl mx-auto font-sans">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-medium text-gray-800">
          Meldingen
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Blijf up-to-date met al uw meldingen.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-800">
            Meldingen ({mockNotifications.length})
          </h2>
        </div>
        <div className="flex flex-col">
          {mockNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
