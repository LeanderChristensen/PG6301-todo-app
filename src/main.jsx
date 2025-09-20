import { createRoot } from "react-dom/client";
import React from "react";
import { Application } from "./tasks/application";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
