import React, { useState } from "react";
import { X, Edit3, Paperclip, ChevronLeft, ArrowUpRight } from "lucide-react";

const PMDetailsView = ({ plan, onBack, initialMode = "view" }) => {
  const [mode, setMode] = useState(initialMode); // 'view' or 'edit'

  if (!plan) return null;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 max-w-2xl mx-auto overflow-hidden animate-in fade-in zoom-in-95 duration-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <ArrowUpRight size={20} className="text-gray-400" />
            <h2 className="text-xl font-bold text-gray-800">{plan.title}</h2>
          </div>
        </div>
        {mode === "view" && (
          <button 
            onClick={() => setMode("edit")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#708B53] hover:bg-[#708B53]/10 rounded-xl transition-all"
          >
            <Edit3 size={16} /> Edit Plan
          </button>
        )}
      </div>

      <div className="p-8 space-y-8 text-left max-h-[80vh] overflow-y-auto">
        {/* Status & Priority Row */}
        <div className="flex gap-12">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Status</p>
            <span className="px-6 py-1.5 bg-blue-600 text-white rounded-lg text-[11px] font-bold uppercase">{plan.status}</span>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Priority</p>
            <span className="px-6 py-1.5 border border-red-500 text-red-500 rounded-lg text-[11px] font-bold uppercase">High</span>
          </div>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-12">
          {[
            { label: "Title", value: plan.title, key: "title" },
            { label: "Next Scheduled Date", value: plan.nextDue, key: "date" },
            { label: "Category", value: plan.category, key: "category" },
            { label: "Location", value: "Foredeck", key: "loc" },
            { label: "Asset Name", value: plan.asset, key: "asset" },
            { label: "Asset ID", value: "AW-01", key: "id" },
          ].map((item) => (
            <div key={item.key} className="space-y-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase">{item.label}</p>
              {mode === "edit" ? (
                <input type="text" defaultValue={item.value} className="w-full p-2 bg-gray-50 border rounded-lg font-bold text-sm outline-none border-[#708B53]/30" />
              ) : (
                <p className="text-sm font-bold text-gray-700">{item.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold text-gray-400 uppercase">Description</p>
          <textarea 
            disabled={mode === "view"}
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium resize-none min-h-[100px] outline-none"
            defaultValue="Inspect windlass brakes, motor, and chain stopper mechanisms"
          />
        </div>

        {/* Trigger Toggle Area */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <p className="text-[10px] font-black uppercase text-gray-400">Trigger Type</p>
              <p className="text-xs font-bold">{plan.trigger}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs font-bold text-gray-600">Auto Generate Work order</p>
            <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${plan.autoAssign ? 'bg-[#708B53]' : 'bg-gray-300'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${plan.autoAssign ? 'right-1' : 'left-1'}`} />
            </div>
          </div>
        </div>

        {/* Action Buttons for Edit Mode */}
        {mode === "edit" && (
          <div className="flex gap-4 pt-4">
            <button onClick={() => setMode("view")} className="flex-1 py-3 font-bold text-gray-400">Cancel</button>
            <button className="flex-2 px-12 py-3 bg-[#708B53] text-white rounded-2xl font-bold shadow-lg shadow-[#708B53]/20">Save Changes</button>
          </div>
        )}
      </div>
    </div>
  );
};