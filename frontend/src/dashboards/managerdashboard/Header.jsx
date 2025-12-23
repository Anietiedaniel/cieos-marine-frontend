import React from "react";
import logo from "../../assets/images/logo.png";

export default function Header({ onMenuClick, isSidebarOpen }) {
  return (
    <header className="w-full h-[64px] bg-white border-b flex items-center px-4 md:px-6 sticky top-0 z-30">
      
      {/* LEFT */}
      <div className="flex items-center gap-3 min-w-fit">
        
        {/* MOBILE MENU */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-700 mr-2"
        >
          <i
            className={`fa-solid ${
              isSidebarOpen ? "fa-xmark" : "fa-bars"
            } text-lg`}
          />
        </button>

        <img src={logo} alt="logo" className="w-10 h-10 object-contain" />

        <div className="leading-tight hidden sm:block">
          <p className="text-[15px] font-semibold text-gray-900">
            CIEOS Global
          </p>
          <p className="text-[12px] text-gray-500">
            CMMS
          </p>
        </div>
      </div>

      {/* SEARCH (HIDE ON MOBILE) */}
      <div className="flex-1 justify-center hidden md:flex">
        <div className="relative w-[420px]">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
          <input
            type="text"
            placeholder="Search Assets, Work orders, Parts"
            className="w-full h-[38px] pl-9 pr-4 rounded-lg border border-gray-300 text-sm"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 ml-auto">

        {/* QUICK ACTIONS */}
        <button className="hidden md:flex bg-[#6C8E3F] text-white px-4 py-2.5 rounded-lg text-sm font-medium">
          Quick Actions
        </button>

        {/* NOTIFICATION */}
        <div className="relative cursor-pointer">
          <i className="fa-regular fa-bell text-[18px] text-gray-700"></i>
          <span className="absolute -top-1 -right-1 bg-[#6C8E3F] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        {/* USER */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
            <i className="fa-solid fa-user text-gray-600 text-xs"></i>
          </div>

          <div className="leading-tight text-right hidden sm:block">
            <p className="text-sm font-medium">John Doe Abel</p>
            <p className="text-xs text-gray-500">Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}
