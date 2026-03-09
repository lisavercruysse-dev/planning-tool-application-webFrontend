// src/components/tasks/PlanningTimeline.jsx
import { useMemo } from "react";
import { TimelineHourLabels } from "./TimelineHourLabels";
import { TOTAL_HOURS } from './TimelineConfig.js';
import { TimeLineLegend } from "./TimeLineLegend.jsx";
import { TaskBlock } from "./TaskBlock.jsx";


function toDateInputValue(date) {
  return date.toISOString().split("T")[0];
}

export function PlanningTimeline({ tasks, selectedDate }) {
  const dayTasks = useMemo(() => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.startdatum);
      return toDateInputValue(taskDate) === selectedDate;
    });
  }, [tasks, selectedDate]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-x-hidden mb-6">
      <div className="min-w-200">
        
        <TimelineHourLabels />

        {/* Timeline row */}
        <div className="flex relative min-h-22">

          {/* Left label */}
          <div className="w-40 shrink-0 px-4 py-3 border-r border-gray-200">
            <p className="font-semibold text-sm text-gray-800">Mijn Taken</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Totaal aantal: {dayTasks.length} {dayTasks.length !== 1 ? "taken" : "taak"}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Afgewerkt: {dayTasks.filter((t) => t.status === "Afgewerkt").length}{" "}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Nog uit te voeren: {dayTasks.filter((t) => t.status === "Gepland").length}{" "}
            </p>
          </div>

          {/* Grid + blocks */}
          <div className="flex-1 relative my-2">

            {/* Vertical grid lines */}
            {Array.from({ length: TOTAL_HOURS + 1 }, (_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 border-l border-gray-100"
                style={{ left: `${(i / TOTAL_HOURS) * 100}%` }}
              />
            ))}

            {/* Empty state */}
            {dayTasks.length === 0 && (
              <div className="absolute inset-0 flex items-center pl-4 text-sm text-gray-400">
                Geen taken gepland voor deze dag.
              </div>
            )}

            {/* Task blocks */}
            {dayTasks.map((task) => (
              <TaskBlock key={task.id} task={task}  />
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}