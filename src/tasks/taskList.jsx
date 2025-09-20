import React from "react";
import { Link } from "react-router-dom";

export function TaskList({ tasks, onTaskChanged }) {
  return (
    <ul style={{ listStyleType: "none" }}>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type={"checkbox"}
            checked={task.checked}
            style={{ cursor: "pointer" }}
            onChange={(e) =>
              onTaskChanged(task.id, { checked: e.target.checked })
            }
          />{" "}
          <Link to={`/tasks/${task.id}`}>{task.title}</Link>
        </li>
      ))}
    </ul>
  );
}
