import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Download, 
  FileText, 
  Filter, 
  MessageSquare, 
  Edit3,
  Clock,
  Package,
  ChevronDown,
  CheckCircle2
} from "lucide-react";

export default function WorkOrderOverview({ onBack, onSubmit }) {
  const navigate = useNavigate();
  const [openView, setOpenView] = useState(false);

  // --- 1. PULL ALL DATA FROM LOCAL STORAGE ---
  const [generalData, setGeneralData] = useState({});
  const [partsData, setPartsData] = useState([]);
  const [images, setImages] = useState([]);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const savedGeneral = localStorage.getItem("cieos_pending_wo");
    const savedParts = localStorage.getItem("cieos_workorder_items");
    const savedImages = localStorage.getItem("cieos_upload_images");
    const savedDocs = localStorage.getItem("cieos_upload_docs");

    if (savedGeneral) setGeneralData(JSON.parse(savedGeneral));
    if (savedParts) setPartsData(JSON.parse(savedParts));
    if (savedImages) setImages(JSON.parse(savedImages));
    if (savedDocs) setDocs(JSON.parse(savedDocs));
  }, []);

  const tabs = [
    { id: 1, name: "General" },
    { id: 2, name: "Parts" },
    { id: 3, name: "Documents" },
    { id: 4, name: "Procedures" },
    { id: 5, name: "Reminders" }
  ];

  // --- 2. CLEANUP ON SUBMIT ---
  const handleFinalSubmit = () => {
    localStorage.removeItem("cieos_pending_wo");
    localStorage.removeItem("cieos_workorder_items");
    localStorage.removeItem("cieos_upload_images");
    localStorage.removeItem("cieos_upload_docs");
    onSubmit();
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans text-gray-700 pb-32 md:pb-24 text-left">
      {/* --- RESPONSIVE HEADER --- */}
      <header className="bg-white px-4 md:px-6 py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <h1 className="text-lg md:text-xl font-black text-gray-800 tracking-tight">Review Order</h1>
          <div className="flex items-center gap-2">
            <div
              onClick={() => setOpenView(!openView)}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold cursor-pointer select-none"
            >
              <CheckCircle2 size={14} className="text-[#708B53]" />
              To-Do <ChevronDown size={12} className="text-gray-400" />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 md:hidden">
              <Filter size={16} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button onClick={() => navigate("/dashboard/chat")} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors">
            <MessageSquare size={16} /> Chat
          </button>
          <button onClick={onBack} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors">
            <Edit3 size={16} /> Edit
          </button>
        </div>
      </header>

      {/* --- RESPONSIVE TAB SCROLL --- */}
      <nav className="bg-white px-4 md:px-8 flex gap-6 md:gap-10 border-b border-gray-200 overflow-x-auto no-scrollbar whitespace-nowrap sticky top-[105px] md:top-[65px] z-30">
        {tabs.map((tab) => (
          <div key={tab.id} className={`py-3 flex items-center gap-2 cursor-pointer transition-all flex-shrink-0 ${tab.id === 1 ? 'border-b-2 border-[#708B53]' : ''}`}>
            <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-black ${tab.id === 1 ? 'bg-[#708B53] text-white' : 'bg-gray-100 text-gray-400'}`}>
              {tab.id}
            </span>
            <span className={`text-xs font-bold uppercase tracking-wider ${tab.id === 1 ? 'text-[#708B53]' : 'text-gray-400'}`}>
              {tab.name}
            </span>
          </div>
        ))}
      </nav>

      <main className="max-w-[1200px] mx-auto p-4 md:p-6 space-y-6">
        
        {/* --- JOB DETAIL CARD --- */}
        <section className="bg-white rounded-2xl md:rounded-[32px] shadow-sm border border-gray-100 p-5 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
            <div>
              <h2 className="text-lg font-black text-gray-800 uppercase tracking-widest mb-3">Job Detail Overview</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1.5 rounded-full bg-[#708B53] text-white text-[10px] font-black uppercase tracking-tighter shadow-md shadow-[#708B53]/20">
                  {generalData.status || "In Progress"}
                </span>
                <span className={`px-4 py-1.5 border rounded-full text-[10px] font-black uppercase tracking-tighter ${generalData.priority === 'High' || generalData.priority === 'Critical' ? 'bg-rose-50 text-rose-500 border-rose-100' : 'bg-blue-50 text-blue-500 border-blue-100'}`}>
                  {generalData.priority || "Normal"} Priority
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="space-y-6">
              <DetailItem label="Job Name" value={generalData.jobName} />
              <DetailItem label="Asset Name" value={generalData.assetName} />
              <DetailItem label="Start Date" value={generalData.startDate} />
              <DetailItem label="Category" value={generalData.category} />
              
              <div className="space-y-2">
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                <div className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm leading-relaxed text-gray-600 min-h-[100px]">
                  {generalData.description || "No description provided."}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <DetailItem label="Job ID" value={generalData.jobId || "WO-882192"} />
              <DetailItem label="Asset ID" value={generalData.assetId} />
              <DetailItem label="Trigger Type" value={generalData.triggerType} />
              <DetailItem label="Frequency" value={generalData.triggerValue || generalData.frequencyValue} />
              
              <div>
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Team Assigned</label>
                <div className="flex items-center gap-3 bg-[#F1F4F0] w-full sm:w-fit px-4 py-3 rounded-2xl border border-[#708B53]/10">
                  <div className="flex -space-x-2">
                    {generalData.assignedMembers?.map((m, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-[#708B53] text-white flex items-center justify-center text-[10px] font-black shadow-sm">{m.avatar}</div>
                    ))}
                  </div>
                  <span className="text-xs font-black text-[#5A6B4E]">
                    {generalData.assignedMembers?.length > 0 ? "Inspection Team" : "Unassigned"}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Estimated Time</label>
                <div className="flex items-center gap-3 px-5 py-3 border border-gray-200 rounded-2xl bg-white shadow-sm w-full sm:w-fit">
                  <Clock size={16} className="text-[#708B53]" />
                  <span className="font-black text-gray-700 text-sm">{generalData.estHrs || "0"}h {generalData.estMins || "0"}m</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- PARTS USED SECTION --- */}
        <section className="bg-white rounded-2xl md:rounded-[32px] shadow-sm border border-gray-100 p-5 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-black text-gray-800 uppercase tracking-widest">Parts Used</h2>
            <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-3 py-1 rounded-full uppercase">{partsData.length} items</span>
          </div>
          
          <div className="overflow-x-auto -mx-5 md:mx-0 px-5 md:px-0">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="text-[10px] uppercase text-gray-400 border-b border-gray-50">
                  <th className="pb-4 font-black tracking-tighter">Part Name / ID</th>
                  <th className="pb-4 font-black tracking-tighter">Category</th>
                  <th className="pb-4 font-black tracking-tighter text-center">Qty</th>
                  <th className="pb-4 font-black tracking-tighter text-right">Condition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {partsData.map((part, idx) => (
                  <tr key={idx} className="group">
                    <td className="py-4">
                      <p className="text-sm font-black text-gray-800">{part.partName}</p>
                      <p className="text-[11px] text-gray-400 font-bold">{part.partId}</p>
                    </td>
                    <td className="py-4 text-xs font-bold text-gray-500">{part.category}</td>
                    <td className="py-4 text-xs font-black text-center">{part.quantity} {part.unit}</td>
                    <td className="py-4 text-right">
                      <span className="px-3 py-1 bg-[#F1F4F0] text-[#708B53] rounded-lg text-[10px] font-black uppercase">
                        {part.condition || "Good"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --- UPLOADS ROW --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-5 flex items-center gap-2">
              <FileText size={16} className="text-[#708B53]" /> Document Summary
            </h2>
            <div className="space-y-3">
              {docs.length === 0 ? (
                <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-2xl">
                   <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">No documents</p>
                </div>
              ) : (
                docs.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-2xl bg-gray-50/30 group hover:border-[#708B53]/30 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-rose-50 rounded-xl"><FileText size={18} className="text-rose-500" /></div>
                      <div className="max-w-[140px] sm:max-w-none">
                        <p className="text-xs font-black text-gray-700 truncate">{doc.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold">{doc.size}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <Download size={16} className="text-gray-400 group-hover:text-[#708B53]" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-5 flex items-center gap-2">
              <Package size={16} className="text-[#708B53]" /> Media Assets
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {images.length === 0 ? (
                <div className="col-span-full text-center py-6 border-2 border-dashed border-gray-100 rounded-2xl">
                   <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">No images</p>
                </div>
              ) : (
                images.map((img, i) => (
                  <div key={i} className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-[#708B53] transition-all cursor-pointer">
                    <img src={img.url} className="w-full h-full object-cover" alt="upload" />
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      {/* --- RESPONSIVE FOOTER ACTIONS --- */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 p-4 md:p-6 z-50">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-end gap-3 px-2">
          <button 
            onClick={onBack} 
            className="w-full sm:w-auto px-10 py-4 border border-gray-200 rounded-2xl text-sm font-black text-gray-600 hover:bg-gray-50 transition-all active:scale-95 order-2 sm:order-1"
          >
            Back to Edit
          </button>
          <button 
            onClick={handleFinalSubmit} 
            className="w-full sm:w-auto px-16 py-4 bg-[#708B53] text-white rounded-2xl text-sm font-black shadow-xl shadow-[#708B53]/20 hover:bg-[#5f7546] transition-all active:scale-95 order-1 sm:order-2"
          >
            Submit Order
          </button>
        </div>
      </footer>
    </div>
  );
}

// Sub-component for individual detail items
function DetailItem({ label, value }) {
  return (
    <div className="space-y-2">
      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
      <div className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-3 text-sm font-bold text-gray-700 min-h-[52px] flex items-center shadow-sm">
        {value || "---"}
      </div>
    </div>
  );
}