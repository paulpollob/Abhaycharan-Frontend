import { IoIosCloseCircleOutline } from "react-icons/io";
import Modal from "./Modal";
import { useRef, useState } from "react";
import CreatableSelect from "react-select/creatable";
/* eslint-disable react/prop-types */

const SoldReport = ({ setLoading, wrnMsg, scssMsg, errMsg, tab }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [single, setSingle] = useState(true);
    const [invcAndNtDt, setInvcAndNtDt] = useState(true);
    const [tableData, setTableData] = useState([])
    const [subTableData, setSubTabledata] = useState([]);
    const printContents = useRef(null);
    const [formData, setFormData] = useState({
        invoiceNo: "",
        invoiceDate: "",
        fromDate: "",
        toDate: ""
    });



    const onCloseModal = () => {
        setIsModalOpen(false);
    }
    const invcAndNtDtAction = (flg) => {
        setFormData({ ...formData, ['invcAndNtDt']: flg })
        setInvcAndNtDt(flg);
    }
    const inputAction = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    const searchAction = async () => {
        let data = {
            "single": single,
            "invcAndNtDt": invcAndNtDt
        }
        if (single) {
            if (invcAndNtDt) {
                if (formData.invoiceNo === "") {
                    wrnMsg("Enter Invoice No!!!")
                    return;
                }
                data = { ...data, ["invoiceNo"]: formData.invoiceNo }
            }
            else {
                if (formData.invoiceDate === "") {
                    wrnMsg("Enter invoice Date!!!")
                    return;
                }
                data = { ...data, ["invoiceDate"]: formData.invoiceDate }
            }
        }
        else {
            if (formData.fromDate === "" || formData.toDate === "") {
                wrnMsg("Enter start and end date!!!");
                return;
            }
            data = { ...data, ["fromDate"]: formData.fromDate }
            data = { ...data, ["toDate"]: formData.toDate }
        }

        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_HOST_LINK}/api/v1/sell/getSoldProducts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            const tblData = await res.json();
            console.log("HK data: ", tblData)
            setTableData(tblData.sellingInfoDtoList);
            setLoading(false)
            if (tblData.message === "SUCCESS" && tblData.sellingInfoDtoList?.length === 0) wrnMsg("No items found!!!")
            else if (tblData.message === "SUCCESS" && tblData.sellingInfoDtoList?.length > 0) scssMsg("Found!!!")
            else if (tblData.message === "FAILED") errMsg("Failed!!!")
        }
        catch (error) {
            setLoading(false)
            errMsg("Server may not connected!!!")
            console.log("error: ", error)

        }
    }
    const copy = (msg) => {
        navigator.clipboard.writeText(msg)
            .then(() => {
                scssMsg("Copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    }
    const printAction = () => {
        // const printContents = document.getElementById("popup-content").innerHTML;
        // const printContents = e.target.parentNode.innerHTML 
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
            <html>
                <head>
                    <title>Receive Products</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f4f4f4; }
                    </style>
                </head>
                <body>${printContents.current.innerHTML}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };


    return (
        <div style={{ transform: `translateX(-${tab * 100}%)` }} className={` transition-transform duration-500 ease-in-out abdsolute s-0  w-1/2 -translate-x-full p-4 min-w-full overflow-hidden bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg ${(tab == 1) ? ' ' : ' '} `}>
            <div className="p-0">
                <div className=" flex flex-col md:flex-row gap-2">
                    <div className="w-full overflow-hidden">
                        <div className={` flex transition-all duration-500 rounded-xl p-1  ${(single) ? '-translate-y-0' : '-translate-y-full'} h-full flex w-full border border-slate-800`}>
                            <div className=" h-0">
                                <div className="flex border border-gray-600 rounded-xl">
                                    <div onClick={() => invcAndNtDtAction(true)} className="flex items-center ps-4 rounded dark:border-gray-700">
                                        <input checked={invcAndNtDt === true} onChange={() => invcAndNtDtAction(true)} id="invoiceNo" type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600 cursor-pointer"></input>
                                        <div className="relative  ">
                                            <input name="invoiceNo" type="text" onChange={(e) => inputAction(e)} value={`${formData.invoiceNo}`} id="invc" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-red-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="invc" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Invoice No</label>
                                        </div>
                                    </div>
                                    <div onClick={() => invcAndNtDtAction(false)} className="flex items-center ps-4 rounded dark:border-gray-700">
                                        <input checked={invcAndNtDt === false} onChange={() => invcAndNtDtAction(true)} id="date" type="radio" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"></input>
                                        <label htmlFor="date" className="w-full ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            <input htmlFor="date" name="invoiceDate" onChange={(e) => inputAction(e)} value={`${formData.invoiceDate}`} type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  px-2 py-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select invoice date"></input>
                                        </label>
                                    </div>
                                    <button onClick={() => searchAction()} type="submit" className=" p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-xl ms-2 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg className="w-auto h-4" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={`transition-all duration-500 rounded-xl p-1  ${(single) ? '-translate-y-0' : '-translate-y-full'} h-full flex w-full border border-slate-800`}>
                            <div className="flex items-center justify-center">
                                <div className="ps-1 flex items-center justify-center border border-gray-600 rounded-xl">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                                            <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                            </svg>
                                        </div>
                                        <input name="fromDate" onChange={(e) => inputAction(e)} type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start"></input>
                                    </div>
                                    <span className="mx-2 text-gray-500">to</span>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                            </svg>
                                        </div>
                                        <input id="datepicker-range-end" name="toDate" onChange={(e) => inputAction(e)} type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end"></input>
                                    </div>
                                    <button onClick={() => searchAction()} type="submit" className=" p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-xl ms-2 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg className="w-auto h-4" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <CreatableSelect styles={{
                            control: (baseStyles, state) => ({
                                display: "flex ",
                                justifyContent: "center",
                                alighItem: "center",
                                height: "100%",
                                width: "100%",
                                top: "0",
                                color: "white",
                                backgroundColor: `#334155 ${state.isDisabled && '#334155'}`
                            }),
                            menu: (baseStyles) => (
                                {
                                    ...baseStyles,
                                    backgroundColor: `#334155`,
                                    color: "white"
                                }
                            )
                        }}
                            className="  w-full h-full "
                            name="productCategory"
                            isClearable
                            // isDisabled={isLoading}
                            // isLoading={isLoading}
                            onChange={(newValue) => setFormData({ ...formData, ['productCategory']: newValue.value })}
                            // onCreateOption={handleCreate}
                            // options={category}
                            value={formData.productCategory}
                        />
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="relative flex items-center justify-center max-w-full rounded-full border border-slate-600">
                            <label onClick={() => setSingle(!single)} className={`  transition-all duration-100 w-1/2  mx-2 text-center p-1 cursor-pointer`}>Signle</label>
                            <label onClick={() => setSingle(!single)} className={`  transition-all duration-100 w-1/2 mx-2 text-center cursor-pointer`}>Range</label>
                            <div className={` transition-all duration-500 w-1/2 ${(single) ? ' -translate-x-1/2 bg-blue-500 bg-opacity-10' : ' translate-x-1/2 bg-blue-500 bg-opacity-10'}  absolute border rounded-full size-full border-slate-600 `}> </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>




                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Selling No.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Customer Name.
                                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Customer Phone.
                                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Invoice Date
                                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                tableData?.map(d =>
                                    <tr key={d.invoiceNo} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <p onClick={() => copy(d?.sellId)} title={d?.sellId} className="w-28 overflow-x-clip">{d?.sellId}</p>
                                        </th>
                                        <td className="px-6 py-4">
                                            {d?.customerName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {d?.customerPhoneNumber}
                                        </td>
                                        <td className="px-6 py-4">
                                            {d?.createdDate}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a onClick={() => { setIsModalOpen(true); setSubTabledata(d) }} href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>


            <Modal isOpen={isModalOpen} onClose={onCloseModal}>
                <Modal.CloseButton>
                    <IoIosCloseCircleOutline size={23} />
                </Modal.CloseButton>
                <div ref={printContents}>
                    <Modal.Header>
                        <div className=" w-full flex flex-col justify-center items-center">
                            <p><b>Customer Name:</b> {subTableData?.customerName} <b>Mob:</b> {subTableData?.customerPhoneNumber}</p>
                            <span><b>Address: </b>{subTableData?.customerAddress}</span>
                            <hr className="bg w-full"></hr>
                        </div>
                    </Modal.Header>
                    <div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Product Code
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Product Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Selling Qty
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Mrp
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Total
                                        </th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        subTableData?.productInfo?.map(d =>
                                            <tr key={d.productCode} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {d.productCode}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {d.productName}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {d.sellingQty}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {d.mrp}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-2xl">৳</p>{d.mrp * d.sellingQty}
                                                </td>
                                            </tr>
                                        )
                                    }
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                                        </th>
                                        <td className="px-6 py-4">

                                        </td>
                                        <td className="px-6 py-4">

                                        </td>
                                        <td className="px-6 py-4">
                                            <p>Total: </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-2xl">৳</p>
                                            <p className="text-xl">
                                                {
                                                    (subTableData?.productInfo?.map(d => d.mrp * d.sellingQty))?.reduce((a, b) => a + b, 0)
                                                }
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                                {/* <hr className="bg w-full"></hr> */}
                            </table>
                        </div>
                    </div>
                </div>
                <button onClick={() => printAction()} className="rounded px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white">Print</button>
            </Modal>
        </div>
    )
}

export default SoldReport