import React, { useMemo } from "react";
import {
  AlertTriangle,
  Clock,
  PlayCircle,
  PauseCircle,
  LayoutGrid,
  CheckCircle
} from "lucide-react";

/* ---------------- CARD ---------------- */

const StatCard = ({
  id,
  label,
  count,
  icon,
  color,
  isActive,
  onClick
}) => (
  <div
    onClick={() => onClick(id)}
    className={`min-w-[140px] bg-white border-2 p-4 rounded-2xl flex justify-between items-center shadow-sm flex-1 cursor-pointer transition-all
      ${
        isActive
          ? "border-[#708B53] bg-[#F8FAF7] ring-4 ring-[#708B53]/5"
          : "border-transparent hover:border-gray-200"
      }`}
  >
    <div>
      <span
        className={`text-[10px] font-bold uppercase tracking-wider ${
          isActive ? "text-[#708B53]" : "text-gray-400"
        }`}
      >
        {label}
      </span>
      <div className={`text-2xl font-black ${color}`}>
        {count}
      </div>
    </div>

    <div
      className={`transition-transform duration-200 ${
        isActive ? "scale-110 opacity-100" : "opacity-30"
      }`}
    >
      {icon}
    </div>
  </div>
);

/* ---------------- ROW ---------------- */

export default function StatCardsRow({
  activeCategory,
  setActiveCategory,
  tasks = [] // This will be the workOrders from context
}) {

  /* ---------------- DERIVED COUNTS ---------------- */
  const counts = useMemo(() => {
    // Initialize all possible statuses
    const base = {
      all: 0,
      overdue: 0,
      due_soon: 0,
      open: 0,
      on_hold: 0,
      in_progress: 0,
      completed: 0
    };

    tasks.forEach(task => {
      // Logic: Only count tasks that haven't been assigned to the grid yet (The Backlog)
      if (!task.assigneeId) {
        base.all++;
        
        // Normalize status strings (handle "In Progress" vs "in_progress")
        const statusKey = task.status?.toLowerCase().replace(/\s+/g, '_');
        
        if (base[statusKey] !== undefined) {
          base[statusKey]++;
        } else if (statusKey === "open") {
          base.open++;
        }
      }
    });

    return base;
  }, [tasks]);

  const stats = [
    {
      id: "all",
      label: "All Backlog",
      color: "text-gray-900",
      icon: <LayoutGrid size={20} />
    },
    {
      id: "overdue",
      label: "Overdue",
      color: "text-[#E52E2E]",
      icon: <AlertTriangle size={20} />
    },
    {
      id: "due_soon",
      label: "Due Soon",
      color: "text-[#F9B916]",
      icon: <AlertTriangle size={20} />
    },
    {
      id: "open", 
      label: "Open Tasks",
      color: "text-green-600",
      icon: <PlayCircle size={20} />
    },
    {
      id: "in_progress",
      label: "In Progress",
      color: "text-[#1D5DBE]",
      icon: <Clock size={20} />
    },
    {
      id: "on_hold",
      label: "On Hold",
      color: "text-amber-600",
      icon: <PauseCircle size={20} />
    }
  ];

  return (
    <div className="flex gap-4 mb-4 overflow-x-auto no-scrollbar pb-2">
      {stats.map(stat => (
        <StatCard
          key={stat.id}
          {...stat}
          count={counts[stat.id] || 0}
          isActive={activeCategory === stat.id}
          onClick={setActiveCategory}
        />
      ))}
    </div>
  );
}