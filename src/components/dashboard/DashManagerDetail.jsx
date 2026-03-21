// DashManagerDetail.jsx
import { ArrowLeft } from "lucide-react";
import SiteInfoCard from "./SiteInfoCard";

export default function DashManagerDetail({ 
  selectedSite, userData, onBack 
}) {
  
  return (
    <div className="space-y-6">
      {/* Header met terug-knop */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {selectedSite?.name}
          </h1>
        </div>

        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
        >
          <ArrowLeft size={20} />
          Terug naar overzicht
        </button>
      </div>

      {/* Placeholder content */}
      <div className="w-full p-6 flex gap-8">
            <div className="w-full p-6 flex gap-8">
              {/* Linkerkant: infobox */}
              <div className="flex flex-col gap-4">
                <SiteInfoCard site={selectedSite} userData={userData} />
              </div>
            </div>
      </div>
    </div>
  );
}