import CardWrapper from "./CardWrapper";

export default function CertificationCard() {
  const items = [
    { label: "Up-to-date", percent: 80, color: "bg-green-600" },
    { label: "Near Expiry", percent: 15, color: "bg-orange-500" },
    { label: "Expired", percent: 5, color: "bg-red-500" },
  ];

  return (
    <CardWrapper title="Certification" right={<button className="text-xs border px-2 py-1 rounded">Filter</button>}>
      <div className="space-y-4">
        {items.map((i, idx) => (
          <div key={idx}>
            <p className="text-xs mb-1">{i.label}</p>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className={`${i.color} h-2 rounded-full`} style={{ width: `${i.percent}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-1">{i.percent}%</p>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}