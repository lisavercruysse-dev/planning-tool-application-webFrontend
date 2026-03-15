import { useState, useMemo } from "react";
import { TASK_DATA, PLANTS, TEAMS, USER_DATA, TASK_TEMPLATE_DATA } from "../api/mock_data";
import { TaskList } from '../components/tasks/TaskList';
import { PlanningTimeline } from "../components/tasks/PlanningTimeline";
import TaskDetailsModal from '../components/tasks/TaskDetailsModal';
import { FilterBar } from "../components/FilterBar";
import { MemberRow } from "../components/tasks/MemberRow";
import { TimeLineLegend } from "../components/tasks/TimeLineLegend.jsx";
import { useAuth } from "../contexts/auth";
import { TimelineHourLabels } from "../components/tasks/TimelineHourLabels";
import EditTimeBlockModal from "../components/tasks/EditTimeBlockModal.jsx";
import TaskTemplateList from "../components/taskTemplates/TaskTemplateList.jsx";

const teamsForPlant = (plantId) => {
  console.log("plantId type:", typeof plantId, "value:", plantId);
  console.log("teams:", TEAMS.filter((t) => t.plantId === plantId));
  return TEAMS.filter((t) => t.plantId === Number(plantId));
};

export default function Planning() {
  const { user } = useAuth();
  const isManagerOrVerantwoordelijke = user?.jobTitel === "verantwoordelijke" || user?.jobTitel === "manager";
  const isWerknemer = user?.jobTitel === "werknemer";
  const isVerantwoordelijke = user?.jobTitel === "verantwoordelijke";
  
  const getDefaultPlantId = () => {
    const plantId = isVerantwoordelijke ? Number(user?.plantId) : PLANTS[0].id;
    return isNaN(plantId) ? PLANTS[0].id : plantId;
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(getDefaultPlantId);
  const [selectedTeam,  setSelectedTeam]  = useState(teamsForPlant(getDefaultPlantId)[0]?.id ?? null);
  const [modelType, setModelType] = useState("");
  const [tasks, setTasks] = useState(TASK_DATA);
  const [selectedTaskBlock, setSelectedTaskBlock] = useState(null);

  // Update team when plant changes
  function handlePlantChange(plantId) {
    const id = Number(plantId);
    setSelectedPlant(id);
    setSelectedTeam(teamsForPlant(id)[0]?.id ?? "");
  }

  // Filtered members
  const filteredMembers = useMemo(
    () => USER_DATA.filter((m) => m.plantId === selectedPlant && m.teamIds?.includes(selectedTeam)),
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

  const showEditTimeBlockModal = (task) => {
    setSelectedTaskBlock(task);
  }
  const closeEditTimeBlockModal = () => {
    setSelectedTaskBlock(null);
  }

  const filteredTasks = useMemo(() => {
     return tasks.filter((task) => {
      const matchesSearch = task.omschrijving
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const taskDate = task.startdatum.split("T")[0];
      const matchesDate = selectedDate ? taskDate === selectedDate : true;
      const matchesMember = isWerknemer ? task.memberId === user.id : true;
      return matchesSearch && matchesDate && matchesMember;
    });
  }, [searchQuery, selectedDate, tasks, user.id, isWerknemer]);

  return (
    <div className="mx-16 mt-8">

      {/* Filters */}
      <FilterBar
        plants={PLANTS}
        plant={selectedPlant}
        onPlant={handlePlantChange}
        teams={teamsForPlant(selectedPlant)}
        team={selectedTeam}
        onTeam={(id) => setSelectedTeam(Number(id))}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <TimeLineLegend />

      {/* Timeline werknemer */}
      {isWerknemer && (
        <PlanningTimeline tasks={filteredTasks} selectedDate={selectedDate}/>
      )}

      {/* Member rows */}
      <TimelineHourLabels />
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
              onEdit={(task) => showEditTimeBlockModal(task)}
            /> // onEdit en onDelete nog toevoegen
          ))
        )}
      </div>
      )}

      {isWerknemer &&    
      <TaskList
        tasks={filteredTasks}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onTaskDetailsClick={(task) => showModal(task, "details")}
        onCompleted={(task) => showModal(task, "complete")}
        onCancel={(task) => showModal(task, "cancel")}
      />
      }

      {isManagerOrVerantwoordelijke &&
        <TaskTemplateList taskTemplates={TASK_TEMPLATE_DATA}/>
      }

      <TaskDetailsModal 
        isOpen={!!selectedTask}
        onClose={closeModal}
        task={selectedTask}
        type={modelType}
        onSubmit={handleSubmitTask}
        onCancel={handleSubmitTask}
      />

      <EditTimeBlockModal
        isOpen={!!selectedTaskBlock}
        onClose={closeEditTimeBlockModal}
        task={selectedTaskBlock}
        werknemers={filteredMembers}
      />
    </div>
  );
}
