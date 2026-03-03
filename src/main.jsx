import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "./pages/Layout.jsx";
import TaskList from "./pages/TaskList.jsx";
import Login from "./pages/Login.jsx";
import AbsenceOverview from "./pages/AbsenceOverview.jsx";
import { Navigate } from "react-router";
import Dashboard from "./pages/Dashboard.jsx";
import Meldingen from "./pages/Meldingen.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    Component: Layout,
    children: [
      {
        path: "/",
        element: <Navigate replace to="/dashboard" />,
      },
      {
        path: "/planning",
        Component: TaskList,
      },
      {
        path: "/afwezigheden",
        Component: AbsenceOverview,
      },
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/meldingen",
        Component: Meldingen,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AuthProvider> */}
    <RouterProvider router={router} />
    {/* </AuthProvider> */}
  </StrictMode>,
);
