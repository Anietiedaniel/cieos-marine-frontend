const users = Array(6).fill({
  name: "John Hanks",
});

export default function WorkloadTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left">User Capacity</th>
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
              <th key={d} className="p-4">{d}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {users.map((user, i) => (
            <tr key={i} className="border-t">
              <td className="p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300" />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">0 mins of 40h</p>
                </div>
              </td>

              {Array(7).fill(0).map((_, idx) => (
                <td key={idx} className="p-4">
                  <p className="text-xs text-green-700">8hrs Left</p>
                  <div className="h-2 bg-gray-200 rounded-full mt-1">
                    <div className="h-full w-full bg-green-600 rounded-full" />
                  </div>
                  <button className="text-xs text-gray-400 mt-1">Add</button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
