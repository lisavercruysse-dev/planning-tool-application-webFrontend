import SiteInfoCard from "./SiteInfoCard";
import SiteWorkersPieChart from "./SiteWorkersPieChart";
import { calculateSiteWorkers } from "../../utils/calculateSiteWorkers";
import { mockAfwezigheden } from "../../api/mock_absences";

export default function DashVerantwoordelijkeView({
  plant, 
  userData,
  onDetails
}) {

  const {
  workerCount,
  afwezigheden,
  ziekteAfwezigheden,
  vakantieAfwezigheden,
  availableWorkers,
} = calculateSiteWorkers(plant.id, userData, mockAfwezigheden);

  return (
    <div className="space-y-6">
      {/* Header met details-knop */}
      <div className="flex items-center justify-between m-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {plant?.name}
        </h1>
        <button onClick={onDetails} 
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors">
            Bekijk details
        </button>
      </div>

      <div className="flex ml-3 items-center gap-3">
        <SiteInfoCard site={plant} userData={userData}/>
        <SiteWorkersPieChart 
          workerCount={workerCount}
          availableWorkers={availableWorkers}
          afwezigheden={afwezigheden}
          ziekteAfwezigheden={ziekteAfwezigheden}
          vakantieAfwezigheden={vakantieAfwezigheden}
          siteName={plant.name}
        />
      </div>
    </div>
  );
}