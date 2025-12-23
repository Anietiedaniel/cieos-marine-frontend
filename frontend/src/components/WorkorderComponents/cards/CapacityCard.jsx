export default function CapacityBar() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 grid grid-cols-1 md:grid-cols-6 gap-4">
      
      <div>
        <p className="text-sm text-gray-500">Total Resource capacity</p>
        <div className="h-2 bg-gray-200 rounded-full mt-2">
          <div className="h-full w-[3%] bg-green-600 rounded-full" />
        </div>
        <p className="text-xs mt-1 text-green-700">3hrs of 400h capacity</p>
      </div>

      {["Monday","Tuesday","Wednesday","Thursday","Friday"].map(day => (
        <div key={day}>
          <p className="text-sm">{day}</p>
          <div className="h-2 bg-gray-200 rounded-full mt-2">
            <div className="h-full w-0 bg-green-600 rounded-full" />
          </div>
          <p className="text-xs mt-1">0%</p>
        </div>
      ))}
    </div>
  );
}
