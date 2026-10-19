import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Share2, Edit3, UserPlus, ExternalLink, Trash2, AlertCircle, Clock, CheckCircle 
} from "lucide-react";
import { DragDropContext } from "@hello-pangea/dnd";

// 1. Import the Context
import { useWorkOrders } from "../../../contexts/WorkOrderContext";

import StatCardsRow from "../../../components/WorkorderComponents/cards/StatCardsRow";
import ResourceCapacityBar from "../../../components/WorkorderComponents/cards/ResourceCapacityBar";
import WorkloadGrid from "../../../components/WorkorderComponents/charts/WorkloadGrid"; 
import UnscheduledSidebar from "../../../components/WorkorderComponents/cards/UnscheduledSidebar";
import CapacityModal from "../../../components/modals/CapacityModal";
import CapacityToast from "../../../components/WorkorderComponents/cards/CapacityToast";
import QuickEditFlow from "../../../components/modals/QuickEditFlow";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const USERS = [
  { id: "u1", name: "Emma David", capacityPerDay: 8, role: "Electrician" },
  { id: "u2", name: "John Hanks", capacityPerDay: 8, role: "Mechanic" },
  { id: "u3", name: "Sara Smith", capacityPerDay: 8, role: "Plumber" },
];

export default function Workload() {
  const navigate = useNavigate();
  
  // 2. Access global workOrders and assignment function
  const { workOrders, assignWorkOrder } = useWorkOrders();

  const [activeUser, setActiveUser] = useState(null); 
  const [userSettings, setUserSettings] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [showQuickEditFlow, setShowQuickEditFlow] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [mobileView, setMobileView] = useState("grid");

  const [taskMenu, setTaskMenu] = useState({ visible: false, x: 0, y: 0, task: null });
  const [addMenu, setAddMenu] = useState({ visible: false, x: 0, y: 0, day: null, userId: null });

  // Close menus on scroll or outside click
  useEffect(() => {
    const closeMenus = () => {
      setTaskMenu(prev => ({ ...prev, visible: false }));
      setAddMenu(prev => ({ ...prev, visible: false }));
    };
    window.addEventListener("click", closeMenus);
    return () => window.removeEventListener("click", closeMenus);
  }, []);

  /* ---------- BUG 3 FIX: Moved outside useMemo ---------- */
  const handleSaveCapacity = (userId, daysConfig) => {
    setUserSettings(prev => ({
      ...prev,
      [userId]: daysConfig
    }));
  };

  /* ---------- ANALYTICS ENGINE ---------- */
  const analytics = useMemo(() => {
    const stats = {
      totalHoursScheduled: 0,
      totalCapacity: USERS.length * 40,
      dayLoad: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0 },
      capacityData: {} 
    };

    USERS.forEach(u => {
      stats.capacityData[u.id] = { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0 };
    });

    // 3. Use global workOrders for analytics
    workOrders.forEach(t => {
      if (t.assigneeId && t.scheduledDay) {
        stats.totalHoursScheduled += (Number(t.estimatedHours) || 0);
        stats.dayLoad[t.scheduledDay] += (Number(t.estimatedHours) || 0);
        
        if (stats.capacityData[t.assigneeId]) {
          stats.capacityData[t.assigneeId][t.scheduledDay] = 
            (stats.capacityData[t.assigneeId][t.scheduledDay] || 0) + (Number(t.estimatedHours) || 0);
        }
      }
    });

    return stats;
  }, [workOrders]);

  /* ---------- INTERACTIVE HANDLERS ---------- */
  const handleTaskClick = (e, task) => {
    e.stopPropagation();
    setAddMenu({ visible: false }); 
    setTaskMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      task: task
    });
  };

  const handleAddClick = (e, day, userId) => {
    e.stopPropagation();
    setTaskMenu({ visible: false }); 
    setAddMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      day,
      userId
    });
  };

  const handleQuickAssign = (taskId, userId, day = "Monday") => {
    const taskToAssign = workOrders.find((t) => t.id === taskId);
    const tech = USERS.find((u) => u.id === userId);
    const techCurrentDayHours = workOrders
      .filter((t) => t.assigneeId === userId && t.scheduledDay === day)
      .reduce((sum, t) => sum + (Number(t.estimatedHours) || 0), 0);

    const totalNewHours = techCurrentDayHours + (Number(taskToAssign.estimatedHours) || 0);

    if (totalNewHours > 8) {
      setToast({
        visible: true,
        message: `${tech.name} is over capacity on ${day} (${totalNewHours}h assigned).`,
      });
    }

    // 4. Update via Context
    assignWorkOrder(taskId, userId, day);
  };

  const onDragEnd = ({ destination, draggableId }) => {
    if (!destination) return;

    // Handle moving back to unscheduled
    if (destination.droppableId === "unscheduled-sidebar") {
      assignWorkOrder(draggableId, null, null);
      return;
    }

    const [newAssigneeId, newDay] = destination.droppableId.split("|");
    const draggedTask = workOrders.find(t => t.id === draggableId);
    
    const techCurrentDayHours = workOrders
      .filter(t => t.assigneeId === newAssigneeId && t.scheduledDay === newDay && t.id !== draggableId)
      .reduce((sum, t) => sum + (Number(t.estimatedHours) || 0), 0);

    if (techCurrentDayHours + (Number(draggedTask.estimatedHours) || 0) > 8) {
        const techName = USERS.find(u => u.id === newAssigneeId)?.name || "Technician";
        setToast({ visible: true, message: `${techName} is over capacity on ${newDay}.` });
    }

    // 5. Update via Context
    assignWorkOrder(draggableId, newAssigneeId, newDay);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-3 md:p-6 bg-[#F9FBFA] min-h-screen font-sans relative pb-24 md:pb-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2.5 bg-white shadow-sm rounded-xl border border-gray-100 transition-all active:scale-95">
              <ArrowLeft size={18} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg md:text-xl font-black text-gray-900 leading-tight">Workload</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em]">Maintenance Operations</p>
            </div>
          </div>

          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <div className="flex flex-col items-start sm:items-end">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Utilization</span>
                <span className="text-xl font-black text-[#708B53] leading-none">
                  {analytics.totalCapacity > 0 ? Math.round((analytics.totalHoursScheduled / analytics.totalCapacity) * 100) : 0}%
                </span>
              </div>
              <button className="flex items-center gap-2 bg-[#708B53] text-white px-4 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-[#708B53]/20 active:scale-95 transition-all">
                <Share2 size={14} /> <span className="hidden xs:inline">Export</span>
              </button>
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar -mx-3 px-3">
          <StatCardsRow tasks={workOrders} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        </div>

        <div className="mt-6 bg-white p-4 md:p-5 rounded-[24px] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-[11px] font-black text-gray-800 flex items-center gap-2 uppercase tracking-wider">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Capacity Monitor
             </h3>
          </div>
          {/* BUG 1 FIX: Changed users to USERS */}
          <ResourceCapacityBar users={USERS} capacityData={analytics.dayLoad} userSettings={userSettings} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mt-6 items-start">
          <div className={`${mobileView === 'grid' ? 'block' : 'hidden'} md:block bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden min-h-[500px] md:min-h-[650px]`}>
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  <WorkloadGrid
                    users={USERS}
                    days={DAYS}
                    tasks={workOrders.filter(t => t.assigneeId)}
                    capacityData={analytics.capacityData}
                    openCapacityModal={setActiveUser}
                    onTaskClick={handleTaskClick}
                    onAddClick={handleAddClick}   
                  />
                </div>
              </div>
          </div>

          <div className={`${mobileView === 'backlog' ? 'block' : 'hidden'} lg:block lg:sticky lg:top-6`}>
            <div className="bg-[#F1F4F0]/40 rounded-[24px] border border-[#708B53]/10 p-2 min-h-[500px] md:min-h-[650px] flex flex-col">
               <div className="px-4 py-4">
                 <h2 className="text-[13px] font-black text-gray-800 uppercase tracking-tight">Workorder Backlog</h2>
                 <p className="text-[10px] text-gray-500 font-bold uppercase opacity-60">Unscheduled Tasks</p>
               </div>
              <UnscheduledSidebar tasks={workOrders.filter(t => !t.assigneeId)} activeCategory={activeCategory} users={USERS} onQuickAssign={handleQuickAssign} />
            </div>
          </div>
        </div>

        {/* --- DYNAMIC TASK MENU --- */}
        {taskMenu.visible && (
          <div 
            className="fixed z-[200] bg-white shadow-2xl rounded-2xl border border-gray-100 py-2 w-48 animate-in fade-in zoom-in duration-150"
            style={{ top: taskMenu.y, left: taskMenu.x }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={(e) => {
                e.stopPropagation(); 
                setSelectedTask(taskMenu.task);
                setShowQuickEditFlow(true);
                setTaskMenu({ ...taskMenu, visible: false });
              }}
              className="w-full px-4 py-2 text-left text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-3"
            >
              <Edit3 size={14} className="text-gray-400" /> Quick Edit
            </button>
            <button className="w-full px-4 py-2 text-left text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-3">
              <UserPlus size={14} className="text-gray-400" /> Assign to
            </button>
            <button className="w-full px-4 py-2 text-left text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-3">
              <ExternalLink size={14} className="text-gray-400" /> See workorder
            </button>
            <div className="h-[1px] bg-gray-100 my-1" />
            <button className="w-full px-4 py-2 text-left text-xs font-bold text-red-500 hover:bg-red-50 flex items-center gap-3">
              <Trash2 size={14} /> Delete workorder
            </button>
          </div>
        )}

        {/* --- DYNAMIC ADD MENU --- */}
        {addMenu.visible && (
          <div 
            className="fixed z-[200] bg-white shadow-2xl rounded-[20px] border border-gray-100 p-3 w-72 animate-in fade-in slide-in-from-top-2 duration-200"
            style={{ top: addMenu.y, left: addMenu.x }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[10px] font-black text-gray-400 uppercase mb-3 px-1">Suggested for {addMenu.day}</p>
            <div className="space-y-2">
              {[
                { title: "Repair: fuel pump-issue", priority: "Low", color: "text-green-600 bg-green-50", icon: <CheckCircle size={14}/> },
                { title: "Weekly: Cabin-Maintenance", priority: "Medium", color: "text-blue-600 bg-blue-50", icon: <Clock size={14}/> },
                { title: "Monthly: HVAC-inspection", priority: "High", color: "text-red-600 bg-red-50", icon: <AlertCircle size={14}/> }
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-2 rounded-xl border border-gray-100 hover:border-[#708B53] hover:bg-gray-50 transition-all text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{item.icon}</span>
                    <span className="text-xs font-bold text-gray-700 truncate w-32">{item.title}</span>
                  </div>
                  <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${item.color}`}>{item.priority}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] md:w-auto">
          <CapacityToast isVisible={toast.visible} message={toast.message} onClose={() => setToast({ ...toast, visible: false })} />
        </div>
      </div>

      <QuickEditFlow 
        task={selectedTask} 
        isOpen={showQuickEditFlow} 
        onClose={() => setShowQuickEditFlow(false)} 
      />

      {/* BUG 2 FIX: Removed redundant isModalOpen block, keeping only activeUser block */}
      {activeUser && (
        <CapacityModal 
          user={activeUser} 
          onClose={() => setActiveUser(null)} 
          onSave={handleSaveCapacity} 
        />
      )}
    </DragDropContext>
  );
}