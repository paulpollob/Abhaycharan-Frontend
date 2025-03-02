import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home"; 
import Sale from "./pages/sales";
import Inventory from "./pages/inventory";
import Report from "./pages/report";
import Dashboard from "./pages/dashboard";
import DamageProduct from "./pages/DamageProduct";
import ReceiveProduct from "./pages/ReceiveProduct";
import ProductInfo from "./pages/ProductInfo";

const Router = createBrowserRouter([
    { path: "/", element: <Login></Login> },
    { path: "/Home", element: <Home></Home> },
    { path: "/login", element: <Login></Login> },
    { path: '/dashboard', element: <Dashboard></Dashboard> },
    { path: "/sale", element: <Sale></Sale> },
    { path: "/receiveProduct", element: <ReceiveProduct></ReceiveProduct> },
    { path: "/damageProduct", element: <DamageProduct></DamageProduct> },
    { path: "/inventory", element: <Inventory></Inventory> },
    { path: "/report", element: <Report></Report> },
    { path: "/productInfo", element: <ProductInfo></ProductInfo> }

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