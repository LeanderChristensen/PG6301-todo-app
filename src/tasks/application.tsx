import React, { useEffect, useState } from "react";
import type { TaskDelta, TaskItem } from "../taskItem.js";
import { FrontPage } from "./frontPage.js";
import { Route, Routes } from "react-router-dom";
import { SingleTaskRoute } from "./singleTaskRoute.js";

const defaultTasks = [
  {
    id: 0,
    title: "Task 1",
    description: "Description test here wow cool",
    checked: true,
  },
  { id: 1, title: "Task 2", checked: false },
  { id: 2, title: "Task 3", checked: false },
];

export function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const existingTask = localStorage.getItem("tasks");
    return /* existingTask ? JSON.parse(existingTask) : */ defaultTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleNewTask(task: Omit<TaskItem, "id">) {
    setTasks((old) => [...old, { id: old.length, ...task }]);
  }

  function handleTaskChanged(id: number, taskDelta: TaskDelta) {
    setTasks((old) =>
      old.map((o) => (id === o.id ? { ...o, ...taskDelta } : o)),
    );
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
