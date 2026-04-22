import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./Managerhome.css";

function ManagerHome() {
  const managerId = localStorage.getItem("current_user_id");
  const [tasks, setTasks] = useState<any[]>([]);
  const { selectedUser, selectedUserName } = useOutletContext<any>();
  const [task, setTask] = useState("");
  const [taskid, setTaskid] = useState(0);
  const fetchEmployees = async () => {
    try {
      await axios.get(
        `http://localhost:3000/api/manager/${managerId}`,
        {
          headers: {
            Authorization: `sameer ${localStorage.getItem("Token")}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTasks = async (userId: number) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/manager/employee-task/${managerId}`,
        {
          user_id: userId,
        },
        {
          headers: {
            Authorization: `sameer ${localStorage.getItem("Token")}`,
          },
        },
      );

      setTasks(res.data.rows);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
  useEffect(() => {
    if (selectedUser) {
      fetchTasks(selectedUser);
    }
  }, [selectedUser]);
  const createTask = async () => {
    if (!selectedUser || !task) return;

    try {
      await axios.post(
        `http://localhost:3000/api/manager/employee-todo/${managerId}`,
        {
          user_id: selectedUser,
          task: task,
        },
        {
          headers: {
            Authorization: `sameer ${localStorage.getItem("Token")}`,
          },
        },
      );
      setTask("");
      fetchTasks(selectedUser);
    } catch (err) {
      console.log(err);
    }
  };
  const updateTask = async () => {
    if (!selectedUser || !task) return;

    try {
      await axios.put(
        `http://localhost:3000/api/manager/employee-todo-update/${managerId}`,
        {
          id: taskid,
          user_id: selectedUser,
          task: task,
        },
        {
          headers: {
            Authorization: `sameer ${localStorage.getItem("Token")}`,
          },
        },
      );
      fetchTasks(selectedUser);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteTask = async (taskId: number) => {
    try {
      await axios.put(
        `http://localhost:3000/api/manager/employee-todo-delete/${managerId}`,
        {
          id: taskId,
        },
        {
          headers: {
            Authorization: `sameer ${localStorage.getItem("Token")}`,
          },
        },
      );
      fetchTasks(selectedUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="manager-home">
      <h1 className="title">Manager Dashboard</h1>

      <h2 className="subtitle">
        Selected Employee: {selectedUserName ? selectedUserName : "No employee selected"}
      </h2>

      <div className="task-box">
        <input
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="task-input"
          required
        />

        <div className="btn-group">
          <button className="btn_create" onClick={createTask}>
            Create
          </button>
          <button className="btn_update" onClick={updateTask}>
            Update
          </button>
        </div>
      </div>
      <div className="task-list">
        <h3>Employee Tasks</h3>

        <div className="grid grid-cols-2 gap-10">
          {!selectedUser ? (
            <p>Please select an employee from sidebar</p>
          ) : tasks.length === 0 ? (
            <p>No tasks for this employee</p>
          ) : (
            tasks.map((t) => (
              <div key={t.id} className="task-card">
                <div className="task-card-text">
                  <p>{t.task}</p>
                </div>

                <div className="btn_container">
                  <button
                    className="btn_delete"
                    onClick={() => deleteTask(t.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn_update"
                    onClick={() => {
                      (setTaskid(t.id), setTask(t.task));
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ManagerHome;
