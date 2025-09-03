import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

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
    console.log(tasks);
  }

  const listItems = tasks.map((task) => (
    <li key={task.id}>
      <input
        type={"checkbox"}
        checked={task.checked}
        onChange={(e) => handleCheck(task.id, task.checked)}
      />
      {task.text}
    </li>
  ));

  return (
    <>
      <ul style={{ listStyleType: "none" }}>{listItems}</ul>
      <form onSubmit={handleSubmit}>
        <input id={"text"} />
      </form>
    </>
  );
}

createRoot(document.getElementById("root")).render(<Application />);
