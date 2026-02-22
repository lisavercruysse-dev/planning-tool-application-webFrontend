import TaskCard from "./TaskCard";
import img from "../assets/boxlogo.png";

export function TaskCards({ tasks }) {
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
        {tasks.length ? (
          tasks.map((t) => <TaskCard key={t.id} {...t} />)
        ) : (
          <div className="w-full flex justify-center mt-10 mb-20">
            <div>
              <img
                src={img}
                alt="niks gevonden"
                className="max-w-xs ml-0"
                data-cy="empty"
              />
              <p className="card-title text-center">Geen resultaten</p>
              <p className="card-text text-center">
                Er werden geen taken gevonden die aan je <br />
                zoekcriteria voldoen
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
