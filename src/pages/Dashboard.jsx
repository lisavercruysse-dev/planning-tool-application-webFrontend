import DashWerknemer from "../components/dashboard/DashWerknemer";
import DashVerantwoordelijkeOrManager from "../components/dashboard/DashVerantwoordelijkeOrManager";
import { useAuth } from "../contexts/auth";

export default function Dashboard() {
  const { user } = useAuth();
  const isManagerOrVerantwoordelijke = user?.jobTitel === "manager" || user?.jobTitel === "verantwoordelijke";
  const isWerknemer = user?.jobTitel === "werknemer";

  return (
    <div>
      {isManagerOrVerantwoordelijke && <DashVerantwoordelijkeOrManager />}
      {isWerknemer && <DashWerknemer />}
    </div>
  );
}
