import React, { useMemo } from "react"; 
import { AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function ResourceCapacityBar({
  users = [],
  capacityData = {},  // Workload hours used (e.g., { Monday: 12 })
  userSettings = {}   // Max capacity per user (e.g., { userId: { Monday: 8, Tuesday: 4 } })
}) {
  const dayStats = useMemo(() => {
    return DAYS.map(day => {
      const usedHours = capacityData[day] || 0;

      // Calculate total available hours for the whole team for THIS specific day
      // If no custom setting exists, default to 8 hours
      const dailyMaxHours = users.reduce((sum, user) => {
        const userDayLimit = userSettings[user.id]?.find(d => d.day === day);
        return sum + (userDayLimit?.enabled ? userDayLimit.hours : 0 || 8);
      }, 0);

      const percentage = dailyMaxHours > 0 
        ? Math.round((usedHours / dailyMaxHours) * 100) 
        : 0;

      // Status Colors
      let statusColor = "bg-[#708B53]"; 
      let textColor = "text-[#708B53]";
      if (percentage > 100) {
        statusColor = "bg-red-500 animate-pulse"; 
        textColor = "text-red-600";
      } else if (percentage >= 85) {
        statusColor = "bg-amber-500";
        textColor = "text-amber-600";
      }

      return {
        name: day,
        percentage,
        usedHours,
        totalHours: dailyMaxHours,
        statusColor,
        textColor
      };
    });
  }, [users, capacityData, userSettings]);
  
  return (
    <div className="bg-white border border-gray-100 rounded-[24px] p-6 mb-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        
        {/* LEFT SECTION: SUMMARY INDICATOR */}
        <div className="flex items-center gap-4 pr-6 lg:border-r border-gray-100 min-w-[240px]">
          <div className="w-12 h-12 rounded-2xl bg-[#F1F4F0] flex items-center justify-center text-[#708B53]">
            <TrendingUp size={24} />
          </div>
          <div>
            <h3 className="text-[14px] font-black text-gray-900 leading-none">Team Capacity</h3>
            <p className="text-[11px] text-gray-400 font-medium mt-1">Weekly resource distribution</p>
          </div>
        </div>

        {/* RIGHT SECTION: INDIVIDUAL DAY BARS */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-6">
          {dayStats.map((day) => (
            <div key={day.name} className="relative group">
              {/* HEADER INFO */}
              <div className="flex justify-between items-end mb-2">
                <div>
                  <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">
                    {day.name}
                  </span>
                  <span className="text-[10px] font-bold text-gray-300">
                    {day.usedHours}h / {day.totalHours}h
                  </span>
                </div>
                <div className={`flex items-center gap-1 ${day.textColor}`}>
                  <span className="text-[12px] font-black leading-none">{day.percentage}%</span>
                  {day.percentage >= 100 && <AlertTriangle size={12} />}
                  {day.percentage < 100 && day.percentage > 0 && <CheckCircle2 size={12} className="opacity-40" />}
                </div>
              </div>

              {/* PROGRESS BAR TRACK */}
              <div className="h-2.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100/50 relative">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-in-out shadow-sm ${day.statusColor}`}
                  style={{ width: `${Math.min(day.percentage, 100)}%` }}
                />
              </div>

              {/* OVERLOAD WARNING TEXT */}
              {day.percentage > 100 && (
                <div className="absolute -bottom-4 left-0">
                  <span className="text-[8px] font-black text-red-500 uppercase tracking-tighter">
                    Critical: Over Capacity
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}