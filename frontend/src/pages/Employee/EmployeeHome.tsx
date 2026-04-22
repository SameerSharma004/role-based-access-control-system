import { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import "./Employeehome.css";

export default function EmployeeHome() {
  const API = "http://localhost:3000";
  const { view } = useOutletContext<{ view: "my" | "assigned" }>();

  const [todos, setTodos] = useState<any[]>([]);
  const [managerTasks, setManagerTasks] = useState<any[]>([]);
  const [task, setTask] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get(`${API}/api/todos`, {
      headers: {
        Authorization: `sameer ${localStorage.getItem("Token")}`,
      },
    });
    setTodos(res.data.output);
  };

  const fetchManagerTasks = async () => {
    const res = await axios.get(`${API}/api/manager/employee-manager-task`, {
      headers: {
        Authorization: `sameer ${localStorage.getItem("Token")}`,
      },
    });
    setManagerTasks(res.data.tasks);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (view === "assigned") {
      fetchManagerTasks();
    }
  }, [view]);

  const addTask = async () => {
    if (!task) return;

    await axios.post(
      `${API}/api/todos`,
      { task },
      {
        headers: {
          Authorization: `sameer ${localStorage.getItem("Token")}`,
        },
      }
    );

    setTask("");
    fetchTodos();
  };

  const deleteTask = async (id: number) => {
    await axios.delete(`${API}/api/todos/${id}`, {
      headers: {
        Authorization: `sameer ${localStorage.getItem("Token")}`,
      },
    });

    fetchTodos();
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Dashboard</h1>

      {view === "my" && (
        <div>
          <div className="task-input-container">
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter task..."
              className="task-input"
            />
            <button onClick={addTask} className="add-btn">
              Add
            </button>
          </div>

          <div className="task-grid">
            {todos.map((t) => (
              <div key={t.id} className="task-card">
                <span>{t.task}</span>
                <button
                  onClick={() => deleteTask(t.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "assigned" && (
        <div>
          <h2 className="section-title">Assigned Tasks</h2>
          <div className="task-grid">
            {managerTasks.map((t) => (
              <div key={t.id} className="assigned-card">
                {t.task}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}