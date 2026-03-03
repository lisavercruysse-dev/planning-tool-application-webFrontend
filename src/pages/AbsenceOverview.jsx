import React from "react";
import StatCard from "../components/absences/StatCard";
import AbsenceRow from "../components/absences/AbsenceRow";
import { mockAfwezigheden, mockStats } from "../api/mock_absences";
import { Plane, PlusSquare } from "lucide-react";

export default function AbsenceOverview() {
  return (
    <div className="p-4 md:p-8 w-full max-w-6xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-xl md:text-2xl font-medium text-gray-800">
          Beheer afwezigheden
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button className="flex items-center justify-center gap-2 bg-[#b64949] text-white px-4 py-2 rounded-md hover:bg-[#9d3f3f] transition-colors text-sm font-medium">
            <PlusSquare className="w-4 h-4" />
            Ziekte melden
          </button>
          <button className="flex items-center justify-center gap-2 bg-[#4863d6] text-white px-4 py-2 rounded-md hover:bg-[#3c52b3] transition-colors text-sm font-medium">
            <Plane className="w-4 h-4" />
            Vakantie aanvragen
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <StatCard
          label="Totale ziektedagen dit jaar"
          value={mockStats.totaleZiektedagen}
        />
        <StatCard
          label="Totale vakantiedagen dit jaar"
          value={mockStats.totaleVakantiedagen}
        />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-800">
            Afwezigheden overzicht
          </h2>
        </div>
        <div className="p-5 flex flex-col gap-4">
          {mockAfwezigheden.map((item) => (
            <AbsenceRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
