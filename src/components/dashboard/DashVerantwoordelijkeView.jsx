import SiteInfoCard from "./SiteInfoCard";

export default function DashVerantwoordelijkeView({
  plant, 
  userData,
  onDetails
}) {

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

      <div>
        <SiteInfoCard site={plant} userData={userData}/>
      </div>
    </div>
  );
}