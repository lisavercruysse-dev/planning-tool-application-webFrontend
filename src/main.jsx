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
import Afwezigheden from "./pages/Afwezigheden.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Meldingen from "./pages/Meldingen.jsx";

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: "/",
        element: <Navigate replace to="/dashboard" />,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/planning",
        Component: TaskList,
      },
      {
        path: '/afwezigheden',
        Component: Afwezigheden,
      },
      {
        path: '/dashboard',
        Component: Dashboard,
      },
      {
        path: '/meldingen',
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
