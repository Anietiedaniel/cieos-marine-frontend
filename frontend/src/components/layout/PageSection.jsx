export default function PageSection({ title, children }) {
  return (
    <div className="p-6 space-y-6">
      {title && (
        <h1 className="text-xl font-semibold text-gray-800">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
}
