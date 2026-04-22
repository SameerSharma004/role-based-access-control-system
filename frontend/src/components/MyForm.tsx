import { useState } from "react";
import "./form.css";
import type { Form } from "../types";

function MyForm({ onSubmit, isOpen, editId, selectedMember, managers = [] }: Form) {
  const [username, setUsername] = useState("");
  const [managerId, setManagerId] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      id: editId,
      username,
      email,
      password,
      role,
      manager_id: role === "employee" ? managerId : null,
    };
    onSubmit(data);
  };
  return (
    <div className="form">
      <form className="member-form" onSubmit={handleSubmit}>
        <h2>{selectedMember ? "Update Member" : "Add Member"}</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={!selectedMember}
        />
        <select
          className="select"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select>
        {role === "employee" && (
          <select
            className="select"
            value={managerId ?? ""}
            onChange={(e) => setManagerId(e.target.value ? Number(e.target.value) : null)}
            required
          >
            <option value="">Select Manager</option>
            {managers.map((m: any) => (
              <option key={m.id} value={m.id}>
                {m.username}
              </option>
            ))}
          </select>
        )}
        <button className="button1" type="submit">
          {selectedMember ? "Update" : "Add"}
        </button>
        <button className="button2" onClick={() => isOpen(false)}>Close</button>
      </form>
    </div>
  );
}

export default MyForm;
