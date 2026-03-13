import DashManager from "../components/dashboard/DashManager";
import DashVerantwoordelijke from "../components/dashboard/DashVerantwoordelijke";
import DashWerknemer from "../components/dashboard/DashWerknemer";
import { useAuth } from "../contexts/auth";

export default function Dashboard() {
  const { user } = useAuth();
  const isManager = user?.jobTitel === "manager"; 
  const isVerantwoordelijke = user?.jobTitel === "verantwoordelijke";
  const isWerknemer = user?.jobTitel === "werknemer";

  return (
    <div>
      {isManager && <DashManager />}
      {isVerantwoordelijke && <DashVerantwoordelijke />}
      {isWerknemer && <DashWerknemer />}
    </div>
  );
}
