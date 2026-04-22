import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminSidebar.css";
import Form from "./MyForm";
import type { Employee } from "../types";
function AdminSidebar() {
  const navigate = useNavigate();
  const [allEmployee, setAllEmployee] = useState<Employee[]>([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const managers = allEmployee.filter((emp) => emp.role === "manager");
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3000/api/admin/`, {
          headers: {
            Authorization: `sameer ${localStorage.getItem("Token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
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
  const handleSubmit = async (data: any) => {
    try {
      await axios.post(
        "http://localhost:3000/api/admin/add-member",
        {
          username: data.username,
          email: data.email,
          password: data.password,
          role: data.role,
          manager_id: data.manager_id ?? null,
        },
        {
          headers: {
            Authorization: `sameer ${localStorage.getItem("Token")}`,
          },
        },
      );
      setIsFormOpen(!isFormOpen);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-top">
        <h1 className="admin-sidebar-top-text">To-Do List</h1>
        <button
          className="admin-sidebar-top-button"
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          Add new User
        </button>
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
      {isFormOpen ? (
        <Form
          onSubmit={handleSubmit}
          isOpen={setIsFormOpen}
          selectedMember={false}
          managers={managers}
        />
      ) : null}
    </div>
  );
}

export default AdminSidebar;
