 import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Search, Bell, Filter, Calendar, History, 
  CheckCircle, Plus, MoreVertical 
} from 'lucide-react';

// Mock data to match the screenshot
const mockInspections = [
  { id: 'IN-091', title: 'Hull Integrity Inspection', status: 'Pending', priority: 'High', user: 'John Hanks', approvedBy: 'Fleet Manager J. Morrison', performedBy: 'Unassigned', startDate: '5th March, 2025', date: '5th March, 2026', duration: '1hr 30mins' },
  { id: 'IN-092', title: 'Hull Integrity Inspection', status: 'Pending', priority: 'High', user: 'John Hanks', approvedBy: 'Fleet Manager J. Morrison', performedBy: 'Unassigned', startDate: '5th March, 2025', date: '5th March, 2026', duration: '1hr 30mins' },
  { id: 'IN-093', title: 'Hull Integrity Inspection', status: 'In Progress', priority: 'High', user: 'John Hanks', approvedBy: 'Fleet Manager J. Morrison', performedBy: 'Unassigned', startDate: '5th March, 2025', date: '5th March, 2026', duration: '1hr 30mins' },
  { id: 'IN-094', title: 'Hull Integrity Inspection', status: 'Rejected', priority: 'High', user: 'John Hanks', approvedBy: 'Fleet Manager J. Morrison', performedBy: 'Unassigned', startDate: '5th March, 2025', date: '5th March, 2026', duration: '1hr 30mins' },
  { id: 'IN-095', title: 'Hull Integrity Inspection', status: 'Submitted', priority: 'High', user: 'John Hanks', approvedBy: 'Fleet Manager J. Morrison', performedBy: 'Unassigned', startDate: '5th March, 2025', date: '5th March, 2026', duration: '1hr 30mins' },
  { id: 'IN-096', title: 'Hull Integrity Inspection', status: 'Approved', priority: 'High', user: 'John Hanks', approvedBy: 'Fleet Manager J. Morrison', performedBy: 'Unassigned', startDate: '5th March, 2025', date: '5th March, 2026', duration: '1hr 30mins' },
];


const Inspections = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
  { name: "Submissions", path: "/dashboard/inspections/submissions" },
  { name: "Reports", path: "/dashboard/inspections/reports" },
  { name: "Checklist", path: "/dashboard/inspections/checklist" },
];

  // ✅ Active tab logic
  const getActiveTab = () => {
    if (location.pathname.includes("reports")) return "Reports";
    if (location.pathname.includes("checklist")) return "Checklist";
    return "Submissions";
  };

  const activeTab = getActiveTab();
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'bg-gray-500 text-white';
      case 'In Progress': return 'bg-blue-700 text-white';
      case 'Rejected': return 'bg-red-100 text-red-500';
      case 'Submitted': return 'bg-blue-100 text-blue-500';
      case 'Approved': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] p-6 font-sans">
      
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search Assets, Work orders, Parts..." 
              className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="bg-[#84A962] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#749654] transition-colors">
            Import New Checklist
          </button>
        </div>
        
      </div>

      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Inspections</h1>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-gray-600 shadow-sm">
          <Filter size={14} /> Filter
        </button>
      </div>

      {/* --- TABS --- */}
      <div className="flex gap-4 mb-8">
        <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => navigate(tab.path)} // ✅ no state here
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab.name
                  ? "bg-[#84A962] text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.name}
              {tab.name === "Submissions" && (
                <span className="ml-2 text-[10px] opacity-80 uppercase">
                  3 New
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* --- GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockInspections.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
            {/* New Badge */}
            {(idx === 0 || idx === 1 || idx === 2 || idx === 5) && (
               <span className="absolute top-4 right-4 bg-green-500 text-white text-[9px] px-2 py-0.5 rounded font-bold uppercase">New</span>
            )}

            <div className="flex justify-between items-start mb-4">
              <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wide ${getStatusStyle(item.status)}`}>
                {item.status}
              </span>
              <span className="border border-red-200 text-red-500 text-[10px] px-3 py-1 rounded-full font-bold uppercase">
                {item.priority}
              </span>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
              <p className="text-xs text-gray-400 font-medium">{item.id}</p>
            </div>

            <div className="mb-6">
              <p className="text-[11px] text-gray-400 font-bold uppercase mb-2">Submitted by:</p>
              <div className="flex flex-col items-center py-2">
                <div className="w-16 h-16 rounded-full bg-[#E5E1FF] overflow-hidden mb-2">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${idx}`} alt="avatar" />
                </div>
                <p className="text-sm font-bold text-gray-800">{item.user}</p>
              </div>
            </div>

            <div className="space-y-1.5 mb-6">
              <div className="flex text-[11px]">
                <span className="text-gray-400 font-bold w-24">Approved by:</span>
                <span className="text-gray-500 font-medium">{item.approvedBy}</span>
              </div>
              <div className="flex text-[11px]">
                <span className="text-gray-400 font-bold w-24">Performed by:</span>
                <span className="text-gray-500 font-medium flex items-center gap-1">
                  <span className="w-3 h-3 bg-gray-200 rounded-full inline-block"></span> {item.performedBy}
                </span>
              </div>
              <div className="flex text-[11px]">
                <span className="text-gray-400 font-bold w-24">Start Date:</span>
                <span className="text-gray-500 font-medium">{item.startDate}</span>
              </div>
              <div className="flex text-[11px]">
                <span className="text-gray-400 font-bold w-24">Submitted Date:</span>
                <span className="text-gray-500 font-medium">{item.date}</span>
              </div>
              <div className="flex text-[11px]">
                <span className="text-gray-400 font-bold w-24">Duration:</span>
                <span className="text-gray-500 font-medium">{item.duration}</span>
              </div>
            </div>

            <button className="w-full bg-[#84A962] text-white py-2 rounded-lg text-xs font-bold hover:bg-[#749654] transition-colors flex items-center justify-center gap-2"
            onClick={ () => navigate(`/dashboard/inspections/${item.id}`)}
            >
              Detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

 export default Inspections;