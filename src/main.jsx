import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Link, useParams } from "react-router-dom";

function TaskDetail({ tasks }) {
  const { id } = useParams(); // grabs the "id" from the route
  const task = tasks[id - 1];
  if (!task) {
    return <h2>Task not found</h2>;
  }

  return (
    <>
      <h2>{task.text}</h2>
      <h2>Completed: {task?.checked?.toString() ?? "Unknown"}</h2>
    </>
  );
}

function Application() {
  const [tasks, setTasks] = useState([]);

  function onLoad() {
    setTasks([
      { id: 1, text: "Task 1", checked: true },
      { id: 2, text: "Task 2", checked: false },
      { id: 3, text: "Task 3", checked: false },
    ]);
  }

  useEffect(() => {
    onLoad();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        text: document.getElementById("text").value,
        checked: false,
      },
    ]);
    document.getElementById("text").value = "";
  }

  function handleCheck(id, checked) {
    checked = !checked;
    let a = [...tasks];
    a[id - 1].checked = checked;
    setTasks(a);
  }

  const listItems = tasks.map((task) => (
    <li key={task.id}>
      <input
        type={"checkbox"}
        checked={task.checked}
        onChange={(e) => handleCheck(task.id, task.checked)}
      />
      <Link to={`/tasks/${task.id}`}>{task.text}</Link>
    </li>
  ));

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <>
            <ul style={{ listStyleType: "none" }}>{listItems}</ul>
            <form onSubmit={handleSubmit}>
              <input id={"text"} />
            </form>
          </>
        }
      />
      <Route path="/tasks/:id" element={<TaskDetail tasks={tasks} />} />
      <Route path={"*"} element={<h1>Not found</h1>} />
    </Routes>
  );
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
