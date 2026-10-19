import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { WorkOrderProvider } from "./contexts/WorkOrderContext.jsx";
import { AssetProvider } from "./contexts/AssetContext.jsx";
import { InspectionProvider } from "./contexts/InspectionContext.jsx";
import App from "./App.jsx";

// FIX: Use createRoot directly since it is already imported
const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <InspectionProvider>
      <AssetProvider>
      <WorkOrderProvider>
        <App/>
      </WorkOrderProvider>
    </AssetProvider>
   </InspectionProvider>
  </StrictMode>
);
