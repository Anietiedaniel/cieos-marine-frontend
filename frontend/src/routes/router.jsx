import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import dashboardRoutes from "./dashboardRoutes/ManagerDashboardRoutes";

// Public Pages
import Home from "../pages/publicPages/Home";
import Contact from "../pages/publicPages/Contact";
import BookADemo from "../pages/publicPages/BookADemo";

// Auth Pages 
import Login from "../pages/authPages/Login";
import Signup from "../pages/authPages/Register";
// import ForgotPassword from "../pages/authPages/ForgotPassword";

const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/book-a-demo",
    element: <BookADemo />,
  },

  // Authentication Routes
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  // {
  //   path: "/forgot-password",
  //   element: <ForgotPassword />,
  // },

  // Protected Dashboard Area
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      ...dashboardRoutes,
      {
        index: true,
        element: <Navigate to="overview" replace />,
      },
    ],
  },
  
  // Fallback Catch-All Redirect (Optional: Redirects unknown links to home)
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;