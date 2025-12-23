import CardWrapper from "./CardWrapper";

export default function StatCard({ title, value, info, icon }) {
  return (
    <CardWrapper
      title={title}
      right={<span className="text-gray-400">{icon}</span>}
    >
      <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
      <p className={`text-xs mt-2 ${info.color}`}>
        {info.text}
      </p>
    </CardWrapper>
  );
}