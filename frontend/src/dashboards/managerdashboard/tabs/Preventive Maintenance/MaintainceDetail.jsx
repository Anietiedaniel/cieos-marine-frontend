import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, Edit3, Paperclip } from "lucide-react";

const initialPMPlans = [
  {
    id: 1,
    title: "Anchor windlass inspection",
    asset: "Foredeck",
    nextDue: "5th March, 2026",
    category: "Repair",
    equipmentName: "Anchor windlass",
    equipmentId: "AW-01",
    description:
      "Inspect windlass brakes, motor, and chain stopper mechanisms",
    trigger: "Usage Based",
    triggerValue: "Every 500 Hours",
    lastUpdated: "5th March, 2026",
    autoAssign: true,
    assignedTo: "John Hanks",
    status: "In Progress",
    priority: "High",
  },
];

const MaintenanceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const plan = initialPMPlans.find((p) => String(p.id) === id);
    if (plan) setData(plan);
  }, [id]);

  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F2F4F7] p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-200"
          >
            <X className="text-gray-600" />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {data.title}
            </h1>
            <p className="text-xs text-gray-400">
              Maintenance ID: #{data.id}
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            navigate(`/dashboard/maintenance/edit/${data.id}`)
          }
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl hover:bg-gray-50"
        >
          <Edit3 size={16} />
          <span className="text-sm font-medium">Edit</span>
        </button>
      </div>

      {/* TOP INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        {/* STATUS CARD */}
        <Card>
          <div className="flex justify-between">
            <Tag label="Status" value={data.status} color="blue" />
            <Tag label="Priority" value={data.priority} color="red" />
          </div>
        </Card>

        {/* META CARD */}
        <Card>
          <Info label="Next Scheduled Date" value={data.nextDue} />
          <Info label="Last Updated" value={data.lastUpdated} />
        </Card>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* DETAILS */}
          <Card title="Maintenance Details">
            <Info label="Category" value={data.category} />
            <Info label="Location" value={data.asset} />
            <Info label="Asset Name" value={data.equipmentName} />
            <Info label="Asset ID" value={data.equipmentId} />
          </Card>

          {/* DESCRIPTION */}
          <Card title="Description">
            <p className="text-sm text-gray-600 leading-relaxed">
              {data.description}
            </p>
          </Card>

          {/* WORK ORDERS */}
          <Card title="Generated Work Orders">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-gray-400 border-b">
                  <tr>
                    <th className="py-2 text-left">Asset</th>
                    <th>Last Performed</th>
                    <th>Assigned</th>
                    <th>Result</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2].map((row) => (
                    <tr key={row} className="border-b">
                      <td className="py-2">Anchor windlass</td>
                      <td>5th March, 2026</td>
                      <td>John Hanks</td>
                      <td className="text-green-600 font-medium">
                        Passed
                      </td>
                      <td>Brake pads require...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* TRIGGER */}
          <Card title="Trigger">
            <div className="border rounded-xl p-3">
              <p className="font-medium text-sm">{data.trigger}</p>
              <p className="text-xs text-gray-400">
                {data.triggerValue}
              </p>
            </div>
          </Card>

          {/* AUTO GENERATE */}
          <Card title="Automation">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">
                  Auto Generate Work Order
                </p>
                <p className="text-xs text-gray-400">
                  Automatically creates work orders
                </p>
              </div>

              <Toggle value={data.autoAssign} />
            </div>
          </Card>

          {/* ASSIGNEE */}
          <Card title="Default Assignee">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
              <span className="text-sm">{data.assignedTo}</span>
            </div>
          </Card>

          {/* ATTACHMENTS */}
          <Card title="Attachments">
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-20 h-16 bg-gray-200 rounded-lg flex items-center justify-center"
                >
                  ⬇
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

/* COMPONENTS */

const Card = ({ children, title }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
    {title && (
      <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
    )}
    {children}
  </div>
);

const Info = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-400">{label}</span>
    <span className="font-medium text-gray-700">{value}</span>
  </div>
);

const Tag = ({ label, value, color }) => {
  const styles = {
    blue: "bg-blue-600 text-white",
    red: "border border-red-400 text-red-500",
  };

  return (
    <div>
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <span className={`px-3 py-1 rounded-full text-xs ${styles[color]}`}>
        {value}
      </span>
    </div>
  );
};

const Toggle = ({ value }) => (
  <div
    className={`w-10 h-5 flex items-center rounded-full p-1 ${
      value ? "bg-green-500" : "bg-gray-300"
    }`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
        value ? "translate-x-5" : ""
      }`}
    />
  </div>
);

export default MaintenanceDetail;