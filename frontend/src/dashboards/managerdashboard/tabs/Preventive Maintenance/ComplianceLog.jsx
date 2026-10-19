import React from "react";
import {
  Filter,
  Share2,
  ChevronLeft,
  AlertTriangle,
  User,
  Users,
  ArrowRight,
} from "lucide-react";

const ComplianceLog = ({ onBack, onCreateSchedule }) => {

  const stats = [
    { label: "Compliant", value: "6", color: "text-gray-900", icon: null },
    { label: "Overdue Tasks", value: "3", color: "text-red-600", icon: <AlertTriangle className="text-red-500" size={18} /> },
    { label: "Due Soon", value: "1", color: "text-orange-600", icon: <AlertTriangle className="text-orange-400" size={18} /> },
    { label: "Compliant Rate", value: "60%", color: "text-[#708B53]", icon: null },
  ];

  const logData = [
    { id: 1, asset: "Engine Room", title: "Anchor windlass inspection", performer: "John Hanks", result: "Passed", category: "Inspection", date: "5th Mar, 2026", status: "Overdue", note: "Brake pads require.." },
    { id: 2, asset: "Generator Set", title: "Gen-set inspection", performer: "Team", result: "Deferred", category: "Inspection", date: "5th Mar, 2026", status: "Compliant", note: "Oil level stable" },
    { id: 3, asset: "Lubrication System", title: "Pump pressure check", performer: "Team", result: "Deferred", category: "Inspection", date: "5th Mar, 2026", status: "Compliant", note: "Normal wear" },
    { id: 4, asset: "Fuel System", title: "Filter replacement", performer: "John Hanks", result: "Passed", category: "Maintenance", date: "5th Mar, 2026", status: "Compliant", note: "Cleaned housing" },
  ];

  return (
    <div className="bg-[#F2F4F7] min-h-screen p-4 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">

      {/* HEADER */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-3 bg-white rounded-2xl shadow-sm hover:bg-gray-50 transition border border-gray-100 active:scale-90"
            >
              <ChevronLeft size={20} />
            </button>

            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                Compliance Log
              </h1>
              <p className="text-xs text-gray-500 font-medium md:hidden">
                Track historical maintenance results
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
              <Filter size={18} /> <span className="hidden sm:inline">Filter</span>
            </button>

            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
              <Share2 size={18} /> <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        <button
          onClick={onCreateSchedule}
          className="w-full sm:w-fit px-8 py-4 bg-[#708B53] text-white rounded-2xl text-sm font-bold hover:bg-[#5f7546] shadow-lg shadow-[#708B53]/20 transition active:scale-[0.98]"
        >
          Create New Schedule
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[24px] p-5 md:p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:border-[#708B53]/30"
          >
            <span className={`text-2xl md:text-4xl font-black mb-1 md:mb-2 ${stat.color}`}>
              {stat.value}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-widest">
                {stat.label}
              </span>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">

        {/* DESKTOP TABLE */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F9FAFB] border-b border-gray-100">
              <tr className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Asset & Title</th>
                <th className="px-6 py-6">Performed by</th>
                <th className="px-6 py-6">Result</th>
                <th className="px-6 py-6">Date</th>
                <th className="px-6 py-6">Status</th>
                <th className="px-8 py-6">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {logData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50">
                  <td className="px-8 py-5">
                    <div className="font-bold text-gray-800 text-sm">{row.title}</div>
                    <div className="text-[11px] text-gray-400 uppercase">{row.asset}</div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        {row.performer === "Team" ? <Users size={14}/> : <User size={14}/>}
                      </div>
                      <span className="text-sm font-bold text-gray-700">{row.performer}</span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-gray-500 bg-gray-50 px-3 py-1 rounded-lg border">
                      {row.result}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-sm font-bold text-gray-600">{row.date}</td>

                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase ${
                      row.status === "Overdue"
                        ? "bg-red-50 text-red-600 border border-red-100"
                        : "bg-green-50 text-green-600 border border-green-100"
                    }`}>
                      {row.status}
                    </span>
                  </td>

                  <td className="px-8 py-5 text-[12px] text-gray-400 italic truncate max-w-xs">
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="lg:hidden divide-y divide-gray-100">
          {logData.map((row) => (
            <div key={row.id} className="p-5">
              <div className="flex justify-between mb-3">
                <div>
                  <p className="text-[10px] font-black text-[#708B53] uppercase">{row.asset}</p>
                  <h3 className="font-black text-gray-900">{row.title}</h3>
                </div>
                <span className={`px-2 py-1 text-[8px] font-black rounded ${
                  row.status === "Overdue" ? "bg-red-600 text-white" : "bg-green-600 text-white"
                }`}>
                  {row.status}
                </span>
              </div>

              <div className="flex justify-between mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                    {row.performer === "Team" ? <Users size={14}/> : <User size={14}/>}
                  </div>
                  <div className="text-[11px]">
                    <p className="text-gray-400">Performer</p>
                    <p className="font-bold text-gray-800">{row.performer}</p>
                  </div>
                </div>

                <div className="text-right text-[11px]">
                  <p className="text-gray-400">Last Date</p>
                  <p className="font-bold text-gray-800">{row.date}</p>
                </div>
              </div>

              {row.note && (
                <div className="mt-3 p-3 bg-gray-50 rounded-xl text-[11px] text-gray-500 italic flex gap-2">
                  <ArrowRight size={12} className="text-gray-300"/>
                  {row.note}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ComplianceLog;