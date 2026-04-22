import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminLayout.css";
function AdminLayout() {
  return (
    <div className="adminlayout-main">
      <div className="adminlayout-sidebar">
        <AdminSidebar />
      </div>
      <div className="adminlayout-outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
