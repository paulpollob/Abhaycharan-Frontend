import { useNavigate } from "react-router-dom"
import Navbar from "./nabbar";

function Home() {
  const navigate = useNavigate();

  return (
    <>
       <div className="min-h-screen bg-base-200">
            <div className="container mx-auto py-10">
                <h1 className="text-4xl font-bold text-center mb-8">POS Dashboard</h1>

                {/* Statistics Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="stat bg-base-100 shadow-lg p-6 rounded">
                        <div className="stat-title">Total Sales</div>
                        <div className="stat-value">$25,600</div>
                        <div className="stat-desc">This month</div>
                    </div>
                    <div className="stat bg-base-100 shadow-lg p-6 rounded">
                        <div className="stat-title">Inventory Items</div>
                        <div className="stat-value">1,230</div>
                        <div className="stat-desc">As of today</div>
                    </div>
                    <div className="stat bg-base-100 shadow-lg p-6 rounded">
                        <div className="stat-title">Active Customers</div>
                        <div className="stat-value">480</div>
                        <div className="stat-desc">Returning customers</div>
                    </div>
                </div>

                {/* Quick Actions Section */}
                <div className="flex flex-wrap justify-center gap-6">
                    <button className="btn btn-primary w-48" onClick={() => navigate('/sale')} >Process Sale</button>
                    <button className="btn btn-secondary w-48" onClick={()=>navigate('/product')}>Add Product</button>
                    <button className="btn btn-accent w-48" onClick={()=>navigate('/inventory')}>View Inventory</button>
                    <button className="btn btn-info w-48" onClick={()=>navigate('/report')}>Generate Report</button>
                </div>
            </div>
        </div>
    </>

  )
}

export default Home
