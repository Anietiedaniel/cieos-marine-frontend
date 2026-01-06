import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../dashboards/managerdashboard/Header";
import Sidebar from "../../dashboards/managerdashboard/Sidebar";
import NotificationPage from "../../dashboards/managerdashboard/tabs/OverviewSub/NotificationPage";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowNotifications(false);
    setSidebarOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Header
        onMenuClick={toggleSidebar}
        isSidebarOpen={sidebarOpen}
        onNotificationClick={() => setShowNotifications(true)}
        isNotificationOpen={showNotifications} 
      />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={closeSidebar}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300">
          {showNotifications ? (
            <NotificationPage onClose={() => setShowNotifications(false)} />
          ) : (
            <Outlet context={{ setShowNotifications }} />
          )}
        </main>
      </div>
    </div>
  );
}