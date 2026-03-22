// src/components/dashboard/SiteTasksPieChart.jsx
import { PieChart, Pie } from "recharts";

export default function SiteTasksPieChart({
  openTaken,
  toegewezenTaken,
}) {
  const segments = [
    { name: "Open",      value: openTaken,       fill: "#f59e0b" },
    { name: "Afgewerkt", value: toegewezenTaken, fill: "#10b981" },
  ].filter((seg) => seg.value > 0);

  const totaal = openTaken + toegewezenTaken;
  const totalForPie = segments.reduce((sum, s) => sum + s.value, 0) || 1;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 w-full flex flex-col items-center">
      <h3 className="font-semibold text-gray-800 text-base mb-4">
        Open vs Afgewerkte Taken
      </h3>

      {/* Donut Pie Chart */}
      <div className="relative">
        <PieChart width={200} height={200}>
          <Pie
            data={segments}
            cx={100}
            cy={100}
            innerRadius={48}
            outerRadius={80}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            strokeWidth={4}
            stroke="#ffffff"
          />
        </PieChart>

        {/* Centrale tekst */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-gray-800 leading-none">
            {openTaken}
          </span>
          <span className="text-[11px] text-slate-500 mt-1">
            van {totaal}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="w-full mt-6 grid gap-y-3 text-sm">
        {segments.map((seg, i) => {
          const percentage = ((seg.value / totalForPie) * 100).toFixed(0);
          return (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full shrink-0"
                style={{ backgroundColor: seg.fill }}
              />
              <div className="flex-1">
                <span className="font-medium text-gray-700">{seg.name}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-gray-800">{seg.value}</span>
                <span className="ml-1.5 text-xs text-gray-400">
                  ({percentage}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[12px] text-gray-400 mt-4">
        Totaal taken: {totaal}
      </p>
    </div>
  );
}