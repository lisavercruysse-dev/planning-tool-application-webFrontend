// src/components/SiteWorkersPieChart.jsx

export default function SiteWorkersPieChart({
  workerCount,
  availableWorkers,
  afwezigheden,
  ziekteAfwezigheden,
  vakantieAfwezigheden,
  siteName = "Site",
}) {
  const otherAfwezig = Math.max(
    0,
    afwezigheden - ziekteAfwezigheden - vakantieAfwezigheden
  );

  const segments = [
    {
      name: "Beschikbaar",
      value: availableWorkers,
      color: "#10b981", // emerald-500
    },
    {
      name: "Ziekte",
      value: ziekteAfwezigheden,
      color: "#ef4444", // red-500
    },
    {
      name: "Vakantie",
      value: vakantieAfwezigheden,
      color: "#f59e0b", // amber-500
    },
    ...(otherAfwezig > 0
      ? [
          {
            name: "Overig",
            value: otherAfwezig,
            color: "#6b7280", // gray-500
          },
        ]
      : []),
  ];

  const totalForPie = segments.reduce((sum, seg) => sum + seg.value, 0) || 1;

  // Bereken de slices (SVG paths)
  const radius = 80;
  const cx = 100;
  const cy = 100;
  let startAngle = 0;

  const pieSlices = segments
    .filter((seg) => seg.value > 0)
    .map((segment) => {
      const sliceAngle = (segment.value / totalForPie) * 360;
      const endAngle = startAngle + sliceAngle;

      const startRad = ((startAngle - 90) * Math.PI) / 180;
      const endRad = ((endAngle - 90) * Math.PI) / 180;

      const x1 = cx + radius * Math.cos(startRad);
      const y1 = cy + radius * Math.sin(startRad);
      const x2 = cx + radius * Math.cos(endRad);
      const y2 = cy + radius * Math.sin(endRad);

      const largeArcFlag = sliceAngle > 180 ? 1 : 0;

      const pathD = `M ${cx},${cy} L ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;

      const slice = { pathD, fill: segment.color };
      startAngle = endAngle;
      return slice;
    });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 w-full flex flex-col items-center">
      <h3 className="font-semibold text-gray-800 text-base mb-4">
        Werknemersstatus — {siteName}
      </h3>

      {/* Donut Pie Chart */}
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="drop-shadow-sm"
      >
        {/* Slices */}
        {pieSlices.map((slice, index) => (
          <path
            key={index}
            d={slice.pathD}
            fill={slice.fill}
            stroke="#ffffff"
            strokeWidth="4"
          />
        ))}

        {/* Donut gat */}
        <circle
          cx="100"
          cy="100"
          r="48"
          fill="#ffffff"
          stroke="#f1f5f9"
          strokeWidth="8"
        />

        {/* Centrale tekst */}
        <text
          x="100"
          y="98"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#1f2937"
          fontSize="28"
          fontWeight="700"
        >
          {availableWorkers}
        </text>
        <text
          x="100"
          y="125"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#64748b"
          fontSize="11"
        >
          van {workerCount}
        </text>
      </svg>

      {/* Legend */}
      <div className="w-full mt-6 grid gap-y-3 text-sm">
        {segments.map((seg, index) => {
          const percentage = ((seg.value / totalForPie) * 100).toFixed(0);
          return (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full shrink-0"
                style={{ backgroundColor: seg.color }}
              />
              <div className="flex-1">
                <span className="font-medium text-gray-700">{seg.name}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-gray-800">{seg.value}</span>
                <span className="ml-1.5 text-xs text-gray-400">({percentage}%)</span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[12px] text-gray-400 mt-4">
        Totaal werknemers: {workerCount} • Afwezig: {afwezigheden}
      </p>
    </div>
  );
}