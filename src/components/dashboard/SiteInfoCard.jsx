import { MapPin, Users, User, Settings, Clock, CheckSquare } from "lucide-react";
import { mockAfwezigheden } from "../../api/mock_absences";

export default function SiteInfoCard({ 
  site, 
  userData 
}) {
  if (!site) return null;

  const responsible = userData
    .filter((u) => u.plantId === site.id && u.jobTitel === "verantwoordelijke")
    .map((user) => `${user.firstName} ${user.lastName}`)
    .join(", ") || "Geen verantwoordelijke toegewezen";

  const workerCount = userData.filter(
    (u) => u.plantId === site.id && u.jobTitel === "werknemer"
  ).length;

   // Alle uniekewerknemer-ID's van deze site
  const siteWorkerIds = new Set(
    userData
      .filter((u) => u.plantId === site.id && u.jobTitel === "werknemer")
      .map((u) => u.id)
  );

  const today = new Date();

  const absentWorkerIds = new Set(
    mockAfwezigheden
      .filter((afwezigheid) => {
        const start = new Date(afwezigheid.startDate);
        const end = new Date(afwezigheid.endDate);
        return (
          siteWorkerIds.has(afwezigheid.werknemerId) &&
          start <= today &&
          end >= today &&
          (afwezigheid.status === "Goedgekeurd" || afwezigheid.status === "In behandeling")
        );
      })
      .map((a) => a.werknemerId)
  );

  const afwezigheden = absentWorkerIds.size;

  console.log(`Afwezigheden voor site ${site.name} (plantId ${site.id}):`, afwezigheden);

  const availableWorkers = workerCount - afwezigheden;
  

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 w-72 flex flex-col gap-5">
      {/* Locatie */}
      <div className="flex items-start gap-3">
        <MapPin size={22} className="text-gray-400 mt-0.5 shrink-0" strokeWidth={1.5} />
        <div>
          <p className="font-semibold text-gray-800 text-sm">{site.name}</p>
          <p className="text-xs text-gray-400">{site.location}</p>
        </div>
      </div>

      {/* Werknemers */}
      <div className="flex items-center gap-3">
        <Users size={22} className="text-gray-400 shrink-0" strokeWidth={1.5} />
        <div>
          <p className="text-sm font-semibold text-gray-800">
            <span> {availableWorkers} / {workerCount}</span>
            <span className="text-xs text-gray-400"> werknemers</span>
          </p>
        </div>
      </div>

      {/* Verantwoordelijke */}
      <div className="flex items-center gap-3">
        <User size={22} className="text-gray-400 shrink-0" strokeWidth={1.5} />
        <div>
          <p className="text-sm font-semibold text-gray-700">
            <span className="font-normal text-gray-400">Verantwoordelijke: </span>
            <br />
            <span>{responsible}</span>
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-start gap-3">
        <Settings size={22} className="text-gray-400 mt-0.5 shrink-0" strokeWidth={1.5} />
        <div>
          <p className="text-sm text-gray-400">
            Operationele status:{" "}
            <span
              className={`font-semibold ${
                site.status === "actief" ? "text-green-600" : "text-red-500"
              }`}
            >
              {site.status}
            </span>
          </p>
          <p className="text-sm text-gray-400">
            Productiestatus:{" "}
            <span
              className={`font-semibold ${
                site.statusProductie === "Gezond"
                  ? "text-green-600"
                  : site.statusProductie === "Waarschuwing"
                  ? "text-yellow-600"
                  : "text-red-500"
              }`}
            >
              {site.statusProductie}
            </span>
          </p>
        </div>
      </div>

      {/* Gemiddelde taakduur */}
      <div className="flex items-center gap-3">
        <Clock size={22} className="text-gray-400 shrink-0" strokeWidth={1.5} />
        <div>
          <p className="text-xs text-gray-400">Gemiddelde duur taak voltooien</p>
          <p className="text-sm font-semibold text-gray-800">
            {site.avgTaskMinutes ?? "—"} minuten
          </p>
        </div>
      </div>

      {/* Voltooide taken vandaag */}
      <div className="flex items-center gap-3">
        <CheckSquare size={22} className="text-gray-400 shrink-0" strokeWidth={1.5} />
        <div>
          <p className="text-xs text-gray-400">Aantal voltooide taken vandaag</p>
          <p className="text-sm font-semibold text-gray-800">
            {site.tasksCompletedToday ?? "—"}
          </p>
        </div>
      </div>
    </div>
  );
}