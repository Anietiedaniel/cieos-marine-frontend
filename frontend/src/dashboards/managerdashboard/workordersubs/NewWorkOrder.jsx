import React from "react";
import { ArrowLeft } from "lucide-react";

export default function NewWorkOrder({ onBack }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* PAGE TITLE WITH BACK BUTTON */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">New work order</h1>
      </div>

      {/* FORM CARD */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10">
        <h2 className="text-lg font-bold text-gray-800 mb-8">Job Detail</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          <FormGroup label="Job Name" placeholder="Inspection of Deck" />
          <FormSelect label="Priority" options={["Low", "Medium", "High"]} />
          <FormGroup label="Job ID" placeholder="Enter ID" />
          <FormSelect label="Location" options={["Select a Location", "Deck A", "Engine Room"]} />
          <FormSelect label="Asset Name" options={["Select Asset"]} />
          <FormGroup label="Asset ID" placeholder="Asset ID" />
          <FormGroup label="Start Date" type="date" />
          <FormGroup label="Time" type="time" />
          <FormSelect label="Category" options={["Inspection", "Repair", "Maintenance"]} />
          <FormSelect label="Frequency" options={["Weekly", "Daily", "Monthly"]} />
        </div>

        {/* DESCRIPTION */}
        <div className="mt-8">
          <label className="block text-sm font-bold text-gray-700 mb-2">Descriptions</label>
          <textarea
            placeholder="Add Note"
            rows="5"
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm focus:ring-2 focus:ring-[#708B53]/20 focus:border-[#708B53] focus:outline-none transition-all resize-none"
          />
        </div>
      </div>

      {/* BOTTOM ACTION BAR */}
      <div className="mt-8 flex justify-end gap-4">
        <button
          onClick={onBack}
          className="px-8 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition"
        >
          Save as draft
        </button>

        <button
          className="px-10 py-3 rounded-xl bg-[#708B53] text-white text-sm font-bold hover:shadow-lg hover:opacity-95 transition shadow-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// Small helpers to keep code clean
const FormGroup = ({ label, placeholder, type = "text" }) => (
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-xl border border-gray-200 bg-gray-50/30 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#708B53]/20 focus:border-[#708B53] outline-none transition-all"
    />
  </div>
);

const FormSelect = ({ label, options }) => (
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
    <select className="w-full rounded-xl border border-gray-200 bg-gray-50/30 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#708B53]/20 focus:border-[#708B53] outline-none transition-all">
      {options.map(opt => <option key={opt}>{opt}</option>)}
    </select>
  </div>
);