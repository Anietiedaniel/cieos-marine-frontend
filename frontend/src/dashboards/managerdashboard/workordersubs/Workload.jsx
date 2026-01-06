import { ArrowLeft } from "lucide-react";

import SummaryCards from "../../../components/WorkorderComponents/cards/SummaryCard";
import CapacityBar from "../../../components/WorkorderComponents/cards/CapacityBar";
import WorkloadTable from "../../../components/workorderComponents/charts/WorkloadTable";
import UnscheduledPanel from "../../../components/workorderComponents/cards/UnschedulePanel";

export default function Workload({ onBack }) {
  return (
    <div className="p-6 bg-[#f7f8f4] min-h-screen">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-200 rounded-full transition"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Workload</h1>
      </div>

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
