import { useState, useMemo } from "react";
import { TASK_DATA } from "../api/mock_data";
import { TaskList }  from '../components/tasks/TaskList';
import { PlanningTimeline } from "../components/tasks/PlanningTimeline";
import { DatePicker } from "../components/DatePicker";
import TaskDetailsModal from '../components/tasks/TaskDetailsModal';


export default function Planning() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [modelType, setModelType] = useState("");
  const [tasks, setTasks] = useState(TASK_DATA);

  const handleSubmitTask = (updatedTask) => {
    setTasks((oldList) => oldList.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    closeModal();
  }

  const showModal = (task, type) => {
    setSelectedTask(task);
    setModelType(type)
  }
  const closeModal = () => {
    setSelectedTask(null);
    setModelType("");
  }

  const filteredTasks = useMemo(() => {
     return tasks.filter((task) => {
      const matchesSearch = task.omschrijving
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const taskDate = task.startdatum.split("T")[0];
      const matchesDate = selectedDate ? taskDate === selectedDate : true;

      return matchesSearch && matchesDate;
    });
  }, [searchQuery, selectedDate, tasks]);

  return (
    <div className="mx-16 mt-8">
      {/* Date selector */}
      <div className="mx-16 mt-8 flex flex-col gap-8">
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      /></div>

      <PlanningTimeline tasks={filteredTasks} selectedDate={selectedDate} />
      <TaskList 
        tasks={filteredTasks}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onTaskDetailsClick={(task) => showModal(task, "details")}
        onCompleted={(task) => showModal(task, "complete")}
        onCancel={(task) => showModal(task, "cancel")}
      />

      <TaskDetailsModal 
        isOpen={!!selectedTask}
        onClose={closeModal}
        task={selectedTask}
        type={modelType}
        onSubmit={handleSubmitTask}
        onCancel={handleSubmitTask}
      />
    </div>
  );
}
