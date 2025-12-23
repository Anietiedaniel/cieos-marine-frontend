import React, { useState } from "react";
import Header from "./dashboards/managerdashboard/Header";
import Sidebar from "./dashboards/managerdashboard/Sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      
      <Header
        sidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </main>
      </div>
    </div>
  );
}

export default App;
