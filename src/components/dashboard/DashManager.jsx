import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Users } from "lucide-react";
import { PLANTS } from "../../api/mock_data";

const statusStyles = {
  actief: "bg-green-100 text-green-700",
  "non-actief": "bg-red-100 text-red-600",
};
 
const healthStyles = {
  Gezond: "bg-green-100 text-green-700",
  Offline: "bg-red-100 text-red-600",
  Waarschuwing: "bg-yellow-100 text-yellow-700",
};

export default function DashManager() {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const [selectedSite, setSelectedSite] = useState(PLANTS[0]);
  const [search, setSearch] = useState("");
 
  const filteredSites = PLANTS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase())
  );
 
  const handleSelectSite = (site) => setSelectedSite(site);
 
  useEffect(() => {
    if (leafletMapRef.current) return;
 
    const init = async () => {
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }
 
      if (!window.L) {
        await new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }
 
      const L = window.L;
 
      const map = L.map(mapRef.current, {
        center: [30, 15],
        zoom: 2,
        zoomControl: true,
        scrollWheelZoom: false,
      });
 
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);
 
      leafletMapRef.current = map;
 
      PLANTS.forEach((site) => {
        const icon = L.divIcon({
          className: "",
          html: `<div style="
            width: 14px; height: 14px;
            background: ${site.status === "actief" ? "#8fce00" : "#f44336"};
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 1px 4px rgba(0,0,0,0.35);
            cursor: pointer;
          "></div>`,
          iconSize: [14, 14],
          iconAnchor: [6, 6],
        });
 
        L.marker([site.lat, site.lng], { icon })
          .addTo(map)
          .bindTooltip(site.name, { direction: "top", offset: [0, -8] })
          .on("click", () => handleSelectSite(site));
      });
    };
 
    init();
  }, []);
 
  useEffect(() => {
    if (leafletMapRef.current && selectedSite) {
      leafletMapRef.current.flyTo([selectedSite.lat, selectedSite.lng], 6, {
        duration: 1.2,
      });
    }
  }, [selectedSite]);
 
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Top section: Map + Sites panel */}
      <div className="grid grid-cols-[1fr_380px] gap-5 mb-5">
 
        {/* Map */}
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm h-120">
          <div ref={mapRef} className="w-full h-full" />
        </div>
 
        {/* Sites panel */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 pb-3 shrink-0">
            <h2 className="font-bold text-gray-900 text-base mb-3">Sites</h2>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
              <Search size={14} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Zoek sites via naam of locatie..."
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
              />
            </div>
          </div>
 
          <div className="overflow-y-auto flex-1 px-3 pb-3 space-y-2">
            {filteredSites.length === 0 && (
              <p className="text-sm text-gray-400 text-center mt-6">Geen sites gevonden</p>
            )}
            {filteredSites.map((site) => {
              const isSelected = selectedSite?.id === site.id;
              return (
                <div
                  key={site.id}
                  onClick={() => handleSelectSite(site)}
                  className={`rounded-xl border p-2 cursor-pointer transition-all ${
                    isSelected
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <MapPin size={13} className="text-gray-400 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">{site.name}</p>
                        <p className="text-xs text-gray-400 truncate">{site.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyles[site.status]}`}>
                        {site.status}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${healthStyles[site.statusProductie]}`}>
                        {site.statusProductie}
                      </span>
                    </div>
                  </div>
 
                  <div className="flex items-center gap-1.5 mb-1">
                    <Users size={13} className="text-gray-400" />
                    <span className="text-xs text-gray-600"> {/* TODO: Implement worker count */}
                      {/*  <span className="font-semibold">{site.workers.current}</span> / {site.workers.total}  */}
                    </span>
                    <span className="text-xs text-gray-400">Werknemers</span>
                  </div>
                  
                  {/* 
                  <button className="bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                    Details
                  </button>   //TODO: Mag dit weg?  */} 
                </div>
              );
            })}
          </div>
        </div>
      </div>
 
      {/* Placeholder for charts / KPIs */}
      <div className="bg-white rounded-xl border border-dashed border-gray-300 h-82" />
    </div>
  );
}