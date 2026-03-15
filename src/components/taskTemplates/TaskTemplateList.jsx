import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import TaskTemplate from "./TaskTemplate";

export default function TaskTemplateList({ taskTemplates }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full">

      <div className="grid grid-cols-[2fr_1fr_1fr_200px] items-center py-3 border-y border-gray-200 text-sm font-medium">
        <p className="min-w-50">omschrijving</p>
        <p className="min-w-50">geschatte tijd</p>
        <p className="min-w-50">type</p>

        <div className="flex gap-3 justify-end">
          <input
            type="text"
            placeholder="omschrijving"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-200 rounded-md px-3 py-2 w-60 text-sm outline-none focus:border-gray-400"
          />

          <button className="bg-[#33333E] hover:bg-gray-800 text-white rounded-md px-4 py-2 flex items-center gap-2 text-sm transition-colors">
            <FiSearch />
            Zoeken
          </button>
        </div>
      </div>

      {taskTemplates.map((task) => (
        <TaskTemplate key={task.id} taskTemplate={task} />
      ))}
    </div>
  );
}