import { useState } from "react";
import CardWrapper from "./CardWrapper";
import DonutChart from "../charts/DonutChart";

export default function ProjectStatusCard() {
  const [activeLegend, setActiveLegend] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedRange, setSelectedRange] = useState("Last 30 Days");

  const ranges = ["Today", "Last 7 Days", "Last 30 Days", "Last 90 Days"];

  const summary = [
    { label: "Safety Inspection", value: 10 },
    { label: "Quality Inspection", value: 5 },
    { label: "Health Inspection", value: 20 },
    { label: "Environment Inspection", value: 5 },
  ];

  const legendItems = [
    { label: "Inspection", color: "#6E8B3D", value: 40 },
    { label: "Maintenance", color: "#F97316", value: 20 },
    { label: "Repair", color: "#C9D8B6", value: 20 },
  ];

  const total = legendItems.reduce((acc, item) => acc + item.value, 0);

  const chartData =
    activeLegend !== null
      ? [legendItems[activeLegend]]
      : legendItems;

  const getBarColor = () => {
    if (activeLegend === null) return "#F97316";
    return legendItems[activeLegend].color;
  };

  return (
    <CardWrapper
      title="Project Status"
      right={
        <div className="relative">
          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="text-xs border px-3 py-1.5 rounded-lg hover:bg-gray-50 flex items-center gap-1"
          >
            {selectedRange}
            <span className="text-[10px]">▼</span>
          </button>

          {openFilter && (
            <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-50">
              {ranges.map((range) => (
                <div
                  key={range}
                  onClick={() => {
                    setSelectedRange(range);
                    setOpenFilter(false);
                  }}
                  className="px-3 py-2 text-xs hover:bg-gray-100 cursor-pointer"
                >
                  {range}
                </div>
              ))}
            </div>
          )}
        </div>
      }
    >
      <p className="text-xs text-gray-400 mb-6 font-medium">
        Active Work Orders
      </p>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        
        {/* LEFT */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <DonutChart data={chartData} />

            {/* center value */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-gray-800">
                {activeLegend !== null
                  ? legendItems[activeLegend].value
                  : total}
              </span>
              <span className="text-xs text-gray-400">
                {activeLegend !== null
                  ? legendItems[activeLegend].label
                  : "Total"}
              </span>
            </div>
          </div>

          {/* LEGEND */}
          <div className="mt-6 space-y-2">
            {legendItems.map((item, i) => (
              <LegendItem
                key={i}
                item={item}
                active={activeLegend === i}
                onClick={() =>
                  setActiveLegend(activeLegend === i ? null : i)
                }
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="flex justify-between text-center mb-6">
            <StatusStat label="In progress" value={15} />
            <StatusStat label="Completed" value={20} />
            <StatusStat label="Overdue" value={5} />
          </div>

          <div className="space-y-5">
            {summary.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>

                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${item.value * 4}%`,
                      backgroundColor: getBarColor(),
                    }}
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

const StatusStat = ({ label, value }) => (
  <div>
    <p className="text-[11px] text-gray-400">{label}</p>
    <p className="text-xl font-bold text-gray-800">{value}</p>
  </div>
);

const LegendItem = ({ item, active, onClick }) => (
  <div onClick={onClick} className="flex items-center gap-3 cursor-pointer">
    <span className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
    <span
      className="text-sm"
      style={{
        color: active ? item.color : "#6b7280",
        fontWeight: active ? "700" : "500",
      }}
    >
      {item.value} {item.label}
    </span>
  </div>
);