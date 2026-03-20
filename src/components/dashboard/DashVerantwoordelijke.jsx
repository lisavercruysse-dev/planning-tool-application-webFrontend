import { useState } from "react";
import { useAuth } from "../../contexts/auth";
import { USER_DATA, PLANTS } from "../../api/mock_data";
import DashVerantwoordelijkeView from "./DashVerantwoordelijkeView";
import DashVerantwoordelijkeDetail from "./DashVerantwoordelijkeDetail";

export default function DashVerantwoordelijke() {

  const { user } = useAuth();
  const userData = USER_DATA;
  const plantId = userData.find((u) => u.id === user?.id)?.plantId;
  const plant = PLANTS.find((p) => p.id === plantId);
  const [view, setView] = useState("dashboard");

  if (!plant) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-red-600">Geen site gekoppeld aan dit account</h2>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-gray-50 m-4">
      {view === "dashboard" ? (
        <DashVerantwoordelijkeView 
          userData={userData}
          plant={plant} 
          onDetails={() => setView("details")} 
        />
      ) : (
        <DashVerantwoordelijkeDetail 
          plant={plant} 
          userData={userData}
          onBack={() => setView("dashboard")} 
        />
      )}
    </div>
  );
} 