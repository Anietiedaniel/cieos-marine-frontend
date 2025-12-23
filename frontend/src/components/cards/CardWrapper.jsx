export default function CardWrapper({ title, right, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      {(title || right) && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}