import { Pencil } from "lucide-react";

export default function WorkOrderQuickView({ task, onEdit, onClose }) {
  return (
    <div className="w-[420px] bg-white rounded-2xl p-5">

      {/* HEADER */}
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-sm font-bold">
          Monthly: {task.title}
        </h2>

        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-black"
        >
          <Pencil size={14} />
          Edit Plan
        </button>
      </div>

      {/* STATUS / PRIORITY */}
      <div className="flex gap-3 mb-4">
        <Badge label={task.status} color="blue" />
        <Badge label={task.priority} color="red" />
      </div>

      {/* DETAILS */}
      <Info label="Due Date" value={task.dueDate} />
      <Info label="Start Date" value={task.startDate} />
      <Info label="Estimated Time" value={task.estimatedTime} />
      <Info label="Schedule" value={task.schedule} />
      <Info label="Assignee" value={task.assignee} />
      <Info label="Job Name" value={task.jobName} />
      <Info label="Job ID" value={task.jobId} />
      <Info label="Location" value={task.location} />
      <Info label="Asset Name" value={task.assetName} />
      <Info label="Asset ID" value={task.assetId} />
      <Info label="Category" value={task.category} />

      {/* DESCRIPTION */}
      <div className="mt-4">
        <p className="text-xs text-gray-500 mb-1">Description</p>
        <div className="border rounded-lg p-3 text-xs text-gray-600">
          {task.description || "—"}
        </div>
      </div>

      {/* DOCUMENTS */}
      <div className="mt-4">
        <p className="text-xs font-semibold mb-2">Documents</p>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          📄 {task.document}
        </div>
      </div>

      {/* MEDIA */}
      <div className="mt-4">
        <p className="text-xs font-semibold mb-2">Media/Photos</p>
        <div className="flex gap-2">
          {task.media?.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-14 h-14 rounded-lg object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* SMALL HELPERS */

function Info({ label, value }) {
  return (
    <div className="flex justify-between text-xs py-1">
      <span className="text-gray-400">{label}</span>
      <span className="font-semibold">{value || "—"}</span>
    </div>
  );
}

function Badge({ label, color }) {
  const map = {
    blue: "bg-blue-50 text-blue-600 border-blue-400",
    red: "bg-red-50 text-red-600 border-red-400",
    green: "bg-green-50 text-green-600 border-green-400"
  };

  return (
    <span
      className={`text-xs font-bold px-3 py-1 rounded-full border ${map[color]}`}
    >
      {label}
    </span>
  );
}
