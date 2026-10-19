import React, { useState } from "react";
import ChatSidebar from "../ChatSidebar";
import ChatHeader from "../ChatHeader";
import MessageList from "../MessageList";
import ChatInput from "../ChatInput";
import ChatInfo from "../ChatInfo";
import ConfirmationModal from "../ConfirmationModal"; // Create this component based on the previous step

export default function ChatPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showChatInfo, setShowChatInfo] = useState(false);
  
  // States for confirmation modals
  const [activeModal, setActiveModal] = useState(null); // 'clear', 'delete', or 'exit'

  const handleConfirmAction = (actionType) => {
    console.log(`Executing ${activeModal} with sub-action: ${actionType}`);
    // Add your backend logic here (e.g., delete API call)
    setActiveModal(null);
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-white relative">
      
      {/* COLUMN 2: Team Hub List Sidebar */}
      <ChatSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* COLUMN 3: Main Chat Conversation */}
      <main className="flex-grow flex flex-col min-w-0 border-l border-gray-100 relative overflow-hidden">
        <ChatHeader 
          onOpenSidebar={() => setSidebarOpen(true)} 
          onOpenInfo={() => setShowChatInfo(true)}
          onOpenModal={(type) => setActiveModal(type)}
        />
        
        <div className="flex-grow overflow-hidden flex flex-col">
           <MessageList />
        </div>
        
        <ChatInput />

        {/* --- CHAT INFO SLIDE-IN PANEL --- */}
        <div 
          className={`
            absolute top-0 right-0 h-full bg-white z-[60]
            transition-transform duration-300 ease-in-out shadow-2xl
            w-full sm:w-[380px] border-l border-gray-100
            ${showChatInfo ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <ChatInfo onClose={() => setShowChatInfo(false)} />
        </div>

        {/* Mobile Backdrop for Chat Info */}
        {showChatInfo && (
          <div 
            className="fixed inset-0 bg-black/20 z-[55] sm:hidden transition-opacity duration-300"
            onClick={() => setShowChatInfo(false)}
          />
        )}

        {/* --- CONFIRMATION MODALS --- */}
        {activeModal && (
          <ConfirmationModal 
            type={activeModal} 
            onClose={() => setActiveModal(null)} 
            onConfirm={handleConfirmAction}
          />
        )}
      </main>
    </div>
  );
}