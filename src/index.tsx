import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import reportWebVitals from "./reportWebVitals";
import Layout from "./Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Top from "./pages/Top";
import RequireAuth from "./pages/RequireAuth";

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
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Authenticator.Provider>
      <RouterProvider router={router} />
    </Authenticator.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
