import { Outlet } from "react-router-dom";
import { useState } from "react";
import ManagerSidebar from "../components/ManagerSidebar";

function ManagerLayout() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null)
  return (
    <div className="adminlayout-main">
      <div className="adminlayout-sidebar">
        <ManagerSidebar setSelectedUser={setSelectedUser} setSelectUserName={setSelectedUserName}/>
      </div>

      <div className="adminlayout-outlet">
        <Outlet context={{ selectedUser, setSelectedUser, selectedUserName, setSelectedUserName }} />
      </div>
    </div>
  );
}

export default ManagerLayout;
