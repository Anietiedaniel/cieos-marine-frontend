import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Filter,
  ChevronDown,
  Share2,
  ClipboardList,
  History,
  Plus,
} from "lucide-react";

import NewWorkOrder from "./NewWorkOrder";
import WorkOrderTable from "./WorkOrderTable";
import FilterSidebar from "./FilterSidebar";

export default function WorkOrderPage() {
  const navigate = useNavigate();

  // ✅ SAFE outlet usage (prevents crash)
  const outlet = useOutletContext();
  const setActiveTab = outlet?.setActiveTab;

  const [isCreating, setIsCreating] = useState(false);
  const [viewMode, setViewMode] = useState("work");
  const [hasWorkOrders] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleViewChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "workload") {
      navigate("../workload");
    } else {
      setViewMode(selectedValue);
    }
  };

  // ✅ reusable button
  const ActionBtn = ({
    icon,
    label,
    isExport,
    className = "",
    onClick,
  }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-[14px]
      text-[13px] md:text-[14px] font-bold text-gray-700 hover:bg-gray-50
      transition shadow-sm active:scale-95 active:shadow-inner
      focus:outline-none focus:ring-2 focus:ring-[#708B53]/20
      ${className}`}
    >
      {!isExport && <span className="text-gray-400">{icon}</span>}
      {label}
      {isExport && <span className="text-gray-400">{icon}</span>}
    </button>
  );

  if (isCreating) {
    return <NewWorkOrder onBack={() => setIsCreating(false)} />;
  }

  return (
    <div className="flex flex-col h-full p-4 md:p-6 bg-[#F9FBFA] animate-in fade-in duration-500">

      {/* HEADER */}
      <div className="flex flex-col gap-6 mb-6 md:mb-8">

        {/* Title Row */}
        <div className="flex items-center justify-between">
          <h1 className="text-[22px] md:text-[26px] font-bold text-gray-900 lowercase">
            work order
          </h1>

          {/* Mobile create */}
          <button
            onClick={() => setIsCreating(true)}
            className="md:hidden bg-[#708B53] text-white p-2.5 rounded-full shadow-lg active:scale-95"
          >
            <Plus size={24} />
          </button>

          {/* Desktop create */}
          <button
            onClick={() => setIsCreating(true)}
            className="hidden md:block bg-[#708B53] text-white px-6 py-2.5 rounded-[14px] font-bold text-[14px] hover:bg-[#5d7445]"
          >
            Create
          </button>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 lg:flex lg:items-center gap-3 md:gap-4">

          {/* View selector */}
          <div className="relative group col-span-1">
            <ClipboardList
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={viewMode}
              onChange={handleViewChange}
              className="w-full appearance-none bg-white border border-gray-200 pl-9 pr-8 py-2.5
              rounded-[14px] text-[13px] md:text-[14px] font-bold text-gray-700 shadow-sm
              focus:outline-none focus:ring-2 focus:ring-[#708B53]/20"
            >
              <option value="work">Work Order</option>
              <option value="table">Table view</option>
              <option value="workload">Workload</option>
            </select>

            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Filter */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-[14px] text-[13px] md:text-[14px] font-bold text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <Filter size={18} className="text-gray-400" />
            Filter
          </button>

          {/* History & Export */}
          <div className="col-span-2 flex items-center gap-3">

           <ActionBtn
              icon={<History size={18} />}
              label="History"
              onClick={() => navigate("history")} 
              className="flex-1 lg:flex-none justify-center"
            />

            <ActionBtn
              icon={<Share2 size={18} />}
              label="Export"
              isExport
              className="flex-1 lg:flex-none justify-center"
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-hidden">
        {viewMode === "table" ? (
          <WorkOrderTable />
        ) : (
          <div className="h-full bg-white rounded-[24px] shadow-sm flex flex-col items-center justify-center p-12 border border-gray-100 text-center">
            <div className="w-16 h-16 bg-[#F9FBFA] rounded-full flex items-center justify-center mb-4">
              <ClipboardList size={32} className="text-gray-200" />
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">
              No Work Order
            </h2>

            <p className="text-gray-400 mb-8">
              There are no work orders available at the moment.
            </p>

            <button
              onClick={() => setIsCreating(true)}
              className="bg-[#708B53] text-white px-10 py-3.5 rounded-xl font-bold active:scale-95"
            >
              Create work order
            </button>
          </div>
        )}
      </div>

      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
}
// import React, { useState } from "react";
// import { Filter, ChevronDown, MessageSquare, Edit3, Share2, ClipboardList, PenTool, Box } from "lucide-react";
// import NewWorkOrder from "./NewWorkOrder";
// import TodoView from "./TodoView"; 

// export default function WorkOrderPage() {
//   const [isCreating, setIsCreating] = useState(false);
//   const [viewMode, setViewMode] = useState("todo"); // Defaulting to 'todo' to see the work
//   const [hasData] = useState(true); // Toggle this to false to see the Empty State

//   if (isCreating) {
//     return <NewWorkOrder onBack={() => setIsCreating(false)} />;
//   }

//   return (
//     <div className="flex flex-col h-full animate-in fade-in duration-500 bg-[#F3F4F6]">
//       {/* HEADER BAR */}
//       <div className="flex flex-wrap items-center justify-between p-4 gap-4">
//         <div className="flex items-center gap-3">
//           <h1 className="text-2xl font-bold text-gray-900">work order</h1>
          
//           <div className="relative">
//             <ClipboardList size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
//             <select
//               value={viewMode}
//               onChange={(e) => setViewMode(e.target.value)}
//               className="appearance-none bg-white border border-gray-200 pl-9 pr-8 py-1.5 rounded-lg text-sm font-medium text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#708B53]"
//             >
//               <option value="table">Table view</option>
//               <option value="todo">To Do</option>
//               <option value="workload">Workload</option>
//             </select>
//             <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//           </div>

//           <button className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 shadow-sm">
//             <Filter size={16} /> Filter
//           </button>
//         </div>

//         <div className="flex items-center gap-2">
//           <ActionBtn icon={<MessageSquare size={14} />} label="Comment" />
//           <ActionBtn icon={<Edit3 size={14} />} label="Edit" />
//           <ActionBtn icon={<Share2 size={14} />} label="Export" isExport />
//         </div>
//       </div>

//       {/* CONDITIONAL CONTENT */}
//       {!hasData ? (
//         /* EMPTY STATE BOX */
//         <div className="flex-1 m-4 bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center p-12 border border-gray-100">
//            <div className="relative flex items-center justify-center mb-8">
//               <div className="bg-white p-3 rounded-xl shadow-md -rotate-12 border border-gray-50 absolute -translate-x-14">
//                  <ClipboardList className="text-gray-300" size={28} />
//               </div>
//               <div className="bg-white p-5 rounded-2xl shadow-xl z-10 border border-gray-100">
//                  <PenTool className="text-gray-600" size={32} />
//               </div>
//               <div className="bg-white p-3 rounded-xl shadow-md rotate-12 border border-gray-50 absolute translate-x-14">
//                  <Box className="text-gray-300" size={28} />
//               </div>
//            </div>
//            <h2 className="text-xl font-bold text-gray-900 mb-2">No Work Order</h2>
//            <p className="text-gray-400 text-sm mb-8">No work order at the moment</p>
//            <button 
//              onClick={() => setIsCreating(true)}
//              className="bg-[#708B53] text-white px-10 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition shadow-lg shadow-[#708B53]/20"
//            >
//              Create work order
//            </button>
//         </div>
//       ) : (
//         /* ACTUAL VIEW MODES */
//         <div className="flex-1 overflow-hidden">
//           {viewMode === "todo" && <TodoView />}
//           {viewMode === "table" && <div className="p-8 text-center text-gray-500">Table View Coming Soon</div>}
//         </div>
//       )}
//     </div>
//   );
// }

// const ActionBtn = ({ icon, label, isExport }) => (
//   <button className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition">
//     {!isExport && icon} {label} {isExport && icon}
//   </button>
// );