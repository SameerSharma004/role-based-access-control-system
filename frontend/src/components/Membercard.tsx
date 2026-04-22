import "./membercard.css";
import { FaUserEdit, FaTrash } from "react-icons/fa";

function Membercard({ member, onDelete, onEdit }: any) {
  return (
    <div className="member-card">
      <div className="member-content">
        <div className="member-header">
          <div>
            <h2 className="member-name">{member.username}</h2>
            <p className="member-email">{member.email}</p>
          </div>
        </div>
        <div className="member-role">
          Role: <span>{member.role}</span>
        </div>
        <div className="member-actions">
          <button onClick={() => onEdit(member.id)}>
            <FaUserEdit />
          </button>
          <button onClick={() => onDelete(member.id)}>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Membercard;
