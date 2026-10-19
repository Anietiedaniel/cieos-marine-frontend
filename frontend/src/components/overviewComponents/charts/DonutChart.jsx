import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function DonutChart({ data, activeIndex }) {
  return (
    <div className="w-[170px] h-[170px] mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius="58%"
            outerRadius="88%"
            paddingAngle={4}
            cornerRadius={8}
            stroke="#ffffff"
            strokeWidth={2}
            animationDuration={450}
          >
            {data.map((entry, index) => {
              const isActive =
                activeIndex === null || activeIndex === index;

              return (
                <Cell
                  key={index}
                  fill={entry.color}
                  opacity={isActive ? 1 : 0.45}
                  style={{
                    filter: isActive
                      ? "drop-shadow(0px 2px 4px rgba(0,0,0,0.15))"
                      : "none",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}