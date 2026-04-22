import { useEffect, useState } from "react";
import "./adminhome.css";
import axios from "axios";
import { type Employee } from "../../types";
import Membercard from "../../components/Membercard";
import Form from "../../components/MyForm";

function AdminHome() {
  const [allEmployee, setAllEmployee] = useState<Employee[]>([]);
  const [editId, setEditId] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const managers = allEmployee.filter((emp) => emp.role === "manager");
  const fetchEmployee = async () => {
    try {
      await axios
        .get(`http://localhost:3000/api/admin/`, {
          headers: {
            Authorization: `sameer ${localStorage.getItem("Token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setAllEmployee(res.data.rows);
          console.log(res.data.rows);
        });
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  useEffect(() => {
    fetchEmployee();
  }, []);
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/admin/delete-member/${id}`,
        {
          headers: {
            Authorization: `sameer ${localStorage.getItem("Token")}`,
          },
        },
      );
    } catch (err) {
      console.log("Error while Deleteing member ! ");
      console.log(err);
    }
    fetchEmployee();
  };
  const handleEdit = (id: any) => {
    setIsFormOpen(!isFormOpen);
    setEditId(id);
  };
  const handleSubmit = async (data: any) => {
    try {
      await axios.post(
        `http://localhost:3000/api/admin/updated-member/${data.id}`,
        {
          username: data.username,
          email: data.email,
          password: data.password,
          role: data.role,
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
    fetchEmployee();
  };
  return (
    <>
      <div className="main-container">
        <h2>All Employee</h2>
        <div className="task-grid">
          <div className="grid-fomation">
            {allEmployee
              .filter((emp) => emp.role !== "admin")
              .map((employee) => {
                return (
                  <Membercard
                    key={employee.id}
                    member={employee}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                );
              })}
          </div>
        </div>
      </div>
      {isFormOpen ? (
        <Form
          onSubmit={handleSubmit}
          isOpen={setIsFormOpen}
          editId={editId}
          selectedMember={true}
          managers={managers}
        />
      ) : null}
    </>
  );
}

export default AdminHome;
