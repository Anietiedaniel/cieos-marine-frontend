import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Inspection", value: 40, color: "#6E8B3D" },
  { name: "Maintenance", value: 20, color: "#F97316" },
  { name: "Repair", value: 20, color: "#C9D8B6" },
];

export default function DonutChart() {
  return (
    /* Set a height for the container so ResponsiveContainer knows how big to be */
    <div className="relative w-full h-[200px] md:h-[180px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius="70%"
            outerRadius="90%"
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* CENTER TEXT - Absolutely centered within the Relative parent */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold text-gray-800 leading-none">80</span>
        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">Total</span>
      </div>
    </div>
  );
}