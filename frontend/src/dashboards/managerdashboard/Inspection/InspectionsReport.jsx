import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Filter, ChevronLeft, ChevronRight, Download } from "lucide-react";

const mockReports = [
  {
    id: "IN-001",
    form: "Hull Integrity Inspection",
    location: "Ship Hull",
    performedBy: "John Hanks",
    approvedBy: "Fleet Manager J. Morrison",
    date: "5th March, 2026",
    result: "Passed",
    compliance: "Compliant",
  },
  {
    id: "IN-002",
    form: "Engine Room Safety Check",
    location: "Engine Room",
    performedBy: "John Hanks",
    approvedBy: "Fleet Manager J. Morrison",
    date: "5th March, 2026",
    result: "Passed",
    compliance: "Compliant",
  },
  {
    id: "IN-003",
    form: "Fire Safety Systems",
    location: "Cargo Hold",
    performedBy: "John Hanks",
    approvedBy: "Fleet Manager J. Morrison",
    date: "5th March, 2026",
    result: "Failed",
    compliance: "Failed",
  },
  {
    id: "IN-007",
    form: "Fire Safety Systems",
    location: "Navigation Bridge",
    performedBy: "John Hanks",
    approvedBy: "Fleet Manager J. Morrison",
    date: "5th March, 2026",
    result: "Warning",
    compliance: "Flagged",
  },
];

const badgeColor = {
  Passed: "bg-green-100 text-green-600",
  Failed: "bg-red-100 text-red-600",
  Warning: "bg-orange-100 text-orange-600",
  Compliant: "bg-green-100 text-green-600",
  Flagged: "bg-orange-100 text-orange-600",
};

const Reports = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Sync active tab with URL path
  const activeTab = location.pathname.split('/').pop() || 'reports';

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  // 🔍 FILTER + SEARCH LOGIC
  const filteredData = useMemo(() => {
    return mockReports.filter((item) => {
      const matchSearch =
        item.form.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        filter === "All" ||
        item.result === filter ||
        item.compliance === filter;

      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  // 🔃 SORT LOGIC
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) =>
      a[sortKey].toString().localeCompare(b[sortKey].toString())
    );
  }, [filteredData, sortKey]);

  // 📄 PAGINATION LOGIC
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE) || 1;
  const paginatedData = sortedData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6 bg-[#E5E7EB] min-h-screen font-sans text-slate-700">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Inspections</h1>
          <button className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-xl border border-slate-300 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
            <Filter size={16} /> Filter
          </button>
        </div>

        {/* TOP BAR / SEARCH */}
        <div className="flex justify-between items-center mb-6 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by ID, Form or Location..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-[#84A962] outline-none shadow-sm"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={filter}
              onChange={(e) => { setFilter(e.target.value); setPage(1); }}
              className="border border-slate-200 px-4 py-2 rounded-xl text-sm bg-white font-medium outline-none shadow-sm cursor-pointer"
            >
              <option value="All">All Results</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
              <option value="Warning">Warning</option>
            </select>

            <button className="bg-[#84A962] text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-green-900/10 flex items-center gap-2 hover:bg-[#749654] transition-all">
              <Download size={16} /> Import New Checklist
            </button>
          </div>
        </div>

        {/* PILLS TAB SWITCHER */}
        <div className="flex items-center gap-3 mb-8">
          <TabButton 
            label="Submissions" 
            isActive={activeTab === 'submissions'} 
            onClick={() => navigate("/dashboard/inspections/submissions")}
          />
          <TabButton 
            label="Reports" 
            isActive={activeTab === 'reports'} 
            onClick={() => navigate("/dashboard/inspections/reports")} 
          />
          <TabButton 
            label="Checklist" 
            isActive={activeTab === 'checklist'} 
            onClick={() => navigate("/dashboard/inspections/checklist")} 
          />
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Report" value="20" />
          <StatCard title="Compliant" value="18" />
          <StatCard title="Flagged" value="1" color="text-orange-500" />
          <StatCard title="Failed" value="1" color="text-red-500" />
        </div>

        {/* TABLE CONTAINER */}
        <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-md border border-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100">
                  <th className="px-6 py-4 cursor-pointer hover:text-slate-600" onClick={() => setSortKey("id")}>ID</th>
                  <th className="px-6 py-4 cursor-pointer hover:text-slate-600" onClick={() => setSortKey("form")}>Inspection Form</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Performed by</th>
                  <th className="px-6 py-4">Approved by</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Result</th>
                  <th className="px-6 py-4">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <tr 
                      key={item.id}
                      onClick={() => navigate(`/dashboard/inspections/reports/${item.id}`)}
                      className="hover:bg-slate-50 cursor-pointer transition-colors group"
                    >
                      <td className="px-6 py-4 text-sm font-bold text-slate-800">{item.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600 group-hover:text-[#84A962]">{item.form}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{item.location}</td>
                      <td className="px-6 py-4">
                        <UserBadge name={item.performedBy} />
                      </td>
                      <td className="px-6 py-4">
                        <UserBadge name={item.approvedBy} />
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 italic">{item.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${badgeColor[item.result]}`}>
                          {item.result}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${badgeColor[item.compliance]}`}>
                          {item.compliance}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-20 text-center text-slate-400 font-medium">
                      No reports found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION CONTROLS */}
        <div className="flex justify-between items-center mt-8">
          <p className="text-sm text-slate-500 font-medium">
            Showing <span className="text-slate-800">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="text-slate-800">{Math.min(page * ITEMS_PER_PAGE, sortedData.length)}</span> of {sortedData.length} results
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="p-2 border border-slate-200 rounded-xl bg-white disabled:opacity-30 hover:bg-slate-50 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                    page === i + 1 ? 'bg-[#84A962] text-white' : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="p-2 border border-slate-200 rounded-xl bg-white disabled:opacity-30 hover:bg-slate-50 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- SUBCOMPONENTS --- */

const TabButton = ({ label, isActive, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`px-8 py-2.5 text-sm font-bold rounded-xl transition-all shadow-sm relative ${
      isActive ? 'bg-[#84A962] text-white shadow-green-900/10' : 'bg-white text-slate-500 hover:bg-slate-50'
    }`}
  >
    {label}
    {badge && (
      <span className="absolute -top-3 -right-2 bg-white text-[#84A962] text-[10px] font-black px-1.5 py-0.5 rounded border border-slate-100 shadow-sm">
        {badge}
      </span>
    )}
  </button>
);

const StatCard = ({ title, value, color = "text-slate-800" }) => (
  <div className="bg-white p-6 rounded-[1.25rem] shadow-sm border border-white">
    <p className={`text-2xl font-black ${color}`}>{value}</p>
    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{title}</p>
  </div>
);

const UserBadge = ({ name }) => (
  <div className="flex items-center gap-2">
    <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
      <img
        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
        alt="avatar"
        className="w-full h-full object-cover"
      />
    </div>
    <span className="text-sm font-medium text-slate-700 truncate max-w-[120px]">{name}</span>
  </div>
);

export default Reports;