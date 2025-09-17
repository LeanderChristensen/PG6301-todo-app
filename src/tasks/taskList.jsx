import React from "react";
import { Link } from "react-router-dom";

export function TaskList(tasks, onTaskChanged) {
  return (
    <>
      <ul style={{ listStyleType: "none" }}>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type={"checkbox"}
              checked={task.checked}
              onChange={(e) => onTaskChanged(task.id, task.checked)}
            />
            <Link to={`/tasks/${task.id}`}>{task.text}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
