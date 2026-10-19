import React, { useState } from "react";
import { 
  ChevronDown, 
  ListFilter, 
  History, 
  Share2, 
  LayoutGrid,
  MessageSquare,
  Edit3
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WorkOrderHeader({ currentView, onViewChange, onOpenFilter }) {
  const navigate = useNavigate();
  const [openView, setOpenView] = useState(false);

  const viewOptions = [
    { label: "Table view", icon: <LayoutGrid size={16} /> },
    { label: "To-Do", icon: <LayoutGrid size={16} /> }, // You can swap these for specific icons
    { label: "Workload", icon: <LayoutGrid size={16} /> },
  ];

  return (
    <header className="bg-white px-8 py-5 flex justify-between items-center border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <h1 className="text-[24px] font-bold text-gray-800">Work order</h1>

        {/* VIEW DROPDOWN - This is the "Link" between Table and Todo */}
        <div className="relative">
          <div
            onClick={() => setOpenView(!openView)}
            className="flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-200 rounded-[14px] text-[15px] font-bold text-gray-700 cursor-pointer hover:bg-gray-50 transition-all shadow-sm"
          >
            <LayoutGrid size={18} className="text-gray-400" />
            {currentView}
            <ChevronDown size={16} className={`text-gray-400 transition-transform ${openView ? 'rotate-180' : ''}`} />
          </div>

          {openView && (
            <>
              {/* Overlay to close dropdown */}
              <div className="fixed inset-0 z-10" onClick={() => setOpenView(false)} />
              
              <div className="absolute mt-2 w-52 bg-white border border-gray-100 rounded-[20px] shadow-xl z-20 py-2 animate-in fade-in zoom-in duration-150">
                {viewOptions.map((opt) => (
                  <div
                    key={opt.label}
                    onClick={() => {
                      onViewChange(opt.label);
                      setOpenView(false);
                    }}
                    className={`px-5 py-3 text-[14px] font-bold cursor-pointer transition-colors flex items-center gap-3
                      ${currentView === opt.label ? 'text-[#708B53] bg-[#F4F7F2]' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {opt.icon}
                    {opt.label}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <button 
          onClick={onOpenFilter}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-[14px] text-[15px] font-bold text-gray-700 hover:bg-gray-50"
        >
          <ListFilter size={18} className="text-gray-400" /> Filter
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate("/chat")}
          className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-[14px] text-[15px] font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
        >
          <MessageSquare size={18} className="text-gray-400" /> Start Chat
        </button>

        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-[14px] text-[15px] font-bold text-gray-700 hover:bg-gray-50">
          <Edit3 size={18} className="text-gray-400" /> Edit
        </button>
      </div>
    </header>
  );
}