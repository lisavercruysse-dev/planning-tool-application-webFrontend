import { useAuth } from "../../contexts/auth";
import DashManager from "./DashManager";
import DashVerantwoordelijke from "./DashVerantwoordelijke";

export default function DashVerantwoordelijkeOrManager() {
  const { user } = useAuth();
  const isVerantwoordelijke = user?.jobTitel === "verantwoordelijke";
  const isManager = user?.jobTitel === "manager";

  // TODO refactor berekenenen afwezigheden en beschikbare werknemers

  return (
    <div>
      {isVerantwoordelijke && <DashVerantwoordelijke />}
      {isManager && <DashManager />}
    </div>
  );
}