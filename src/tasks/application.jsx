import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Route, Routes } from "react-router";
import { FrontPage } from "./frontPage";

export function Application() {
  const [tasks, setTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isDialogOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isDialogOpen]);

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

  useEffect(() => {
    dialogRef.current?.addEventListener("close", handleDialogClose);
    return () =>
      dialogRef.current?.removeEventListener("close", handleDialogClose);
  }, []);

  function handleDialogClose() {
    setIsDialogOpen(false);
  }

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

  function SingleTaskRoute({ tasks }) {
    const { id } = useParams();
    const task = tasks[id - 1];
    if (!task) {
      return <h2>Task not found</h2>;
    }

    return (
      <>
        <h2>{task.text}</h2>
        <h2>Completed: {task?.checked?.toString() ?? "Unknown"}</h2>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => setIsDialogOpen(true)}
        >
          Edit
        </button>
        <dialog ref={dialogRef}>
          <h1>test</h1>
          <button style={{ cursor: "pointer" }}>Submit</button>
          <button
            style={{ cursor: "pointer" }}
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </button>
        </dialog>
      </>
    );
  }

  function handleCheck(id, checked) {
    checked = !checked;
    let a = [...tasks];
    a[id - 1].checked = checked;
    setTasks(a);
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
      <Route path="/tasks/:id" element={<SingleTaskRoute tasks={tasks} />} />
      <Route path={"*"} element={<h1>Not found</h1>} />
    </Routes>
  );
}
