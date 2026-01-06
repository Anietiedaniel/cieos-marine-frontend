import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Overview", icon: "fa-table-cells-large", path: "overview" },
  { label: "Work Orders", icon: "fa-file", path: "work-orders" }, 
  { label: "Assets", icon: "fa-cube", path: "assets" },
  { label: "Preventive Maintenance", icon: "fa-calendar", path: "maintenance" },
  { label: "Issues", icon: "fa-triangle-exclamation", path: "issues" },
  { label: "Reminders", icon: "fa-clock", path: "reminders" },
  { label: "Inspections", icon: "fa-clipboard-check", path: "inspections" },
  { label: "Inventory", icon: "fa-boxes-stacked", path: "inventory" },
  { label: "Documents", icon: "fa-file-lines", path: "documents" },
  { label: "Operations", icon: "fa-wrench", path: "operations" },
  { label: "Teams", icon: "fa-users", path: "teams" },
  { label: "Reports", icon: "fa-chart-column", path: "reports" },
  { label: "Settings", icon: "fa-gear", path: "settings" },
];

export default function Sidebar({ isOpen = false, onClose }) {
  return (
    <>
      {/* MOBILE BACKDROP */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-30
          w-72 bg-white border-r
          h-[calc(100vh-64px)]
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map(({ label, icon, path }) => (
              <NavLink
                key={label}
                to={path}
                end
                onClick={() => {
                  if (window.innerWidth < 768) onClose();
                }}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg
                  text-sm font-medium whitespace-nowrap
                  ${
                    isActive
                      ? "bg-green-50 text-green-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `
                }
              >
                <i className={`fa-solid ${icon}`}></i>
                <span>{label}</span>
              </NavLink>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
