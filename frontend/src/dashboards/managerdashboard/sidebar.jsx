import React from "react";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* BACKDROP (mobile only) */}
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
          w-64 bg-white border-r px-4 py-6
          h-[calc(100vh-64px)]
          overflow-y-auto
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <ul className="space-y-2">
          {[
            ["Dashboard", "fa-table-cells-large"],
            ["Work Order", "fa-file"],
            ["Assets", "fa-cube"],
            ["Preventive Maintenance", "fa-calendar"],
            ["Issues", "fa-triangle-exclamation"],
            ["Reminders", "fa-clock"],
            ["Inspections", "fa-clock"],
            ["Inventory", "fa-cubes"],
            ["Documents", "fa-file-lines"],
            ["Operations", "fa-wrench"],
            ["Teams", "fa-users"],
            ["Reports", "fa-chart-column"],
            ["Settings", "fa-gear"],
          ].map(([label, icon]) => (
            <li
              key={label}
              className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-200 whitespace-nowrap"
            >
              <i className={`fa-solid ${icon}`}></i>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
