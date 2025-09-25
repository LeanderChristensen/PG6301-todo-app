import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();
serve(app);

const tasks = [
  { title: "Get laundry", checked: true },
  { title: "Eat lunch", checked: false },
  { title: "Take a shower", checked: false },
];

app.get("/api/tasks", (c) => {
  return c.json(tasks);
});
