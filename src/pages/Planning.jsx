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

  // Update team when plant changes
  function handlePlantChange(p) {
    setSelectedPlant(p);
    setSelectedTeam(TEAMS[p][0]);
  }

  const showModal = (task) => setSelectedTask(task);
  const closeModal = () => setSelectedTask(null);

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
        onTaskDetailsClick={showModal}
      />

      <TaskDetailsModal 
        isOpen={!!selectedTask}
        onClose={closeModal}
        task={selectedTask}
      />
    </div>
  );
}
