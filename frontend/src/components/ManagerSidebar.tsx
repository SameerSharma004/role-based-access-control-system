import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Employee, SidebarProps } from "../types";
import "./ManagerSidebar.css";
function ManagerSidebar({ setSelectedUser, setSelectUserName }: SidebarProps) {
  const userId = localStorage.getItem("current_user_id");
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [allEmployee, setAllEmployee] = useState<Employee[]>([]);
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3000/api/manager/${userId}`, {
          headers: {
            Authorization: `sameer ${localStorage.getItem("Token")}`,
          },
        })
        .then((res) => {
          console.log(res.data.rows);
          setUserEmail(res.data.user.email);
          setUserName(res.data.user.username);
          setAllEmployee(res.data.rows);
        });
    } catch (err) {
      console.log("Error: ", err);
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-top">
        <h1 className="admin-sidebar-top-text">To-Do List</h1>
        <button className="admin-sidebar-top-button">Add new Task</button>
      </div>
      <div className="admin-sidebar-middle">
        <button className="admin-sidebar-middle-text-my">My Task</button>
        <h1 className="admin-sidebar-middle-text">All Employees </h1>
        {allEmployee.map((employee, index) => {
          return (
            <div key={index} className="admin-sidebar-middle-inner-2">
              <button
                className="admin-sidebar-middle-button"
                onClick={() => {setSelectedUser(employee.id), setSelectUserName(employee.username)}}
              >
                {employee.username}
              </button>
            </div>
          );
        })}
      </div>
      <div className="sidebar-bottom">
        <div>
          <h1 className="sidebar-user">
            Welcome <b>{userName}</b>
          </h1>
          <p className="sidebar-email">{userEmail}</p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ManagerSidebar;
