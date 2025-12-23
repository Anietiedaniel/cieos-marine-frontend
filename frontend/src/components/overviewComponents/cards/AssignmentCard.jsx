import CardWrapper from "./CardWrapper";

export default function AssignmentCard() {
  return (
    <div className="space-y-4">
      
      {/* WORK ORDER ASSIGNMENT */}
      <CardWrapper title="Work Order Assignment">
        <div className="flex justify-between">
          <div className="text-center">
            <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm mx-auto">
              24
            </div>
            <p className="text-xs mt-1 text-green-600">Assigned</p>
          </div>

          <div className="text-center">
            <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm mx-auto">
              24
            </div>
            <p className="text-xs mt-1 text-red-500">Unassigned</p>
          </div>
        </div>
      </CardWrapper>

      {/* OPEN ISSUES */}
      <CardWrapper title="Open Issues">
        <div className="flex justify-between">
          <div className="text-center">
            <div className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm mx-auto">
              24
            </div>
            <p className="text-xs mt-1 text-gray-500">Open</p>
          </div>

          <div className="text-center">
            <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm mx-auto">
              24
            </div>
            <p className="text-xs mt-1 text-red-500">Overdue</p>
          </div>
        </div>
      </CardWrapper>

    </div>
  );
}
