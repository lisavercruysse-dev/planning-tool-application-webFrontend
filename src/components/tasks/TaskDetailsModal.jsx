import { X } from "lucide-react";
import { FaRegCalendar } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { useState } from "react";

export default function TaskDetailsModal({ isOpen, onClose, task, type, onSubmit }) {

    const [amountMinutes, setAmountMinutes] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({amountMinutes});
    onClose();
  }

  if (!isOpen || !task) return null;


  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-[#E5E5E5] p-6 flex flex-col gap-1 relative">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-semibold text-gray-800">
            {type === "complete" ? "Markeer taak als afgewerkt" : "Details taak"}
          </h2>
        </div>

        {type === "complete" ? (
            <div className="flex flex-col p-5 gap-2 items-start">
                <label className="text-sm text-gray-700">
                    Tijd die nodig was om de taak af te werken
                </label>
                <form onSubmit={handleSubmit} className="w-full">
                    <input
                        type="number"
                        value={amountMinutes}
                        onChange={(e) => setAmountMinutes(e.target.value)}
                        placeholder="Aantal minuten"
                        className="w-full bg-[#F3F3F5] rounded-md px-3 py-2 text-sm text-[#717182] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex items-center justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                        Cancel
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer px-4 py-2 bg-[#4863d6] text-white rounded-md text-sm font-medium hover:bg-[#3c52b3] transition-colors"
                            onClick={() => onSubmit({...task, status: "completed"})}
                        >
                            Bevestigen
                        </button>
                    </div>
                </form>
            </div>
        ) : (
          <>
            <div className="flex gap-8">
              <div className="flex flex-col gap-5 p-6">
                <div>
                  <p>Omschrijving</p>
                  <p className="text-[#737373]">{task.omschrijving}</p>
                </div>

                <div>
                  <p>Specificaties</p>
                  <p className="text-[#737373] max-w-80">
                    {task.specificaties}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-5 p-6">
                <div className="flex flex-col">
                  <div className="flex gap-3 items-center">
                    <FaRegCalendar />
                    {task.startdatum.split("T")[0]}
                  </div>

                  <div className="flex gap-3 text-[#737373] items-center">
                    <CiClock2 />
                    {task.startdatum.split("T")[1].slice(0, 5)}
                  </div>
                </div>

                <div>
                  <p>Type taak</p>
                  <p className="text-[#737373]">{task.type}</p>
                </div>

                <div>
                  <p>Afwerktijd</p>
                  <p className="text-[#737373]">
                    {task.duurtijd ? task.duurtijd + " minuten" : "/"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex bg-[#F2F2F2] px-8 py-5 justify-between">
              <div>
                <p>Machine</p>
                <p className="text-[#737373]">{task.machine}</p>
              </div>

              <div>
                <p>Site</p>
                <p className="text-[#737373]">Site Noord</p>
              </div>

              <div>
                <p>Locatie In Site</p>
                <p className="text-[#737373]">A001 - Hal A</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}