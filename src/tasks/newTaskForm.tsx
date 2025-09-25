import React, { type FormEvent, useState } from "react";
import type { TaskItem } from "../taskItem.ts";

export function NewTaskForm({
  onNewTask,
}: {
  onNewTask: (task: Omit<TaskItem, "id">) => void;
}) {
  const [title, setTitle] = useState("");
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onNewTask({ title, checked: false });
    setTitle("");
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
