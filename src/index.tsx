import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { Authenticator } from "@aws-amplify/ui-react";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { store } from "./app/store";
import { OpenAPI } from "./client";
import Layout from "./Layout";
import { theme } from "./lib/theme";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminAttendanceEditor from "./pages/admin/AdminAttendanceEditor";
import AdminAttendancePrint from "./pages/admin/AdminAttendancePrint";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHolidayCalendar from "./pages/admin/AdminHolidayCalendar/AdminHolidayCalendar";
import AdminStaff from "./pages/admin/AdminStaff";
import JobTerm from "./pages/admin/JobTerm/JobTerm";
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
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "staff",
        element: <AdminStaff />,
        children: [
          {
            index: true,
            element: <AdminStaff />,
          },
          {
            path: ":staffId",
            element: <AdminStaff />,
          },
        ],
      },
      {
        path: "attendances",
        children: [
          {
            index: true,
            element: <AdminAttendance />,
          },
          {
            path: "edit/:targetWorkDate/:staffId",
            element: <AdminAttendanceEditor />,
          },
          {
            path: "print",
            element: <AdminAttendancePrint />,
          },
        ],
      },
      {
        path: "master",
        element: <AdminMasterLayout />,
        children: [
          {
            index: true,
            element: <JobTerm />,
          },
          {
            path: "job_term",
            element: <JobTerm />,
          },
          {
            path: "holiday_calendar",
            element: <AdminHolidayCalendar />,
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
          </LocalizationProvider>
        </ThemeProvider>
      </Authenticator.Provider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
