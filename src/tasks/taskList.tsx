import React from "react";
import type { TaskChangeHandler, TaskItem } from "../../shared/taskItem.js";
import { Link } from "react-router-dom";

export function TaskList({
  tasks,
  onTaskChanged,
}: {
  tasks: TaskItem[];
  onTaskChanged: TaskChangeHandler;
}) {
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
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/tasks/${task.id}`}
          >
            {task.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
