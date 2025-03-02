import { useContext, useState } from "react";
import Navbar from "./nabbar"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { MyContext } from "../Context";


function ReceiveProduct() {

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [distributorInfo, setDistributorInfo] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false) 
    const {allProducts, scssMsg, errMsg, wrnMsg} = useContext(MyContext);
    const [confirm, setConfirm] = useState(false);
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        productCode: "",
        productName: "",
        packSize: "",
        productReceivedQty: "",
        tradePrice: "",
        mrp: ""
    });






    const inputAction = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const dstrbtrInfoOnChange = (e) => {
        const { name, value } = e.target;
        setDistributorInfo({ ...distributorInfo, [name]: value });
    };
    const addItemAction = (e) => {
        e.preventDefault();
        if (formData.productCode && formData.productName && formData.productReceivedQty && formData.tradePrice && formData.mrp) {
            setItems([...items, { ...formData }]);
            setSearchTerm("")
            setFilteredSuggestions([])
            setFormData({ productCode: "", productName: "", packSize: "", productReceivedQty: "", tradePrice: "", mrp: "" }); // Reset form fields
        } else {
            wrnMsg("Please fill out all fields.");
        }
    };
    const removeItem = (e) => {
        const productCode = e.target.parentNode.parentNode.children[1].innerHTML;
        setItems(items.filter(e => e.productCode != productCode))
    }
    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.productReceivedQty * item.tradePrice, 0).toFixed(2);
    };
    const receiveAndDisplay = async () => {
        setConfirm(false)
        setLoading(true);
        const reqDt = {
            ...distributorInfo,
            "productsDetails": (items)
        }
        try {
            const res = await fetch(`${import.meta.env.VITE_HOST_LINK}/api/v1/receiveToStore/receiveProducts`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reqDt)
                })
            const data = await res.json();
            setDistributorInfo({ ...distributorInfo, "invoiceNo": data?.rcvDto?.invoiceNo })

            
            setLoading(false);
            if (data.message === "SUCCESS") {
                scssMsg("Saved Successfuly!!!")
                setIsPopupOpen(true);
            }
            else {
                errMsg("Failed!!!")
                console.log("error: " + data)
            }
        } catch (error) {
            setLoading(false);
            errMsg("error");
            console.log("error: ", error)
        }
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
    const selectProductInput = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Filter suggestions based on input
        if (value.trim() === "") {
            setShowDropdown(false);
            setFilteredSuggestions([]);
        } else {
            const filtered = allProducts.filter((item) =>
                (item.productCode.toLowerCase().includes(value.toLowerCase()) || item.productName.toLowerCase().includes(value.toLowerCase()))
            );
            setFilteredSuggestions(filtered);
            setShowDropdown(true);
        }
    };
    const suggestionItemAction = (suggestion) => {
        setSearchTerm(suggestion.productCode + " | " + suggestion.productName); // Set the clicked suggestion in the input
        setFormData(suggestion)
        setShowDropdown(false); // Close dropdown 
    };

    const handleBlur = () => setTimeout(() => setShowDropdown(false), 500)
    return (
        <div className="relative">
            <Navbar></Navbar>
            <div className="bg-base-200 py-5">
                <div>
                    <h1 className="text-4xl font-bold text-center mb-8"> Receive Products</h1>

                    <form className="max-w-3xl mx-auto">
                        <label className=" input input-bordered focus:border-0 ">{`${distributorInfo?.invoiceNo ? distributorInfo?.invoiceNo : "Invoice No."}`}</label>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-0">
                            <div className="mb-5">
                                <label htmlFor="storeName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Store Name</label>
                                <input name="storeName" onChange={dstrbtrInfoOnChange} placeholder="store Name" type="text" id="storeName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="distributorName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distributor Name</label>
                                <input name="distributorName" onChange={dstrbtrInfoOnChange} placeholder="distributor Name" type="text" id="distributorName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="distributorAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distributor Address</label>
                                <input name="distributorAddress" onChange={dstrbtrInfoOnChange} placeholder="distributor Address" type="text" id="distributorAddress" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="distributorPhone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distributor Contact Number</label>
                                <input name="distributorPhone" onChange={dstrbtrInfoOnChange} placeholder="distributor Number" type="text" id="distributorPhone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>
                    </form>

                </div>
                <div className="flex min-h-screen  ">

                    {/* Left Section: Form */}

                    <div className="w-7/12 ps-10">

                        <h2 className="text-2xl font-bold mb0">POS Items</h2>
                        {items.length > 0 ? (
                            <>
                                <table className="table w-full  shadow-lg rounded">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Product Code</th>
                                            <th>Product Name</th>
                                            <th>Pack Size</th>
                                            <th>Received Quantity</th>
                                            <th>Trade Price</th>
                                            <th>MRP</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.productCode}</td>
                                                <td>{item.productName}</td>
                                                <td>{item.packSize}</td>
                                                <td>{item.productReceivedQty}</td>
                                                <td><span className="font-extrabold">৳</span>{item.tradePrice}</td>
                                                <td><span className="font-extrabold">৳</span>{item.mrp}</td>
                                                <td><span className="font-extrabold">৳</span>{(item.productReceivedQty * item.tradePrice).toFixed(2)}</td>
                                                <td><h1 className="cursor-pointer" onClick={(e) => removeItem(e)}>(X)</h1></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="flex justify-between items-center mt-4">
                                    <h3 className="text-lg font-bold">Total Amount: <span className="font-extrabold">৳</span>{calculateTotal()}</h3>
                                    <button onClick={() => setConfirm(true)} className="btn btn-secondary">
                                        Show & Print
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p className="text-center text-gray-500">No items added yet.</p>
                        )}
                    </div>

                    {/* Right Section: Items List */}
                    <div className="w-5/12 pe-10">
                        <h1 className="text-4xl font-bold text-center mb-8">Add POS Items</h1>

                        <form onSubmit={addItemAction} className="w-auto shadow-lg p-6 rounded">
                            <label htmlFor="small" className="block mb-2 text-sm font-medium ">select product</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={selectProductInput}
                                onFocus={() => setShowDropdown(true)} // Show dropdown on focus
                                onBlur={handleBlur} // Hide dropdown on blur
                                className="input w-full px-4 text-sm py-2 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 "
                                placeholder="Search..."
                            />
                            <div className={`rounded absolute ${showDropdown && 'h-full'} w-1/4 p-5`}>
                                <div className="">
                                    {showDropdown && filteredSuggestions.length > 0 && (
                                        <ul className="absolute left-0 right-0 z-10  bg-gray-700 rounded-lg shadow-lg max-h-full overflow-y-auto">
                                            {filteredSuggestions.map((suggestion, index) => (
                                                <li
                                                    key={index}
                                                    value={suggestion}
                                                    onClick={() => suggestionItemAction(suggestion)}
                                                    className="px-4 py-2 cursor-pointer hover:bg-gray-500 w-full"
                                                >
                                                    {suggestion.productCode + " | " + suggestion.productName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Product Code</span>
                                </label>

                                <input
                                    type="text"
                                    name="productCode"
                                    placeholder="productCode"
                                    className="input input-bordered"
                                    value={formData.productCode}
                                    onChange={inputAction}
                                    required
                                />

                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>

                                <input
                                    type="text"
                                    name="productName"
                                    placeholder="Product Name"
                                    className="input input-bordered"
                                    value={formData.productName}
                                    onChange={inputAction}
                                    required
                                />

                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Pack Size</span>
                                </label>

                                <input
                                    type="text"
                                    name="packSize"
                                    placeholder="Pack Size"
                                    className="input input-bordered"
                                    value={formData.packSize}
                                    onChange={inputAction}
                                    required
                                />

                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Received Quantity</span>
                                </label>
                                <input
                                    type="number"
                                    name="productReceivedQty"
                                    placeholder="product Received Quantity"
                                    className="input input-bordered"
                                    value={formData.productReceivedQty}
                                    onChange={inputAction}
                                    required
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Trade Price</span>
                                </label>
                                <input
                                    type="number"
                                    name="tradePrice"
                                    placeholder="tradePrice"
                                    className="input input-bordered"
                                    value={formData.tradePrice}
                                    onChange={inputAction}
                                    required
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">MRP</span>
                                </label>
                                <input
                                    type="number"
                                    name="mrp"
                                    placeholder="mrp"
                                    className="input input-bordered"
                                    value={formData.mrp}
                                    onChange={inputAction}
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
                                            <th>Product Code</th>
                                            <th>Product Name</th>
                                            <th>Pack Size</th>
                                            <th>Received Quantity</th>
                                            <th>Trade Price</th>
                                            <th>MRP</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.productCode}</td>
                                                <td>{item.productName}</td>
                                                <td>{item.packSize}</td>
                                                <td>{item.productReceivedQty}</td>
                                                <td><span className="font-extrabold">৳</span>{item.tradePrice}</td>
                                                <td><span className="font-extrabold">৳</span>{item.mrp}</td>
                                                <td><span className="font-extrabold">৳</span>{(item.productReceivedQty * item.tradePrice).toFixed(2)}</td>
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
                                <button onClick={() => setIsPopupOpen(false)} className="btn btn-secondary">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {
                loading &&
                <div role="status" className="absolute h-screen w-screen top-0 left-0 flex justify-center items-center">
                    <div className="bg-orange-400 w-56 h-40 rounded-xl bg-opacity-70 flex justify-center items-center">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
            {
                confirm &&
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="false"></div>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                            <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                            </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <h3 className="text-base font-semibold text-gray-900" id="modal-title">Receive Products.</h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">Are you sure to receive the invoice?</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button onClick={() => receiveAndDisplay()} type="button" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto">Receive</button>
                                    <button onClick={() => setConfirm(false)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <ToastContainer />
            
        </div>
    )
}

export default ReceiveProduct