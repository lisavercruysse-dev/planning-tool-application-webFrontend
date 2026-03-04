import React from "react";
import { FileText, Trash2, ArrowRight } from "lucide-react";

export default function NotificationCard({ notification }) {
  return (
    <div
      data-cy="notification-card"
      className={`p-4 border-b border-gray-100 last:border-b-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        notification.isRead ? "bg-white" : "bg-[#fde8e8]"
      }`}
    >
      <div className="flex items-start gap-3">
        <FileText
          className={`w-5 h-5 mt-0.5 ${
            notification.isRead ? "text-gray-500" : "text-[#b64949]"
          }`}
          strokeWidth={1.5}
        />
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            {notification.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {notification.description}
          </p>
          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0 justify-end">
        <button className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-md hover:bg-gray-100">
          <Trash2 className="w-4 h-4" />
        </button>
        <button className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          Bekijk <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
