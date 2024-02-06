import "./index.css";

import { Authenticator } from "@aws-amplify/ui-react";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { I18n } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { store } from "./app/store";
import Layout from "./Layout";
import { theme } from "./lib/theme";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminAttendanceEditor from "./pages/admin/AdminAttendanceEditor";
import AdminAttendancePrint from "./pages/admin/AdminAttendancePrint";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHolidayCalendar from "./pages/admin/AdminHolidayCalendar/HolidayCalendar/AdminHolidayCalendar";
import AdminStaff from "./pages/admin/AdminStaff/AdminStaff";
import AdminStaffAttendanceList from "./pages/admin/AdminStaffAttendanceList/AdminStaffAttendanceList";
import AdminStaffEditor from "./pages/admin/AdminStaffEditor/AdminStaffEditor";
import JobTerm from "./pages/admin/JobTerm/JobTerm";
import AttendanceEdit from "./pages/AttendanceEdit/AttendanceEdit";
import Document from "./pages/Document/Document";
import DocumentEditor from "./pages/Document/DocumentEditor/DocumentEditor";
import DocumentPoster from "./pages/Document/DocumentPoster";
import DocumentView from "./pages/Document/DocumentView/DocumentView";
import ListDocument from "./pages/Document/ListDocument";
import List from "./pages/List";
import Login from "./pages/Login/Login";
import Register from "./pages/Register";
import reportWebVitals from "./reportWebVitals";
import AdminMasterLayout from "./stories/pages/admin/master/AdminMasterLayout";
import vocabularies from "./vocabularies";

I18n.putVocabularies(vocabularies);
I18n.setLanguage("ja");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Register />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "attendance",
        children: [
          {
            index: true,
            element: <List />,
          },
          {
            path: "list",
            element: <List />,
          },
          {
            path: ":targetWorkDate/edit",
            element: <AttendanceEdit />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "docs",
        element: <Document />,
        children: [
          {
            index: true,
            element: <ListDocument />,
          },
          {
            path: "post",
            element: <DocumentPoster />,
          },
          {
            path: ":documentId",
            children: [
              {
                index: true,
                element: <DocumentView />,
              },
              {
                path: "edit",
                element: <DocumentEditor />,
              },
            ],
          },
        ],
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
        children: [
          {
            index: true,
            element: <AdminStaff />,
          },
          {
            path: ":staffId",
            children: [
              {
                index: true,
                element: <AdminStaff />,
              },
              {
                path: "attendance",
                element: <AdminStaffAttendanceList />,
              },
              {
                path: "edit",
                element: <AdminStaffEditor />,
              },
            ],
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
