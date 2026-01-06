import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Workload from "./Workload";

const DRAFT_KEY = "new_work_order_draft";

export default function NewWorkOrder({ onBack }) {
  const [isCreating, setIsCreating] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    jobName: "",
    priority: "",
    jobId: "",
    location: "",
    assetName: "",
    assetId: "",
    startDate: "",
    time: "",
    category: "",
    frequency: "",
    description: "",
  });

  /* ---------------- RESTORE DRAFT ---------------- */
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      setForm(JSON.parse(savedDraft));
    }
  }, []);

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const requiredFields = [
      "jobName",
      "priority",
      "jobId",
      "location",
      "assetName",
      "assetId",
      "startDate",
      "time",
      "category",
      "frequency",
    ];

    const newErrors = {};
    requiredFields.forEach(field => {
      if (!form[field]) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- SAVE DRAFT ---------------- */
  const saveDraft = () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    alert("Draft saved. You can continue later.");
    onBack?.();
  };

  /* ---------------- NEXT ---------------- */
  const handleNext = () => {
    if (!validate()) return;

    // Save before moving forward
    localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    setIsCreating(true);
  };

  if (isCreating) {
    return <Workload onBack={() => setIsCreating(false)} />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">New work order</h1>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 md:p-10">
        <h2 className="text-lg font-bold mb-8">Job Detail</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          <Input label="Job Name" value={form.jobName} error={errors.jobName}
            onChange={v => handleChange("jobName", v)} />

          <Select label="Priority" value={form.priority} error={errors.priority}
            options={["Low", "Medium", "High"]}
            onChange={v => handleChange("priority", v)} />

          <Input label="Job ID" value={form.jobId} error={errors.jobId}
            onChange={v => handleChange("jobId", v)} />

          <Select label="Location" value={form.location} error={errors.location}
            options={["Deck A", "Engine Room"]}
            onChange={v => handleChange("location", v)} />

          <Select label="Asset Name" value={form.assetName} error={errors.assetName}
            options={["Pump", "Generator"]}
            onChange={v => handleChange("assetName", v)} />

          <Input label="Asset ID" value={form.assetId} error={errors.assetId}
            onChange={v => handleChange("assetId", v)} />

          <Input type="date" label="Start Date" value={form.startDate} error={errors.startDate}
            onChange={v => handleChange("startDate", v)} />

          <Input type="time" label="Time" value={form.time} error={errors.time}
            onChange={v => handleChange("time", v)} />

          <Select label="Category" value={form.category} error={errors.category}
            options={["Inspection", "Repair", "Maintenance"]}
            onChange={v => handleChange("category", v)} />

          <Select label="Frequency" value={form.frequency} error={errors.frequency}
            options={["Daily", "Weekly", "Monthly"]}
            onChange={v => handleChange("frequency", v)} />
        </div>

        <div className="mt-8">
          <label className="block text-sm font-bold mb-2">Descriptions</label>
          <textarea
            value={form.description}
            onChange={e => handleChange("description", e.target.value)}
            rows="5"
            className="w-full rounded-xl border px-4 py-3 text-sm resize-none"
          />
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="mt-8 flex justify-end gap-4">
        <button onClick={saveDraft}
          className="px-8 py-3 rounded-xl border font-bold text-gray-600">
          Save as draft
        </button>

        <button onClick={handleNext}
          className="px-10 py-3 rounded-xl bg-[#708B53] text-white font-bold">
          Next
        </button>
      </div>
    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

const Input = ({ label, value, onChange, error, type = "text" }) => (
  <div>
    <label className="block text-sm font-bold mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`w-full rounded-xl border px-4 py-2.5 text-sm
        ${error ? "border-red-500" : "border-gray-200"}`}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

const Select = ({ label, value, onChange, options, error }) => (
  <div>
    <label className="block text-sm font-bold mb-2">{label}</label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`w-full rounded-xl border px-4 py-2.5 text-sm
        ${error ? "border-red-500" : "border-gray-200"}`}
    >
      <option value="">Select {label}</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);
