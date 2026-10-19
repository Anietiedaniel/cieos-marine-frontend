import Overview from "../../dashboards/ManagerDashboard/tabs/Overview";
import NotificationPage from "../../dashboards/ManagerDashboard/tabs/OverviewSub/NotificationPage";
import NewWorkOrder from "../../dashboards/ManagerDashboard/workordersubs/NewWorkOrder";
import WorkOrderPage from "../../dashboards/ManagerDashboard/workordersubs/WorkOrderPage"; 
import ChatPage from "../../components/messaging/ChatPage"; 
import Workload from "../../dashboards/ManagerDashboard/workordersubs/Workload";

// ASSETS
import AssetOverviewPage from "../../dashboards/ManagerDashboard/assets/AssetOverviewPage";
import AssetListPage from "../../dashboards/ManagerDashboard/assets/AssetListPage";
import AssetDetailPage from "../../dashboards/ManagerDashboard/assets/AssetDetailPage";
import CreateAssetPage from "../../dashboards/ManagerDashboard/assets/CreateAssetPage";
import QuickEditSidebar from "../../dashboards/ManagerDashboard/assets/QuickEditSidebar";
import AddLocation from "../../dashboards/ManagerDashboard/assets/AddLocation";

//  Preventive Maintenance
import PreventiveMaintenancePage from "../../dashboards/ManagerDashboard/tabs/Preventive Maintenance/PreventiveMaintenance";
import MaintenanceDetail from "../../dashboards/ManagerDashboard/tabs/Preventive Maintenance/MaintainceDetail";
import MaintenanceEdit from "../../dashboards/ManagerDashboard/tabs/Preventive Maintenance/MaintenanceEdit";
import ComplianceLog from "../../dashboards/ManagerDashboard/tabs/Preventive Maintenance/ComplianceLog";

import CreateSchedule from "../../dashboards/ManagerDashboard/tabs/Preventive Maintenance/CreateSchedule";


// inpections
import InspectionDetail from "../../dashboards/ManagerDashboard/Inspection/InspectionDetail";
import Inspections from "../../dashboards/ManagerDashboard/Inspection/inspections";
import Reports from "../../dashboards/ManagerDashboard/Inspection/InspectionsReport";
import ReportDetail from "../../dashboards/ManagerDashboard/Inspection/ReportDetail";
import Checklist from "../../dashboards/managerdashboard/Inspection/Checklist";
// Issues 
import IssuesPage from "../../dashboards/ManagerDashboard/tabs/Issues/IssuesPage"

// parts Inventory 
import InventoryPage from "../../dashboards/ManagerDashboard/tabs/Parts-Inventory/InventoryPage"
import VendorList from "../../dashboards/ManagerDashboard/tabs/Parts-Inventory/VendorList";

// Complaince
import CompliancePage from "../../dashboards/ManagerDashboard/tabs/Complaince/CompliancePage";

// User Management
import UserManagementPage from "../../dashboards/ManagerDashboard/tabs/UserManagement/UserManagementPage";


const dashboardRoutes = [
  {
    path: "overview",
    element: <Overview />,
  },

 {
    path: "work-orders/new", 
    element: <NewWorkOrder />,
  }, {
    path: "work-orders",
    element: <WorkOrderPage />,
  },

  {
    path: "work-orders",
    element: <WorkOrderPage />,
  },
  {
    path: "work-orders/history",
    element: <ComplianceLog />,
  },

  // notification page
 {
  path: "notifications",
  element: <NotificationPage />,
},
 // ===== ASSETS FLOW =====
{
  path: "assets",
  element: <AssetOverviewPage />, // locations
},
{
  path: "assets/location/:locationId",
  element: <AssetListPage />, // assets in a location
},
{
  path: "assets/create",
  element: <CreateAssetPage />,
},
{
  path: "assets/add-location",
  element: <AddLocation />,
},
{
  path: "assets/:assetId",
  element: <AssetDetailPage />, // single asset
},

// ===== PREVENTIVE MAINTENANCE =====
  { path: "maintenance", element: <PreventiveMaintenancePage /> },
  { path: "maintenance/detail/:id", element: <MaintenanceDetail /> },
  { path: "maintenance/history", element: <ComplianceLog /> },
  { path: "maintenance/create", element: <CreateSchedule /> },
// Optional: Uncomment once MaintenanceEdit.jsx is created
{
  path: "maintenance/edit/:id",
  element: <MaintenanceEdit />,
},

 // ===== INSPECTIONS =====

{
  path: "inspections",
  element: <Inspections />,
},
{
  path: "inspections/submissions",
  element: <Inspections />,
},
{
  path: "inspections/checklist",
  element: <Checklist />,
},
{
  path: "inspections/:inspectionId",
  element: <InspectionDetail />,
},

{
  path: "inspections/reports",
  element: <Reports />,
},
{
  path: "inspections/reports/:reportId",
  element: <ReportDetail />,
},
  // Issues //
  {
    path: "issues",
    element: <IssuesPage />,
  },

  // Parts Inventory //
  {
    path: "inventory",
    element: <InventoryPage />,
  },

  // Vendor List //
  {
    path: "vendors",
    element: <VendorList />,
  },

  {
    path: "chat",
    element: <ChatPage />,
  },

  {
    path: "workload",
    element: <Workload />,
  },

  {
    path: "compliance",
    element: <CompliancePage />,
  },

  {
    path: "user-management",
    element: <UserManagementPage />,
  }
];

export default dashboardRoutes;
