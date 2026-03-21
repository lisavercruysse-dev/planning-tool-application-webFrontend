import { useState } from "react";
import DashManagerView from "./DashManagerView";
import DashManagerDetail from "./DashManagerDetail";
import { USER_DATA } from "../../api/mock_data";

export default function DashManager() {
  const [view, setView] = useState("overview");
  const [selectedSite, setSelectedSite] = useState(null);
  const userData = USER_DATA;

  return (
    <div className="min-h-screen bg-gray-50 m-4 p-6">
      {view === "overview" ? (
        <DashManagerView 
          userData={userData}
          selectedSite={selectedSite}
          setSelectedSite={setSelectedSite}
          onDetails={() => setView("details")} 
        />
      ) : (
        <DashManagerDetail 
          selectedSite={selectedSite}
          userData={userData}
          onBack={() => setView("overview")} 
        />
      )}
    </div>
  );
}