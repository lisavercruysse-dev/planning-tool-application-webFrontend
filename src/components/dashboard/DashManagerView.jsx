// DashManagerView.jsx
import MapAndSitesPanel from "./MapAndSitesPanel";
import SiteInfoCard from "./SiteInfoCard";
import NoSiteSelected from "./NoSiteSelected";

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

      {/* Onder: placeholder of detail info */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-100 flex items-center justify-center">
        {!selectedSite ? (
          <NoSiteSelected />
        ) : (
          <div className="w-full p-6 flex justify-start gap-8">
            <SiteInfoCard site={selectedSite} userData={userData} />

            {/* Knop naar details */}
            <div className="flex items-start pt-2">
              <button
                onClick={onDetails}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-md transition-colors"
              >
                Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}