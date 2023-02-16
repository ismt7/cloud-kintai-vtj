import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import Layout from "./Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Top from "./pages/Top";
import RequireAuth from "./pages/RequireAuth";
import { store } from "./lib/store";
import List from "./pages/List";
import AdminDashboard from "./pages/admin/AdminDashboard";

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
        element: <AdminDashboard />,
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
        <RouterProvider router={router} />
      </Authenticator.Provider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
