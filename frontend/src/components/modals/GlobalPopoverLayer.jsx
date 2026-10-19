import React from "react";
import ReactDOM from "react-dom";

export default function GlobalPopoverLayer({ popover, close }) {
  if (!popover) return null;

  return ReactDOM.createPortal(
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 z-[999]"
        onClick={close}
      />

      {/* POPOVER */}
      <div
        className="fixed z-[1000] bg-white border rounded-2xl shadow-2xl p-3 w-80"
        style={{
          top: popover.y,
          left: popover.x
        }}
      >
        {popover.content}
      </div>
    </>,
    document.body
  );
}

