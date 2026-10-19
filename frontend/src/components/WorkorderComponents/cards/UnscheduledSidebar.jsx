import React, { useMemo, useState, useEffect } from "react";
import { Search, UserPlus, X, Filter, ChevronDown, Plus, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Droppable, Draggable } from "@hello-pangea/dnd";

export default function UnscheduledSidebar({
  activeCategory = "all", 
  tasks = [],             
  users = [],
  onQuickAssign
}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0, taskId: null });

  /* ---------------- CONTEXT/TOUCH MENU LOGIC ---------------- */
  const handleActionMenu = (e, taskId) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent drag triggers when opening menu
    
    // Use clientX/Y for more reliable positioning relative to viewport
    const x = e.clientX || (e.touches ? e.touches[0].clientX : 0);
    const y = e.clientY || (e.touches ? e.touches[0].clientY : 0);
    
    setMenu({
      visible: true,
      x: Math.min(x, window.innerWidth - 220),
      y: Math.min(y, window.innerHeight - 300), 
      taskId: taskId
    });
  };

  const closeMenu = () => setMenu({ ...menu, visible: false });

  useEffect(() => {
    const handleClose = () => closeMenu();
    window.addEventListener("click", handleClose);
    // Use capture phase to ensure it closes even if other elements stop propagation
    window.addEventListener("scroll", handleClose, true);
    return () => {
      window.removeEventListener("click", handleClose);
      window.removeEventListener("scroll", handleClose, true);
    };
  }, []);

  /* ---------------- FILTER TASKS (REFINED) ---------------- */
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Normalize: "In Progress" -> "in_progress", "Open" -> "open"
      const normalizedStatus = (task.status || 'open')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '_');
      
      const matchesCategory = 
        !activeCategory || 
        activeCategory === "all" || 
        normalizedStatus === activeCategory;

      const matchesSearch = 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.asset && task.asset.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (task.id && task.id.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [tasks, activeCategory, searchQuery]);

  /* ---------------- STYLE HELPERS ---------------- */
  const getStatusStyles = (status) => {
    const s = status?.toLowerCase().trim().replace(/\s+/g, '_') || 'open';
    switch (s) {
      case "overdue": return "bg-[#FFF0F0] border-[#FFE0E0] text-[#E52E2E]";
      case "on_hold": return "bg-[#FFF7ED] border-[#FFEDD5] text-[#D97706]";
      case "in_progress": return "bg-[#F0F7FF] border-[#E0F0FF] text-[#1D5DBE]";
      case "due_soon": return "bg-[#F5F3FF] border-[#EDE9FE] text-[#7C3AED]";
      case "open": return "bg-[#F0FFF4] border-[#DCFCE7] text-[#166534]";
      default: return "bg-white border-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-[#F8FAF7] md:rounded-[24px] border-x md:border border-gray-100 p-4 md:p-6 flex flex-col h-full min-h-[500px] md:min-h-[600px] shadow-sm relative">
      
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between mb-4 md:block md:text-center">
        <div>
          <h2 className="font-black text-gray-800 text-[13px] md:text-sm uppercase tracking-wider">
            {activeCategory === 'all' ? 'Backlog' : `${activeCategory.replace('_', ' ')} Backlog`}
          </h2>
          <p className="text-[10px] text-gray-400 hidden md:block mt-1 font-bold">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'Task' : 'Tasks'} Available
          </p>
        </div>
        <button 
          onClick={() => navigate("/manager/workorders/new")}
          className="md:hidden p-2 bg-[#708B53] text-white rounded-lg shadow-md active:scale-90 transition-transform"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by asset, title, or ID..."
          className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-4 text-xs focus:ring-2 focus:ring-[#708B53]/20 outline-none transition-all shadow-sm"
        />
      </div>

      {/* DROPPABLE AREA */}
      <Droppable droppableId="unscheduled-sidebar">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 flex flex-col gap-3 overflow-y-auto no-scrollbar rounded-xl transition-colors pb-4 ${
              snapshot.isDraggingOver ? "bg-[#708B53]/5 ring-2 ring-dashed ring-[#708B53]/20" : ""
            }`}
          >
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(dragProvided, dragSnapshot) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      onContextMenu={(e) => handleActionMenu(e, task.id)}
                      className={`p-4 rounded-2xl border transition-all active:scale-[0.98] select-none
                        ${getStatusStyles(task.status)}
                        ${dragSnapshot.isDragging ? "shadow-2xl ring-2 ring-[#708B53] z-[100] rotate-2" : "shadow-sm hover:border-[#708B53]/40"}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[9px] font-black uppercase opacity-60 tracking-tight truncate max-w-[120px]">
                          {task.asset || "No Asset"}
                        </span>
                        <div className="flex items-center gap-2">
                           <span className="text-[9px] font-bold opacity-70 bg-white/60 px-2 py-0.5 rounded-md border border-black/5">
                             {task.estimatedHours || 0}h
                           </span>
                           <button 
                             className="p-1 hover:bg-black/5 rounded transition-colors"
                             onClick={(e) => handleActionMenu(e, task.id)}
                           >
                             <MoreVertical size={12} className="opacity-60" />
                           </button>
                        </div>
                      </div>
                      <h4 className="text-[12px] font-bold mb-2 leading-tight text-gray-900 line-clamp-2">{task.title}</h4>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${task.priority?.toLowerCase() === 'high' ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                          <span className="text-[9px] font-black uppercase tracking-tighter opacity-70">
                            {task.priority || 'Low'}
                          </span>
                        </div>
                        <span className="text-[8px] font-bold opacity-30 uppercase tracking-widest">{task.id.toString().slice(-5)}</span>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                  <Filter size={20} className="opacity-20" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider opacity-60">No matching tasks</p>
                <p className="text-[10px] opacity-40">Try a different filter or search</p>
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* DESKTOP NEW WORKORDER BUTTON */}
      <button
        onClick={() => navigate("/manager/workorders/new")}
        className="hidden md:flex mt-4 bg-[#708B53] text-white py-3.5 rounded-xl font-bold text-xs shadow-lg shadow-[#708B53]/20 hover:bg-[#5d7445] transition-all items-center justify-center gap-2 active:scale-95"
      >
        <Plus size={16} /> New Workorder
      </button>

      {/* QUICK ASSIGN MENU - Fixed Positioning logic */}
      {menu.visible && (
        <div 
          className="fixed z-[9999] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl py-2 w-56 animate-in fade-in zoom-in-95 duration-100"
          style={{ 
            top: menu.y, 
            left: menu.x,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-4 py-2 border-b border-gray-50 flex justify-between items-center">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Assign Technician</span>
            <button onClick={closeMenu} className="p-1 hover:bg-gray-100 rounded-md transition-colors"><X size={14} /></button>
          </div>
          <div className="max-h-[250px] overflow-y-auto p-1 custom-scrollbar">
            {users.length > 0 ? users.map(user => (
              <button
                key={user.id}
                onClick={() => {
                  onQuickAssign(menu.taskId, user.id, "Monday");
                  closeMenu();
                }}
                className="w-full text-left px-3 py-2.5 text-[12px] font-bold text-gray-700 hover:bg-[#F1F4F0] hover:text-[#708B53] flex items-center gap-3 transition-all rounded-xl group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#708B53]/10 text-[#708B53] group-hover:bg-[#708B53] group-hover:text-white flex items-center justify-center text-[11px] font-black border border-[#708B53]/20 transition-colors">
                  {user.name[0]}
                </div>
                <div className="flex flex-col">
                  <span className="leading-tight">{user.name}</span>
                  <span className="text-[9px] text-gray-400 font-medium uppercase tracking-tighter">{user.role}</span>
                </div>
              </button>
            )) : (
              <p className="p-4 text-center text-[10px] text-gray-400 font-bold uppercase">No Technicians Available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}