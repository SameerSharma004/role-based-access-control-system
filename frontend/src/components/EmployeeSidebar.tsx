import axios from "axios";
import { useEffect, useState } from "react";
import type { EmployeeSidebarProps} from "../types";
import { useNavigate } from "react-router-dom";
import './EmployeeSidebar.css'

function EmployeeSidebar({ setView }: EmployeeSidebarProps) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3000/api/todos`, {
          headers: {
            Authorization: `sameer ${localStorage.getItem("Token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUserEmail(res.data.user.email);
          setUserName(res.data.user.username);
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
   <div className="sidebar">
     <div className="sidebar-top">
       <h1 className="sidebar-title">To-Do List</h1>

       <button onClick={() => setView("my")} className="sidebar-btn my">
         My Tasks
       </button>

       <button
         onClick={() => setView("assigned")}
         className="sidebar-btn assigned"
       >
         Assigned Tasks
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
   </div>
 );
}

export default EmployeeSidebar;
