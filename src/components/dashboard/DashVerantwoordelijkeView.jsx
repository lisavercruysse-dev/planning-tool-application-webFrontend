import SiteInfoCard from "./SiteInfoCard";
import SiteWorkersPieChart from "./SiteWorkersPieChart";
import { calculateSiteWorkers } from "../../utils/calculateSiteWorkers";
import { mockAfwezigheden } from "../../api/mock_absences";
import KpiStatsTaken from "./KpiStatsTaken";

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

      <div className="flex m-4 items-stretch gap-4">
        <div className="flex-1">
          <SiteInfoCard site={plant} userData={userData}/>
        </div>
        <div className="flex-1">
          <SiteWorkersPieChart 
            workerCount={workerCount}
            availableWorkers={availableWorkers}
            afwezigheden={afwezigheden}
            ziekteAfwezigheden={ziekteAfwezigheden}
            vakantieAfwezigheden={vakantieAfwezigheden}
            siteName={plant.name}
          />
        </div>  
        <div className="flex-1">
          <KpiStatsTaken selectedSite={plant} />
        </div>
      </div>
    </div>
  );
}