// DashManagerView.jsx
import MapAndSitesPanel from "./MapAndSitesPanel";
import SiteInfoCard from "./SiteInfoCard";
import NoSiteSelected from "./NoSiteSelected";
import { ArrowRight } from "lucide-react";
import SiteWorkersPieChart from "./SiteWorkersPieChart";
import { calculateSiteWorkers } from "../../utils/calculateSiteWorkers";
import { mockAfwezigheden } from "../../api/mock_absences";
import KpiStatsTaken from "./KpiStatsTaken";

export default function DashManagerView({ 
  userData,
  selectedSite, 
  setSelectedSite,
  onDetails 
}) {

  const handleSelectSite = (site) => setSelectedSite(site);
  const {
  workerCount,
  afwezigheden,
  ziekteAfwezigheden,
  vakantieAfwezigheden,
  availableWorkers,
} = calculateSiteWorkers(selectedSite?.id, userData, mockAfwezigheden);

  return (
    <div className="space-y-6">
      {/* Top: kaart + sites lijst */}
      <MapAndSitesPanel
        onSiteSelect={handleSelectSite}
        selectedSiteId={selectedSite?.id}
      />

      {/* Onder: placeholder knop naar details, infocard en KPI's */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-135 flex items-center justify-center">
        {!selectedSite ? (
          <NoSiteSelected />
        ) : (
          <div className="w-full p-6 flex gap-8">
            <div className="w-full p-6 flex gap-8 items-stretch">
  
              {/* Linkerkant: button naar details + infobox */}
              <div className="flex flex-col gap-4 h-full">
                <div className="flex justify-center">
                  <button
                    onClick={onDetails}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-md rounded-md transition-colors"
                  >
                    Details
                    <ArrowRight size={18} className="inline-block ml-2" strokeWidth={1.5} />
                  </button>
                </div>

                <SiteInfoCard site={selectedSite} userData={userData} />
              </div>

              {/* Rechterkant: piechart Werknemersstatus */}
              <div className="h-full flex">
                <SiteWorkersPieChart 
                  workerCount={workerCount}
                  availableWorkers={availableWorkers}
                  afwezigheden={afwezigheden}
                  ziekteAfwezigheden={ziekteAfwezigheden}
                  vakantieAfwezigheden={vakantieAfwezigheden}
                />
              </div>

              <div className="h-full flex">
                <KpiStatsTaken 
                  selectedSite={selectedSite}
                />
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}