import CardWrapper from "./CardWrapper";

export default function AssetPerformanceCard() {
  return (
    <CardWrapper title="Asset Performance Overview" right={<button className="text-xs text-green-600">See more</button>}>
      {[
        { name: "Generator B-311", percent: 80, status: "Maintenance" },
        { name: "Fuel Pump A-101", percent: 50, status: "Warning" },
        { name: "Belt C-101", percent: 30, status: "Alert" },
      ].map((a, i) => (
        <div key={i} className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span>{a.name}</span>
            <span>{a.status}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: `${a.percent}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-1">{a.percent}% efficiency</p>
        </div>
      ))}
    </CardWrapper>
  );
}