export default function UnscheduledPanel() {
  return (
    <div className="p-6 h-full flex flex-col justify-between">
      
      <div>
        <h3 className="font-semibold mb-3">Unscheduled Workorder</h3>

        <input
          type="text"
          placeholder="Search Location"
          className="w-full border rounded-lg px-3 py-2 text-sm mb-6"
        />

        <div className="text-center text-gray-500 text-sm">
          <p className="font-medium">No Unscheduled workorder</p>
          <p className="text-xs mt-1">No work order at the moment</p>
        </div>
      </div>

      <button className="bg-[#6C8E3F] text-white py-2 rounded-lg text-sm font-medium">
        Create work order
      </button>

    </div>
  );
}
