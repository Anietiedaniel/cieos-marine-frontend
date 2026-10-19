import React, { useState, useEffect, useRef } from 'react';
import { 
  MoreVertical, Search, Share, 
  ChevronRight, Calendar, FileText, 
  XCircle, Trash2, ExternalLink,
  Check, AlertCircle, X, Filter
} from 'lucide-react';

const IssuesPage = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [sidePanel, setSidePanel] = useState(null); 
  const [toast, setToast] = useState(null);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showNotification = (message, type = 'success') => {
    setToast({ message, type });
    setSidePanel(null);
  };

  const issuesData = [
    { id: 'Issue-001', desc: 'Marine growth buildup near waterline', priority: 'Medium', user: 'John Hanks', loc: 'Ship Hull', asset: 'Hull', date: '5th march, 2026', img: 'https://images.unsplash.com/photo-1590523741477-2404331a443c?auto=format&fit=crop&q=80&w=200' },
    { id: 'Issue-002', desc: 'Suspected hairline crack at weld seam', priority: 'High', user: 'John Hanks', loc: 'Engine Room', asset: 'Main Engine', date: '5th march, 2026' },
    { id: 'Issue-003', desc: 'Sacrificial anode worn beyond safe limit', priority: 'Critical', user: 'John Hanks', loc: 'Cargo Hold', asset: 'Main Engine', date: '5th march, 2026' },
  ];

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans relative overflow-x-hidden text-slate-900">
      
      {/* --- TOAST NOTIFICATION --- */}
      {toast && (
        <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[300] w-[92%] md:w-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`flex items-center gap-3 px-4 md:px-6 py-3 rounded-2xl shadow-2xl border ${
            toast.type === 'success' ? 'bg-white border-green-100' : 'bg-red-50 border-red-100'
          }`}>
            <div className={`p-1 rounded-full shrink-0 ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
              <Check size={14} className="text-white" />
            </div>
            <span className="text-xs md:text-sm font-bold text-slate-700 truncate">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-auto text-slate-400 p-1">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Issues</h1>
            <div className="flex flex-wrap gap-2">
                <button className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 shadow-sm hover:border-[#84A962] transition-colors">
                  <Calendar size={16} className="text-[#84A962]" /> Last 30 Days <ChevronRight size={14} />
                </button>
                <button className="lg:hidden flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 shadow-sm">
                  <Filter size={16} /> Filters
                </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input className="w-full sm:w-64 lg:w-80 pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-[#84A962]/10 transition-all shadow-sm text-sm" placeholder="Search issues..." />
            </div>
            <button className="bg-[#84A962] hover:bg-[#749654] text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-green-900/20 active:scale-95 text-sm">
                + Create Schedule
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          <StatCard label="Overdue" count="20" color="text-red-500" />
          <StatCard label="Open" count="18" highlight />
          <StatCard label="Resolved" count="1" color="text-blue-500" />
          <StatCard label="Closed" count="1" color="text-slate-400" />
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-slate-100 flex flex-wrap justify-between items-center bg-slate-50/30 gap-4">
            <div className="flex gap-1 bg-slate-100/50 p-1 rounded-2xl overflow-x-auto no-scrollbar">
              <TabButton label="Open" active />
              <TabButton label="Resolved" />
              <TabButton label="Closed" />
            </div>
            <button className="flex items-center gap-2 text-slate-500 font-bold text-xs md:text-sm px-4 py-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all">
              <Share size={16} /> <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>

          {/* Desktop View (Table) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f1f6ee]/30 text-[10px] uppercase tracking-widest font-black text-slate-400 border-b border-slate-100">
                  <th className="px-8 py-5">ID</th>
                  <th className="px-8 py-5">Issue Description</th>
                  <th className="px-8 py-5 text-center">Priority</th>
                  <th className="px-8 py-5">Assignee</th>
                  <th className="px-8 py-5">Asset</th>
                  <th className="px-8 py-5 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {issuesData.map((issue) => (
                  <tr key={issue.id} className="hover:bg-[#f1f6ee]/20 transition-colors group cursor-pointer" onClick={() => { setSelectedIssue(issue); setSidePanel('detail'); }}>
                    <td className="px-8 py-6 text-xs font-bold text-slate-400">{issue.id}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0 shadow-sm">
                          <img src={issue.img || "https://images.unsplash.com/photo-1551046772-526463991823?auto=format&fit=crop&q=80&w=100"} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-bold text-slate-700 leading-tight">{issue.desc}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6"><PriorityBadge type={issue.priority} /></td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#84A962]/10 text-[#84A962] flex items-center justify-center text-[10px] font-black border border-[#84A962]/20 shadow-sm">JH</div>
                        <span className="text-sm font-bold text-slate-600 truncate">{issue.user}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-xs font-bold text-slate-500 uppercase tracking-wider">{issue.asset}</td>
                    <td className="px-8 py-6 relative" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => setActiveMenu(activeMenu === issue.id ? null : issue.id)}
                        className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-200 transition-all"
                      >
                        <MoreVertical size={20} />
                      </button>
                      
                      {activeMenu === issue.id && (
                        <div ref={menuRef} className="absolute right-12 top-0 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 z-[100] py-2 animate-in fade-in zoom-in-95 overflow-hidden">
                          <MenuOption icon={<Check size={16}/>} label="Resolve issue" onClick={() => showNotification("Issue marked as resolved!")} />
                          <MenuOption icon={<ExternalLink size={16}/>} label="See Detail" onClick={() => { setSelectedIssue(issue); setSidePanel('detail'); setActiveMenu(null); }} />
                          <MenuOption icon={<XCircle size={16}/>} label="Close Issue" onClick={() => { setSelectedIssue(issue); setSidePanel('close'); setActiveMenu(null); }} />
                          <div className="h-[1px] bg-slate-100 my-1 mx-2" />
                          <MenuOption icon={<Trash2 size={16}/>} label="Delete" onClick={() => { setSelectedIssue(issue); setSidePanel('delete'); setActiveMenu(null); }} className="text-red-500 hover:bg-red-50" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View (Card List) */}
          <div className="md:hidden divide-y divide-slate-100">
            {issuesData.map((issue) => (
              <div key={issue.id} className="p-5 active:bg-slate-50 transition-colors relative" onClick={() => { setSelectedIssue(issue); setSidePanel('detail'); }}>
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0 shadow-sm">
                            <img src={issue.img || "https://images.unsplash.com/photo-1551046772-526463991823?auto=format&fit=crop&q=80&w=100"} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">{issue.id} • {issue.asset}</div>
                            <div className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug">{issue.desc}</div>
                        </div>
                    </div>
                    
                    {/* FIXED: The 3-dot menu button and its relative positioning */}
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => setActiveMenu(activeMenu === issue.id ? null : issue.id)} 
                        className="p-2 -mr-2 text-slate-400 active:text-[#84A962] active:bg-slate-100 rounded-full transition-colors"
                      >
                        <MoreVertical size={22} />
                      </button>
                      
                      {activeMenu === issue.id && (
                        <div ref={menuRef} className="absolute right-0 top-10 w-52 bg-white rounded-2xl shadow-2xl border border-slate-200 z-[150] py-2 animate-in fade-in zoom-in-95">
                          <MenuOption icon={<Check size={16}/>} label="Resolve" onClick={() => { showNotification("Resolved"); setActiveMenu(null); }} />
                          <MenuOption icon={<ExternalLink size={16}/>} label="Details" onClick={() => { setSelectedIssue(issue); setSidePanel('detail'); setActiveMenu(null); }} />
                          <div className="h-[1px] bg-slate-100 my-1 mx-2" />
                          <MenuOption icon={<ExternalLink size={16}/>} label="Close Issue" onClick={() => { setSelectedIssue(issue); setSidePanel('Close'); setActiveMenu(null); }} />
                          <div className="h-[1px] bg-slate-100 my-1 mx-2" />
                          <MenuOption icon={<Trash2 size={16}/>} label="Delete" onClick={() => { setActiveMenu(null); showNotification("Deleted", "error"); }} className="text-red-500" />
                        </div>
                      )}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <PriorityBadge type={issue.priority} />
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-black border border-slate-200 uppercase">JH</div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{issue.date}</span>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- ADAPTIVE SIDE PANELS --- */}
      {sidePanel && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex justify-end items-end md:items-stretch">
          <div className="w-full md:max-w-[480px] bg-white h-[90vh] md:h-full rounded-t-[32px] md:rounded-t-none shadow-2xl animate-in slide-in-from-bottom md:slide-in-from-right duration-300 flex flex-col">
            
            {sidePanel === 'detail' && (
              <ReportDetailPanel issue={selectedIssue} 
                onClose={() => setSidePanel(null)} 
                onResolve={() => showNotification("Issue resolved successfully")}
              />
            )}

            {sidePanel === 'close' && (
              <ActionPanel 
                title="Close Issue?" 
                desc="Closing this issue will archive it. You can still find it in the 'Closed' tab later." 
                btnText="Close Issue" 
                btnColor="bg-red-500" 
                onConfirm={() => showNotification("Issue has been closed")}
                onClose={() => setSidePanel(null)} 
              />
            )}

            {sidePanel === 'delete' && (
              <div className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-center mb-10">
                   <h2 className="text-2xl font-black text-slate-800 tracking-tight">Management</h2>
                   <button onClick={() => setSidePanel(null)} className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"><X size={20}/></button>
                </div>
                <div className="space-y-4 flex-1">
                   <OptionCard icon={<Calendar size={22} className="text-[#84A962]"/>} label="Preventive Maintenance" />
                   <OptionCard icon={<FileText size={22} className="text-blue-500"/>} label="Work Order" />
                   <div className="h-[1px] bg-slate-100 my-4" />
                   <OptionCard icon={<Trash2 size={22} className="text-red-500"/>} label="Delete permanently" />
                </div>
                <button onClick={() => showNotification("Changes saved")} className="w-full bg-[#84A962] hover:bg-[#749654] text-white py-5 rounded-[24px] font-black shadow-xl shadow-green-900/20 transition-all mt-auto active:scale-95">Apply Changes</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* --- SHARED UI COMPONENTS --- */

const StatCard = ({ label, count, highlight, color }) => (
  <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-10 border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-1 group hover:border-[#84A962] hover:shadow-xl hover:shadow-green-900/5 transition-all cursor-default">
    <span className={`text-3xl md:text-5xl font-black transition-transform group-hover:scale-110 duration-300 ${color || 'text-slate-800'}`}>{count}</span>
    <span className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] text-center ${highlight ? 'text-[#84A962]' : 'text-slate-400'}`}>{label}</span>
  </div>
);

const TabButton = ({ label, active }) => (
  <button className={`px-6 md:px-8 py-2.5 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${active ? 'bg-white text-[#84A962] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
    {label}
  </button>
);

const PriorityBadge = ({ type }) => {
  const styles = {
    Medium: 'bg-blue-50 text-blue-600 border-blue-100',
    High: 'bg-orange-50 text-orange-600 border-orange-100',
    Critical: 'bg-red-600 text-white border-transparent shadow-md shadow-red-900/20',
    Low: 'bg-slate-50 text-slate-500 border-slate-200',
  };
  return (
    <div className={`px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-tighter text-center w-24 shrink-0 ${styles[type]}`}>
      {type}
    </div>
  );
};

const MenuOption = ({ icon, label, onClick, className }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-5 py-4 text-xs font-bold hover:bg-slate-50 transition-all active:bg-slate-100 ${className || 'text-slate-600'}`}>
    {icon} {label}
  </button>
);

const OptionCard = ({ icon, label }) => (
  <div className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-[24px] hover:border-[#84A962] hover:bg-white cursor-pointer transition-all group active:scale-[0.98]">
    <div className="flex items-center gap-4 font-bold text-slate-700 text-sm">
      <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-all shrink-0">{icon}</div>
      <span>{label}</span>
    </div>
    <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform shrink-0" />
  </div>
);

const ReportDetailPanel = ({ issue, onClose, onResolve }) => (
  <div className="flex flex-col h-full bg-[#F8FAFB]">
    <div className="bg-white p-6 flex justify-between items-center border-b border-slate-200 shrink-0">
      <h2 className="text-xl font-black text-slate-800 tracking-tight">Issue Report</h2>
      <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24}/></button>
    </div>
    <div className="p-6 md:p-10 space-y-8 flex-1 overflow-y-auto no-scrollbar">
      <div className="space-y-4 bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
        <DetailRow label="Asset Name" value={issue.asset} />
        <DetailRow label="Location" value={issue.loc} />
        <DetailRow label="Reporter" value={issue.user} />
        <DetailRow label="Date Submitted" value={issue.date} />
      </div>
      
      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Description</label>
        <div className="bg-[#84A962]/5 p-6 rounded-[24px] border border-[#84A962]/10 text-sm text-slate-700 leading-relaxed font-medium">
          {issue.desc}. Observed during routine hull inspection. Surface integrity appears compromised.
        </div>
      </div>

      <div className="space-y-3 pb-6">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Evidence Photo</label>
        <div className="rounded-[32px] overflow-hidden border-8 border-white shadow-2xl">
          <img src={issue.img || "https://images.unsplash.com/photo-1590523741477-2404331a443c"} className="w-full h-64 object-cover" alt="defect" />
        </div>
      </div>
    </div>
    <div className="p-6 md:p-8 bg-white border-t border-slate-200 grid grid-cols-2 gap-4 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
       <button onClick={onResolve} className="bg-[#84A962] hover:bg-[#749654] text-white py-5 rounded-[24px] font-black text-sm shadow-lg shadow-green-900/20 active:scale-95 transition-all">Mark Resolved</button>
       <button onClick={onClose} className="bg-slate-100 hover:bg-slate-200 text-slate-600 py-5 rounded-[24px] font-black text-sm transition-all">Cancel</button>
    </div>
  </div>
);

const ActionPanel = ({ title, desc, btnText, btnColor, onConfirm, onClose }) => (
  <div className="p-8 md:p-12 flex flex-col items-center justify-center h-full text-center bg-white">
    <div className="w-20 h-20 md:w-24 md:h-24 bg-red-50 rounded-full flex items-center justify-center mb-8 shrink-0">
      <AlertCircle size={48} className="text-red-500" />
    </div>
    <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">{title}</h2>
    <p className="text-slate-500 mb-12 text-sm leading-relaxed max-w-[300px]">{desc}</p>
    <div className="flex flex-col w-full gap-4 max-w-sm">
      <button onClick={onConfirm} className={`w-full py-5 ${btnColor} text-white rounded-[24px] font-black shadow-xl active:scale-95 transition-all`}>{btnText}</button>
      <button onClick={onClose} className="w-full py-5 bg-slate-100 text-slate-500 rounded-[24px] font-black hover:bg-slate-200 transition-all">Go Back</button>
    </div>
  </div>
);

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">{label}</span>
    <span className="text-sm font-bold text-slate-800 text-right truncate ml-6">{value}</span>
  </div>
);

export default IssuesPage;