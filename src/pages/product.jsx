import Navbar from "./nabbar"

function Product() {
    return (
        <>
        <Navbar></Navbar>
        <div className="min-h-screen bg-base-200">
                <div className="container mx-auto py-10">
                    <h1 className="text-4xl font-bold text-center mb-8">Hello from Product</h1>
                </div>
        </div>
        </>
    )
}

export default Product