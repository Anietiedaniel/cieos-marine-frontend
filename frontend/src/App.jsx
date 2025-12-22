import React, { useState } from "react";
import Sidebar from "./dashboards/managerdashboard/Sidebar";
import Header from "./dashboards/managerdashboard/Header";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />

        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </main>
      </div>
    </div>
  );
}

export default App;
