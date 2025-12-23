import CardWrapper from "./CardWrapper";

export default function CommentCard({ name, message, time }) {
  return (
    <div className="flex gap-3 py-3 border-b last:border-b-0">
      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm font-semibold">
        {name[0]}
      </div>

      <div className="flex-1">
        <p className="text-sm">
          <span className="font-semibold">{name}</span>{" "}
          <span className="text-gray-600">{message}</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}
