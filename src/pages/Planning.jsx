import { useState, useMemo } from "react";
import { TASK_DATA, PLANTS, TEAMS, USER_DATA } from "../api/mock_data";
import { TaskList }  from '../components/tasks/TaskList';
import { PlanningTimeline } from "../components/tasks/PlanningTimeline";
import TaskDetailsModal from '../components/tasks/TaskDetailsModal';
import { FilterBar } from "../components/FilterBar";
import { MemberRow } from "../components/tasks/MemberRow";
import { TimeLineLegend } from "../components/tasks/TimeLineLegend.jsx";
import { useAuth } from "../contexts/auth";

export default function Planning() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(PLANTS[0]);
  const [selectedTeam,  setSelectedTeam]  = useState(TEAMS[PLANTS[0]][0]);
  const [modelType, setModelType] = useState("");
  const [tasks, setTasks] = useState(TASK_DATA);

  const { user } = useAuth();
  const isManagerOrVerantwoordelijke = user?.jobTitel === "verantwoordelijke" || user?.jobTitel === "manager";
  const isWerknemer = user?.jobTitel === "werknemer";

  // Update team when plant changes
  function handlePlantChange(p) {
    setSelectedPlant(p);
    setSelectedTeam(TEAMS[p][0]);
  }

  // Filtered members
  const filteredMembers = useMemo(
    () => USER_DATA.filter((m) => m.plant === selectedPlant && m.team === selectedTeam),
    [selectedPlant, selectedTeam]
  );

  // Tasks per member for the selected day
  function memberTasks(memberId) {
    return tasks.filter((t) => {
      const taskDate = t.startdatum.split("T")[0];
      return t.memberId === memberId && taskDate === selectedDate;
    });
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
      <TimeLineLegend />

      {/* Timeline werknemer */}
      {isWerknemer && (
        <PlanningTimeline tasks={filteredTasks} selectedDate={selectedDate} />
      )}

      {/* Member rows */}
      {isManagerOrVerantwoordelijke && (
      <div className="divide-y divide-gray-100">
        {filteredMembers.length === 0 ? (
          <div className="py-10 text-center text-sm text-gray-400">
            Geen teamleden gevonden voor de geselecteerde filters.
          </div>
        ) : (
          filteredMembers.map((member) => (
            <MemberRow
              key={member.id}
              member={member}
              tasks={memberTasks(member.id)}

            /> // onEdit en onDelete nog toevoegen
          ))
        )}
      </div>
      )}

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
