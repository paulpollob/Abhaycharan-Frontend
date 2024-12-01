import { Outlet } from "react-router-dom";
import Navbar from "./nabbar";
import Home from "./home";

function Dashboard(){
    return (<>
        <div>
            <Home></Home>
		</div>
    </>)
}

export default Dashboard;