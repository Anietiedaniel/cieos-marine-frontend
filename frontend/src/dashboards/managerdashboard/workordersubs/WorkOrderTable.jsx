import React, { useState } from 'react';
import { Trash2, Edit3, ChevronLeft, ChevronRight, ChevronDown, Box, Tag } from 'lucide-react';
// 1. Import the context hook
import { useWorkOrders } from "../../../contexts/WorkOrderContext";

const WorkOrderTable = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  // 2. Access state and actions from Context
  const { workOrders, deleteWorkOrder } = useWorkOrders();

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div className="bg-white rounded-[16px] md:rounded-[24px] shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
      
      {/* MOBILE VIEW: List of Cards */}
      <div className="block md:hidden overflow-y-auto divide-y divide-gray-100">
        {workOrders.map((order) => (
          <div key={order.id} className="p-4 bg-white active:bg-gray-50">
            <div className="flex justify-between items-start mb-3">
              <div>
                {/* ALIGNMENT: Uses order.id as fallback if code isn't generated yet */}
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">#{order.code || order.id.toString().slice(-4)}</span>
                <h3 className="text-sm font-bold text-gray-900 leading-tight">{order.title}</h3>
              </div>
              <StatusBadge status={order.status} isMobile />
            </div>

            <div className="grid grid-cols-2 gap-y-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#708B53] flex items-center justify-center text-white text-[10px] font-bold">
                  {/* ALIGNMENT: Uses 'U' if user is unassigned */}
                  {order.user?.[0] || "U"}
                </div>
                <span className="text-xs text-gray-600 font-medium">{order.user || "Unassigned"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Box size={14} />
                <span className="text-xs truncate">{order.asset}</span>
              </div>
              <div className="flex items-center gap-2">
                <PriorityBadge priority={order.priority} />
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Tag size={14} />
                <span className="text-xs">{order.category}</span>
              </div>
            </div>

            <div className="flex justify-end gap-6 pt-3 border-t border-gray-50">
              <button className="text-gray-400 flex items-center gap-1 text-xs font-medium">
                <Edit3 size={16} /> Edit
              </button>
              {/* 3. Mobile Delete Implementation */}
              <button 
                onClick={() => deleteWorkOrder(order.id)}
                className="text-red-400 flex items-center gap-1 text-xs font-medium hover:text-red-600 transition-colors"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW: Table */}
      <div className="hidden md:block flex-1 overflow-x-auto overflow-y-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead className="sticky top-0 z-20">
            <tr className="bg-[#F8FAF7] text-[#6B7280] text-[12px] font-bold tracking-wider border-b border-gray-100">
              <th className="px-6 py-5 w-16">No</th>
              <th className="px-4 py-5">Title</th>
              <th className="px-4 py-5">ID</th>
              <th className="px-4 py-5">Assigned To</th>
              <th className="px-4 py-5">Asset</th>
              <TableHeaderDropdown 
                label="Category" 
                isOpen={openDropdown === 'Category'} 
                onClick={() => toggleDropdown('Category')}
                options={['Maintenance', 'Preventive', 'Inspection', 'Repair']}
              />
              <TableHeaderDropdown 
                label="Priority" 
                isOpen={openDropdown === 'Priority'} 
                onClick={() => toggleDropdown('Priority')}
                options={['High', 'Medium', 'Low']}
              />
              <TableHeaderDropdown 
                label="Status" 
                isOpen={openDropdown === 'Status'} 
                onClick={() => toggleDropdown('Status')}
                options={['In Progress', 'On Hold', 'Done', 'Overdue']}
              />
              <th className="px-6 py-5 text-center w-28">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {workOrders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                {/* ALIGNMENT: Display row number or ID */}
                <td className="px-6 py-5 text-sm font-medium text-gray-400">{index + 1}</td>
                <td className="px-4 py-5 text-sm font-bold text-[#1A1A1A]">{order.title}</td>
                {/* ALIGNMENT: Show the code or a slice of the ID */}
                <td className="px-4 py-5 text-sm font-medium text-gray-500">{order.code || `WO-${order.id.toString().slice(-4)}`}</td>
                <td className="px-4 py-5">
                  <div className="flex items-center gap-2">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${order.user || "Unassigned"}&background=708B53&color=fff`} 
                      className="w-8 h-8 rounded-full" 
                      alt="avatar" 
                    />
                    <span className="text-sm font-medium text-gray-700">{order.user || "Unassigned"}</span>
                  </div>
                </td>
                <td className="px-4 py-5 text-sm text-gray-600 font-medium truncate max-w-[150px]">{order.asset}</td>
                <td className="px-4 py-5 text-sm text-gray-600 font-medium">{order.category}</td>
                <td className="px-4 py-5">
                  <PriorityBadge priority={order.priority} />
                </td>
                <td className="px-4 py-5">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-5">
                  <div className="flex justify-center gap-4">
                    {/* 4. Desktop Delete Implementation */}
                    <button 
                      onClick={() => deleteWorkOrder(order.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button className="text-gray-300 hover:text-[#708B53] transition-colors">
                      <Edit3 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER: Pagination */}
      <div className="py-4 md:py-6 border-t border-gray-100 flex justify-between md:justify-center items-center px-4 md:px-0 gap-2 bg-white">
        <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg flex items-center gap-1 md:gap-0">
          <ChevronLeft size={20} /> <span className="md:hidden text-xs font-bold">Prev</span>
        </button>
        
        <div className="flex gap-1">
          {[1, 2, 3].map(n => (
            <button key={n} className={`w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl text-xs md:text-sm font-bold ${n === 1 ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hidden sm:block'}`}>
              {n}
            </button>
          ))}
          <span className="sm:hidden text-gray-300 font-bold self-center">Page 1 of 3</span>
        </div>

        <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg flex items-center gap-1 md:gap-0">
          <span className="md:hidden text-xs font-bold">Next</span> <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

// --- Helper Components ---
const TableHeaderDropdown = ({ label, isOpen, onClick, options }) => (
  <th className="px-4 py-5 relative">
    <button onClick={onClick} className="flex items-center gap-1.5 hover:text-gray-900 transition-colors group">
      {label} <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && (
      <div className="absolute top-[80%] left-0 w-40 bg-white border border-gray-100 shadow-xl rounded-xl p-1.5 z-50">
        {options.map(opt => (
          <div key={opt} className="px-3 py-2 text-[12px] font-bold text-gray-600 hover:bg-[#F8FAF7] hover:text-[#708B53] rounded-lg cursor-pointer">
            {opt}
          </div>
        ))}
      </div>
    )}
  </th>
);

const PriorityBadge = ({ priority }) => {
  const styles = {
    High: "text-[#E52E2E] border-[#E52E2E] bg-[#FFF5F5]",
    Medium: "text-[#1D5DBE] border-[#1D5DBE] bg-[#F5F9FF]",
    Low: "text-[#34A853] border-[#34A853] bg-[#F5FFF7]"
  };
  return (
    <span className={`px-2 md:px-4 py-0.5 md:py-1 rounded-md md:rounded-lg text-[10px] md:text-[11px] font-bold border ${styles[priority] || styles.Low}`}>
      {priority}
    </span>
  );
};

const StatusBadge = ({ status, isMobile }) => {
  const styles = {
    'In Progress': "bg-[#1D5DBE] text-white",
    'On Hold': "bg-[#FFF9E7] text-[#F9B916] border border-[#F9B916]/20",
    'Done': "bg-[#34A853] text-white",
    'Open': "bg-gray-100 text-gray-600 border border-gray-200",
    'Overdue': "bg-red-500 text-white"
  };
  
  const currentStyle = styles[status] || styles['In Progress'];

  if (isMobile) {
    return (
      <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${currentStyle}`}>
        {status}
      </span>
    );
  }

  return (
    <span className={`px-5 py-1.5 rounded-full text-[12px] font-bold inline-block text-center min-w-[100px] ${currentStyle}`}>
      {status}
    </span>
  );
};

export default WorkOrderTable;