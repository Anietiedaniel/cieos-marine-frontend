import React from 'react';

// Reusable Top KPI Card Component
const KpiCard = ({ title, value, subtext, isNegative, icon }) => (
  <div className="bg-[#E2ECD5]/40 backdrop-blur-sm border border-[#C5D5B3] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start mb-2">
      <span className="text-gray-700 font-medium text-sm md:text-base">{title}</span>
      <span className="text-gray-500 text-lg">{icon}</span>
    </div>
    <div>
      <div className="text-3xl font-bold text-gray-800 tracking-tight">{value}</div>
      <div className={`text-xs mt-1 font-semibold ${isNegative ? 'text-red-600' : 'text-green-600'}`}>
        {subtext}
      </div>
    </div>
  </div>
);

const CommandCenter = () => {
  return (
    <section className="bg-[#E6F0DA] py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center font-sans">
      
      {/* Header Section */}
      <div className="text-center max-w-3xl mb-12">
        <span className="text-[#5B7043] tracking-widest text-xs font-bold uppercase block mb-3">
          Command Center
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Every Operational Signal, In One View
        </h2>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          Purpose-built dashboards consolidate vessel telemetry, maintenance, defects, and KPIs into a single, decision-ready interface.
        </p>
      </div>

      {/* Main Dashboard Container */}
      <div className="w-full max-w-6xl bg-[#EEF5E6] border-2 border-[#D3E2C4] rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl">
        
        {/* Top Grid: KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard title="Active Work Orders" value="80" subtext="↑ +12% vs Last Week" icon="🔧" />
          <KpiCard title="Overdue Tasks" value="24" subtext="↓ -8% vs Last Week" isNegative icon="⚠️" />
          <KpiCard title="Corrective Orders" value="24" subtext="↑ +12% Up Front Last Week" icon="🛠️" />
          <KpiCard title="Spare parts Stockouts" value="1,024" subtext="⚠ +3 Low stock items in stock" isNegative icon="📦" />
        </div>

        {/* Middle Grid: Certifications, Assignments, and Timers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Column 1: Equipment Certifications */}
          <div className="bg-[#E2ECD5]/40 border border-[#C5D5B3] rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">Equipment Certifications</h3>
              <button className="bg-white border border-gray-300 rounded-md px-2.5 py-1 text-xs font-medium text-gray-600 flex items-center gap-1 hover:bg-gray-50">
                <span>⚡</span> Filter
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                  <span>Up-to-date</span><span>80%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div className="bg-[#7AA05B] h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                  <span>Near Expiry</span><span>15%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div className="bg-orange-400 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                  <span>Expired</span><span>5%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Work Order Assignment & Open Issues */}
          <div className="flex flex-col gap-4">
            {/* Box 1: Work Order Assignment */}
            <div className="bg-[#E2ECD5]/40 border border-[#C5D5B3] rounded-2xl p-4 flex-1">
              <h3 className="font-semibold text-gray-800 text-sm mb-3">Work order Assignment</h3>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-white/50 rounded-xl p-2">
                  <div className="bg-[#7AA05B] text-white text-sm font-bold w-7 h-7 flex items-center justify-center rounded-md mx-auto mb-1">24</div>
                  <span className="text-xs text-gray-600 font-medium">Assigned</span>
                </div>
                <div className="bg-white/50 rounded-xl p-2">
                  <div className="bg-red-100 text-red-600 text-sm font-bold w-7 h-7 flex items-center justify-center rounded-md mx-auto mb-1">24</div>
                  <span className="text-xs text-red-600 font-bold">Unassigned</span>
                </div>
              </div>
            </div>
            
            {/* Box 2: Open Issues */}
            <div className="bg-[#E2ECD5]/40 border border-[#C5D5B3] rounded-2xl p-4 flex-1">
              <h3 className="font-semibold text-gray-800 text-sm mb-3">Open Issues</h3>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-white/50 rounded-xl p-2">
                  <div className="bg-[#7AA05B] text-white text-sm font-bold w-7 h-7 flex items-center justify-center rounded-md mx-auto mb-1">24</div>
                  <span className="text-xs text-gray-600 font-medium">Open</span>
                </div>
                <div className="bg-white/50 rounded-xl p-2">
                  <div className="bg-red-100 text-red-600 text-sm font-bold w-7 h-7 flex items-center justify-center rounded-md mx-auto mb-1">24</div>
                  <span className="text-xs text-red-600 font-bold">overdue</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Maintenance Timers */}
          <div className="space-y-3 flex flex-col justify-between">
            {/* Timer 1 */}
            <div className="bg-[#E2ECD5]/40 border border-[#C5D5B3] rounded-2xl p-3 flex items-center justify-between shadow-sm">
              <div>
                <h4 className="text-xs font-bold text-gray-800">Weekly: Cabin-Maintenance</h4>
                <div className="flex gap-1.5 mt-1.5">
                  <div className="bg-white text-gray-700 text-xs px-1.5 py-0.5 rounded border border-gray-200">07 <span className="text-[10px] text-gray-400">Days</span></div>
                  <div className="bg-white text-gray-700 text-xs px-1.5 py-0.5 rounded border border-gray-200">07 <span className="text-[10px] text-gray-400">Hrs</span></div>
                  <div className="bg-white text-gray-700 text-xs px-1.5 py-0.5 rounded border border-gray-200">00 <span className="text-[10px] text-gray-400">Mins</span></div>
                </div>
              </div>
              <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Overdue</span>
            </div>

            {/* Timer 2 */}
            <div className="bg-[#E2ECD5]/40 border border-[#C5D5B3] rounded-2xl p-3 flex items-center justify-between shadow-sm">
              <div>
                <h4 className="text-xs font-bold text-gray-800">Monthly: HVAC-inspection</h4>
                <div className="flex gap-1.5 mt-1.5">
                  <div className="bg-white text-gray-700 text-xs px-1.5 py-0.5 rounded border border-gray-200">07 <span className="text-[10px] text-gray-400">Days</span></div>
                  <div className="bg-white text-gray-700 text-xs px-1.5 py-0.5 rounded border border-gray-200">07 <span className="text-[10px] text-gray-400">Hrs</span></div>
                  <div className="bg-white text-gray-700 text-xs px-1.5 py-0.5 rounded border border-gray-200">00 <span className="text-[10px] text-gray-400">Mins</span></div>
                </div>
              </div>
              <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Due Soon</span>
            </div>

            {/* Timer 3 */}
            <div className="bg-[#E2ECD5]/40 border border-[#C5D5B3] rounded-2xl p-3 flex items-center justify-between shadow-sm">
              <div>
                <h4 className="text-xs font-bold text-gray-800">Repair: fuel pump-Issue</h4>
                <div className="flex gap-1.5 mt-1.5">
                  <div className="bg-white text-gray-700 text-xs px-1.5 py-0.5 rounded border border-gray-200">07 <span className="text-[10px] text-gray-400">Days</span></div>
                  <div className="bg-white text-gray-700 text-xs px-1.5 py-0.5 rounded border border-gray-200">07 <span className="text-[10px] text-gray-400">Hrs</span></div>
                  <div className="bg-white text-gray-700 text-xs px-1.5 py-0.5 rounded border border-gray-200">00 <span className="text-[10px] text-gray-400">Mins</span></div>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Upcoming</span>
            </div>
          </div>

        </div>

        {/* Bottom Grid: Asset Performance & Project Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Asset Performance Overview */}
          <div className="bg-[#E2ECD5]/40 border border-[#C5D5B3] rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-800 text-sm md:text-base">Asset Performance Overview</h3>
                <p className="text-gray-500 text-xs">Critical assets status and performance metrics</p>
              </div>
              <a href="#more" className="text-xs text-[#5B7043] font-semibold underline hover:text-gray-800">See more</a>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-700">Generator B-311 <span className="text-gray-400 font-normal ml-2">80% efficiency</span></span>
                  <span className="bg-[#5B7043] text-white text-[9px] px-2 py-0.5 rounded">Maintenance</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div className="bg-[#7AA05B] h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-700">Fuel Pump A-101 <span className="text-gray-400 font-normal ml-2">50% efficiency</span></span>
                  <span className="bg-orange-400 text-white text-[9px] px-2 py-0.5 rounded">Warning</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div className="bg-orange-400 h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-700">Belt C-101 <span className="text-gray-400 font-normal ml-2">30% efficiency</span></span>
                  <span className="bg-red-500 text-white text-[9px] px-2 py-0.5 rounded">Alert</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Status Chart / Inspection Breakdown */}
          <div className="bg-[#E2ECD5]/40 border border-[#C5D5B3] rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-800 text-sm md:text-base">Project Status</h3>
                <p className="text-gray-500 text-xs">Active Work Orders</p>
              </div>
              <select className="bg-white border border-gray-300 rounded-md text-xs font-medium text-gray-600 py-1 px-2 outline-none">
                <option>Last 30 Days</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              {/* Donut Chart representation using CSS gradients */}
              <div className="flex flex-col items-center justify-center relative">
                <div className="w-28 h-28 rounded-full flex items-center justify-center" 
                     style={{ background: 'conic-gradient(#7AA05B 0% 50%, #FF9F1C 50% 75%, #C2D5A7 75% 100%)' }}>
                  <div className="w-20 h-20 bg-[#EEF2E6] rounded-full flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-bold text-gray-800">80</span>
                    <span className="text-[10px] text-gray-500 uppercase font-semibold">Total</span>
                  </div>
                </div>
                {/* Micro-legends directly beneath chart */}
                <div className="text-[10px] text-gray-600 mt-3 space-y-0.5 font-medium">
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-[#7AA05B] rounded-sm inline-block"></span> 40 Corrective Maintenance</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-[#FF9F1C] rounded-sm inline-block"></span> 20 Preventive Maintenance</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-[#C2D5A7] rounded-sm inline-block"></span> 20 Predictive Maintenance</div>
                </div>
              </div>

              {/* Status Breakdown Bar Metrics */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-700 font-semibold border-b border-gray-300/50 pb-1 mb-2">
                  <div className="text-center">In progress <span className="block text-sm font-extrabold">15</span></div>
                  <div className="text-center">Completed <span className="block text-sm font-extrabold">20</span></div>
                  <div className="text-center">Overdue <span className="block text-sm font-extrabold text-red-600">5</span></div>
                </div>
                
                <div className="space-y-1.5 text-[11px]">
                  <div>
                    <div className="flex justify-between text-gray-600 mb-0.5"><span>Safety Inspection</span><span className="font-bold">10</span></div>
                    <div className="w-full bg-white h-1.5 rounded-full"><div className="bg-[#7AA05B] h-1.5 rounded-full" style={{ width: '50%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-gray-600 mb-0.5"><span>Quality Inspection</span><span className="font-bold">5</span></div>
                    <div className="w-full bg-white h-1.5 rounded-full"><div className="bg-[#7AA05B] h-1.5 rounded-full" style={{ width: '25%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-gray-600 mb-0.5"><span>Health Inspection</span><span className="font-bold">20</span></div>
                    <div className="w-full bg-white h-1.5 rounded-full"><div className="bg-[#7AA05B] h-1.5 rounded-full" style={{ width: '100%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-gray-600 mb-0.5"><span>Environment Inspection</span><span className="font-bold">5</span></div>
                    <div className="w-full bg-white h-1.5 rounded-full"><div className="bg-[#7AA05B] h-1.5 rounded-full" style={{ width: '25%' }}></div></div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CommandCenter;