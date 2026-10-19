import React, { useState } from "react";
import { ArrowLeft, Plus, ChevronRight, FileText, Trash2, Edit2, Search, Type, Hash, DollarSign, Calendar, List, CheckSquare, ShieldCheck, ToggleLeft, Paperclip, PenTool, Info, Download } from "lucide-react";

export default function ProcedurePage({ onBack, onFinish }) {
  const [view, setView] = useState("empty"); // 'empty' | 'list' | 'builder'
  const [procedures, setProcedures] = useState([
    { id: 1, name: "Main Engine Inspection" },
    { id: 2, name: "Conveyor belt Inspection" }
  ]);
  const [showFieldMenu, setShowFieldMenu] = useState(false);
  const [activeFieldType, setActiveFieldType] = useState("Inspection check");

  // Field type options based on your "Frame 224" screenshot
  const fieldTypes = [
    { label: "Text field", icon: <Type size={14} /> },
    { label: "Number field", icon: <Hash size={14} /> },
    { label: "Amount", icon: <DollarSign size={14} /> },
    { label: "Date and Time", icon: <Calendar size={14} /> },
    { label: "Multiple choice", icon: <List size={14} /> },
    { label: "Checklist", icon: <CheckSquare size={14} /> },
    { label: "Inspection check", icon: <ShieldCheck size={14} /> },
    { label: "Toggle", icon: <ToggleLeft size={14} /> },
    { label: "Attachment upload", icon: <Paperclip size={14} /> },
    { label: "Signature", icon: <PenTool size={14} /> },
    { label: "Instruction", icon: <Info size={14} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      <div className="flex-grow p-4 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition">
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">New work order</h1>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 min-h-[550px] relative">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Procedure</h2>

          {/* 1. EMPTY STATE (Screenshot 154041) */}
          {view === "empty" && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 opacity-10"><FileText size={80} /></div>
              <p className="text-gray-900 font-bold text-sm mb-1">No Document at the moment</p>
              <p className="text-[#708B53] text-[12px] max-w-[250px] mb-6 leading-relaxed">
                Create or Attach new Form, procedure or checklist
              </p>
              <button 
                onClick={() => setView("builder")}
                className="px-10 py-2.5 border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
              >
                Add Procedure
              </button>
            </div>
          )}

          {/* 2. LIST VIEW (Screenshot 154112) */}
          {view === "list" && (
            <div className="space-y-3 animate-in fade-in duration-300">
              {procedures.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-[#F1F4F0] rounded-xl group border border-transparent hover:border-[#708B53]/20 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 uppercase">MT</div>
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400">
                    <Edit2 size={18} className="cursor-pointer hover:text-gray-600" />
                    <Trash2 size={18} className="cursor-pointer hover:text-red-500" />
                  </div>
                </div>
              ))}
              <button 
                onClick={() => setView("builder")}
                className="flex items-center gap-2 text-[#708B53] text-sm font-bold mt-4 hover:opacity-80 transition"
              >
                <Plus size={18} /> Add another procedure
              </button>
            </div>
          )}

          {/* 3. BUILDER VIEW (Screenshot 154207 / 154142) */}
          {view === "builder" && (
            <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-400">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-2">Inspection Name</label>
                  <input type="text" placeholder="Main Engine Inspection" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#708B53] outline-none" />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-2">Descriptions</label>
                  <textarea placeholder="Add Note" className="w-full h-20 rounded-lg border border-gray-200 p-4 text-sm focus:border-[#708B53] outline-none resize-none" />
                </div>
              </div>

              {/* SEARCH FIELDS DROPDOWN AREA */}
              <div className="relative flex flex-col items-end">
                <button 
                  onClick={() => setShowFieldMenu(!showFieldMenu)}
                  className="w-full max-w-[280px] flex items-center justify-between rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-500 bg-white"
                >
                  <div className="flex items-center gap-2">
                    <Search size={16} /> Search Fields
                  </div>
                  <ChevronRight size={18} className={`transform transition ${showFieldMenu ? 'rotate-90' : ''}`} />
                </button>

                {/* DROPDOWN MENU (Screenshot: Frame 224) */}
                {showFieldMenu && (
                  <div className="absolute top-full right-0 mt-2 w-full max-w-[280px] bg-white border border-gray-100 shadow-2xl rounded-xl z-[100] py-2 max-h-[300px] overflow-y-auto">
                    {fieldTypes.map((t) => (
                      <div 
                        key={t.label} 
                        className="px-4 py-2.5 text-sm text-gray-600 hover:bg-[#F1F4F0] cursor-pointer flex items-center gap-3"
                        onClick={() => { setActiveFieldType(t.label); setShowFieldMenu(false); }}
                      >
                        <span className="text-gray-400">{t.icon}</span> {t.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ACTIVE FIELD INPUT & STATUS BUTTONS */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                <div className="md:col-span-3">
                   <input type="text" placeholder="Conveyor chain" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none" />
                   
                   {/* PASS/FLAG/FAIL BUTTONS (Exactly like screenshot 154207) */}
                   {activeFieldType === "Inspection check" && (
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 py-2 text-center bg-[#EBF5EA] text-[#708B53] rounded-lg text-xs font-bold border border-[#708B53]">Pass</button>
                      <button className="flex-1 py-2 text-center bg-[#FFF8E6] text-[#F9B916] rounded-lg text-xs font-bold border border-[#F9B916]/30">Flag</button>
                      <button className="flex-1 py-2 text-center bg-[#FEEBED] text-[#F04438] rounded-lg text-xs font-bold border border-[#F04438]/30">Fail</button>
                    </div>
                   )}
                </div>

                {/* SIDE ACTION BUTTONS (Screenshot 154142) */}
                <div className="flex flex-col gap-2">
                  <button onClick={() => setView("list")} className="w-full py-2 bg-[#708B53] text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2 shadow-sm">
                    <Plus size={14} /> New field
                  </button>
                  <button className="w-full py-2 border border-gray-200 text-gray-600 rounded-lg font-bold text-xs flex items-center justify-center gap-2 bg-white">
                    <Type size={14} /> Header
                  </button>
                  <button className="w-full py-2 border border-gray-200 text-gray-600 rounded-lg font-bold text-xs flex items-center justify-center gap-2 bg-white">
                    <Download size={14} /> Download
                  </button>
                </div>
              </div>

              {/* REQUIRED TOGGLE (Screenshot 154207) */}
              <div className="flex items-center justify-end gap-2 mt-4">
                <span className="text-[12px] font-bold text-gray-500">Required</span>
                <button className="w-10 h-5 rounded-full bg-gray-200 relative transition-colors focus:ring-2 focus:ring-[#708B53]">
                   <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER BAR (Matches all screenshots) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 px-8 flex justify-end gap-4 z-50">
        <button className="px-8 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-lg font-bold text-sm">Save as draft</button>
        <button onClick={() => setView(view === "builder" ? "list" : "empty")} className="px-8 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-lg font-bold text-sm">Previous</button>
        <button onClick={onFinish} className="px-10 py-2.5 bg-[#708B53] text-white rounded-lg font-bold text-sm shadow-md">Done</button>
      </div>
    </div>
  );
}