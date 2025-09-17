import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Application } from "./tasks/application";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
