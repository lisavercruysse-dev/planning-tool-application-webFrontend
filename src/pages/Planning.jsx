import { useState, useMemo } from "react";
import { TASK_DATA, PLANTS, TEAMS } from "../api/mock_data";
import { TaskList }  from '../components/tasks/TaskList';
import { PlanningTimeline } from "../components/tasks/PlanningTimeline";
import { DatePicker } from "../components/DatePicker";
import TaskDetailsModal from '../components/tasks/TaskDetailsModal';
import { FilterBar } from "../components/FilterBar";


export default function Planning() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(PLANTS[0]);
  const [selectedTeam,  setSelectedTeam]  = useState(TEAMS[PLANTS[0]][0]);
  const [modelType, setModelType] = useState("");
  const [tasks, setTasks] = useState(TASK_DATA);

  // Update team when plant changes
  function handlePlantChange(p) {
    setSelectedPlant(p);
    setSelectedTeam(TEAMS[p][0]);
  }


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

      {/* Filters */}
      <FilterBar
        plants={PLANTS}
        plant={selectedPlant}
        onPlant={handlePlantChange}
        teams={TEAMS[selectedPlant]}
        team={selectedTeam}
        onTeam={setSelectedTeam}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

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
