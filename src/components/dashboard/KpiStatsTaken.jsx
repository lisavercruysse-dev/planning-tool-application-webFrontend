import SiteTasksPieChart from "./SiteTasksPieChart";
import { berekenTaakStatsPerSite } from "../../utils/berekenTaakStatsPerSite";
import { TASK_DATA, MACHINE_DATA } from "../../api/mock_data";

export default function KpiStatsTaken({selectedSite}) {
  const stats = berekenTaakStatsPerSite(TASK_DATA, MACHINE_DATA, selectedSite.id);

  return (
    <SiteTasksPieChart
      openTaken={stats.openTaken}
      toegewezenTaken={stats.toegewezenTaken}
    />
  );
}