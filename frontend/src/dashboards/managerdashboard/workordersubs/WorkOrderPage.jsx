import React, { useState } from "react";
import { Filter, ChevronDown, MessageSquare, Edit3, Share2, ClipboardList, PenTool, Box } from "lucide-react";
import NewWorkOrder from "./NewWorkOrder";

export default function WorkOrderPage() {
  const [isCreating, setIsCreating] = useState(false);

  if (isCreating) {
    return <NewWorkOrder onBack={() => setIsCreating(false)} />;
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      {/* HEADER BAR */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">work order</h1>
          
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 shadow-sm">
            <ClipboardList size={16} /> Table view <ChevronDown size={14} />
          </button>

          <button className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 shadow-sm">
            <Filter size={16} /> Filter
          </button>
        </div>

        <div className="flex items-center gap-2">
          <ActionBtn icon={<MessageSquare size={14} />} label="Comment" />
          <ActionBtn icon={<Edit3 size={14} />} label="Edit" />
          <ActionBtn icon={<Share2 size={14} />} label="Export" isExport />
        </div>
      </div>

      {/* EMPTY STATE BOX */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center p-12 border border-gray-100">
        <div className="relative flex items-center justify-center mb-8">
           <div className="bg-white p-3 rounded-xl shadow-md -rotate-12 border border-gray-50 absolute -translate-x-14">
              <ClipboardList className="text-gray-300" size={28} />
           </div>
           <div className="bg-white p-5 rounded-2xl shadow-xl z-10 border border-gray-100">
              <PenTool className="text-gray-600" size={32} />
           </div>
           <div className="bg-white p-3 rounded-xl shadow-md rotate-12 border border-gray-50 absolute translate-x-14">
              <Box className="text-gray-300" size={28} />
           </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">No Work Order</h2>
        <p className="text-gray-400 text-sm mb-8">No work order at the moment</p>

        <button 
          onClick={() => setIsCreating(true)}
          className="bg-[#708B53] text-white px-10 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition shadow-lg shadow-[#708B53]/20"
        >
          Create work order
        </button>
      </div>
    </div>
  );
}

const ActionBtn = ({ icon, label, isExport }) => (
  <button className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition">
    {!isExport && icon} {label} {isExport && icon}
  </button>
);