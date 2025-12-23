import SummaryCards from "./components/workorderComponents/SummaryCards";
import CapacityBar from "./components/workorderComponents/CapacityBar";
import WorkloadTable from "./components/workorderComponents/WorkloadTable";
import UnscheduledPanel from "./components/workorderComponents/UnscheduledPanel";

export default function Workload() {
  return (
    <div className="p-6 bg-[#f7f8f4] min-h-screen">
      
      <SummaryCards />
      <CapacityBar />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        {/* TABLE */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm">
          <WorkloadTable />
        </div>

        {/* SIDE PANEL */}
        <div className="bg-white rounded-xl shadow-sm">
          <UnscheduledPanel />
        </div>
      </div>

    </div>
  );
}
