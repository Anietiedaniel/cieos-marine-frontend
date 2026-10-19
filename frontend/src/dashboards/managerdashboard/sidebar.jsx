import { NavLink, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", icon: "fa-house-chimney-window", path: "overview" },
  { label: "Work Orders", icon: "fa-rectangle-list", path: "work-orders" },
  { label: "Equipment", icon: "fa-ship", path: "assets" },
  { label: "Maintenance plan-PM", icon: "fa-screwdriver-wrench", path: "maintenance" },
  { label: "Inspections", icon: "fa-clipboard-check", path: "inspections" },
  { label: "Defects", icon: "fa-circle-exclamation", path: "issues" },
  { label: "Compliance", icon: "fa-shield-halved", path: "/dashboard/compliance" },
  { type: "divider", label: "Fleet Operations" }, 
  { label: "Part-Inventory", icon: "fa-boxes-stacked", path: "inventory" },
  { label: "User Management", icon: "fa-compass", path: "user-management" },
  { label: "Team Hub", icon: "fa-hubspot", path: "chat" },
  { label: "Teams", icon: "fa-user-group", path: "teams" },
  { label: "Reports", icon: "fa-chart-line", path: "reports" },
  { label: "Settings", icon: "fa-gear", path: "settings" },
];

export default function Header({ isOpen = false, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* MODERN BLUR BACKDROP */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-40 md:hidden transition-all duration-500"
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside
        className={`
          fixed md:static z-50
          w-72 bg-white border-r border-slate-100
          h-screen flex flex-col
          transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* 1. PREMIUM BRANDING SECTION */}
        <div className="relative px-7 py-9 flex items-center gap-3 overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#769c59]/10 blur-3xl rounded-full"></div>
          
          <div className="relative w-10 h-10 bg-gradient-to-br from-[#769c59] to-[#5d7d45] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#769c59]/30 transform hover:rotate-12 transition-transform duration-300">
            <i className="fa-solid fa-anchor text-lg"></i>
          </div>
          
          <div className="relative flex flex-col">
            <span className="text-xl font-black tracking-tight text-slate-800 leading-none">
              CIEOS<span className="text-[#769c59]">.</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[3px] mt-1">
              Marine Systems
            </span>
          </div>
        </div>

        {/* 2. NAVIGATION NAV */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar pt-2">
          {menuItems.map((item, index) => {
            if (item.type === "divider") {
              return (
                <div key={index} className="flex items-center gap-3 px-4 pt-7 pb-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] whitespace-nowrap">
                    {item.label}
                  </span>
                  <div className="h-[1px] w-full bg-slate-100"></div>
                </div>
              );
            }

            const isActive = location.pathname.includes(item.path);

            return (
              <NavLink
                key={item.label}
                to={item.path}
                end
                onClick={() => window.innerWidth < 768 && onClose()}
                className={`
                  relative group flex items-center justify-between px-4 py-3 rounded-xl
                  transition-all duration-300 group
                  ${isActive 
                    ? "bg-[#769c59] text-white shadow-lg shadow-[#769c59]/20" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }
                `}
              >
                <div className="flex items-center gap-3.5 relative z-10">
                  <div className={`
                    w-5 h-5 flex items-center justify-center transition-transform duration-300
                    ${isActive ? "scale-110" : "group-hover:scale-110"}
                  `}>
                    <i className={`fa-solid ${item.icon} text-base`}></i>
                  </div>
                  <span className="text-sm font-bold tracking-tight">{item.label}</span>
                </div>

                {/* Status Indicator for Active Item */}
                {isActive && (
                  <div className="relative z-10 w-1.5 h-1.5 rounded-full bg-white/40 ring-4 ring-white/10" />
                )}
                
                {/* Hover Glow Effect for Inactive Items */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* 3. ENHANCED USER CARD */}
        <div className="p-4 mt-auto">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 relative group overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute right-[-10px] bottom-[-10px] opacity-[0.03] pointer-events-none group-hover:rotate-12 transition-transform duration-700">
               <i className="fa-solid fa-anchor text-6xl"></i>
            </div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <img 
                  src="https://ui-avatars.com/api/?name=Admin+User&background=769c59&color=fff&bold=true" 
                  alt="avatar" 
                  className="w-11 h-11 rounded-xl shadow-md border-2 border-white"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></div>
              </div>
              
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-black text-slate-800 truncate">John Abel</span>
                <span className="text-[11px] font-bold text-slate-400 truncate">Fleet Manager</span>
              </div>

              <button className="ml-auto p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-[#769c59]">
                 <i className="fa-solid fa-right-from-bracket text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* CUSTOM CSS FOR THE BEST SCROLLBAR AND SMOOTH TRANSITIONS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: #e2e8f0;
        }
        
        /* Smooth scale-in animation for nav items */
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        nav > * {
          animation: slideIn 0.4s ease forwards;
        }
      `}} />
    </>
  );
}