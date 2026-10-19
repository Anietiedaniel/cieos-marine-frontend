import React, { useState } from "react";
import WorkOrderOverview from "./WorkOrderOverview";
import ChatPage from "../../../components/messaging/ChatPage";

export default function WorkOrderManager() {
  // This state controls which page is shown
  const [currentView, setCurrentView] = useState("overview");

  return (
    <>
      {currentView === "overview" ? (
        <WorkOrderOverview 
          onStartChat={() => setCurrentView("chat")} 
          onBack={() => console.log("Back clicked")}
          onSubmit={() => console.log("Submit clicked")}
        />
      ) : (
        <ChatPage onBack={() => setCurrentView("overview")} />
      )}
    </>
  );
}