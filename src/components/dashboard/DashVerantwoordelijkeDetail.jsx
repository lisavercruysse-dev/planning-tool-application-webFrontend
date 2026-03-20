export default function DashVerantwoordelijkeDetail({ plant, onBack }) {
  
  return (
    <div className="flex items-center justify-between m-4">
      <h1 className="text-2xl font-bold text-gray-900">
        {plant?.name}
      </h1>
      <button onClick={onBack} 
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors">
        Terug naar overzicht
      </button>
    </div>

  );
}