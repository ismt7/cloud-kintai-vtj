import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Authenticator } from "@aws-amplify/ui-react";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import Layout from "./Layout";
import { store } from "./app/store";
import { theme } from "./lib/theme";
import List from "./pages/List";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequireAuth from "./pages/RequireAuth";
import Top from "./pages/Top";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStaff from "./pages/admin/AdminStaff";
import reportWebVitals from "./reportWebVitals";

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
