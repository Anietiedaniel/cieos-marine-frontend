import CardWrapper from "./CardWrapper";
import DonutChart from "../charts/DonutChart";

export default function ProjectStatusCard() {
  const summary = [
    { label: "Safety inspection", value: 10 },
    { label: "Quality inspection", value: 5 },
    { label: "Health inspection", value: 20 },
    { label: "Environment inspection", value: 5 },
  ];

  return (
    <CardWrapper
      title="Project Status"
      right={
        <button className="text-xs border px-3 py-1 rounded-md">
          Last 30 Days
        </button>
      }
    >
      <p className="text-xs text-gray-500 mb-4">Active Work Orders</p>

      <div className="grid grid-cols-2 gap-6">
        {/* LEFT: DONUT */}
        <div>
          <DonutChart />

          {/* LEGEND */}
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#6E8B3D] rounded-sm" />
              <span>40 Inspection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#F97316] rounded-sm" />
              <span>20 Maintenance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#C9D8B6] rounded-sm" />
              <span>20 Repair</span>
            </div>
          </div>
        </div>

        {/* RIGHT: MAINTENANCE SUMMARY */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium">Maintenance Summary</p>
            <span className="text-xs text-gray-400">▼</span>
          </div>

          <div className="space-y-4">
            {summary.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-orange-500 rounded-full"
                    style={{ width: `${item.value * 4}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}