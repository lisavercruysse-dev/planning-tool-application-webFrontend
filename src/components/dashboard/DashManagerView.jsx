// DashManagerView.jsx
import MapAndSitesPanel from "./MapAndSitesPanel";
import SiteInfoCard from "./SiteInfoCard";
import NoSiteSelected from "./NoSiteSelected";
import { ArrowRight } from "lucide-react";

export default function DashManagerView({ 
  userData,
  selectedSite, 
  setSelectedSite,
  onDetails 
}) {

  const handleSelectSite = (site) => setSelectedSite(site);

  return (
    <div className="space-y-6">
      {/* Top: kaart + sites lijst */}
      <MapAndSitesPanel
        onSiteSelect={handleSelectSite}
        selectedSiteId={selectedSite?.id}
      />

      {/* Onder: placeholder knop naar details, infocard en KPI's */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-120 flex items-center justify-center">
        {!selectedSite ? (
          <NoSiteSelected />
        ) : (
          <div className="w-full p-6 flex justify-start gap-8">
            <div >
              {/* Knop naar details */}
              <div className="flex justify-center mb-4">
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
          </div>
        )}
      </div>
    </div>
  );
}