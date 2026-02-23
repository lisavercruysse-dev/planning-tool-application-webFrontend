import { useState, useMemo } from "react";
import { TASK_DATA } from "../api/mock_data";
import { TaskCards } from "../components/tasks/TaskCards";

export default function TaskList() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = useMemo(() => {
    if (!searchQuery) return TASK_DATA;
    return TASK_DATA.filter((task) =>
      task.omschrijving.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  return (
    <div className="mx-16 mt-8">
      <TaskCards
        tasks={filteredTasks}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
}
