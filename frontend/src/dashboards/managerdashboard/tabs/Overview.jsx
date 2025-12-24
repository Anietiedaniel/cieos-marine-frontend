import StatCard from "../../../components/cards/StatCard";
import CertificationCard from "../../../components/cards/CertificationCard";
import AssignmentCard from "../../../components/cards/AssignmentCard";
import CountdownCard from "../../../components/cards/CountdownCard";
import AssetPerformanceCard from "../../../components/cards/AssetPerformanceCard";
import ProjectStatusCard from "../../../components/cards/ProjectStatusCard";
import RecentCommentsCard from "../../../components/cards/RecentCommentsCard";
import UpcomingSchedulesCard from "../../../components/cards/UpcomingSchedulesCard";

export default function Overview() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">

{/* HEADER */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
  
  {/* Title & Subtitle Group */}
  <div className="flex flex-col min-w-0">
    <div className="flex items-center gap-2">
      {/* Blue Dot Indicator */}
      <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0"></span>

      <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
        Dashboard Overview
      </h1>
    </div>

    <p className="text-sm text-gray-500 mt-1 leading-snug">
      Hello there! Here’s an overview of your operations
    </p>
  </div>

  {/* Actions - Stretches on mobile, compact on desktop */}
  <div className="flex gap-2 w-full sm:w-auto">
    <button className="flex-1 sm:flex-none border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium bg-white hover:bg-gray-50 transition shadow-sm">
      Customize
    </button>

    <button className="flex-1 sm:flex-none bg-[#708B53] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition shadow-sm">
      Export Data
    </button>
  </div>

</div>


      {/* ROW 1 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Active Work Orders" value="80"
          info={{ text: "+12% vs last week", color: "text-green-600" }} />
        <StatCard title="Overdue Tasks" value="24"
          info={{ text: "-8% vs last week", color: "text-red-500" }} />
        <StatCard title="Corrective Orders" value="24"
          info={{ text: "+12% vs last week", color: "text-green-600" }} />
        <StatCard title="Spare parts Stockouts" value="1,024"
          info={{ text: "12 low stock items", color: "text-orange-500" }} />
      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CertificationCard />
        <AssignmentCard />
        <div className="space-y-3">
          <CountdownCard title="Generator oil check"
            status={{ text: "Overdue", bg: "bg-red-100 text-red-600" }} />
          <CountdownCard title="HVAC Filter Replacement"
            status={{ text: "Due Soon", bg: "bg-orange-100 text-orange-600" }} />
          <CountdownCard title="Generator oil check"
            status={{ text: "Upcoming", bg: "bg-green-100 text-green-600" }} />
        </div>
      </div>

      {/* ROW 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AssetPerformanceCard />
        <ProjectStatusCard />
      </div>
      {/* ROW 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RecentCommentsCard />
        <UpcomingSchedulesCard />
      </div>
    </div>
  );
}