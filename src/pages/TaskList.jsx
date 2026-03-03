import { useState, useMemo } from "react";
import { TASK_DATA } from "../api/mock_data";
import { TaskCards } from "../components/TaskCards";
import { DatePicker } from "../components/DatePicker";

export default function TaskList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const filteredTasks = useMemo(() => {
    return TASK_DATA.filter((task) => {
      const matchesSearch = task.omschrijving
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const taskDate = task.startdatum.split("T")[0];
      const matchesDate = selectedDate ? taskDate === selectedDate : true;

      return matchesSearch && matchesDate;
    });
  }, [searchQuery, selectedDate]);

  return (
    <div className="mx-16 mt-8 flex flex-col gap-8">
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

import { TaskCards } from "../components/tasks/TaskCards";
import { PlanningTimeline } from "../components/tasks/PlanningTimeline";

function toDateInputValue(date) {
  return date.toISOString().split("T")[0];
}

export default function TaskList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(toDateInputValue(new Date()));

  const filteredTasks = useMemo(() => {
    const byDate = TASK_DATA.filter((task) =>
      toDateInputValue(new Date(task.startdatum)) === selectedDate
    );
    if (!searchQuery) return byDate;
    return byDate.filter((task) =>
      task.omschrijving.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, selectedDate]);

  return (
    <div className="mx-16 mt-8">
      {/* Datepicker */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-gray-700 font-medium">
          Kies datum:
        </span>

        <label className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border-none outline-none text-sm text-gray-700 bg-transparent"
          />
        </label>
      </div>

      <PlanningTimeline tasks={filteredTasks} selectedDate={selectedDate} />
      <TaskCards
        tasks={filteredTasks}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
}
