import { X } from "lucide-react";
import { FaRegCalendar } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";

export default function TaskDetailsModal ({isOpen, onClose , task}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="border-b border-[#E5E5E5] p-6 flex flex-col gap-1 relative">
                    <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" onClick={onClose}>
                        <X className="w-5 h-5"/>
                    </button>    
                    <h2 className="text-xl font-semibold text-gray-800">Details taak</h2>                
                </div>
                <div className="flex gap-8">
                    <div className="flex flex-col gap-5 p-6">
                        <div>
                            <p>
                                Omschrijving
                            </p>
                            <p className="text-[#737373]">
                                {task.omschrijving}
                            </p>                      
                        </div>
                        <div>
                            <p>
                                Specificaties
                            </p>
                            <p className="text-[#737373] max-w-80">
                                Start en controleer assembalgelijn AL-07 en voer een korte testrun uit
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 p-6">
                        <div className="flex flex-col">
                            <div className="flex gap-3 items-center">
                                <FaRegCalendar/>
                                11/12/2025
                            </div>
                            <div className="flex gap-3 text-[#737373] items-center">
                                <CiClock2/>
                                14:00 - 17:00
                            </div>
                        </div>
                        <div>
                            <p>Type taak</p>
                            <p className="text-[#737373]">productie</p>
                        </div>
                        <div>
                            <p>Afwerktijd</p>
                            <p className="text-[#737373]">/</p>
                        </div>
                    </div>
                </div>
                <div className="flex bg-[#F2F2F2] px-8 py-5 justify-between">
                    <div>
                        <p>Machine</p>
                        <p className="text-[#737373]">MC-PLT-001</p>
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
            </div>
        </div>
    )
}