import React, { useState, useMemo } from "react";
import { X } from "lucide-react";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function CapacityModal({ user, onClose, onSave }) {
  const [days, setDays] = useState(
    WEEK_DAYS.map(day => ({
      day,
      enabled: day !== "Saturday" && day !== "Sunday",
      hours: day === "Saturday" || day === "Sunday" ? 0 : 8,
      mins: 0,
    }))
  );

  const handleSave = () => {
    // We pass the days configuration back to the parent/context
    // This allows us to know exactly how many hours each user has available per day
    onSave(user.id, days); 
    onClose();
  };

  const totalMinutes = useMemo(
    () =>
      days.reduce(
        (sum, d) =>
          d.enabled ? sum + d.hours * 60 + d.mins : sum,
        0
      ),
    [days]
  );

  const totalHours = Math.floor(totalMinutes / 60);

  const toggleDay = index => {
    setDays(prev =>
      prev.map((d, i) =>
        i === index ? { ...d, enabled: !d.enabled } : d
      )
    );
  };

  const updateTime = (index, key, value) => {
    setDays(prev =>
      prev.map((d, i) =>
        i === index ? { ...d, [key]: Number(value) } : d
      )
    );
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[420px] p-5 shadow-xl">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-sm">{user.name}</h3>
          <button onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* DAYS */}
        <div className="space-y-3">
          {days.map((d, i) => (
            <div
              key={d.day}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {/* TOGGLE */}
                <button
                  onClick={() => toggleDay(i)}
                  className={`w-10 h-5 rounded-full relative transition ${
                    d.enabled ? "bg-[#708B53]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition ${
                      d.enabled ? "left-5" : "left-1"
                    }`}
                  />
                </button>

                <span className="text-xs">{d.day}</span>
              </div>

              {/* TIME INPUT */}
              <div className="flex items-center gap-2 text-xs">
                <input
                  type="number"
                  value={d.hours}
                  min={0}
                  className="w-12 border rounded px-2 py-1"
                  disabled={!d.enabled}
                  onChange={e =>
                    updateTime(i, "hours", e.target.value)
                  }
                />
                Hrs
                <input
                  type="number"
                  value={d.mins}
                  min={0}
                  max={59}
                  className="w-12 border rounded px-2 py-1"
                  disabled={!d.enabled}
                  onChange={e =>
                    updateTime(i, "mins", e.target.value)
                  }
                />
                Mins
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs font-semibold flex items-center gap-1">
            🕒 Total Weekly Resource capacity
            <strong>{totalHours}hr</strong>
          </span>

          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-md text-xs border">
              Cancel
            </button>
            <button 
              onClick={handleSave} // Updated to call our new handler
              className="px-4 py-2 rounded-md text-xs bg-[#708B53] text-white hover:bg-[#5d7445] transition-colors"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
