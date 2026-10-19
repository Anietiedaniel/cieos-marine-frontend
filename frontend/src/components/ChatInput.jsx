import React from "react";
import { Mic, Send } from "lucide-react";

const ChatInput = () => {
  return (
    <div className="p-4 lg:p-6 bg-transparent">
      <div className="max-w-6xl mx-auto flex items-center gap-4 bg-white rounded-[18px] px-5 py-2.5 border border-gray-100 shadow-sm focus-within:border-[#708B53]/30 transition-all">
        <input 
          type="text"
          placeholder="Write a message" 
          className="flex-grow bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-300" 
        />
        <button className="text-gray-400 hover:text-[#708B53] transition-colors cursor-pointer">
          <Mic size={20} />
        </button>
        <button className="bg-[#708B53] px-6 py-2 rounded-xl text-white text-sm font-medium hover:bg-[#5f7546] shadow-sm transition-all active:scale-95 cursor-pointer">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;