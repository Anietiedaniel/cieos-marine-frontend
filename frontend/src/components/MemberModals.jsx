import React from "react";
import { Search, Plus, X } from "lucide-react";

const MemberRow = ({ name, role, tag, isAdmin }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-full bg-gray-100 overflow-hidden border border-gray-50">
        <img src={`https://i.pravatar.cc/100?u=${name}`} alt="avatar" />
      </div>
      <div>
        <p className="text-[14px] font-bold text-gray-800">{name}</p>
        <p className="text-[12px] text-gray-400 font-medium">{role}</p>
      </div>
    </div>
    <span className={`text-[12px] font-bold ${isAdmin ? 'text-[#708B53]' : 'text-gray-300'}`}>
      {tag}
    </span>
  </div>
);

const MemberModals = ({ activeModal, onClose, onSwitch }) => {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-[400px] rounded-[30px] shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in duration-200">
        <header className="p-6 pb-2">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-bold text-gray-800">
              {activeModal === 'view' ? 'Chat member' : 'Add chat member'}
            </h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <X size={20} className="text-gray-400" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-300" size={18} />
            <input 
              placeholder="Search Members" 
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:bg-white focus:ring-1 ring-[#708B53]/20 transition-all" 
            />
          </div>
        </header>

        <div className="flex-grow overflow-y-auto px-6 py-4 space-y-5">
          <MemberRow name="John Hanks" role="Captain" tag="Group Admin" isAdmin />
          {[1, 2, 3, 4, 5].map(i => (
            <MemberRow key={i} name="Kelvin Onyeugbo" role="Crew Member" tag="Member" />
          ))}
        </div>

        {activeModal === 'view' && (
          <div className="p-6">
            <button 
              onClick={() => onSwitch('add')}
              className="w-full bg-[#708B53] text-white font-bold py-4 rounded-[18px] flex items-center justify-center gap-2 hover:bg-[#5f7546] transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              <Plus size={20} strokeWidth={3} /> Add Member
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberModals;