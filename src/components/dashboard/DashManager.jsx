import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Users, User, Package, Settings, Clock, CheckSquare } from "lucide-react";
import { PLANTS, USER_DATA } from "../../api/mock_data";

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
  const [selectedSite, setSelectedSite] = useState(null);
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
        maxBounds: [[-90, -180], [90, 180]], // voorkomt pannen buiten de wereldkaart
      });
 
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
        noWrap: true, // voorkomt het herhalen van tiles
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
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden h-120">
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
                    <span className="text-xs text-gray-600"> {/* TODO: Implement available worker count */}
                      <span className="font-semibold">
                        {USER_DATA.filter((u) => u.plantId === site.id && u.jobTitel === "werknemer").length}
                      </span>
                    </span>
                    <span className="text-xs text-gray-400">werknemers</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
 
      {/* Placeholder for charts / KPIs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-100 flex items-center justify-center">
        {!selectedSite ? (
          <div className="flex flex-col items-center gap-3 text-center">
            {/* Dozen icoon */}
            <Package size={64} className="text-gray-300" strokeWidth={1.5} />

            <div>
              <p className="text-lg font-medium text-gray-700">Selecteer een site</p>
              <p className="text-sm text-gray-400 mt-1 max-w-xs">
                Selecteer een site op de kaart of in het menu om een dashboard met meer info te zien te krijgen.
              </p>
            </div>
          </div>
        ) : (
          // TODO KPI's / charts voor de geselecteerde site
          <div className="w-full flex justify-start">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 w-72 flex flex-col gap-5">

              {/* Locatie */}
              <div className="flex items-start gap-3">
                <MapPin size={22} className="text-gray-400 mt-0.5 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{selectedSite.name}</p>
                  <p className="text-xs text-gray-400">{selectedSite.location}</p>
                </div>
              </div>

              {/* Werknemers */}
              <div className="flex items-center gap-3">
                <Users size={22} className="text-gray-400 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    <span className="font-normal text-gray-400">{selectedSite.totalWorkers ?? "—"}</span> {/* TODO */}
                    <span> / {USER_DATA.filter((u) => u.plantId === selectedSite.id && u.jobTitel === "werknemer").length}</span>
                    <span className="text-xs text-gray-400"> werknemers</span>
                  </p>
                </div>
              </div>

              {/* Verantwoordelijke */}
              <div className="flex items-center gap-3">
                <User size={22} className="text-gray-400 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    <span className="font-normal text-gray-400">Verantwoordelijke: </span><br></br>
                    <span> {USER_DATA.filter((u) => u.plantId === selectedSite.id && u.jobTitel === "verantwoordelijke")
                                    .map((user) => `${user.firstName} ${user.lastName}`)
                                    .join(", ") || "Geen verantwoordelijke toegewezen"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-start gap-3">
                <Settings size={22} className="text-gray-400 mt-0.5 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-sm text-gray-400">
                    Operationele status:{" "}
                    <span className={`font-semibold ${selectedSite.status === "actief" ? "text-green-600" : "text-red-500"}`}>
                      {selectedSite.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Productiestatus:{" "}
                    <span className={`font-semibold ${
                      selectedSite.statusProductie === "Gezond" ? "text-green-600" :
                      selectedSite.statusProductie === "Waarschuwing" ? "text-yellow-600" : "text-red-500"
                    }`}>
                      {selectedSite.statusProductie}
                    </span>
                  </p>
                </div>
              </div>

              {/* Gemiddelde taakduur */}
              <div className="flex items-center gap-3">
                <Clock size={22} className="text-gray-400 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-xs text-gray-400">Gemiddelde duur taak voltooien</p>
                  <p className="text-sm font-semibold text-gray-800">{selectedSite.avgTaskMinutes ?? "—"} minuten</p>
                </div>
              </div>

              {/* Voltooide taken vandaag */}
              <div className="flex items-center gap-3">
                <CheckSquare size={22} className="text-gray-400 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-xs text-gray-400">Aantal voltooide taken vandaag</p>
                  <p className="text-sm font-semibold text-gray-800">{selectedSite.tasksCompletedToday ?? "—"}</p>
                </div>
              </div>

      </div>
    </div>
          
        )}
      </div>
    </div>
  );
}