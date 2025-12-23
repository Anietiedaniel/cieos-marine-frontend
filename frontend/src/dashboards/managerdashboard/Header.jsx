import React from "react";
import logo from "../../assets/images/logo.png";

export default function Header({ sidebarOpen, onMenuClick }) {
  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="md:hidden text-gray-700">
          <i
            className={`fa-solid ${
              sidebarOpen ? "fa-xmark" : "fa-bars"
            } text-xl`}
          />
        </button>

        <img src={logo} alt="CIEOS Logo" className="w-9 h-9 object-contain" />

        <div className="leading-tight">
          <h1 className="font-semibold text-gray-900">CIEOS Global</h1>
          <p className="text-xs text-gray-500">CMMS</p>
        </div>
      </div>

      {/* CENTER SEARCH (DESKTOP ONLY) */}
      <div className="hidden md:block flex-1 max-w-xl mx-6">
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Assets, Work orders, Parts"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        <button className="hidden md:flex bg-[#6C8E3F] text-white px-4 py-2.5 rounded-lg text-sm font-medium">
          Quick Actions
        </button>

        <div className="relative cursor-pointer">
          <i className="fa-regular fa-bell text-xl text-gray-700"></i>
          <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <i className="fa-solid fa-user text-gray-600 text-sm"></i>
          </div>
          <div className="leading-tight text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">
              John Doe Abel
            </p>
            <p className="text-xs text-gray-500">Manager</p>
          </div>
        </div>

      </div>
    </header>
  );
}
