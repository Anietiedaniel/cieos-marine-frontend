const stats = [
  { label: "Overdue Tasks", value: 0 },
  { label: "Due Soon", value: 0 },
  { label: "Open", value: 0 },
  { label: "On Hold", value: 0 },
  { label: "In Progress", value: 0 },
];

export default function SummaryCards() {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {stats.map((item) => (
        <div
          key={item.label}
          className="bg-white px-4 py-3 rounded-lg shadow-sm flex items-center gap-3"
        >
          <span className="text-sm text-gray-600">{item.label}</span>
          <span className="font-semibold">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
