import React, { useState } from "react";
import { ChevronLeft, Menu, Info, Users, Pin, Search, Trash2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatHeader = ({ onOpenSidebar, onOpenModal, onOpenInfo }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 flex justify-between items-center h-[72px] px-6 shrink-0 relative z-50">
      <div className="flex items-center gap-4">
        {/* Back Button */}
        <button 
          onClick={() => navigate("/work-orders")} 
          className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 cursor-pointer transition-colors"
        >
          <ChevronLeft size={20}/>
        </button>

        {/* Hamburger (Mobile Only) */}
        <button 
          className="lg:hidden p-2 text-gray-400 cursor-pointer hover:bg-gray-50 rounded-xl" 
          onClick={onOpenSidebar}
        >
          <Menu size={20}/>
        </button>

        {/* Profile Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#708B53] flex items-center justify-center text-white text-[13px] font-bold shadow-sm border-2 border-white overflow-hidden">
            A
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-[15px] leading-none mb-1">
              Inspection of Deck
            </h3>
            <p className="text-[12px] text-[#708B53] font-medium leading-none">Online</p>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Menu Button */}
        <button 
          onClick={() => setShowMenu(!showMenu)} 
          className={`p-2 rounded-xl cursor-pointer transition-all ${
            showMenu ? 'bg-gray-100 text-[#708B53]' : 'text-gray-400 hover:bg-gray-50'
          }`}
        >
          <Menu size={22} />
        </button>

        {/* DROPDOWN MENU */}
        {showMenu && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowMenu(false)} 
            />
            
            <div className="absolute right-0 mt-3 w-60 bg-white rounded-[22px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 z-20 py-3 overflow-hidden animate-in fade-in zoom-in duration-200">
              <MenuOption 
                icon={<Info size={18}/>} 
                label="Chat info" 
                onClick={() => { onOpenInfo(); setShowMenu(false); }}
              />
              <MenuOption 
                icon={<Users size={18}/>} 
                label="View Members" 
                onClick={() => { onOpenModal('view'); setShowMenu(false); }} 
              />
              <MenuOption 
                icon={<Pin size={18}/>} 
                label="Pin Chat" 
                onClick={() => setShowMenu(false)}
              />
              <MenuOption 
                icon={<Search size={18}/>} 
                label="Search" 
                onClick={() => setShowMenu(false)}
              />
              
              <div className="h-[1px] bg-gray-50 my-2 mx-4" />
              
              <MenuOption 
                icon={<Trash2 size={18} />} 
                label="Clear Chat" 
                onClick={() => { onOpenModal('clear'); setShowMenu(false); }}
              />
              <MenuOption 
                icon={<Trash2 size={18}/>} 
                label="Delete Chat" 
                onClick={() => { onOpenModal('delete'); setShowMenu(false); }}
              />
              <MenuOption 
                icon={<LogOut size={18}/>} 
                label="Exit Chat" 
                isDanger 
                onClick={() => { onOpenModal('exit'); setShowMenu(false); }}
              />
            </div>
          </>
        )}
      </div>
    </header>
  );
};

const MenuOption = ({ icon, label, onClick, isDanger = false }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-5 py-3 transition-colors text-sm font-semibold cursor-pointer
      ${isDanger ? 'text-red-500 hover:bg-red-50' : 'text-gray-600 hover:bg-gray-50'}`}
  >
    <span className={`${isDanger ? 'text-red-500' : 'text-gray-400'}`}>{icon}</span>
    {label}
  </button>
);

export default ChatHeader;