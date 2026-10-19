import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, Filter, History, MoreVertical, 
  Edit3, Trash2, Eye, Search, X 
} from "lucide-react";
import CreateSchedule from "./CreateSchedule";

const initialPMPlans = [
  { id: 1, title: "Anchor windlass inspection", asset: "Engine Room", autoAssign: true, trigger: "Time Based", frequency: "Every 6 days", nextDue: "5th March, 2026", status: "In Progress", category: "Inspection", priority: "High" },
  { id: 2, title: "Main Diesel Engine", asset: "Generator Set", autoAssign: false, trigger: "Time Based", frequency: "Every 6 Months", nextDue: "5th March, 2026", status: "On Hold", category: "Inspection", priority: "Medium" },
  { id: 3, title: "Main Diesel Engine", asset: "Lubrication ......", autoAssign: true, trigger: "Time Based", frequency: "Every 6 days", nextDue: "5th March, 2026", status: "Done", category: "Inspection", priority: "Low" },
  { id: 4, title: "Main Diesel Engine", asset: "Fuel System", autoAssign: true, trigger: "Usage Based", frequency: "Every 500 engine hour", nextDue: "5th March, 2026", status: "Overdue", category: "Inspection", priority: "High" },
];

const PreventiveMaintenance = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState(initialPMPlans);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  
  const [filters, setFilters] = useState({
    status: "", search: ""
  });

  const statusStyles = {
    "In Progress": "bg-blue-600 text-white",
    "On Hold": "bg-amber-100 text-amber-600 border border-amber-200",
    "Done": "bg-green-600 text-white",
    "Overdue": "bg-red-600 text-white",
  };

  const filteredPlans = plans.filter((plan) => {
    return (
      (filters.status === "" || plan.status === filters.status) &&
      (filters.search === "" || plan.title.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  const handleDeletePlan = () => {
    setPlans(prev => prev.filter(p => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="p-4 md:p-8 bg-[#F2F4F7] min-h-screen font-sans pb-24">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Preventive Maintenance</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">Schedule and manage future maintenance cycles.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50">
            <Filter size={16} /> Filter
          </button>
          <button 
            onClick={() => navigate("/dashboard/maintenance/history")} 
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50"
          >
            <History size={16} /> History
          </button>
          <button onClick={() => setIsDrawerOpen(true)} className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#708B53] text-white rounded-2xl text-sm font-bold shadow-lg shadow-[#708B53]/20 hover:bg-[#5f7546] transition-all">
            <Plus size={18} /> Create Schedule
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      {isFilterOpen && (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4 animate-in slide-in-from-top-2 duration-200">
           <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search maintenance plans..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 ring-[#708B53]/20 outline-none"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
           </div>
           <select 
             className="bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm font-bold text-gray-600 outline-none"
             value={filters.status}
             onChange={(e) => setFilters({...filters, status: e.target.value})}
           >
             <option value="">All Statuses</option>
             <option value="In Progress">In Progress</option>
             <option value="On Hold">On Hold</option>
             <option value="Done">Done</option>
             <option value="Overdue">Overdue</option>
           </select>
        </div>
      )}

      {/* TABLE VIEW (Desktop) */}
      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F9FAFB] border-b border-gray-100">
              <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                <th className="px-8 py-6">Plan Description</th>
                <th className="px-6 py-6 text-center">Auto</th>
                <th className="px-6 py-6">Trigger</th>
                <th className="px-6 py-6">Frequency</th>
                <th className="px-6 py-6">Next Due</th>
                <th className="px-6 py-6">Status</th>
                <th className="px-8 py-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPlans.map((plan) => (
                <tr 
                  key={plan.id} 
                  className="group hover:bg-[#F8FAF7] transition-all cursor-pointer relative" 
                  onClick={() => navigate(`/dashboard/maintenance/detail/${plan.id}`)}
                >
                  <td className="px-8 py-5">
                    <p className="text-sm font-black text-gray-800">{plan.title}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{plan.asset}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                       <div className={`w-2 h-2 rounded-full ${plan.autoAssign ? 'bg-green-500' : 'bg-gray-200'}`} />
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs font-bold text-gray-500">{plan.trigger}</td>
                  <td className="px-6 py-5 text-xs font-bold text-gray-500">{plan.frequency}</td>
                  <td className="px-6 py-5 text-xs font-black text-[#708B53]">{plan.nextDue}</td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase ${statusStyles[plan.status]}`}>{plan.status}</span>
                  </td>
                  <td className="px-8 py-5 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="relative">
                      <button onClick={() => setActiveMenuId(activeMenuId === plan.id ? null : plan.id)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <MoreVertical size={18} className="text-gray-400"/>
                      </button>
                      
                      {/* INLINE CONTEXT MENU */}
                      {activeMenuId === plan.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                          <div className="absolute right-0 top-10 w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl z-20 py-2 animate-in zoom-in-95 duration-150">
                            <button onClick={() => navigate(`/dashboard/maintenance/detail/${plan.id}`)} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-gray-600 hover:bg-gray-50">
                              <Eye size={14}/> See Detail
                            </button>
                            <button onClick={() => navigate(`/dashboard/maintenance/edit/${plan.id}`)} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-gray-600 hover:bg-gray-50">
                              <Edit3 size={14}/> Edit Plan
                            </button>
                            <button onClick={() => {setDeleteTarget(plan); setActiveMenuId(null);}} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50">
                              <Trash2 size={14}/> Delete Plan
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE LIST VIEW */}
        <div className="lg:hidden divide-y divide-gray-50">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="p-6 active:bg-gray-50" onClick={() => navigate(`/maintenance/detail/${plan.id}`)}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-black text-gray-900">{plan.title}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{plan.asset}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-[7px] font-black uppercase ${statusStyles[plan.status]}`}>{plan.status}</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-gray-500">
                <span>Due: {plan.nextDue}</span>
                <span>{plan.frequency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
          <div className="bg-white p-8 rounded-[32px] max-w-sm w-full shadow-2xl animate-in zoom-in-95">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
              <Trash2 size={24} />
            </div>
            <h3 className="font-black text-xl text-gray-900 mb-2">Delete Plan?</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">Are you sure you want to delete <span className="text-gray-900 font-bold">"{deleteTarget.title}"</span>? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-4 bg-gray-50 text-gray-500 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all">Cancel</button>
              <button onClick={handleDeletePlan} className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black text-sm hover:bg-red-600 transition-all shadow-lg shadow-red-500/20">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* DRAWER FOR CREATION */}
      {isDrawerOpen && <CreateSchedule onClose={() => setIsDrawerOpen(false)} onDone={(p) => setPlans([...plans, { ...p, id: plans.length + 1 }])} />}
    </div>
  );
};

export default PreventiveMaintenance;