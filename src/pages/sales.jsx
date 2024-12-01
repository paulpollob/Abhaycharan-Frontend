import React, { useState } from "react";
import Navbar from "./nabbar";

function Sale() {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        quantity: "",
        price: "",
    });
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target; 
        setFormData({ ...formData, [name]: value });
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        if (formData.code && formData.name && formData.quantity && formData.price) {
            setItems([...items, { ...formData }]);
            setFormData({ code: "", name: "", quantity: "", price: "" }); // Reset form fields
        } else {
            alert("Please fill out all fields.");
        }
    };

    const removeItem = (e) => { 
        const code = e.target.parentNode.parentNode.children[1].innerHTML;
        setItems(items.filter(e=>e.code!=code)) 
    }

    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
    };

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handlePrint = () => {
        const printContents = document.getElementById("popup-content").innerHTML;
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Items</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f4f4f4; }
                    </style>
                </head>
                <body>${printContents}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen bg-base-200">
                {/* Left Section: Form */}
                <div className="w-1/2 p-10">
                    <h1 className="text-4xl font-bold text-center mb-8">Add POS Items</h1>
                    <form onSubmit={handleAddItem} className="shadow-lg p-6 rounded">
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Item Code</span>
                            </label>

                            <input
                                type="text"
                                name="code"
                                placeholder="Item code"
                                className="input input-bordered"
                                value={formData.code}
                                onChange={handleChange}
                                required
                            />

                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Item Name</span>
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Item Name"
                                className="input input-bordered"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Quantity</span>
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                className="input input-bordered"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                className="input input-bordered"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <button type="submit" className="btn btn-primary w-full">
                                Add Item
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Section: Items List */}
                <div className="w-1/2 p-10">
                    <h2 className="text-2xl font-bold mb-4">POS Items</h2>
                    {items.length > 0 ? (
                        <>
                            <table className="table w-full  shadow-lg rounded">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Item Code</th>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.code}</td>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td><span className="font-extrabold">৳</span>{item.price}</td>
                                            <td><span className="font-extrabold">৳</span>{(item.quantity * item.price).toFixed(2)}</td>
                                            <td><h1 className="cursor-pointer" onClick={(e)=>removeItem(e)}>(X)</h1></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-between items-center mt-4">
                                <h3 className="text-lg font-bold">Total Amount: <span className="font-extrabold">৳</span>{calculateTotal()}</h3>
                                <button onClick={handleOpenPopup} className="btn btn-secondary">
                                    Show & Print
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-500">No items added yet.</p>
                    )}
                </div>
            </div>

            {/* Popup Modal */}
            {isPopupOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className=" p-6 rounded shadow-lg max-w-2xl bg-gray-800 w-full">
                        <h2 className="text-2xl font-bold mb-4 text-center">Print POS Items</h2>
                        <div id="popup-content">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Item Code</th>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.code}</td>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td><span className="font-extrabold">৳</span>{item.price}</td>
                                            <td><span className="font-extrabold">৳</span>{(item.quantity * item.price).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <h3 className="text-right font-bold mt-4">Total Amount: <span className="font-extrabold">৳</span>{calculateTotal()}</h3>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button onClick={handlePrint} className="btn btn-primary mr-2">
                                Print
                            </button>
                            <button onClick={handleClosePopup} className="btn btn-secondary">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Sale;
