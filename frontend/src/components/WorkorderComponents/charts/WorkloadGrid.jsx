import React, { useState } from "react";
import { Edit3, ClipboardCheck, Trash2, Eye, AlertCircle, Plus } from "lucide-react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import GlobalModal from "../../modals/GlobalModal";
import QuickEditWorkOrder from "../../modals/WorkOrderEditView";

export default function WorkloadGrid({
  users = [],
  tasks = [],
  days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  capacityData = {},
  openCapacityModal,
  // --- NEW PROPS FROM PARENT ---
  onTaskClick,
  onAddClick
}) {
  const [quickEditTask, setQuickEditTask] = useState(null);

  // Helper to get priority styles
  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high": return "bg-red-50 border-l-4 border-red-500 text-red-700 shadow-sm";
      case "medium": return "bg-blue-50 border-l-4 border-blue-500 text-blue-700 shadow-sm";
      default: return "bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 shadow-sm";
    }
  };

  return (
    <>
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-xl overflow-x-auto">
        <table className="w-full min-w-[1200px] border-separate border-spacing-0">
          <thead>
            <tr className="bg-[#F9FAFB]">
              <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest sticky left-0 bg-[#F9FAFB] z-30 border-b border-gray-100 text-left">
                Maintenance Crew
              </th>
              {days.map(day => (
                <th key={day} className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {users.map((user) => {
              const weeklyUsed = capacityData[user.id] 
                ? Object.values(capacityData[user.id]).reduce((a, b) => a + b, 0) 
                : 0;
              const weeklyCapacity = (user.capacityPerDay || 8) * days.length;
              const weeklyPercent = (weeklyUsed / weeklyCapacity) * 100;

              return (
                <tr key={user.id} className="group hover:bg-gray-50/30 transition-colors">
                  {/* USER INFO PANEL */}
                  <td className="p-5 sticky left-0 bg-white z-20 border-r border-gray-100 shadow-[4px_0_10px_-5px_rgba(0,0,0,0.05)]">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#708B53] text-white flex items-center justify-center font-bold shadow-lg shadow-[#708B53]/20 ring-2 ring-white">
                          {user.name[0]}
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-gray-900 leading-none mb-1">{user.name}</div>
                          <div className="text-[9px] font-black text-[#708B53] uppercase tracking-tighter bg-[#F1F4F0] px-1.5 py-0.5 rounded inline-block">
                            {user.role || "Technician"}
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 space-y-1">
                         <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase">
                           <span>Utilization</span>
                           <span className={weeklyPercent > 90 ? "text-red-500" : "text-gray-600"}>{Math.round(weeklyPercent)}%</span>
                         </div>
                         <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                                className={`h-full transition-all duration-500 ${weeklyPercent > 90 ? 'bg-red-500' : 'bg-[#708B53]'}`}
                                style={{ width: `${Math.min(weeklyPercent, 100)}%` }} 
                            />
                         </div>
                         <button 
                            onClick={() => openCapacityModal?.(user)}
                            className="text-[10px] text-gray-400 font-bold hover:text-[#708B53] transition-colors flex items-center gap-1 mt-1"
                         >
                            <Eye size={10} /> Details
                         </button>
                      </div>
                    </div>
                  </td>

                  {/* DAY CELLS */}
                  {days.map((day) => {
                    const droppableId = `${user.id}|${day}`;
                    const cellTasks = tasks.filter(t => t.assigneeId === user.id && t.scheduledDay === day);
                    const hoursUsed = capacityData[user.id]?.[day] || 0;
                    const isOverloaded = hoursUsed > (user.capacityPerDay || 8);

                    return (
                      <td key={day} className="p-2 border-r border-gray-50 align-top min-w-[180px]">
                        <Droppable droppableId={droppableId}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={`min-h-[140px] p-2 rounded-2xl transition-all duration-200 border-2 border-transparent ${
                                snapshot.isDraggingOver ? "bg-[#F1F4F0] border-dashed border-[#708B53]/30 scale-[0.98]" : ""
                              }`}
                            >
                              {/* Cell Header */}
                              <div className="flex justify-between items-center mb-3 px-1">
                                <span className={`text-[10px] font-black uppercase tracking-tight ${isOverloaded ? 'text-red-500' : 'text-gray-400'}`}>
                                  {isOverloaded ? 'Overloaded' : `${(user.capacityPerDay || 8) - hoursUsed}h Free`}
                                </span>
                                {/* --- UPDATED ADD BUTTON (Triggers IMG 2 Menu) --- */}
                                <button 
                                  onClick={(e) => onAddClick?.(e, day, user.id)}
                                  className="p-1 hover:bg-gray-100 rounded-md text-gray-400 hover:text-[#708B53] transition-colors"
                                >
                                  <Plus size={14} strokeWidth={3} />
                                </button>
                              </div>

                              {/* TASK PILLS */}
                              <div className="space-y-2">
                                {cellTasks.slice(0, 3).map((task, index) => (
                                  <Draggable key={task.id} draggableId={task.id} index={index}>
                                    {(dragProvided, dragSnapshot) => (
                                      <div
                                        ref={dragProvided.innerRef}
                                        {...dragProvided.draggableProps}
                                        {...dragProvided.dragHandleProps}
                                        /* --- UPDATED TASK CLICK (Triggers IMG 1 Menu) --- */
                                        onClick={(e) => onTaskClick?.(e, task)}
                                        className={`p-2 rounded-xl transition-all group relative cursor-pointer active:scale-95 ${getPriorityStyle(task.priority)} ${
                                            dragSnapshot.isDragging ? "rotate-2 shadow-2xl ring-2 ring-[#708B53]" : ""
                                        }`}
                                      >
                                        <div className="text-[10px] font-black truncate pr-4">{task.title}</div>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-[8px] opacity-70 font-bold uppercase">{task.estimatedHours} HR</span>
                                            <span className="text-[8px] opacity-70 font-bold uppercase truncate max-w-[60px]">{task.asset || 'N/A'}</span>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                
                                {cellTasks.length === 0 && !snapshot.isDraggingOver && (
                                    <div 
                                      onClick={(e) => onAddClick?.(e, day, user.id)}
                                      className="h-20 border border-dashed border-gray-100 rounded-xl flex items-center justify-center text-gray-200 hover:text-gray-300 hover:border-gray-300 cursor-pointer transition-colors"
                                    >
                                        <Plus size={20} />
                                    </div>
                                )}

                                {cellTasks.length > 3 && (
                                  <button 
                                    onClick={(e) => onAddClick?.(e, day, user.id)}
                                    className="w-full py-1 text-[9px] font-black text-gray-400 bg-gray-50 rounded-lg uppercase tracking-widest hover:bg-gray-100"
                                  >
                                    + {cellTasks.length - 3} More Tasks
                                  </button>
                                )}
                              </div>
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <GlobalModal open={!!quickEditTask} onClose={() => setQuickEditTask(null)}>
        <QuickEditWorkOrder task={quickEditTask} onClose={() => setQuickEditTask(null)} />
      </GlobalModal>
    </>
  );
}