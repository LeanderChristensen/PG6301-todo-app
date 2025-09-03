import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function Application() {
  const [tasks, setTasks] = useState([]);

  function onLoad() {
    setTasks([
      { id: 1, text: "Task 1", checked: 1 },
      { id: 2, text: "Task 2", checked: 0 },
      { id: 3, text: "Task 3", checked: 0 },
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
        checked: 0,
      },
    ]);
  }

  const listItems = tasks.map((task) => <li key={task.id}>{task.text}</li>);

  return (
    <>
      <ul>{listItems}</ul>
      <form onSubmit={handleSubmit}>
        <input id={"text"} />
      </form>
    </>
  );
}

createRoot(document.getElementById("root")).render(<Application />);
