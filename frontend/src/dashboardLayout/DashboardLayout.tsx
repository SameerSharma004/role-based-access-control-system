import { Outlet } from "react-router-dom";
import { useState } from "react";
import EmployeeSidebar from "../components/EmployeeSidebar";

function DashboardLayout() {
  const [view, setView] = useState<"my" | "assigned">("my");

  return (
    <div className="adminlayout-main">
      <div className="adminlayout-sidebar">
        <EmployeeSidebar setView={setView} />
      </div>

      <div className="adminlayout-outlet">
        <Outlet context={{ view }} />
      </div>
    </div>
  );
}

export default DashboardLayout;
