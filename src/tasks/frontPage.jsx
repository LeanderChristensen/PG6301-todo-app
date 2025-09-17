// import type { TaskChangeHandler, TaskItem } from "../../taskItem.js";
import { TaskList } from "./taskList.jsx";
// import { NewTaskForm } from "./newTaskForm.js";
import React from "react";

export function FrontPage(props) {
  return (
    <>
      <TaskList tasks={props.tasks} onTaskChanged={props.onTaskChanged} />
      <form onSubmit={handleSubmit}>
        <input id={"text"} />
      </form>
    </>
  );
}
