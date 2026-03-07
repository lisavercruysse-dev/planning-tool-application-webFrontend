// src/components/tasks/PlanningTimeline.jsx
import { useMemo } from "react";
import { IoMdTime } from "react-icons/io";
import { TimelineHourLabels } from "./TimelineHourLabels";
import { TIMELINE_START, TIMELINE_END, TOTAL_HOURS, TASK_STATUS_COLORS, DEFAULT_TASK_COLOR } from './TimelineConfig.js';
import { TimeLineLegend } from "./TimeLineLegend.jsx";


function toDateInputValue(date) {
  return date.toISOString().split("T")[0];
}

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} uur`;
  return `${hours}u${String(mins).padStart(2, "0")}`;
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

        <TimeLineLegend />
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
            {dayTasks.map((task) => {
              const start = new Date(task.startdatum);
              const startDecimal = start.getHours() + start.getMinutes() / 60;
              const durationHours = task.duurtijd / 60;

              const clampedStart = Math.max(startDecimal, TIMELINE_START);
              const clampedEnd = Math.min(startDecimal + durationHours, TIMELINE_END);

              const left = ((clampedStart - TIMELINE_START) / TOTAL_HOURS) * 100;
              const width = ((clampedEnd - clampedStart) / TOTAL_HOURS) * 100;

              const endDate = new Date(start.getTime() + task.duurtijd * 60000);
              const timeLabel = `${start.getHours()}:${String(start.getMinutes()).padStart(2, "0")} - ${endDate.getHours()}:${String(endDate.getMinutes()).padStart(2, "0")}`;

              const colorClass = TASK_STATUS_COLORS[task.status] || DEFAULT_TASK_COLOR;

              return (
                <div
                  key={task.id}
                  title={`${task.type}: ${task.omschrijving}
                  Tijd: ${timeLabel}
                  Duur: ${formatDuration(task.duurtijd)}
                  Status: ${task.status}
                  `}
                  className={`absolute top-0.5 bottom-0.5 rounded border px-2 py-1 overflow-hidden ${colorClass}`}
                  style={{ left: `${left}%`, width: `${width}%` }}
                >
                  <p className="text-xs font-semibold truncate">{task.omschrijving}</p>
                  <p className="text-[11px] opacity-75 mt-0.5">{timeLabel}</p>
                  <div className="flex items-center">
                    <IoMdTime className="mr-1" />
                    <p className="text-[11px] opacity-75 mt-0.5">
                      {formatDuration(task.duurtijd)} - {task.status}
                    </p>
                </div>
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </div>
  );
}