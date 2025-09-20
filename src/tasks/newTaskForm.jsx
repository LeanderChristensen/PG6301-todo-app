import React, { useState } from "react";

export function NewTaskForm({ onNewTask }) {
  const [title, setTitle] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    onNewTask({ title, completed: false });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </form>
  );
}
