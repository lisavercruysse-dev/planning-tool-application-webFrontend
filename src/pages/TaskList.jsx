import { useState, useMemo } from "react";
import { TASK_DATA } from "../api/mock_data";
import { TaskCards } from "../components/tasks/TaskCards";
import { PlanningTimeline } from "../components/tasks/PlanningTimeline";
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
    <div className="mx-16 mt-8">
      {/* Date selector */}
      <div className="mx-16 mt-8 flex flex-col gap-8">
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      /></div>

      <PlanningTimeline tasks={filteredTasks} selectedDate={selectedDate} />
      <TaskCards
        tasks={filteredTasks}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
}
