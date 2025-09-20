import { TaskList } from "./taskList.jsx";
import { NewTaskForm } from "./newTaskForm";
import React from "react";

export function FrontPage({ tasks, onTaskChanged, onNewTask }) {
  return (
    <>
      <TaskList tasks={tasks} onTaskChanged={onTaskChanged} />
      <NewTaskForm onNewTask={onNewTask} />
    </>
  );
}
