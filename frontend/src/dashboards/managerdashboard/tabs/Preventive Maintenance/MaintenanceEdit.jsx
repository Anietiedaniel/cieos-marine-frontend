import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, Upload, Trash2 } from "lucide-react";

const initialPMPlans = [
  {
    id: 1,
    title: "Anchor windlass inspection",
    category: "Repair",
    location: "Engine Room",
    equipmentName: "Hvac",
    equipmentId: "EW-01",
    description:
      "Inspect windlass brakes, motor, and chain stopper mechanisms",
    triggerType: "Time Based",
    frequencyValue: 5,
    frequencyUnit: "Days",
    startDate: "",
    startTime: "",
    autoAssign: true,
    assignedTo: "",
    status: "In Progress",
    priority: "",
    attachments: [],
  },
];

const MaintenanceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const plan = initialPMPlans.find((p) => String(p.id) === id);
    if (plan) setForm(plan);
  }, [id]);

  if (!form) return <div className="p-8">Loading...</div>;

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7]">

      {/* HEADER */}
      <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
        <button onClick={() => navigate(-1)}>
          <X className="text-gray-500" />
        </button>

        <h2 className="font-semibold text-gray-800">
          Edit Maintenance
        </h2>

        <div />
      </div>

      {/* BODY */}
      <div className="max-w-5xl mx-auto p-6 space-y-6">

        {/* STATUS */}
        <Card title="Status">
          <div className="flex gap-2 flex-wrap">
            {["Open", "On Hold", "In Progress", "Done"].map((s) => (
              <button
                key={s}
                onClick={() => handleChange("status", s)}
                className={`px-4 py-1 rounded-full text-xs font-medium border transition ${
                  form.status === s
                    ? "bg-[#708B53] text-white border-[#708B53]"
                    : "bg-white text-gray-500 hover:border-gray-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </Card>

        {/* GRID FORM */}
        <div className="grid md:grid-cols-2 gap-6">

          <Card title="Basic Info">
            <Input label="Priority">
              <select
                className="input"
                value={form.priority}
                onChange={(e) => handleChange("priority", e.target.value)}
              >
                <option value="">Select Priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </Input>

            <Input label="Title">
              <input
                className="input"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </Input>

            <Input label="Category">
              <select
                className="input"
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                <option>Repair</option>
                <option>Maintenance</option>
                <option>Inspection</option>
              </select>
            </Input>

            <Input label="Location">
              <select
                className="input"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
              >
                <option>Engine Room</option>
                <option>Deck</option>
              </select>
            </Input>
          </Card>

          <Card title="Equipment">
            <Input label="Equipment Name">
              <select
                className="input"
                value={form.equipmentName}
                onChange={(e) =>
                  handleChange("equipmentName", e.target.value)
                }
              >
                <option>Hvac</option>
                <option>Pump</option>
              </select>
            </Input>

            <Input label="Equipment ID">
              <div className="text-sm font-medium text-gray-700">
                {form.equipmentId}
              </div>
            </Input>

            <Input label="Description">
              <textarea
                className="input min-h-[120px]"
                value={form.description}
                onChange={(e) =>
                  handleChange("description", e.target.value)
                }
              />
            </Input>
          </Card>
        </div>

        {/* TRIGGER */}
        <Card title="Trigger & Schedule">
          <div className="grid md:grid-cols-2 gap-4">
            <select
              className="input"
              value={form.triggerType}
              onChange={(e) =>
                handleChange("triggerType", e.target.value)
              }
            >
              <option>Time Based</option>
              <option>Usage Based</option>
            </select>

            <div className="flex gap-2">
              <input
                type="number"
                className="input w-24"
                value={form.frequencyValue}
                onChange={(e) =>
                  handleChange("frequencyValue", e.target.value)
                }
              />
              <select
                className="input"
                value={form.frequencyUnit}
                onChange={(e) =>
                  handleChange("frequencyUnit", e.target.value)
                }
              >
                <option>Days</option>
                <option>Weeks</option>
                <option>Months</option>
              </select>
            </div>

            <input
              type="date"
              className="input"
              onChange={(e) =>
                handleChange("startDate", e.target.value)
              }
            />
            <input
              type="time"
              className="input"
              onChange={(e) =>
                handleChange("startTime", e.target.value)
              }
            />
          </div>
        </Card>

        {/* AUTOMATION */}
        <Card title="Automation">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">
                Auto Generate Work Order
              </p>
              <p className="text-xs text-gray-400">
                Automatically creates work orders
              </p>
            </div>

            <Toggle
              value={form.autoAssign}
              onChange={() =>
                handleChange("autoAssign", !form.autoAssign)
              }
            />
          </div>
        </Card>

        {/* FILE UPLOAD */}
        <Card title="Attachments">
          <label className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
            <Upload size={20} />
            <p className="text-sm mt-2">Click to upload files</p>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"
                >
                  <span className="text-xs">{file.name}</span>
                  <button onClick={() => removeFile(i)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-100 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              console.log(form, files);
              navigate(-1);
            }}
            className="px-6 py-2 bg-[#708B53] text-white rounded-xl"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

/* COMPONENTS */

const Card = ({ title, children }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
    <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
    {children}
  </div>
);

const Input = ({ label, children }) => (
  <div className="space-y-1">
    <p className="text-xs text-gray-400">{label}</p>
    {children}
  </div>
);

const Toggle = ({ value, onChange }) => (
  <div
    onClick={onChange}
    className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition ${
      value ? "bg-green-500" : "bg-gray-300"
    }`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
        value ? "translate-x-5" : ""
      }`}
    />
  </div>
);

export default MaintenanceEdit;