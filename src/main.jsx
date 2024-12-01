import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css'
import { RouterProvider } from "react-router-dom";
import Router from "./router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>
);
