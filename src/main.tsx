import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../node_modules/bootstrap/scss/bootstrap.scss";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={route}></RouterProvider>
  </React.StrictMode>
);
