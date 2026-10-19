import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, AlertTriangle, XCircle, MoreVertical, 
  ChevronDown, X, Maximize2, ExternalLink, Printer, Share2
} from 'lucide-react';

const ReportDetail = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showFormDetails, setShowFormDetails] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = 'unset';
  }, [isOpen]);

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'Medium': return 'border-blue-200 text-blue-700 bg-blue-50';
      case 'High': return 'border-orange-200 text-orange-700 bg-orange-50';
      case 'Critical': return 'border-red-200 text-white bg-red-600';
      default: return 'border-gray-200 text-gray-600 bg-gray-50';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md transition-all duration-500">
      {/* Main Container - Optimized for Desktop Width */}
      <div className="bg-white w-full max-w-[800px] max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-500 border border-white/20">
        
        {/* Header - System Style */}
        <div className="bg-[#F8FAFC] px-8 py-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="bg-amber-500 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest shadow-sm">
                In Review
              </span>
              <span className="text-slate-400 text-xs font-mono">ID: #IN-2026-001</span>
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              Hull Integrity Inspection
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <HeaderActionIcon Icon={Printer} />
            <HeaderActionIcon Icon={Share2} />
            <div className="w-[1px] h-6 bg-slate-200 mx-2" />
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2.5 hover:bg-red-50 hover:text-red-500 rounded-xl text-slate-400 transition-all active:scale-90"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
          
          {/* Metadata Grid - Dual Column on System View */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            {[
              { label: 'Location', value: 'Portside Hull Section 4' },
              { label: 'Start Date', value: 'March 05, 2026' },
              { 
                label: 'Inspector', 
                value: 'John Hanks', 
                isUser: true, 
                color: 'bg-orange-100 text-orange-900' 
              },
              { 
                label: 'Approver', 
                value: 'J. Morrison', 
                subValue: 'Fleet Manager', 
                isUser: true, 
                color: 'bg-indigo-100 text-indigo-900' 
              },
              { label: 'Attachment', value: '3 High-Res Photos', isLink: true },
              { label: 'Method', value: 'Visual & Ultrasonic' },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-100/50 pb-2 md:pb-0 md:border-0">
                <span className="text-slate-500 font-semibold">{item.label}</span>
                {item.isUser ? (
                  <div className={`flex items-center gap-2 px-2.5 py-1 rounded-lg font-bold text-[11px] ${item.color}`}>
                    <img className="w-4 h-4 rounded-full bg-white" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.value}`} alt="av" />
                    {item.value}
                  </div>
                ) : (
                  <span className={`font-bold text-slate-700 ${item.isLink ? 'text-blue-600 hover:underline cursor-pointer' : ''}`}>
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </section>

          {/* Metrics Ribbon */}
          <div className="grid grid-cols-3 items-center bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
            <BigMetric icon={<CheckCircle2 />} count="13" label="Passed Items" color="text-emerald-500" />
            <div className="flex justify-center"><div className="w-[1px] h-12 bg-slate-100" /></div>
            <BigMetric icon={<AlertTriangle />} count="02" label="Flagged Issues" color="text-amber-500" />
          </div>

          {/* Issues List */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">Critical Findings</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'ISS-01', title: 'Marine growth buildup near waterline', severity: 'Medium', icon: '🌊' },
                { id: 'ISS-02', title: 'Suspected hairline crack at weld seam', severity: 'High', icon: '🔩' },
                { id: 'ISS-03', title: 'Sacrificial anode worn beyond limit', severity: 'Critical', icon: '⚙️' },
              ].map((issue, idx) => (
                <div key={idx} className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-xl group-hover:bg-indigo-50 transition-colors">
                    {issue.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[15px] font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{issue.title}</h4>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">{issue.id}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase ${getSeverityStyle(issue.severity)}`}>
                    {issue.severity}
                  </div>
                  <MoreVertical size={18} className="text-slate-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-slate-400 uppercase px-1">Assignee Authentication</span>
              <div className="h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-300 italic font-serif">
                John Hanks - Digitally Signed
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black text-slate-400 uppercase px-1">Management Verification</span>
              <div className="h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-300 italic font-serif">
                Pending Final Review
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer - System Layout */}
        <div className="p-8 bg-slate-50/80 backdrop-blur-sm border-t border-slate-100 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-2">
            <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 active:scale-95 transition-all text-sm">
              Reassign
            </button>
            <button className="px-6 py-3 bg-white border border-slate-200 text-red-600 font-bold rounded-xl hover:bg-red-50 active:scale-95 transition-all text-sm">
              Reject Report
            </button>
          </div>
          <div className="flex gap-3">
            <button className="px-8 py-3 bg-[#84A962] text-white font-black rounded-xl hover:shadow-lg hover:shadow-green-900/20 active:scale-95 transition-all text-sm uppercase tracking-wide">
              Approve Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Helper Components for cleaner code */

const HeaderActionIcon = ({ Icon }) => (
  <button className="p-2.5 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-xl text-slate-500 transition-all">
    <Icon size={18} />
  </button>
);

const BigMetric = ({ icon, count, label, color }) => (
  <div className="flex flex-col items-center group">
    <div className={`flex items-center gap-3 ${color} transition-transform group-hover:scale-110`}>
      <span className="opacity-30 scale-125">{icon}</span>
      <span className="text-3xl font-black tabular-nums tracking-tighter">{count}</span>
    </div>
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{label}</span>
  </div>
);

export default ReportDetail;