import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { Authenticator } from "@aws-amplify/ui-react";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import { store } from "./app/store";
import { OpenAPI } from "./client";
import Layout from "./Layout";
import { theme } from "./lib/theme";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminAttendanceEditor from "./pages/admin/AdminAttendanceEditor";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMaster from "./pages/admin/AdminMaster";
import AdminStaff from "./pages/admin/AdminStaff";
import List from "./pages/List";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Top from "./pages/Top";
import reportWebVitals from "./reportWebVitals";
import AdminMasterLayout from "./stories/pages/admin/master/AdminMasterLayout";

OpenAPI.BASE = process.env.REACT_APP_BASE_PATH || "";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Top />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/list",
        element: <List />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
  },
  {
    path: "/admin",
    element: <Layout />,
    children: [
      {
        path: "/admin/",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/staff",
        element: <AdminStaff />,
        children: [
          {
            index: true,
            element: <AdminStaff />,
          },
          {
            path: "/admin/staff/:staffId",
            element: <AdminStaff />,
          },
        ],
      },
      {
        path: "/admin/attendances/",
        element: <AdminAttendance />,
      },
      {
        path: "/admin/attendances/edit/:targetWorkDate/:targetStaffId",
        element: <AdminAttendanceEditor />,
      },
      {
        path: "/admin/master",
        element: <AdminMasterLayout />,
        children: [
          {
            path: "/admin/master/",
            element: <AdminMaster />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Authenticator.Provider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Authenticator.Provider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
