import ReactDOM from "react-dom";

export default function GlobalModal({ open, onClose, children }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/30 z-[999]"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-[1000] flex items-center justify-center">
        {children}
      </div>
    </>,
    document.body
  );
}
