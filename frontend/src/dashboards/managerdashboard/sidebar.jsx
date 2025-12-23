import React from "react";

export default function Sidebar({ isOpen }) {
  return (
    <div className="flex">
      {/* STATIC SIDEBAR */}
      <div className="w-64 min-h-screen bg-white text-black border-r px-4 py-6">
        <ul className="space-y-2">
          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300"><i className="fa-solid fa-table-cells-large text-lg"></i><span>Dashboard</span></li>
          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300"><i className="fa-regular fa-file text-lg"></i><span>Work Order</span></li>
          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300"><i className="fa-solid fa-cube text-lg"></i><span>Assets</span></li>
          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300"><i className="fa-regular fa-calendar text-lg"></i><span>Preventive Maintenance</span></li>
          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300"><i className="fa-solid fa-triangle-exclamation text-lg"></i><span>Issues</span></li>
          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300"><i className="fa-regular fa-clock text-lg"></i><span>Reminders</span></li>
          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300"><i className="fa-regular fa-clock text-lg"></i><span>Inspections</span></li>
          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300"><i className="fa-solid fa-cubes text-lg"></i><span>Inventory</span></li>
          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300"><i className="fa-regular fa-file-lines text-lg"></i><span>Documents</span></li>
          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300"><i className="fa-solid fa-wrench text-lg"></i><span>Operations</span></li>
          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300"><i className="fa-solid fa-users text-lg"></i><span>Teams</span></li>
          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300"><i className="fa-solid fa-chart-column text-lg"></i><span>Reports</span></li>
          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300"><i className="fa-solid fa-gear text-lg"></i><span>Settings</span></li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10">
        <h1 className="text-2xl font-bold">Main Content Area</h1>
      </div>
    </div>
  );
}
