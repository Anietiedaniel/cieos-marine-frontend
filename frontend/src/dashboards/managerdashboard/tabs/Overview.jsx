import StatCard from "../../../components/overviewComponents/cards/StatCard";
import CertificationCard from "../../../components/overviewComponents/cards/CertificationCard";
import AssignmentCard from "../../../components/overviewComponents/cards/AssignmentCard";
import CountdownCard from "../../../components/overviewComponents/cards/CountdownCard";
import AssetPerformanceCard from "../../../components/overviewComponents/cards/AssetPerformanceCard";
import ProjectStatusCard from "../../../components/overviewComponents/cards/ProjectStatusCard";
import RecentCommentsCard from "../../../components/overviewComponents/cards/RecentCommentsCard";
import UpcomingSchedulesCard from "../../../components/overviewComponents/cards/UpcomingSchedulesCard";

export default function Overview() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">
            Hello there! Here’s an overview of your operations
          </p>
        </div>

        <div className="flex gap-3">
          <button className="border px-4 py-2 rounded-md text-sm bg-white">
            Customize widget
          </button>
          <button className="border px-4 py-2 rounded-md text-sm bg-white">
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