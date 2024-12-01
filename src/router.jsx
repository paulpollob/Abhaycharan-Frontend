import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import App from "./App";
import Sale from "./pages/sales";
import Product from "./pages/product";
import Inventory from "./pages/inventory";
import Report from "./pages/report";
import Dashboard from "./pages/dashboard";
  
const Router = createBrowserRouter([
{ path: "/", element: <App></App>},
{ path: '/dashboard', element: <Dashboard></Dashboard>},
{ path: "/sale", element: <Sale></Sale> },
{ path: "/product", element: <Product></Product> },
{ path: "/inventory", element: <Inventory></Inventory> },
{ path: "/report", element: <Report></Report> }

// {
//     path: "/dashboard",
//     element: <Dashboard></Dashboard>,
//     children: [
//         { path: "/dashboard", element: <Home></Home> },
//         { path: "/sale", element: <Sale></Sale> },
//         { path: "/product", element: <Product></Product> },
//         { path: "/inventory", element: <Inventory></Inventory> },
//         { path: "/report", element: <Report></Report> }
//     ]
// },

]);

export default Router;