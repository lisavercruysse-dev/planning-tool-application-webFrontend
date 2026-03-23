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
import DeleteTaskModal from "../components/tasks/DeleteTaskModal.jsx";
import TaskTemplateList from "../components/taskTemplates/TaskTemplateList.jsx";
import UncompletedTaskList from '../components/tasks/uncompletedTasks/UncompletedTaskList.jsx';
import useSWR from "swr";
import { getAll, updateById } from "../api/index.js";
import AsyncData from '../components/asyncData/AsyncData.jsx';
import useSWRMutation from "swr/mutation";

const teamsForPlant = (plantId) => {
  console.log("plantId type:", typeof plantId, "value:", plantId);
  console.log("teams:", TEAMS.filter((t) => t.plantId === plantId));
  return TEAMS.filter((t) => t.plantId === Number(plantId));
};

export default function Planning() {
  const { user } = useAuth();

  if (!user) {
  return null;
}

  const {
    data: werknemerTasks = [],
    isLoading,
    error,
  } = useSWR(`werknemers/${user.id}/taken`, getAll) 

  console.log("taken: ", werknemerTasks)

  console.log("werknemertasks: ", werknemerTasks)

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
  const [selectedTeam, setSelectedTeam] = useState(
    teamsForPlant(getDefaultPlantId())[0]?.id ?? null
  );
  const [modelType, setModelType] = useState("");
  const [tasks, setTasks] = useState(TASK_DATA);
  const [selectedTaskBlock, setSelectedTaskBlock] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  
const {
  trigger: onSubmit,
  error: saveError
} = useSWRMutation(
  selectedTask ? `taken/${selectedTask.id}/status` : null,
  updateById
);

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

  const showModal = (task, requestedType) => {
    const modalType = requestedType === "complete" && task.status === "afgewerkt" ? "cancel" : requestedType;
    setSelectedTask(task);
    setModelType(modalType);
  };
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

  const showDeleteTaskModal = (task) => {
    setTaskToDelete(task);
  }
  const closeDeleteTaskModal = () => {
    setTaskToDelete(null)
  }
  const handleDeleteTask = (taskId) => {
  setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
  closeDeleteTaskModal();
  };

  const filteredTasks = useMemo(() => {
     return werknemerTasks?.filter((task) => {
      const matchesSearch = task.taakTemplate.omschrijving
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const taskDate = task.datum.split("T")[0];
      const matchesDate = selectedDate ? taskDate === selectedDate : true;
      const matchesMember = isWerknemer ? task.werknemerId === user.id : true;
      return matchesSearch && matchesDate && matchesMember;
    });
  }, [searchQuery, selectedDate, werknemerTasks, user.id, isWerknemer]);

  const uncompletedTasks = useMemo(() => {
    return werknemerTasks.filter((t) => {
      const isPast = new Date(t.datum) < new Date();

      const member = USER_DATA.find((u) => u.id === t.memberId);
      const sameTeam = member?.teamIds?.includes(selectedTeam);

      return isPast && sameTeam;
    });
  }, [werknemerTasks, selectedTeam]);

  return (
    <div className="mx-16 mt-8">
      <p className="text-gray-800 text-xl p-4 md:text-2xl font-bold">Planning</p>

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
              onDelete={(task) => showDeleteTaskModal(task)}
            /> 
          ))
        )}
      </div>
      )}

      <AsyncData loading={isLoading} error={error}>
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
      </AsyncData>

      {isManagerOrVerantwoordelijke && 
        <UncompletedTaskList tasks={uncompletedTasks} onAssign={showEditTimeBlockModal}/>
      }

      {isManagerOrVerantwoordelijke &&
        <TaskTemplateList taskTemplates={TASK_TEMPLATE_DATA} onAssign={showEditTimeBlockModal}/>
      }

        <TaskDetailsModal 
          isOpen={!!selectedTask}
          onClose={closeModal}
          task={selectedTask}
          type={modelType}
          onSubmit={onSubmit}
        />

      <EditTimeBlockModal
        isOpen={!!selectedTaskBlock}
        onClose={closeEditTimeBlockModal}
        task={selectedTaskBlock}
        werknemers={filteredMembers}
      />

      <DeleteTaskModal
        isOpen = {!!taskToDelete}
        onClose = {closeDeleteTaskModal}
        task = {taskToDelete}
        onDelete = {handleDeleteTask}
      />
    </div>
  );
}
