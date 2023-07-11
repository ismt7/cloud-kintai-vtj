import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { Authenticator } from "@aws-amplify/ui-react";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import { store } from "./app/store";
import JobTerm from "./components/job_term/JobTerm";
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
import RequireAuth from "./pages/RequireAuth";
import Top from "./pages/Top";
import reportWebVitals from "./reportWebVitals";
import AdminMasterLayout from "./stories/pages/admin/master/AdminMasterLayout";

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
        element: (
          <RequireAuth>
            <Register />
          </RequireAuth>
        ),
      },
      {
        path: "/list",
        element: (
          <RequireAuth>
            <List />
          </RequireAuth>
        ),
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
        element: (
          <RequireAuth>
            <AdminDashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/admin/staff",
        element: (
          <RequireAuth>
            <AdminStaff />
          </RequireAuth>
        ),
      },
      {
        path: "/admin/attendances/",
        element: (
          <RequireAuth>
            <AdminAttendance />
          </RequireAuth>
        ),
      },
      {
        path: "/admin/attendances/edit/:targetWorkDate/:targetStaffId",
        element: (
          <RequireAuth>
            <AdminAttendanceEditor />
          </RequireAuth>
        ),
      },
      {
        path: "/admin/master",
        element: <AdminMasterLayout />,
        children: [
          {
            path: "/admin/master/",
            element: (
              <RequireAuth>
                <AdminMaster />
              </RequireAuth>
            ),
          },
          {
            path: "/admin/master/job_term/:targetYear",
            element: <JobTerm />,
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
