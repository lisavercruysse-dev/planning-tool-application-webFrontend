import React from "react";

export default function AbsenceRow({ item }) {
  return (
    <div
      data-cy="absence-row"
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#f8f9fa] rounded-lg border border-gray-100 gap-4"
    >
      <div className="flex items-start gap-3">
        <svg
          className="w-5 h-5 text-gray-400 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <div>
          <p className="text-sm text-gray-800">
            {item.startDate} - {item.endDate}
          </p>
          <p className="text-xs text-gray-500 mt-1">{item.days}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
        {item.type === "Vakantie" && (
          <span className="px-2 py-1 bg-[#f3e8ff] text-[#7e22ce] rounded text-xs">
            Vakantie
          </span>
        )}
        {item.status === "In behandeling" && (
          <span className="px-2 py-1 bg-[#fef3c7] text-[#b45309] rounded text-xs">
            In behandeling
          </span>
        )}
        {item.type === "Ziekte" && (
          <span className="px-2 py-1 bg-[#fee2e2] text-[#b91c1c] rounded text-xs">
            Ziekte
          </span>
        )}
        {item.canCancel && (
          <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded text-xs hover:bg-gray-50 transition-colors ml-auto sm:ml-2">
            Annuleren
          </button>
        )}
      </div>
    </div>
  );
}
