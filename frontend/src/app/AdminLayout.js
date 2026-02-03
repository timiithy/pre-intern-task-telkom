import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../components/Navigation";

const AdminLayout = () => {
  return (
    <div className="admin-dashboard-layout">
      <AdminSidebar />
      <div className="user-dashboard">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
