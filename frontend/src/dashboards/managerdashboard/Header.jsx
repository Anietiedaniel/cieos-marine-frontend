import React from "react";
import logo from "../../assets/images/logo.png";

export default function Header({ sidebarOpen, onMenuClick }) {
  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      
      {/* LEFT: Menu + Logo + App Name */}
      <div className="flex items-center gap-3">
        
        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-700"
        >
          {sidebarOpen ? (
            <i className="fa-solid fa-xmark text-xl"></i>
          ) : (
            <i className="fa-solid fa-bars text-xl"></i>
          )}
        </button>

        {/* LOGO */}
        <img
          src={logo}
          alt="CIEOS Logo"
          className="w-9 h-9 object-contain"
        />

        <div className="leading-tight">
          <h1 className="font-semibold text-gray-900">
            CIEOS Global
          </h1>
          <p className="text-xs text-gray-500">
            CMMS
          </p>
        </div>
      </div>

      {/* CENTER: SEARCH (UNCHANGED) */}
      <div className="flex-1 max-w-xl mx-6 hidden md:block">
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="Search Assets, Work orders, Parts"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* RIGHT: ACTIONS + USER (UNCHANGED) */}
      <div className="flex items-center gap-5">
        
        {/* Quick Actions */}
        <button
          className="hidden md:block bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition"
        >
          Quick Actions
        </button>

        {/* Notification */}
        <div className="relative cursor-pointer">
          <i className="fa-regular fa-bell text-xl text-gray-700"></i>
          <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        {/* User (Font Awesome Icon version as you requested) */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <i className="fa-solid fa-user text-gray-600 text-sm"></i>
          </div>
          <div className="leading-tight text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">
              John Doe Abel
            </p>
            <p className="text-xs text-gray-500">
              Manager
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}
