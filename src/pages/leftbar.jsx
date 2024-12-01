import { Link } from 'react-router-dom';

function LeftBar() {
    return (
        <div className="bg-base-100 h-screen w-64 shadow-lg flex flex-col">
            <div className="p-4 text-center font-bold text-lg border-b border-gray-200">
                POS System
            </div>
            <nav className="flex-grow p-4">
                <ul className="space-y-4">
                    <li>
                        <Link to="/dashboard" className="btn btn-outline w-full">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/sale" className="btn btn-outline w-full">
                            Sales
                        </Link>
                    </li>
                    <li>
                        <Link to="/inventory" className="btn btn-outline w-full">
                            Inventory
                        </Link>
                    </li>
                    <li>
                        <Link to="/reports" className="btn btn-outline w-full">
                            Reports
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default LeftBar;
