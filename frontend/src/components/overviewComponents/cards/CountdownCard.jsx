import CardWrapper from "./CardWrapper";

export default function CountdownCard({ title, status }) {
  return (
    <CardWrapper
      title={title}
      right={<span className={`text-xs px-2 py-1 rounded ${status.bg}`}>{status.text}</span>}
    >
      <p className="text-center text-lg font-semibold tracking-wide">
        2 <span className="text-xs">Days</span> :
        01 <span className="text-xs">Hr</span> :
        30 <span className="text-xs">Min</span> :
        09 <span className="text-xs">Sec</span>
      </p>
    </CardWrapper>
  );
}