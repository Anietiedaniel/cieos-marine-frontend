import React, { useState } from "react";
import { X } from "lucide-react";

const AddLocation = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    equipment: "",
    description: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;

    onSave && onSave(form);
    onClose && onClose(); // ✅ safe call
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => onClose && onClose()} // ✅ outside click
      />

      {/* MODAL */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 animate-[fadeIn_.2s_ease]">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Add Location</h2>

          {/* ❌ CLOSE BUTTON */}
          <button
            onClick={() => onClose && onClose()}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Location Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 ring-[#708B53]/20"
          />

          <select
            value={form.equipment}
            onChange={(e) => handleChange("equipment", e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          >
            <option value="">Select Equipment</option>
            <option>Generator</option>
            <option>Pump</option>
            <option>HVAC</option>
          </select>

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full px-4 py-3 border rounded-xl min-h-[100px]"
          />
        </div>

        {/* ACTION */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-[#708B53] text-white rounded-xl hover:bg-[#5f7546]"
          >
            Save Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLocation;