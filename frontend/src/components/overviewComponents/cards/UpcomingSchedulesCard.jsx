export default function UpcomingSchedulesCard() {
  const schedules = [
    { title: "Hull Cleaning and Inspection", sub: "Preventive Maintenance", date: "2025-10-25", duration: "2 Hours" },
    { title: "Chiller system", sub: "Filter Replacement", date: "2025-10-25", duration: "2 Hours" },
    { title: "Spare Part Stockout", sub: "Engine Oil Filter (Part 010) is out of stock", date: "2025-10-25", duration: "2 Hours" },
  ];

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-start mb-1">
        <div>
          <h3 className="font-bold text-gray-800">Upcoming Schedules</h3>
          <p className="text-xs text-gray-500 mb-4">Scheduled Preventive Maintenance</p>
        </div>
        <button className="border rounded-lg px-3 py-1 flex items-center gap-2 text-xs text-gray-600 hover:bg-gray-50">
          📅 Calendar
        </button>
      </div>

      <div className="space-y-3">
        {schedules.map((item, i) => (
          <div key={i} className="flex justify-between items-center p-3 border rounded-xl">
            <div>
              <h4 className="font-semibold text-gray-800 text-sm">{item.title}</h4>
              <p className="text-xs text-gray-500 mb-1">{item.sub}</p>
              <div className="flex gap-3 text-[10px] text-gray-400">
                <span>📅 {item.date}</span>
                <span>⏱️ {item.duration}</span>
              </div>
            </div>
            <button className="bg-[#789356] hover:bg-[#667d49] text-white px-4 py-2 rounded-lg text-xs font-medium">
              View schedule
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}