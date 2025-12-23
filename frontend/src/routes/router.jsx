import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import dashboardRoutes from "./dashboardRoutes/ManagerDashboardRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: dashboardRoutes,
  },
]);

export default router;
