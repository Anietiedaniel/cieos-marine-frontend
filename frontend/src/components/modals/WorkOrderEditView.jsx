export default function WorkOrderEditView({ task, onBack, onClose }) {
  return (
    <div className="w-[480px] bg-white rounded-2xl p-5">

      <div className="flex justify-between mb-4">
        <h2 className="text-sm font-bold">
          Monthly: {task.title}
        </h2>

        <button
          onClick={onBack}
          className="text-xs font-semibold text-gray-500 hover:underline"
        >
          Back
        </button>
      </div>

      {/* YOUR FULL EDIT FORM HERE */}
    </div>
  );
}
