import React, { useEffect, useState } from "react";
import type { TaskDelta, TaskItem } from "../../shared/taskItem.js";
import { FrontPage } from "./frontPage.js";
import { Route, Routes } from "react-router-dom";
import { SingleTaskRoute } from "./singleTaskRoute.js";

const loading = [
  { id: 0, title: "tasks", checked: false },
  { id: 1, title: "are", checked: false },
  { id: 2, title: "loading", checked: false },
];

export function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>(loading);

  async function loadTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleNewTask(task: Omit<TaskItem, "id">) {
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    await loadTasks();
  }

  async function handleTaskChanged(id: number, checked: boolean) {
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify({ checked }),
    });
    await loadTasks();
  }

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <FrontPage
            tasks={tasks}
            onTaskChanged={handleTaskChanged}
            onNewTask={handleNewTask}
          />
        }
      />
      <Route
        path={"/tasks/:id"}
        element={
          <SingleTaskRoute tasks={tasks} onTaskChanged={handleTaskChanged} />
        }
      />
      <Route path={"*"} element={<h1>Not found</h1>} />
    </Routes>
  );
}
