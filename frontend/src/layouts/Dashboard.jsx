import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
   return (
      <div className="bg-[#f6f6f6] min-h-screen">
         <DashboardLayout >
            <Outlet />
         </DashboardLayout>
      </div>
   );
};

export default Dashboard;
