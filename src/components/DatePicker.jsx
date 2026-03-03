export function DatePicker({ selectedDate, setSelectedDate }) {
  return (
    <div className="flex items-center gap-4">
      <label
        htmlFor="date-picker"
        className="text-sm font-medium text-gray-700"
      >
        Kies datum:
      </label>
      <div className="relative">
        <input
          id="date-picker"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-gray-400 min-w-[150px]"
        />
      </div>
    </div>
  );
}
