import { useEffect, useState } from "react";
import Navbar from "./nabbar";
import { toast, ToastContainer } from "react-toastify";

// /api/v1/products/addProduct/

const ProductInfo = () => {
    const [allProducts, setAllProducts] = useState([])
    const [showDropdown, setShowDropdown] = useState(false);
    const [addNew, setAddNew] = useState(true);
    const [loading, setLoading] = useState(false)
    const [flg, setFlg] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    const [formData, setFormData] = useState({
        productCode: "",
        productName: "",
        packSize: "",
        tradePrice: "",
        mrp: ""
    });



    useEffect(() => {
        return () => {
            fetch(`${import.meta.env.VITE_HOST_LINK}/api/v1/products/findAllProduct/`)
                .then(response => response.json())
                .then(data => setAllProducts(data?.productInfoDtos));
        };
    }, [flg])




    const inputFieldOnBlur = () => setTimeout(() => setShowDropdown(false), 500)
    const saveProductAction = async () => { 
        if (formData.mrp == "" || formData.tradePrice == "" || formData.packSize == "" || formData.productName == "") {
            wrnMsg("Please enter all field!!!");
            return;
        }
        try {
            setLoading(true)
            let api = "";
            if(formData.productCode==="") api = `${import.meta.env.VITE_HOST_LINK}/api/v1/products/addProduct/`
            else api = `${import.meta.env.VITE_HOST_LINK}/api/v1/products/updateProduct/`
            const res = await fetch(api,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                }
            ) 
            const data = await res.json(); 
            setFormData(data.productInfoDto)
            setFlg(!flg)

            setLoading(false)
            setAddNew(false)
            if (data.message == "SUCCESS") scssMsg("Save Successfull!!!")
            else errMsg("Failed!!!")

        } catch (error) {
            errMsg("Failed!!!")
            setLoading(false)
            console.log("HK error: " + error)
        }

    }
    const scssMsg = (msg) => toast.success(msg);
    const errMsg = (msg) => toast.error(msg);
    const wrnMsg = (msg) => toast.warn(msg);
    const searchOnFocusAction = () => {
        setShowDropdown(true)
        setAddNew(false);
    }
    const addNewAction = () => {
        setAddNew(true)
        setSearchTerm("")
        setFilteredSuggestions([])
        setFormData({ productCode: "", productName: "", packSize: "", tradePrice: "", mrp: "" });
    }
    const updateAction = () => {
        if (formData.productCode === "") {
            errMsg("please select product first!!!")
            return;
        }
        setAddNew(true)
        setSearchTerm("")
        setFilteredSuggestions([]) 
    }
    const filterSearchOnType = (event) => {
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
    const inputAction = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const suggestionItemClickAction = (suggestion) => {
        setSearchTerm(suggestion.productCode + " | " + suggestion.productName); // Set the clicked suggestion in the input
        setFormData(suggestion)
        setShowDropdown(false); // Close dropdown 
    };

    return (
        <div>
            <Navbar />
            <h1 className="text-center text-3xl font-bold font-serif">Product Info</h1>
            <div className="w-full  p-10">
                <div>
                    <div className="flex ">
                        <div className=" flex items-ends djustify-end ">
                            <label htmlFor="small" className="block mb-2 text-sm font-medium ">select product</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={filterSearchOnType}
                                onFocus={() => searchOnFocusAction()} // Show dropdown on focus
                                onBlur={inputFieldOnBlur} // Hide dropdown on blur
                                className="input w-full px-4 text-sm py-2 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 "
                                placeholder="Search..."
                            />
                        </div>
                        <button onClick={() => addNewAction()} className="btn btn-primary">Add new</button>
                        <button onClick={() => updateAction()} className="btn btn-primary">Update</button>
                    </div>
                    <div className={`rounded absolute ${showDropdown && 'h-full'} w-1/4 p-5`}>
                        <div className="">
                            {showDropdown && filteredSuggestions.length > 0 && (
                                <ul className="absolute left-0 right-0 z-10  bg-gray-700 rounded-lg shadow-lg max-h-full overflow-y-auto">
                                    {
                                        filteredSuggestions.map((suggestion, index) => (
                                            <li
                                                key={index}
                                                value={suggestion}
                                                onClick={() => suggestionItemClickAction(suggestion)}
                                                className="px-4 py-2 cursor-pointer hover:bg-gray-500 w-full" >
                                                {suggestion.productCode + " | " + suggestion.productName}
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                    </div>


                    <div className=" relative w-auto grid grid-cols-2 gap-x-4 shadow-lg p-6 rounded">

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Product Code</span>
                            </label>
                            <input
                                type="text"
                                name="productCode"
                                placeholder="product Code"
                                className="input input-bordered"
                                disabled
                                value={formData?.productCode}
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
                                value={formData?.productName}
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
                                value={formData?.packSize}
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
                                value={formData?.tradePrice}
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
                                value={formData?.mrp}
                                onChange={inputAction}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <div>
                                <label className="label">
                                    <span className="label-text">Click to Save</span>
                                </label>
                                <button onClick={() => saveProductAction()} type="submit" className="btn btn-primary w-full">
                                    Save Product
                                </button>
                            </div>
                        </div>
                        {
                            (!addNew) &&
                            <div className="absolute bg-slate-600 bg-opacity-10 w-full h-full rounded p-2">
                                <h1 className="text-red-800">view mode</h1>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
            {
                loading &&
                <div role="status" className="absolute h-screen w-screen top-0 left-0 flex justify-center items-center">
                    <div className="bg-blue-500 w-56 h-40 rounded-xl bg-opacity-70 flex justify-center items-center">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }

        </div>
    )
}
export default ProductInfo;