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
        <button className="text-xs border px-3 py-1 rounded-md hover:bg-gray-50 transition-colors">
          Last 30 Days
        </button>
      }
    >
      <p className="text-xs text-gray-400 mb-6 text-center md:text-left font-medium">
        Active Work Orders
      </p>

      {/* Grid: 1 column on mobile, 2 columns on medium screens and up */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* LEFT/TOP: DONUT SECTION */}
        <div className="flex flex-col items-center justify-center">
          <DonutChart />

          {/* LEGEND - Now centered on mobile */}
          <div className="mt-6 grid grid-cols-1 gap-3 w-full max-w-[160px]">
            <LegendItem color="#6E8B3D" label="40 Inspection" />
            <LegendItem color="#F97316" label="20 Maintenance" />
            <LegendItem color="#C9D8B6" label="20 Repair" />
          </div>
        </div>

        {/* RIGHT/BOTTOM: MAINTENANCE SUMMARY */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-4 border-b pb-2">
            <p className="text-sm font-bold text-gray-700">Maintenance Summary</p>
            <span className="text-[10px] text-gray-400 cursor-pointer">▼</span>
          </div>

          <div className="space-y-5">
            {summary.map((item, i) => (
              <div key={i} className="group">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-600 font-medium">{item.label}</span>
                  <span className="font-bold text-gray-800">{item.value}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-orange-500 rounded-full transition-all duration-500 ease-out"
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

// Clean helper for Legend items
const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-3">
    <span className="w-3 h-3 shrink-0 rounded-[2px]" style={{ backgroundColor: color }} />
    <span className="text-[11px] font-medium text-gray-600 whitespace-nowrap">{label}</span>
  </div>
);