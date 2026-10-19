import React from "react";
import { X, ChevronDown, Download, Plus, UserPlus } from "lucide-react";

const ChatInfo = ({ onClose }) => {
  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto no-scrollbar animate-in slide-in-from-right duration-300">
      {/* Top Navigation */}
      <div className="p-4 flex items-center justify-between border-b border-gray-50">
        <h2 className="text-[16px] font-bold text-gray-800">Chat info</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
          <X size={20} className="text-gray-500" />
        </button>
      </div>

      {/* Hero Profile Section */}
      <div className="flex flex-col items-center py-8 px-6 text-center border-b border-gray-50">
        <div className="w-24 h-24 rounded-full bg-[#5D6DFF] flex items-center justify-center text-white text-[32px] font-bold mb-4 shadow-lg shadow-blue-100">
          IT
        </div>
        <h3 className="text-[18px] font-bold text-gray-800 mb-1">Inspection of Deck</h3>
        <p className="text-[13px] text-gray-400 font-medium">Team - 3 Members</p>
      </div>

      {/* Descriptions Section */}
      <div className="p-6 border-b border-gray-50">
        <h4 className="text-[14px] font-bold text-gray-700 mb-3">Descriptions</h4>
        <div className="relative">
          <textarea 
            placeholder="Add Note"
            className="w-full h-24 p-4 bg-white border border-gray-200 rounded-[20px] text-[13px] text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#708B53] placeholder:text-gray-400 resize-none transition-all"
          />
        </div>
      </div>

      {/* Documents Accordion */}
      <div className="px-6 py-4 border-b border-gray-50">
        <div className="flex justify-between items-center mb-4 cursor-pointer group">
          <h4 className="text-[14px] font-bold text-gray-700">Documents</h4>
          <ChevronDown size={18} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
        <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
          <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
            <div className="w-6 h-7 bg-red-500 rounded-[4px] relative">
              <div className="absolute top-0 right-0 w-2 h-2 bg-white/40 rounded-bl-[4px]" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-bold text-gray-800 truncate">Inspection Check List.PDF</p>
            <p className="text-[11px] text-gray-400">30mb</p>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Media/Photos Accordion */}
      <div className="px-6 py-4 border-b border-gray-50">
        <div className="flex justify-between items-center mb-4 cursor-pointer group">
          <h4 className="text-[14px] font-bold text-gray-700">Media/Photos</h4>
          <ChevronDown size={18} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="relative aspect-square rounded-[20px] overflow-hidden group border border-gray-100">
              <img 
                src={i === 1 ? "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300" : "https://images.unsplash.com/photo-1517303332619-21589201994e?w=300"} 
                alt="Engine Part" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Download size={18} className="text-gray-700" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Members Section */}
      <div className="px-6 py-4 pb-12">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[14px] font-bold text-gray-700">Team Members</h4>
          <span className="text-[12px] font-bold text-gray-400">3 Members</span>
        </div>
        
        <button className="w-full py-2.5 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center gap-2 text-[13px] font-bold text-gray-600 mb-6 hover:bg-gray-100 transition-colors cursor-pointer">
          <UserPlus size={18} />
          Add members
        </button>

        <div className="space-y-6">
          <MemberRow name="John Hanks" role="Captain" label="Group Admin" />
          <MemberRow name="Kelvin Onyeugbo" role="Crew Member" label="Member" />
          <MemberRow name="Kelvin Onyeugbo" role="Crew Member" label="Member" />
        </div>
      </div>
    </div>
  );
};

const MemberRow = ({ name, role, label }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-50">
        <img src={`https://ui-avatars.com/api/?name=${name}&background=random`} alt={name} className="w-full h-full object-cover" />
      </div>
      <div>
        <p className="text-[13px] font-bold text-gray-800 leading-none mb-1">{name}</p>
        <p className="text-[11px] text-gray-400 font-medium">{role}</p>
      </div>
    </div>
    <span className="text-[11px] font-bold text-[#708B53]">
      {label}
    </span>
  </div>
);

export default ChatInfo;