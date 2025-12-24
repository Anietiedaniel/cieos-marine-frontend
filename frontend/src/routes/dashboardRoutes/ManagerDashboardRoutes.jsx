import Overview from "../../dashboards/managerdashboard/tabs/Overview";
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