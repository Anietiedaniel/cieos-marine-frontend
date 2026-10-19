import React from "react";
import { Search, Plus, X } from "lucide-react";

const ChatSidebar = ({ isOpen, onClose }) => {
  // Sample data to match the image list exactly
  const chats = Array(8).fill({
    title: "Inspection of Deck",
    id: "W-312",
    msg: "please find a way to reduce...",
    time: "3 hours ago",
    initials: "ID"
  });

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-[60] lg:hidden backdrop-blur-[1px]" 
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed lg:relative z-[70] w-80 h-full bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        
        {/* --- HEADER SECTION --- */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">Team Hub</h2>
            <div className="flex items-center gap-2">
               
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 text-gray-300" size={16} />
            <input 
              placeholder="Search Chats" 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-[14px] text-sm outline-none focus:bg-white focus:border-[#708B53]/20 transition-all placeholder:text-gray-300" 
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {['All', 'Unread', 'Favorite', 'More'].map((filter, i) => (
              <button 
                key={i} 
                className={`px-4 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-colors
                  ${i === 0 ? 'bg-[#708B53] text-white shadow-sm' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
              >
                {filter === 'More' ? '+ More' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* --- CHAT LIST SECTION --- */}
        <div className="flex-grow overflow-y-auto px-3 space-y-2 pb-4">
          {chats.map((chat, i) => (
            <div 
              key={i} 
              className={`group p-3 flex gap-3 cursor-pointer rounded-[20px] transition-all border
                ${i === 0 
                  ? 'bg-[#F1F4F0] border-[#708B53]/10 shadow-sm' 
                  : 'bg-white border-transparent hover:bg-gray-50'}`}
            >
              {/* Avatar / Initials Container */}
              <div className="relative shrink-0">
                {i === 0 ? (
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                    {chat.initials}
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                    <img 
                      src={`https://i.pravatar.cc/100?u=${i}`} 
                      alt="profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {/* Active Status Dot (Optional) */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              {/* Text Info */}
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className={`text-[13px] font-bold truncate ${i === 0 ? 'text-[#708B53]' : 'text-gray-800'}`}>
                    {chat.title}
                  </h4>
                  <span className="text-[10px] text-gray-400 font-bold tracking-tighter shrink-0">
                    W-013
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 truncate leading-tight font-medium">
                  {chat.msg}
                </p>
                <span className="text-[9px] text-gray-300 mt-1 block font-bold uppercase tracking-wider">
                  {chat.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default ChatSidebar;