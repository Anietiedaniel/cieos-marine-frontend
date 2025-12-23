import React from "react";

export default function NewWorkOrder() {
  return (
    <div className="max-w-6xl mx-auto px-4">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        New work order
      </h1>

      {/* FORM CARD */}
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">

        {/* CARD TITLE */}
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Job Detail
        </h2>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Name
            </label>
            <input
              type="text"
              placeholder="Inspection of Deck"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-1 focus:ring-green-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-1 focus:ring-green-600 focus:outline-none">
              <option>Select Priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job ID
            </label>
            <input
              type="text"
              placeholder="Enter ID"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm">
              <option>Select a Location</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Asset Name
            </label>
            <select className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm">
              <option>Select Asset</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Asset ID
            </label>
            <input
              type="text"
              placeholder="Asset ID"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm">
              <option>Inspection</option>
              <option>Repair</option>
              <option>Maintenance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <select className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm">
              <option>Weekly</option>
              <option>Daily</option>
              <option>Monthly</option>
            </select>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descriptions
          </label>
          <textarea
            placeholder="Add Note"
            rows="4"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm resize-none"
          />
        </div>

      </div>

      {/* BOTTOM ACTION BAR (MAIN PAGE) */}
      <div className="mt-8 flex justify-end gap-4 border-t pt-6">
        <button
          type="button"
          className="px-6 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          Save as draft
        </button>

        <button
          type="button"
          className="px-6 py-2.5 rounded-lg bg-[#6C8E3F] text-white text-sm font-medium hover:opacity-90 transition"
        >
          Next
        </button>
      </div>

    </div>
  );
}
