function getColorClass(letter) {
  const colors = [
    "bg-red-100 text-red-800",
    "bg-yellow-100 text-yellow-800",
    "bg-green-100 text-green-800",
    "bg-blue-100 text-blue-800",
    "bg-orange-100 text-orange-800",
  ];

  const code = letter.toUpperCase().charCodeAt(0);
  const index = code % colors.length;

  return colors[index];
}

export default function TaskTemplate({ taskTemplate }) {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_200px] items-center py-3 border-b border-[#F5F5F5] text-sm">

      <p className="truncate min-w-50">
        {taskTemplate.omschrijving}
      </p>

      <p className="min-w-50">
        {taskTemplate.minuten} min
      </p>

      {/* colored type badge */}
      <div className="min-w-50">
        <span
          className={`px-2 py-1 rounded-sm text-xs font-medium ${getColorClass(
            taskTemplate.type[0]
          )}`}
        >
          {taskTemplate.type}
        </span>
      </div>

      <div className="flex justify-end min-w-50">
        <button className="px-3 py-1 border border-[#E5E5E5] rounded-lg hover:bg-gray-50">
          Toewijzen
        </button>
      </div>

    </div>
  );
}