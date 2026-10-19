import React from "react";
import { Info, Users, Pin, Search, MinusCircle, Trash2, LogOut } from "lucide-react";

const ChatMenu = ({ onOpenModal, onClose }) => {
  const menuItems = [
    { icon: <Info size={18} />, label: "Chat info" },
    { icon: <Users size={18} />, label: "View Members", onClick: () => onOpenModal('view') },
    { icon: <Pin size={18} />, label: "Pin Chat" },
    { icon: <Search size={18} />, label: "Search" },
    { divider: true },
    { icon: <MinusCircle size={18} />, label: "Clear Chat" },
    { icon: <Trash2 size={18} />, label: "Delete Chat" },
    { icon: <LogOut size={18} />, label: "Exit Chat", danger: true },
  ];

  return (
    <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-50 z-[100] py-2 animate-in fade-in zoom-in duration-150">
      {menuItems.map((item, idx) => (
        item.divider ? (
          <div key={idx} className="h-[1px] bg-gray-100 my-1 mx-3" />
        ) : (
          <button
            key={idx}
            onClick={() => { item.onClick?.(); onClose(); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer
              ${item.danger ? 'text-red-500 hover:bg-red-50' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <span className={item.danger ? 'text-red-500' : 'text-gray-400'}>{item.icon}</span>
            {item.label}
          </button>
        )
      ))}
    </div>
  );
};

export default ChatMenu;