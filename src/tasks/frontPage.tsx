import type { TaskChangeHandler, TaskItem } from "../../shared/taskItem.ts";
import { TaskList } from "./taskList.js";
import { NewTaskForm } from "./newTaskForm.js";
import React from "react";

export function FrontPage(props: {
  tasks: TaskItem[];
  onTaskChanged: TaskChangeHandler;
  onNewTask: (task: Omit<TaskItem, "id">) => void;
}) {
  return (
    <>
      <TaskList tasks={props.tasks} onTaskChanged={props.onTaskChanged} />
      <NewTaskForm onNewTask={props.onNewTask} />
    </>
  );
}
