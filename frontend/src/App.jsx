import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";

import Overview from "./dashboards/managerdashboard/tabs/Overview";
// import WorkOrder from "./dashboards/managerdashboard/tabs/Workorder";
// import Assets from "./dashboards/managerdashboard/tabs/Assets";
// import other pages as needed

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Overview />} />
          {/* <Route path="/work-orders" element={<WorkOrder />} />
          <Route path="/assets" element={<Assets />} /> */}
          {/* add others later */}
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
