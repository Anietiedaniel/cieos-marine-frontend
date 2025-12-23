import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import Overview from "./dashboards/managerdashboard/tabs/Overview.jsx";

function App() {
  return (
    <DashboardLayout>
      <Overview />
    </DashboardLayout>
  );
}

export default App;
