import Overview from "../../dashboards/managerdashboard/tabs/Overview";

import NewWorkOrder from "../../dashboards/managerdashboard/workordersubs/NewWorkOrder";
// import Assets from "../../dashboards/managerdashboard/tabs/Assets";

import WorkOrderPage from "../../dashboards/managerdashboard/workordersubs/WorkOrderPage"; 


const dashboardRoutes = [
  {
    path: "overview",
    element: <Overview />,
  },
  {
    path: "work-orders", 
    element: <WorkOrderPage />,
  },
];

export default dashboardRoutes;