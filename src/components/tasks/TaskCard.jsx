import { memo } from "react";
import { IoMdTime } from "react-icons/io";

function getColorClass(letter) {
  const colors = [
    "bg-red-100 text-red-800",
    "bg-yellow-100 text-yellow-800",
    "bg-green-100 text-green-800",
    "bg-blue-100 text-blue-800",
    "bg-orange-100 text-orange-800",
  ];

  // ascii code van hoofdletter
  const code = letter.toUpperCase().charCodeAt(0);
  const index = code % colors.length;

  return colors[index];
}

const timeFormat = new Intl.DateTimeFormat("nl-BE", {
  hour: "2-digit",
  minute: "2-digit",
});

const TaskCardMemoized = memo(function TaskCard({
  id,
  type,
  omschrijving,
  duurtijd,
  startdatum,
  status,
}) {
  const endTime = new Date(new Date(startdatum).getTime() + duurtijd * 60000);

  return (
    <div className="p-4 h-29.25 flex " data-cy="task">
      {/* markeer knop */}
      <div className="min-w-7.5">
        <button className="w-4 h-4 bg-[#F3F3F5] rounded-sm border border-black/10"></button>
      </div>

      {/* taak inhoud */}
      <div className="flex w-full justify-between">
        {/* details van taak */}
        <div>
          <p className="card-title mb-2" data-cy="task_description">
            {omschrijving}
          </p>
          <div className="flex card-text items-center">
            <IoMdTime className="mr-1" />
            <p className="" data-cy="task_time">
              {`${timeFormat.format(new Date(startdatum))} - ${timeFormat.format(endTime)}`}
            </p>
          </div>
          <button className="bg-[#90A1B9] rounded-lg px-1.75 py-0.5 mt-2 text-white">
            Details
          </button>
        </div>

        {/* type van taak */}
        <div className="flex items-center">
          <p
            data-cy="task_type"
            className={`h-fit px-2 py-1 rounded-sm ${getColorClass(type[0])}`}
          >
            {type}
          </p>
        </div>
      </div>
    </div>
  );
});

export default TaskCardMemoized;
