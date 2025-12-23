import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Inspection", value: 40, color: "#6E8B3D" },
  { name: "Maintenance", value: 20, color: "#F97316" },
  { name: "Repair", value: 20, color: "#C9D8B6" },
];

export default function DonutChart() {
  return (
    <div className="relative">
      <PieChart width={180} height={180}>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>

      {/* CENTER TEXT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl items-center  font-bold text-gray-800">80</span>
        <span className="text-xs text-gray-500">Total</span>
      </div>
    </div>
  );
}