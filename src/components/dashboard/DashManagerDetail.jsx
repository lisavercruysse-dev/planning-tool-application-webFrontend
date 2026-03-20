// DashManagerDetail.jsx
import { Package, ArrowLeft } from "lucide-react";

export default function DashManagerDetail({ selectedSite, onBack }) {
  
  return (
    <div className="space-y-6">
      {/* Header met terug-knop */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {selectedSite?.name}
          </h1>
        </div>

        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
        >
          <ArrowLeft size={20} />
          Terug naar overzicht
        </button>
      </div>

      {/* Placeholder content */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
        <Package size={64} className="mx-auto text-gray-300 mb-4" strokeWidth={1.5} />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Detailweergave nog in ontwikkeling
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Hier komen straks grafieken, taakoverzichten, werknemerbeheer, productie-statistieken,
          meldingen en beheermogelijkheden voor de geselecteerde plant.
        </p>
      </div>

      {/* Voorbeeld: je kunt hier later de selectedSite doorgeven en tonen */}
    </div>
  );
}