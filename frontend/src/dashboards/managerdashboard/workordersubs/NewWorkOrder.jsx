import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserPlus, ArrowLeft, Search, Plus, Users, Check, X, Calendar, Clock, Activity, AlertCircle } from "lucide-react";
import { Label, Input, CustomSelect, TimeInput } from "./FormElements";
import AssignTeam from "./AssignTeam";
import ItemsUsed from "./ItemsUsed";
import UploadAssets from "./UploadAssets";
import WorkOrderOverview from "./WorkOrderOverview";
// 1. Import the context hook
import { useWorkOrders } from "../../../contexts/WorkOrderContext";

// --- SUB-COMPONENT: PopupContent ---
const PopupContent = ({ type, onClose, onSelect, onCreateTeam }) => {
  const titles = {
    location: "Select Location",
    asset: "Select Asset",
    priority: "Set Priority",
    member: "Assign Member",
    trigger: "Trigger Type"
  };

  

  const data = {
    priority: ['Low', 'Medium', 'High', 'Critical'],
    location: ['Main Warehouse', 'Factory Floor A', 'External Deck', 'Office Block', 'Cabin'],
    trigger: ['Time Based', 'Usage Based', 'Condition Based'],
    asset: [
      { name: 'HVAC System', id: '#12345' },
      { name: 'Power Generator 01', id: '#PG-99' },
      { name: 'Forklift XT', id: '#FX-02' }
    ],
    category: [
      "Inspection",
      "Preventive Maintenance",
      "Corrective Maintenance",
      "Emergency"
    ],
    member: [
      { name: 'Emma Innocent', role: 'Technician', avatar: 'EM' },
      { name: 'Sarah Smith', role: 'Supervisor', avatar: 'SS' },
      { name: 'Mike Ross', role: 'Inspector', avatar: 'MR' }
    ]
  };

  return (
    <div className="p-5 md:p-6 text-left flex flex-col max-h-[80vh] md:max-h-[600px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800">{titles[type]}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2">
          <X size={20} />
        </button>
      </div>

      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </span>
        <input 
          autoFocus 
          placeholder={`Search ${type}...`} 
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#708B53] transition-all" 
        />
      </div>

      <div className="space-y-1 overflow-y-auto mb-6 flex-1 custom-scrollbar">
        {type === 'member' ? (
          data.member.map(m => (
            <div key={m.name} onClick={() => onSelect(m)} className="p-3 hover:bg-[#F1F4F0] rounded-xl cursor-pointer flex items-center justify-between group transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#708B53] text-white flex items-center justify-center text-xs font-bold">{m.avatar}</div>
                <div>
                  <div className="text-sm font-bold text-gray-700">{m.name}</div>
                  <div className="text-[11px] text-gray-400">{m.role}</div>
                </div>
              </div>
              <Plus size={18} className="text-gray-300 group-hover:text-[#708B53]" />
            </div>
          ))
        ) : type === 'asset' ? (
          data.asset.map(item => (
            <div key={item.id} onClick={() => onSelect(item)} className="p-4 hover:bg-[#F1F4F0] rounded-xl cursor-pointer text-sm font-medium text-gray-700 flex justify-between items-center group transition-colors">
              <div className="flex flex-col">
                <span className="font-bold">{item.name}</span>
                <span className="text-gray-400 text-xs">{item.id}</span>
              </div>
              <Plus size={18} className="text-gray-300 group-hover:text-[#708B53]"/>
            </div>
          ))
        ) : (
          data[type]?.map(item => (
            <div key={item} onClick={() => onSelect(item)} className="p-4 hover:bg-[#F1F4F0] rounded-xl cursor-pointer text-sm font-bold text-gray-600 flex justify-between items-center group transition-colors">
              {item} <Plus size={18} className="text-gray-300 group-hover:text-[#708B53]"/>
            </div>
          ))
        )}
      </div>
      
      <button 
        onClick={type === 'member' ? onCreateTeam : onClose} 
        className="w-full py-4 bg-[#708B53] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
      >
        {type === 'member' ? <Users size={18}/> : <Plus size={18} />} 
        {type === 'member' ? 'Create Team' : `Add New ${type}`}
      </button>
    </div>
  );
};



export default function NewWorkOrder({ onBack }) {
  const navigate = useNavigate();
  const location = useLocation();

  // 2. Access the creation function from context
  const { createWorkOrder } = useWorkOrders();

const [currentPage, setCurrentPage] = useState("detail");
const [activePopup, setActivePopup] = useState(null);

const [formData, setFormData] = useState(() => {
  const saved = localStorage.getItem("cieos_pending_wo");
  return saved ? JSON.parse(saved) : {
    jobName: "",
    priority: "High",
    jobId: "",
    location: "",
    assetName: "",
    assetId: "",
    startDate: "",
    category: "Inspection",
    triggerType: "Time Based",
    triggerValue: "Weekly",
    frequencyValue: "05",
    estHrs: "7",
    estMins: "00",
    description: "",
    assignedMembers: [],
    status: "Open",
    assets: { images: [], docs: [] }
  };
});

  useEffect(() => {
    localStorage.setItem("cieos_pending_wo", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("assetId");
    if (id) setFormData(prev => ({ ...prev, assetName: "HVAC", assetId: id, location: "Cabin" }));
  }, [location]);

  const handleNextToItems = () => setCurrentPage("items");
  const handleNextToUpload = () => setCurrentPage("upload");
  const handleFinishUpload = (imgs, documents) => {
    setFormData(prev => ({
  ...prev,
  assets: { images: imgs, docs: documents }
}));
    setCurrentPage("overview");
  };

  const handleSelect = (val) => {
    if (activePopup === 'priority') setFormData({ ...formData, priority: val });
    if (activePopup === 'location') setFormData(prev => ({ ...prev, location: val }))
    if (activePopup === 'trigger') {
        const defaultValue = val === 'Time Based' ? 'Weekly' : val === 'Usage Based' ? 'Engine Hour' : '';
        setFormData({ ...formData, triggerType: val, triggerValue: defaultValue });
    }
    if (activePopup === "category") {
      setFormData(prev => ({ ...prev, category: val }));
    }
    if (activePopup === 'asset') setFormData({ ...formData, assetName: val.name, assetId: val.id });
    if (activePopup === 'member') {
      if (!formData.assignedMembers.find(m => m.name === val.name)) {
        setFormData({ ...formData, assignedMembers: [...formData.assignedMembers, val] });
      }
    }
    setActivePopup(null);
  };

const handleFinalSubmit = () => {
    const firstMember = formData.assignedMembers[0];
    
    createWorkOrder({
      title: formData.jobName || "Untitled Work Order",
      asset: formData.assetName || "General Asset",
      priority: formData.priority,
      status: formData.status,
      estimatedHours: Number(formData.estHrs) || 0,
      category: formData.category,
      // ALIGNMENT FIXES:
      assigneeId: firstMember ? firstMember.id : null, 
      scheduledDay: firstMember ? "Monday" : null, // Default to Monday if a member is picked in form
      user: firstMember ? firstMember.name : "Unassigned" 
    });

    localStorage.removeItem("cieos_pending_wo");
    onBack(); // Go back to the dashboard/list
  };

  if (currentPage === "assign") return <AssignTeam onBack={() => setCurrentPage("detail")} onNext={handleNextToItems} />;
  if (currentPage === "items") return <ItemsUsed onBack={() => setCurrentPage("detail")} onNext={handleNextToUpload} />;
  if (currentPage === "upload") return <UploadAssets onBack={() => setCurrentPage("items")} onNext={handleFinishUpload} />;
  if (currentPage === "overview") return <WorkOrderOverview data={formData.assets} onBack={() => setCurrentPage("upload")} onSubmit={handleFinalSubmit} />;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans text-left pb-32 md:pb-24">
      {/* Mobile-Friendly Header */}
      <div className="sticky top-0 z-40 bg-[#F8F9FA]/80 backdrop-blur-md p-4 md:p-8 flex items-center gap-4">
        <button onClick={onBack} className="p-2.5 hover:bg-white bg-white/50 border border-gray-100 rounded-full transition shadow-sm active:scale-90">
          <ArrowLeft size={22} className="text-gray-700" />
        </button>
        <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">New work order</h1>
      </div>

      <div className="px-4 md:px-8 w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-[24px] md:rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Section Header */}
          <div className="p-6 md:p-10 border-b border-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
            <h2 className="text-lg font-black text-gray-800 uppercase tracking-widest">Job Detail</h2>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Status</span>
              <div className="flex flex-wrap gap-2">
                {['Open', 'On Hold', 'In Progress', 'Done'].map(s => (
                  <button key={s} onClick={() => setFormData(prev => ({ ...prev, status: s }))} 
                    className={`px-3 md:px-5 py-2 rounded-full text-[11px] md:text-xs font-bold border transition-all active:scale-95 ${formData.status === s ? 'bg-[#708B53] text-white border-[#708B53] shadow-md shadow-[#708B53]/20' : 'text-gray-400 border-gray-100 bg-white hover:bg-gray-50'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
            {/* Column 1 */}
            <div className="space-y-6 md:space-y-8">
              <div className="group">
                <Label>Job Name</Label>
                <Input value={formData.jobName} onChange={(e) => setFormData({...formData, jobName: e.target.value})} />
              </div>
              <div>
                <Label>Job ID</Label>
                <Input placeholder="Enter ID" value={formData.jobId} onChange={(e) => setFormData({...formData, jobId: e.target.value})} />
              </div>
              <CustomSelect label="Equipment Name" placeholder={formData.assetName || "Select Asset"} onClick={() => setActivePopup('asset')} />
              <div>
                <Label>Start Date</Label>
                <div className="relative">
                   <input type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 text-sm outline-none focus:ring-4 focus:ring-[#708B53]/5 focus:border-[#708B53] transition-all bg-white" />
                </div>
              </div>
              <CustomSelect
                label="Category"
                placeholder={formData.category || "Select Category"}
                onClick={() => setActivePopup("category")}
              />
              <div>
                <Label>Descriptions</Label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Add Note" className="w-full h-32 md:h-40 rounded-[24px] border border-gray-200 p-5 text-sm outline-none focus:border-[#708B53] focus:ring-4 focus:ring-[#708B53]/5 transition-all resize-none bg-white" />
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6 md:space-y-8">
              <CustomSelect label="Priority" placeholder={formData.priority || "Select Priority"} onClick={() => setActivePopup('priority')} />
              <CustomSelect label="Location" placeholder={formData.location || "Select Location"} onClick={() => setActivePopup('location')} />
              <div>
                <Label>Asset ID</Label>
                <Input value={formData.assetId} readOnly className="bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed" />
              </div>

              {/* DYNAMIC TRIGGER SECTION */}
              <div className="p-6 bg-gray-50/50 rounded-[32px] border border-gray-100 space-y-5">
                <CustomSelect label="Trigger Type" placeholder={formData.triggerType} onClick={() => setActivePopup('trigger')} />
                
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  {formData.triggerType === 'Time Based' && (
                    <div className="space-y-3">
                      <Label>Frequency</Label>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex items-center gap-3 border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm flex-1">
                          <span className="text-gray-400 font-medium">Every</span>
                          <input type="text" value={formData.frequencyValue} onChange={(e) => setFormData({...formData, frequencyValue: e.target.value})} className="w-full outline-none font-black text-[#708B53]" />
                        </div>
                        <div className="flex-1">
                          <select 
                              value={formData.triggerValue} 
                              onChange={(e) => setFormData({...formData, triggerValue: e.target.value})}
                              className="w-full h-full min-h-[48px] px-4 rounded-xl border border-gray-200 text-sm font-bold bg-white focus:border-[#708B53] outline-none appearance-none cursor-pointer shadow-sm"
                          >
                              {['Daily', 'Weekly', 'Monthly', 'Yearly'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.triggerType === 'Usage Based' && (
                    <div className="space-y-3">
                      <Label>Metric</Label>
                      <select 
                          value={formData.triggerValue} 
                          onChange={(e) => setFormData({...formData, triggerValue: e.target.value})}
                          className="w-full h-[48px] px-4 rounded-xl border border-gray-200 text-sm font-bold bg-white focus:border-[#708B53] outline-none shadow-sm"
                      >
                          {['Engine Hour', 'Running Hour', 'Trips', 'Cycles'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                  )}

                  {formData.triggerType === 'Condition Based' && (
                    <div className="space-y-3">
                      <Label>Trigger Condition</Label>
                      <textarea 
                          value={formData.triggerValue} 
                          onChange={(e) => setFormData({...formData, triggerValue: e.target.value})}
                          placeholder="Eg: Sensor readings above the threshold" 
                          className="w-full h-24 rounded-2xl border border-gray-200 bg-white p-4 text-sm outline-none focus:border-[#708B53] resize-none transition-all shadow-sm" 
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label>Estimated time</Label>
                <div className="flex gap-4">
                  <div className="flex-1 flex items-center justify-between border border-gray-200 rounded-2xl px-5 py-3.5 bg-white shadow-sm transition-all focus-within:border-[#708B53]">
                    <input type="text" value={formData.estHrs} onChange={(e) => setFormData({...formData, estHrs: e.target.value})} className="w-full outline-none font-black text-gray-700" />
                    <span className="text-[10px] font-black text-gray-400 uppercase">Hrs</span>
                  </div>
                  <div className="flex-1 flex items-center justify-between border border-gray-200 rounded-2xl px-5 py-3.5 bg-white shadow-sm transition-all focus-within:border-[#708B53]">
                    <input type="text" value={formData.estMins} onChange={(e) => setFormData({...formData, estMins: e.target.value})} className="w-full outline-none font-black text-gray-700" />
                    <span className="text-[10px] font-black text-gray-400 uppercase">Min</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center bg-gray-50/50 p-5 rounded-[24px] border border-gray-50">
                <Label className="mb-0 font-bold">Automatic Schedule</Label>
                <button className="w-12 h-6 rounded-full bg-[#708B53] relative transition-colors shadow-inner">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"/>
                </button>
              </div>
            </div>
          </div>

          {/* Members Section */}
          <div className="p-6 md:p-10 bg-[#F9FBFA] border-t border-gray-50">
            <Label>Assign Member</Label>
            <div className="flex flex-wrap items-center gap-5 mt-4">
              <button 
                onClick={() => setActivePopup('member')} 
                className="flex items-center gap-3 px-6 py-3 border-2 border-dashed border-gray-200 rounded-2xl text-xs font-black text-gray-500 hover:bg-white hover:border-[#708B53] hover:text-[#708B53] transition-all bg-transparent group shadow-sm active:scale-95"
              >
                <UserPlus size={18} className="text-gray-400 group-hover:text-[#708B53]" /> 
                Add members
              </button>
              <div className="flex -space-x-3">
                {formData.assignedMembers.map((m, i) => (
                  <div 
                    key={i} 
                    className="w-11 h-11 rounded-full border-4 border-white bg-[#708B53] text-white flex items-center justify-center text-[10px] font-black shadow-lg ring-1 ring-black/5"
                  >
                    {m.avatar}
                  </div>
                ))}
              </div>
              {formData.assignedMembers.length > 0 && (
                <div className="flex flex-col">
                   <span className="text-[9px] font-black text-[#708B53] uppercase tracking-tighter">Team Assigned</span>
                   <span className="text-xs font-bold text-gray-700">Inspection Team</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 p-4 md:p-6 px-4 md:px-8 flex flex-col sm:flex-row justify-end gap-3 md:gap-4 z-50">
        <button 
          onClick={onBack} 
          className="w-full sm:w-auto px-10 py-4 bg-white border border-gray-200 text-gray-600 rounded-2xl font-black text-sm hover:bg-gray-50 transition-all active:scale-95 order-2 sm:order-1"
        >
          Save as draft
        </button>
        <button 
          onClick={handleNextToItems} 
          className="w-full sm:w-auto px-16 py-4 bg-[#708B53] text-white rounded-2xl font-black text-sm shadow-xl shadow-[#708B53]/20 hover:bg-[#5f7546] transition-all active:scale-95 order-1 sm:order-2"
        >
          Next Step
        </button>
      </div>

      {/* Responsive Overlay */}
      {activePopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-[100] p-0 sm:p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto my-3 sm:hidden" />
            <PopupContent 
              type={activePopup} 
              onClose={() => setActivePopup(null)} 
              onSelect={handleSelect} 
              onCreateTeam={() => {setActivePopup(null); setCurrentPage("assign");}} 
            />
          </div>
        </div>
      )}
    </div>
  );
}