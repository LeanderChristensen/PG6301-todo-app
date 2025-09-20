import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Dialog } from "../dialog/dialog.jsx";

function TaskView({ task, onTaskChanged }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedDescription, setEditedDescription] = useState(
    task.description || "",
  );

  function handleSubmit(event) {
    event.preventDefault();
    onTaskChanged(task.id, { description: editedDescription });
    setIsDialogOpen(false);
  }
  return (
    <>
      <h2>{task.title}</h2>
      <h2>Completed: {task?.checked?.toString() ?? "Unknown"}</h2>
      {task.description && (
        <>
          <h2>Description</h2>
          <p>{task.description}</p>
        </>
      )}
      <button
        style={{ cursor: "pointer" }}
        onClick={() => setIsDialogOpen(true)}
      >
        Edit Description
      </button>
      <p>
        <Link to={"/"}>View all tasks</Link>
      </p>
      <Dialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}>
        <form onSubmit={handleSubmit}>
          <h1>Description</h1>
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button style={{ cursor: "pointer" }}>Submit</button>
          <button
            style={{ cursor: "pointer" }}
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </button>
        </form>
      </Dialog>
    </>
  );
}

export function SingleTaskRoute({ tasks, onTaskChanged }) {
  const { id } = useParams();
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) return <h2>Task not found</h2>;

  return <TaskView task={task} onTaskChanged={onTaskChanged} />;
}
