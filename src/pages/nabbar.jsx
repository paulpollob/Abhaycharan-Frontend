import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl" onClick={() => navigate('/dashboard')}>Hare Krishna</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a onClick={() => navigate('/sale')}>Process Sale</a></li>
                        <li><a onClick={() => navigate('/product')}>Add Product</a></li>
                        <li><a onClick={() => navigate('/inventory')}>View Inventory</a></li>
                        <li><a onClick={() => navigate('/report')}>Generate Report</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </>
    )
}

export default Navbar;


