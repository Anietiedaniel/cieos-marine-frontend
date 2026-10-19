import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/images/logo (2).png";
import { useNavigate } from "react-router-dom";

export default function Header({ sidebarOpen, onMenuClick }) {
  const navigate = useNavigate();


  const [openMenu, setOpenMenu] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

const actions = [
    { label: "Create Work order", icon: "fa-pen-to-square", path: "work-orders/new" },
    { label: "Assign Work order", icon: "fa-clipboard-check", path: "/work-orders/assign" },
    { label: "Add Asset", icon: "fa-box", path: "/dashboard/assets/create" },
    { label: "Invite member", icon: "fa-user-plus", path: "/team/invite" },
    { label: "Add Team", icon: "fa-users", path: "/team/add" },
    { label: "Add Vendor", icon: "fa-store", path: "/vendors/add" },
    { label: "Add Location", icon: "fa-location-dot", path: "/locations/add" },
    { label: "Add Part", icon: "fa-gears", path: "/inventory/add" },
    { label: "Request Part", icon: "fa-hand", path: "/inventory/request" },
    { label: "Add Preventive Maintenance Plan", icon: "fa-screwdriver-wrench", path: "maintenance/create" },
  ];

  return (
    <header className="w-full h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600"
        >
          <i className={`fa-solid ${sidebarOpen ? "fa-xmark" : "fa-bars"} text-xl`} />
        </button>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#769c59] to-emerald-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img src={logo} alt="CIEOS Logo" className="relative w-9 h-9 object-contain" />
          </div>
          <div className="leading-tight hidden sm:block">
            <h1 className="font-bold text-slate-900 tracking-tight text-base">CIEOS Global</h1>
            <p className="text-[10px] font-bold text-[#769c59] uppercase tracking-wider">CMMS Portal</p>
          </div>
        </div>
      </div>

      {/* CENTER SEARCH */}
      <div className="hidden lg:block flex-1 max-w-2xl mx-12">
        <div className="relative group">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search assets, work orders, or parts... (Ctrl + K)"
            className="w-full bg-slate-50 pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm
            focus:outline-none focus:ring-4 focus:ring-[#769c59]/10 focus:bg-white focus:border-[#769c59]"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 md:gap-6">

        {/* ✅ QUICK ACTION */}
<div className="relative hidden md:block" ref={dropdownRef}>
  <button
    onClick={() => setOpenMenu(!openMenu)}
    className="flex items-center gap-2 bg-[#769c59] hover:bg-[#65854c] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-green-100 transition active:scale-95"
  >
    <i className="fa-solid fa-circle-plus text-xs" />
    <span>Quick Actions</span>
  </button>

  {/* Dropdown */}
 {/* Dropdown */}
{openMenu && (
  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
    <div className="py-2 max-h-[420px] overflow-y-auto">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => {
            navigate(action.path); // 👈 Directs to the page
            setOpenMenu(false);    // 👈 Closes the dropdown
          }}
          className="w-full text-left px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition"
        >
          {/* dynamic icon */}
          <div className="w-8 flex justify-center">
             <i className={`fa-solid ${action.icon} text-[#769c59]`} />
          </div>

          {/* label */}
          {action.label}
        </button>
      ))}
    </div>
  </div>
)}
</div>

        {/* Notifications */}
        <div
          onClick={() => navigate("/dashboard/notifications")}
          className="relative p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer transition active:scale-95 group"
        >
          <i className="fa-regular fa-bell text-xl text-slate-600 group-hover:text-[#769c59]"></i>
          <span className="absolute top-2 right-2 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
            3
          </span>
        </div>

        <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-2 py-1 pr-1 hover:bg-slate-50 rounded-2xl cursor-pointer transition group">
          <div className="leading-tight text-right hidden md:block">
            <p className="text-sm font-bold text-slate-800 group-hover:text-[#769c59]">
              John Doe Abel
            </p>
            <p className="text-[11px] font-medium text-slate-400">System Manager</p>
          </div>

          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-[#769c59] flex items-center justify-center text-white font-bold">
              JA
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
        </div>

      </div>
    </header>
  );
}