import React from 'react';
import { X, Filter } from 'lucide-react';

const NotificationPage = ({ onClose }) => {
  const categories = ["General", "Issues", "Work order", "Reminder", "Overdue", "Maintenance", "Inventory", "Reports", "Safety", "Critical"];

  const recentNotifications = [
    {
      id: 1,
      user: "John Hanks",
      action: "Reported an",
      target: "Vessel 01",
      title: "Main Engine Failure",
      desc: "Engine failure reported on Vessel 01. Immediate action required.",
      time: "3 min ago",
      type: "Critical",
      isUnread: true,
      img: "https://media.istockphoto.com/id/2244706826/photo/marine-engine-diesel-generator-engine-room-interior.webp?a=1&b=1&s=612x612&w=0&k=20&c=algnFfdMvmQ_UNrgu6Hml48G5Agoqwg5JYSPMsNB7x8="
    },
    {
      id: 2,
      user: "System",
      action: "You have an",
      target: "Upcoming maintenance in 2hrs",
      title: "Preventive Maintenance Due",
      desc: "Port Engine on Vessel 09 is due for service within 24 hours.",
      time: "30 min ago",
      type: "Schedule",
      isUnread: true,
      icon: "📋"
    },
    {
      id: 3,
      user: "Reminder",
      action: "You are running",
      target: "Low on Stock",
      title: "Low Stock: Hydraulic Fluid",
      desc: "Hydraulic fluid level has reached minimum threshold.",
      time: "3 hours ago",
      type: "Warning",
      isUnread: true,
      icon: "⚠️"
    },
    {
      id: 4,
      user: "John Hanks",
      action: "Has",
      target: "Opened work order #2341",
      title: "Work order has Started",
      desc: "technician began work on Vessel 08.",
      time: "3 hours ago",
      type: "Work Order",
      isUnread: false
    }
  ];

  return (
    <div className="bg-white min-h-full flex flex-col animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-4 md:p-6 border-b">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Notification</h2>
            <p className="text-sm text-gray-500">You Have 3 unread Notification</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 border px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-50">
              <Filter size={14} /> Filter
            </button>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
              <X size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Categories Grid - Mobile Friendly */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, idx) => (
               <button 
              key={cat} 
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold border transition-all
                ${idx === 0 ? 'bg-[#708B53] text-white border-[#708B53]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#708B53]'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <section>
          <h3 className="text-sm font-bold text-gray-800 mb-4">Recent</h3>
          <div className="divide-y divide-gray-100">
            {recentNotifications.map(item => (
              <NotificationItem key={item.id} data={item} />
            ))}
          </div>
        </section>

        <section className="pt-4 border-t">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Older</h3>
          <NotificationItem data={recentNotifications[0]} />
        </section>
      </div>
    </div>
  );
};

const NotificationItem = ({ data }) => {
  const typeStyles = {
    "Critical": "bg-red-100 text-red-500",
    "Schedule": "bg-green-50 text-green-600",
    "Warning": "bg-orange-50 text-orange-500",
    "Work Order": "bg-green-50 text-green-700",
    "Reminder": "bg-green-50 text-green-600"
  };

  return (
    <div className="flex gap-3 py-4 bg-white relative">
      {/* Avatar/Icon Column */}
      <div className="relative shrink-0">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-lg ${data.icon ? 'bg-[#708B53] text-white' : 'bg-purple-100'}`}>
          {data.icon || "🧑🏻"}
        </div>
        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
      </div>

      {/* Content Column */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <p className="text-[11px] leading-tight text-gray-400">
            <span className="font-semibold text-[#829e68] text-[12px]">{data.user}</span> {data.action} <span className="font-semibold text-[#829e68] text-[12px]">{data.target}</span>
          </p>
          {data.isUnread && <div className="h-2 w-2 bg-blue-500 rounded-full shrink-0"></div>}
        </div>

        <h4 className="font-bold text-gray-900 text-sm mt-1">{data.title}</h4>
        <p className="text-[12px] text-gray-500 mt-0.5 leading-snug">{data.desc}</p>
        <p className="text-[11px] text-gray-400 mt-2 italic font-medium">{data.time}</p>
      </div>

      {/* Action/Image Column */}
      <div className="flex flex-col items-end gap-2 shrink-0 min-w-[70px]">
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase ${typeStyles[data.type] || "bg-gray-100"}`}>
          {data.type}
        </span>
        {data.img && (
          <img 
            src={data.img} 
            alt="engine" 
            className="w-16 h-10 object-cover rounded-md border border-gray-200"
          />
        )}
      </div>
    </div>
  );
};

export default NotificationPage;