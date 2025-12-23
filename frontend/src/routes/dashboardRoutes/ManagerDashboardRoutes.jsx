import Overview from "../../dashboards/managerdashboard/tabs/Overview";

import NewWorkOrder from "../../dashboards/managerdashboard/workordersubs/NewWorkOrder";
// import Assets from "../../dashboards/managerdashboard/tabs/Assets";

const dashboardRoutes = [
  {
    path: "overview",
    element: <Overview />,
  },
  {
    path: "work-orders",
    element: <NewWorkOrder />,
  },
  // {
  //   path: "assets",
  //   element: <Assets />,
  // },
];

export default dashboardRoutes;
