import TaskCard from "./TaskCard";

export function TaskCards({ tasks }) {
  //   if (tasks.length === 0) {
  //     return (
  //       <div data-cy='empty' className='p-4 mb-4 text-sm text-gray-800 rounded-lg bg-gray-100'>
  //         There are no tasks yet.
  //       </div>
  //     );
  //   }

  return (
    <div className="border border-gray-200 rounded-[10px] flex flex-col w-full">
      {/* header */}
      <div className="border-b border-gray-200">
        <div className="min-h-19.25 max-h-19.25 flex mx-4 mt-4 ">
          <div className="">
            <p className="card-title mb-1">Mijn Taken</p>
            <p className="card-text">
              Markeer taken als afgewerkt wanneer ze klaar zijn
            </p>
          </div>
          <div>{/* hier moeten zoek elementen komen */}</div>
        </div>
      </div>

      {/* taken */}
      <div className="divide-y divide-gray-200">
        {tasks.map((t) => (
          <TaskCard key={t.id} {...t} />
        ))}
      </div>
    </div>
  );
}
