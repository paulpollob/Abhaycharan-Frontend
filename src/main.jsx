import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css' 
import Context from "./Context.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Context>
      {/* <div><RouterProvider router={Router} /></div> */}
      <App/>
    </Context>
  </React.StrictMode>
);
