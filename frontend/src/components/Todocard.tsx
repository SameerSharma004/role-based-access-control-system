import { useEffect } from "react";
import type { Props} from "../types";
import {FaEdit, FaTrash} from 'react-icons/fa'

function Todocard({ index, todo, onDelete, onEdit }: Props) {
  useEffect(() => {
    
  }, [])
  
  return (
    <div className="todo-card">
      <div className="todo-content">
        <div>
          <h1 className="todo-title">Task {index + 1}</h1>
          <h2 className="todo-text">{todo.task}</h2>
        </div>

        <div className="todo-footer">
          <p className="todo-date">Created At : {todo.created_at}</p>

          <div className="todo-actions">
            <button onClick={() => onEdit(todo.id)}>
              <FaEdit />
            </button>

            <button onClick={() => onDelete(todo.id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todocard