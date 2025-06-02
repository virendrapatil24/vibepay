import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";

const DashboardPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
