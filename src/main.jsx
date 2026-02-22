import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TaskList from "./pages/taskList";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TaskList />
  </StrictMode>,
);
