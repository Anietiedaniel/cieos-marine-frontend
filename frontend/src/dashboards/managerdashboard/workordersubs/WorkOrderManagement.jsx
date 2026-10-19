import React, { useState } from "react";
import WorkOrderHeader from "./WorkOrderHeader";
import WorkOrderTable from "./WorkOrderTable";
import FilterSidebar from "./FilterSidebar";

export default function WorkOrderManagement() {
  const [currentView, setCurrentView] = useState("Table view");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#F9FBFA] relative overflow-hidden">
      {/* 1. Header with props */}
      <WorkOrderHeader 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        onOpenFilter={() => setIsFilterOpen(true)} 
      />

      {/* 2. Content Area */}
      <main className="flex-grow p-6 overflow-y-auto">
        {currentView === "Table view" ? (
          <WorkOrderTable />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 font-medium border-2 border-dashed border-gray-200 rounded-[24px]">
            {currentView} Content coming soon...
          </div>
        )}
      </main>

      {/* 3. Filter Sidebar Overlay */}
      <FilterSidebar 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
      />
    </div>
  );
}