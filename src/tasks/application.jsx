import React, { useEffect, useState } from "react";
import { FrontPage } from "./frontPage";
import { Route, Routes } from "react-router-dom";
import { SingleTaskRoute } from "./singleTaskRoute";

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
  const [tasks, setTasks] = useState(() => {
    const existingTask = localStorage.getItem("tasks");
    return /* existingTask ? JSON.parse(existingTask) : */ defaultTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleNewTask(task) {
    setTasks((old) => [...old, { id: old.length, ...task }]);
  }

  function handleTaskChanged(id) {
    setTasks((old) => old.map((o) => (id === o.id ? { ...o } : o)));
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
        path="/tasks/:id"
        element={
          <SingleTaskRoute tasks={tasks} onTaskChanged={handleTaskChanged} />
        }
      />
      <Route path={"*"} element={<h1>Not found</h1>} />
    </Routes>
  );
}
