import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import type { TaskItem } from "../shared/taskItem.js";

const tasks: TaskItem[] = [
  { id: 0, title: "Get laundry", checked: true },
  { id: 1, title: "Eat lunch", checked: false },
  { id: 2, title: "Take a shower", checked: false },
];

const app = new Hono();

app.use("*", serveStatic({ root: "../dist" }));

app.get("/api/tasks", (c) => {
  console.log(tasks);
  return c.json(tasks);
});

app.post("/api/tasks", async (c) => {
  const task: Omit<TaskItem, "id"> = await c.req.json();
  tasks.push({ ...task, id: tasks.length });
  return c.newResponse(null, 201);
});

app.put("/api/tasks/:id", async (c) => {
  const { id } = c.req.param();
  const delta: Partial<TaskItem> = await c.req.json();
  console.log(delta);
  const taskIndex = parseInt(id);
  tasks[taskIndex] = {
    ...tasks[taskIndex]!,
    ...delta,
  };
  return c.newResponse(null, 200);
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
serve({ fetch: app.fetch, port });
