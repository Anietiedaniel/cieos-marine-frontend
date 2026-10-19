import React, { useState } from "react";
import GlobalModal from "./GlobalModal";
import WorkOrderQuickView from "./WorkOrderQuickView";
import WorkOrderEditView from "./WorkOrderEditView";

export default function WorkOrderModal({ task, open, onClose }) {
  const [mode, setMode] = useState("view"); // "view" | "edit"

  if (!task) return null;

  return (
    <GlobalModal open={open} onClose={onClose}>
      {mode === "view" ? (
        <WorkOrderQuickView
          task={task}
          onEdit={() => setMode("edit")}
          onClose={onClose}
        />
      ) : (
        <WorkOrderEditView
          task={task}
          onBack={() => setMode("view")}
          onClose={onClose}
        />
      )}
    </GlobalModal>
  );
}
