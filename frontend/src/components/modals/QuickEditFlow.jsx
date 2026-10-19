import React, { useState } from "react";
import { 
  X, Calendar, Paperclip, Download, Edit3, Plus, Minus,
  LayoutGrid, Image as ImageIcon, MapPin, Tag, 
  CheckCircle, Clock, AlertCircle, Info, ChevronRight,
  UserPlus
} from "lucide-react";

const QuickEditFlow = ({ task, isOpen, onClose, onSave }) => {
  const [viewMode, setViewMode] = useState("view"); 
  const [isScheduled, setIsScheduled] = useState(false);
  const [hours, setHours] = useState(7);
  const [mins, setMins] = useState(0);

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-2 md:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden relative transition-all">
        
        {/* CLOSE BUTTON */}
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full z-50">
          <X size={20} className="text-gray-400" />
        </button>

        {viewMode === "view" && (
          <div className="p-6 md:p-10 overflow-y-auto max-h-[90vh] no-scrollbar">
            <div className="flex items-center gap-2 mb-6">
              <LayoutGrid size={14} className="text-gray-400"/>
              <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Quick view work order</h2>
            </div>

            <div className="flex justify-between items-start mb-8">
              <div className="flex-1">
                <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-tight flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-[#708B53] rounded-full" /> {task.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <div className="bg-[#1155CB] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase">In Progress</div>
                  <div className="bg-red-50 text-red-500 border border-red-100 px-4 py-1.5 rounded-full text-[9px] font-black uppercase">High</div>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest"><Calendar size={12}/> 5th March, 2026</span>
                </div>
              </div>
              <button 
                onClick={() => setViewMode("edit")}
                className="flex items-center gap-1.5 text-[#708B53] font-black text-[10px] uppercase hover:bg-gray-50 px-3 py-2 rounded-xl border border-transparent hover:border-gray-100 transition-all"
              >
                <Edit3 size={14}/> Edit Plan
              </button>
            </div>

            {/* Field Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 md:gap-y-10 gap-x-4 mb-10 border-t border-gray-50 pt-8">
              <ViewField label="Due Date" value="5th March, 2026" />
              <ViewField label="Start Date" value="13th November, 2025" />
              <ViewField label="Estimated Time" value="3hr:30mins" />
              <ViewField label="Schedule" value="Monthly" />
              <ViewField label="Assignee" value="John Hanks" isUser />
              <ViewField label="Job Name" value="HVAC Inspection" />
              <ViewField label="Job ID" value="W-013" />
              <ViewField label="Location" value="Cabin" />
              <ViewField label="Asset ID" value="HV-01" />
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Description</p>
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 text-[11px] font-bold text-gray-400 italic">Add Note</div>
              </div>
              <div className="space-y-3">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Documents</p>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg text-red-600 font-black text-[8px]">PDF</div>
                    <span className="text-[11px] font-bold text-gray-800">Inspection Check List.PDF</span>
                  </div>
                  <Download size={16} className="text-gray-400 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        )}


        {viewMode === "edit" && (
          <div className="p-6 md:p-10 overflow-y-auto max-h-[90vh] no-scrollbar animate-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-black text-gray-900 mb-8 tracking-tight">Quick EDIT order</h2>
            
            <div className="space-y-6">
              {/* Header Input with small Icon */}
              <div className="bg-[#F9FBFA] p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
                <Edit3 size={16} className="text-gray-400" />
                <input className="bg-transparent font-bold text-gray-800 outline-none w-full text-sm" defaultValue={task.title} />
              </div>

              {/* Status Pills */}
              <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
                {["Open", "On Held", "In Progress", "Done"].map(s => (
                  <button key={s} className={`px-5 py-2 rounded-xl text-[10px] font-black border transition-all whitespace-nowrap ${s === "In Progress" ? "bg-[#708B53] text-white border-[#708B53]" : "bg-white text-gray-400 border-gray-100"}`}>
                    {s}
                  </button>
                ))}
              </div>

              {/* Row Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <EditField label="Priority" type="select" options={["Select Priority", "High", "Medium", "Low"]} />
                <EditField label="Due Date" type="date" />
                <EditField label="Start Date" type="date" icon={<Plus size={12}/>} />
                
                {/* Conditional Estimated Time */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Estimated time</label>
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-2 flex-1 justify-center">
                      <span className="text-lg font-black">{hours.toString().padStart(2, '0')}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Hrs</span>
                    </div>
                    <div className="flex items-center gap-2 flex-1 justify-center border-l border-gray-200">
                      <span className="text-lg font-black">{mins.toString().padStart(2, '0')}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Mins</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button onClick={() => setHours(h => h + 1)} className="p-1 hover:bg-white rounded border border-transparent hover:border-gray-200"><Plus size={10}/></button>
                      <button onClick={() => setHours(h => Math.max(0, h - 1))} className="p-1 hover:bg-white rounded border border-transparent hover:border-gray-200"><Minus size={10}/></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Toggle Expansion  */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Schedule</label>
                  <button 
                    onClick={() => setIsScheduled(!isScheduled)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${isScheduled ? 'bg-[#708B53]' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isScheduled ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>

                {isScheduled && (
                  <div className="bg-gray-50/50 p-5 rounded-[28px] border border-gray-100 animate-in slide-in-from-top-2 duration-300 space-y-5">
                    <EditField label="Frequency" type="select" options={["Weekly", "Monthly", "Yearly"]} />
                    <div className="flex justify-between gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri"].map(d => (
                        <button key={d} className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase transition-all border ${d === 'Wed' ? 'bg-[#708B53] text-white border-[#708B53]' : 'bg-white text-gray-400 border-gray-100'}`}>
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <EditField label="Assignee" type="select" options={["+ Add members", "John Hanks", "Emma David"]} isSpecial />
                <EditField label="Job Name" placeholder="Enter job name" />
                <div className="grid grid-cols-2 gap-4">
                   <EditField label="Job ID" placeholder="Job ID" />
                   <EditField label="Location" placeholder="Enter location" />
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</p>
                <textarea placeholder="Add Note" className="w-full p-6 bg-gray-50 rounded-[24px] border border-transparent focus:border-[#708B53] focus:bg-white outline-none min-h-[120px] text-xs font-bold" />
              </div>

              <button 
                onClick={() => { onSave(task); onClose(); }}
                className="w-full py-5 bg-[#708B53] text-white rounded-[24px] font-black text-xs tracking-[0.2em] uppercase shadow-xl shadow-[#708B53]/20 hover:scale-[1.01] active:scale-[0.98] transition-all"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- HELPERS ---

const ViewField = ({ label, value, isUser }) => (
  <div className="space-y-1.5">
    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
    <div className="flex items-center gap-2">
      {isUser && <div className="w-6 h-6 rounded-full bg-orange-100 border border-orange-200 text-[10px] font-bold text-orange-600 flex items-center justify-center">JH</div>}
      <p className="text-[11px] font-black text-gray-800">{value}</p>
    </div>
  </div>
);

const EditField = ({ label, type = "text", options, placeholder, isSpecial, icon }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-1">
      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
      {icon && <span className="text-[#708B53]">{icon}</span>}
    </div>
    {type === "select" ? (
      <select className={`w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none text-[11px] font-black ${isSpecial ? 'text-[#708B53]' : 'text-gray-800'}`}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    ) : (
      <input type={type} placeholder={placeholder} className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none text-[11px] font-black text-gray-800 focus:bg-white focus:border-[#708B53] transition-all" />
    )}
  </div>
);

export default QuickEditFlow;