import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Filter, User, FileText, Search, X } from 'lucide-react';

const InspectionsGallery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Sync active tab with the URL
  const activeTab = location.pathname.split('/').pop() || 'submissions';

  const inspections = [
    { id: 'IN-091', status: 'Pending', type: 'High', title: 'Hull Integrity Inspection', user: 'John Hanks', approvedBy: 'Fleet Manager J. Morrison', performedBy: 'Unassigned', startDate: '5th march,2025', submittedDate: '5th march,2026', duration: '1hr 30mins', isNew: true, category: 'checklist' },
    { id: 'IN-092', status: 'Pending', type: 'High', title: 'Hull Integrity Inspection', user: 'John Hanks', approvedBy: 'Fleet Manager J. Morrison', performedBy: 'Unassigned', startDate: '5th march,2025', submittedDate: '5th march,2026', duration: '1hr 30mins', isNew: true, category: 'checklist' },
    { id: 'IN-093', status: 'In Progress', type: 'High', title: 'Hull Integrity Inspection', user: 'John Hanks', approvedBy: 'Fleet Manager J. Morrison', performedBy: 'Unassigned', startDate: '5th march,2025', submittedDate: '5th march,2026', duration: '1hr 30mins', isNew: true, category: 'checklist' },
    { id: 'IN-094', status: 'Rejected', type: 'High', title: 'Hull Integrity Inspection', user: 'John Hanks', approvedBy: 'Fleet Manager J. Morrison', performedBy: 'Unassigned', startDate: '5th march,2025', submittedDate: '5th march,2026', duration: '1hr 30mins', category: 'checklist' },
    { id: 'IN-095', status: 'Submitted', type: 'High', title: 'Hull Integrity Inspection', user: 'John Hanks', approvedBy: 'Fleet Manager J. Morrison', performedBy: 'Unassigned', startDate: '5th march,2025', submittedDate: '5th march,2026', duration: '1hr 30mins', category: 'checklist' },
    { id: 'IN-096', status: 'Approved', type: 'High', title: 'Hull Integrity Inspection', user: 'John Hanks', approvedBy: 'Fleet Manager J. Morrison', performedBy: 'Unassigned', startDate: '5th march,2025', submittedDate: '5th march,2026', duration: '1hr 30mins', category: 'checklist' },
  ];

  const filteredInspections = useMemo(() => {
    return inspections.filter(item => {
      const matchesTab = item.category === activeTab;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.user.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-[#E2E4E7] p-6 md:p-10 font-sans">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-[#1A1C1E]">Inspections</h1>
          <div className="relative group flex items-center">
             <button className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
              <Filter size={16} /> Filter
            </button>
          </div>
          
          {/* Functional Search Bar */}
          <div className="relative ml-auto hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84A962] w-64 shadow-sm"
            />
          </div>
        </div>

        {/* Tab Switcher - Exactly like the img */}
        <div className="flex items-center gap-3 mb-10">
          <button
            onClick={() => navigate("/dashboard/inspections/submissions")}
            className={`px-8 py-2.5 text-sm font-bold rounded-xl transition-all shadow-sm relative ${
              activeTab === 'submissions' 
              ? 'bg-[#84A962] text-white' 
              : 'bg-white text-gray-500'
            }`}
          >
            Submissions
            {activeTab === 'submissions' && (
              <span className="absolute -top-3 -right-2 bg-white text-[#84A962] text-[10px] font-black px-1.5 py-0.5 rounded border border-gray-100 shadow-sm">
                3New
              </span>
            )}
          </button>

          <button
            onClick={() => navigate("/dashboard/inspections/reports")}
            className={`px-8 py-2.5 text-sm font-bold rounded-xl transition-all shadow-sm ${
              activeTab === 'reports' 
              ? 'bg-[#84A962] text-white' 
              : 'bg-white text-gray-500'
            }`}
          >
            Reports
          </button>

          <button
            onClick={() => navigate("/dashboard/inspections/checklist")}
            className={`px-8 py-2.5 text-sm font-bold rounded-xl transition-all shadow-sm ${
              activeTab === 'checklist' 
              ? 'bg-[#84A962] text-white' 
              : 'bg-white text-gray-500'
            }`}
          >
            Checklist
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInspections.map((item, idx) => (
            <InspectionCard key={idx} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const InspectionCard = ({ data }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-[#9BA3AF] text-white';
      case 'In Progress': return 'bg-[#0052CC] text-white';
      case 'Rejected': return 'bg-[#FFEBEE] text-[#D32F2F] border border-[#FFCDD2]';
      case 'Submitted': return 'bg-[#E3F2FD] text-[#1976D2] border border-[#BBDEFB]';
      case 'Approved': return 'bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]';
      default: return 'bg-gray-400 text-white';
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm relative flex flex-col border border-white hover:shadow-md transition-shadow">
      
      {/* "New" green flag top right */}
      {data.isNew && (
        <div className="absolute top-4 right-4 bg-[#4CAF50] text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm">
          New
        </div>
      )}

      {/* Card Header */}
      <div className="flex justify-between items-start mb-4">
        <span className={`px-4 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${getStatusColor(data.status)}`}>
          {data.status}
        </span>
        <span className="border border-red-300 text-red-500 text-[10px] font-bold px-3 py-0.5 rounded-lg">
          {data.type}
        </span>
      </div>

      {/* Title & ID */}
      <div className="mb-1">
        <h3 className="text-xl font-bold text-gray-800 leading-tight">{data.title}</h3>
        <div className="flex items-center gap-1 text-gray-400 text-[10px] font-bold">
          <FileText size={12} strokeWidth={3} /> {data.id}
        </div>
      </div>

      <p className="text-[11px] font-bold text-gray-500 mb-1">Submitted by:</p>

      {/* Avatar & Name - Stacked Center */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 bg-[#DDE1E6] rounded-full overflow-hidden border-[6px] border-[#F2F4F7] shadow-inner mb-2">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user}`} 
            alt="avatar" 
            className="w-full h-full object-cover scale-110"
          />
        </div>
        <h4 className="text-xl font-bold text-gray-800">{data.user}</h4>
      </div>

      {/* List items - Precise spacing from img */}
      <div className="space-y-1 mb-8">
        <Item label="Approved by" value={data.approvedBy} />
        <Item label="Performed by" value={data.performedBy} isUserIcon />
        <Item label="Start Date" value={data.startDate} />
        <Item label="Submitted Date" value={data.submittedDate} />
        <Item label="Duration" value={data.duration} />
      </div>

      {/* Detail Button - Positioning matches img */}
      <div className="absolute bottom-6 right-6">
        <button className="bg-[#84A962] hover:bg-[#749654] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-lg shadow-green-900/10 transition-all">
          Detail
        </button>
      </div>
    </div>
  );
};

const Item = ({ label, value, isUserIcon }) => (
  <div className="flex text-[11px] leading-relaxed">
    <span className="font-bold text-gray-700 w-[100px] shrink-0">{label}:</span>
    <span className="text-gray-400 font-medium italic flex items-center gap-1">
      {isUserIcon && <User size={12} className="text-gray-300" />} {value}
    </span>
  </div>
);

export default InspectionsGallery;

// import React, { useState } from 'react';
// import { Filter, User, MoreVertical, FileText } from 'lucide-react';

// const InspectionsGallery = () => {
//   const [activeTab, setActiveTab] = useState('Submissions');

//   const inspections = [
//     { id: 'IN-091', status: 'Pending', type: 'High', title: 'Hull Integrity Inspection', user: 'John Hanks', approvedBy: 'Fleet Manager J. Morrison', performedBy: 'Unassigned', startDate: '5th march, 2025', submittedDate: '5th march, 2026', duration: '1hr 30mins', isNew: true },
//     { id: 'IN-091', status: 'Pending', type: 'High', title: 'Hull Integrity Inspection', user: 'John Hanks', approvedBy: 'Fleet Manager J. Morrison', performedBy: 'Unassigned', startDate: '5th march, 2025', submittedDate: '5th march, 2026', duration: '1hr 30mins', isNew: true },
//     { id: 'IN-091', status: 'In Progress', type: 'High', title: 'Hull Integrity Inspection', user: 'John Hanks', approvedBy: 'Fleet Manager J. Morrison', performedBy: 'Unassigned', startDate: '5th march, 2025', submittedDate: '5th march, 2026', duration: '1hr 30mins', isNew: true },
//     { id: 'IN-091', status: 'Rejected', type: 'High', title: 'Hull Integrity Inspection', user: 'John Hanks', approvedBy: 'Fleet Manager J. Morrison', performedBy: 'Unassigned', startDate: '5th march, 2025', submittedDate: '5th march, 2026', duration: '1hr 30mins' },
//     { id: 'IN-091', status: 'Submitted', type: 'High', title: 'Hull Integrity Inspection', user: 'John Hanks', approvedBy: 'Fleet Manager J. Morrison', performedBy: 'Unassigned', startDate: '5th march, 2025', submittedDate: '5th march, 2026', duration: '1hr 30mins' },
//     { id: 'IN-091', status: 'Approved', type: 'High', title: 'Hull Integrity Inspection', user: 'John Hanks', approvedBy: 'Fleet Manager J. Morrison', performedBy: 'Unassigned', startDate: '5th march, 2025', submittedDate: '5th march, 2026', duration: '1hr 30mins' },
//   ];

//   return (
//     <div className="min-h-screen bg-[#E5E7EB] p-4 md:p-8 font-sans text-slate-700">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
//           <div className="flex items-center gap-4">
//             <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Inspections</h1>
//             <button className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-xl border border-slate-300 text-sm font-medium hover:bg-slate-50 transition-colors">
//               <Filter size={16} /> Filter
//             </button>
//           </div>
//         </div>

//         {/* Tabs Section */}
//         <div className="flex items-center gap-4 mb-8">
//           <div className="relative">
//             <TabButton label="Submissions" active={activeTab === 'Submissions'} onClick={() => setActiveTab('Submissions')} />
//             <span className="absolute -top-2 -right-1 bg-white text-[#84A962] text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm border border-slate-100">3 New</span>
//           </div>
//           <TabButton label="Reports" active={activeTab === 'Reports'} onClick={() => setActiveTab('Reports')} />
//           <TabButton label="Checklist" active={activeTab === 'Checklist'} onClick={() => setActiveTab('Checklist')} />
//         </div>

//         {/* Grid Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {inspections.map((item, index) => (
//             <InspectionCard key={index} data={item} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const TabButton = ({ label, active, onClick }) => (
//   <button 
//     onClick={onClick}
//     className={`px-8 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
//       active 
//       ? 'bg-[#84A962] text-white' 
//       : 'bg-white text-slate-500 hover:bg-slate-50'
//     }`}
//   >
//     {label}
//   </button>
// );

// const InspectionCard = ({ data }) => {
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Pending': return 'bg-slate-400 text-white';
//       case 'In Progress': return 'bg-[#0052CC] text-white';
//       case 'Rejected': return 'bg-[#FFEBEE] text-[#D32F2F] border border-[#FFCDD2]';
//       case 'Submitted': return 'bg-[#E3F2FD] text-[#1976D2] border border-[#BBDEFB]';
//       case 'Approved': return 'bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]';
//       default: return 'bg-slate-200';
//     }
//   };

//   return (
//     <div className="bg-white rounded-[2.5rem] p-6 shadow-md relative overflow-hidden flex flex-col border border-white">
//       {/* New Badge */}
//       {data.isNew && (
//         <div className="absolute top-4 right-4 bg-[#4CAF50] text-white text-[10px] font-bold px-2 py-0.5 rounded">
//           New
//         </div>
//       )}

//       {/* Card Header */}
//       <div className="flex justify-between items-start mb-4">
//         <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(data.status)}`}>
//           {data.status}
//         </span>
//         <div className="flex gap-2">
//            <span className="border border-red-400 text-red-500 text-[10px] font-bold px-3 py-1 rounded-lg uppercase">
//             {data.type}
//           </span>
//         </div>
//       </div>

//       <div className="mb-2">
//         <h3 className="text-xl font-bold text-slate-800 mb-1">{data.title}</h3>
//         <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
//           <FileText size={14} /> {data.id}
//         </div>
//       </div>

//       <p className="text-xs font-bold text-slate-500 mb-2">Submitted by:</p>

//       {/* User Section */}
//       <div className="flex flex-col items-center mb-6">
//         <div className="w-24 h-24 bg-[#D1D5DB] rounded-full overflow-hidden border-4 border-[#F3F4F6] shadow-inner mb-3">
//           <img 
//             src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user}`} 
//             alt="avatar" 
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <h4 className="text-xl font-bold text-slate-800">{data.user}</h4>
//       </div>

//       {/* Details List */}
//       <div className="space-y-1.5 mb-6 flex-1">
//         <DetailItem label="Approved by" value={data.approvedBy} />
//         <DetailItem label="Performed by" value={data.performedBy} isIcon />
//         <DetailItem label="Start Date" value={data.startDate} />
//         <DetailItem label="Submitted Date" value={data.submittedDate} />
//         <DetailItem label="Duration" value={data.duration} />
//       </div>

//       {/* Action Button */}
//       <div className="flex justify-end">
//         <button className="bg-[#84A962] text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-green-900/10 hover:bg-[#749654] transition-all active:scale-95">
//           Detail
//         </button>
//       </div>
//     </div>
//   );
// };

// const DetailItem = ({ label, value, isIcon }) => (
//   <div className="flex items-center text-[12px]">
//     <span className="font-bold text-slate-800 w-32">{label}:</span>
//     <span className="text-slate-400 flex items-center gap-1 font-medium italic">
//       {isIcon && <User size={12} />} {value}
//     </span>
//   </div>
// );

// // export default InspectionsGallery;