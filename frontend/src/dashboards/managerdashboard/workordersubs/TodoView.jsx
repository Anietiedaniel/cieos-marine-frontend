import React from "react";
import { Clock, User, Calendar } from "lucide-react";

const mockOrders = [
  { id: "WO-013", title: "Inspection of Deck", asset: "Main Diesel Engine", priority: "High", status: "In Progress" },
  { id: "WO-002", title: "Inspection of Deck", asset: "Mixer", priority: "Low", status: "On Hold" },
  { id: "WO-101", title: "Inspection of Deck", asset: "Mixer", priority: "Medium", status: "Done" },
];

export default function TodoView() {
  return (
    <div className="flex h-full gap-4 p-4 pt-0 overflow-hidden">
      {/* LEFT: MASTER LIST */}
      <div className="w-[380px] flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
        {mockOrders.map((order) => (
          <div 
            key={order.id} 
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer bg-white ${
              order.id === "WO-013" ? "border-[#708B53]" : "border-transparent shadow-sm"
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-gray-900 text-sm truncate">{order.id}- {order.title}</h3>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${
                order.priority === 'High' ? 'border-red-400 text-red-400' : 
                order.priority === 'Medium' ? 'border-blue-400 text-blue-400' : 'border-green-400 text-green-400'
              }`}>
                {order.priority}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mb-2">PMP01-40-01- {order.asset}</p>
            <p className="text-[11px] font-semibold text-gray-600 mb-4">Requested by John Hanks</p>
            
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 italic">
                  <User size={12} /> Unassigned
                </div>
                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                  <span className="flex items-center gap-1"><Clock size={11} /> 2025-10-25</span>
                  <span className="flex items-center gap-1"><Calendar size={11} /> 2025-10-25</span>
                </div>
              </div>
              <button className="bg-blue-600 text-white text-[10px] px-3 py-1.5 rounded font-bold">
                {order.status}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT: DETAIL PANEL */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-800">Job Detail</h2>
            <div className="flex bg-gray-100 p-1 rounded-lg gap-1">
              {['Open', 'On Hold', 'In Progress', 'Done'].map((s) => (
                <button 
                  key={s} 
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                    s === 'In Progress' ? "bg-[#708B53] text-white shadow-sm" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
             <DetailField label="Job Name" value="Inspection of Deck" />
             <DetailField label="Job ID" value="W-013" />
             <DetailField label="Asset Name" value="Main Diesel Engine" />
             <DetailField label="Asset ID" value="EG-01" />
             <DetailField label="Start Date" value="2025-10-25" />
             <DetailField label="Time" value="2:00pm" />
             <DetailField label="Category" value="Inspection" />
             <DetailField label="Frequency" value="Weekly" />
          </div>

          <div className="mt-8">
            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-2">Descriptions</label>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-600 leading-relaxed">
              Perform a routine inspection of the deck area to identify structural wear, corrosion, loose fittings, or surface damage. Document findings with photos and notes.
            </div>
          </div>

          {/* Reference Section */}
          <div className="mt-10 border-t pt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Reference</h3>
            <div className="flex gap-8 border-b text-xs font-bold text-gray-400 mb-6">
              <span className="text-[#708B53] border-b-2 border-[#708B53] pb-3 cursor-pointer">
                Assignees <span className="bg-[#708B53] text-white px-1.5 py-0.5 rounded text-[9px] ml-1">3</span>
              </span>
              {['parts', 'Documents', 'Procedures', 'Triggers', 'Comments'].map(tab => (
                <span key={tab} className="pb-3 cursor-pointer hover:text-gray-600">
                  {tab} <span className="bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded text-[9px] ml-1">3</span>
                </span>
              ))}
            </div>
            
            <div className="space-y-3">
              <TeamRow name="Maintenance team" initial="MT" color="bg-gray-100" />
              <TeamRow name="Inspection team" initial="IT" color="bg-gray-100" />
              <TeamRow name="John Hanks" sub="Crew Member" isUser />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DetailField = ({ label, value }) => (
  <div>
    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5">{label}</label>
    <div className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">{value}</div>
  </div>
);

const TeamRow = ({ name, initial, color, isUser, sub }) => (
  <div className="flex items-center gap-4 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${isUser ? 'bg-orange-100' : 'bg-white text-gray-400 border border-gray-200'}`}>
      {isUser ? "👤" : initial}
    </div>
    <div>
      <p className="text-sm font-bold text-gray-700">{name}</p>
      {sub && <p className="text-[10px] text-gray-400">{sub}</p>}
    </div>
  </div>
);