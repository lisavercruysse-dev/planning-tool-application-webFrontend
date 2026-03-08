import { FiFilter } from "react-icons/fi";
import { DatePicker } from "./DatePicker";

export function FilterBar({ plants, plant, onPlant, teams, team, onTeam, selectedDate, setSelectedDate }) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-5">
      {/* Plant filter */}
      <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 bg-white shadow-sm">
        <FiFilter className="text-gray-400 text-xs" />
        <select
          value={plant}
          onChange={(e) => onPlant(e.target.value)}
          className="text-sm text-gray-700 bg-transparent outline-none cursor-pointer"
        >
          {plants.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Team filter */}
      <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 bg-white shadow-sm">
        <FiFilter className="text-gray-400 text-xs" />
        <select
          value={team}
          onChange={(e) => onTeam(e.target.value)}
          className="text-sm text-gray-700 bg-transparent outline-none cursor-pointer"
        >
          {teams.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Date selector */}
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
}