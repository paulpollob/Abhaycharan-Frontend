import { useState } from "react"
import Navbar from "./nabbar"
import { toast, ToastContainer } from "react-toastify";


function Report() {

    const scssMsg = (msg) => toast.success(msg);
    const errMsg = (msg) => toast.error(msg);
    const wrnMsg = (msg) => toast.warn(msg);


    const active = "text-white bg-blue-700 rounded-lg   w-full dark:bg-blue-600";
    const nactive = "rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
    const [single, setSingle] = useState(false);
    const [tab, setTab] = useState(0)

    return (
        <>
            <Navbar></Navbar>
            <div className="min-h-screen bg-base-200">
                <div className="container mx-auto py-2">
                    <h1 className="text-4xl font-bold text-center mb-2">Generate Reports</h1>
                    <div className="md:flex">
                        <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                            <li>
                                <a onClick={() => setTab(0)} className={`${(tab === 0) ? active : nactive} cursor-pointer inline-flex items-center px-4 py-3`} aria-current="page">
                                    <svg className="w-4 h-4 me-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                    </svg>
                                    All Transaction
                                </a>
                            </li>
                            <li>
                                <a onClick={() => setTab(1)} className={`${(tab === 1) ? active : nactive} cursor-pointer inline-flex items-center px-4 py-3 `}>
                                    <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"><path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" /></svg>
                                    Receive Product Report
                                </a>
                            </li>
                            <li>
                                <a onClick={() => setTab(2)} className={`${(tab === 2) ? active : nactive} cursor-pointer inline-flex items-center px-4 py-3 `}>
                                    <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                                    </svg>
                                    Sold Product Report
                                </a>
                            </li>
                            <li>
                                <a onClick={() => setTab(3)} className={`${(tab === 3) ? active : nactive} cursor-pointer inline-flex items-center px-4 py-3 `}>
                                    <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                                    </svg>
                                    Damage Product Report
                                </a>
                            </li>

                        </ul>
                        <div className={`relative flex w-full h-full overflow-hidden`}>
                            <Tab1 wrnMsg={wrnMsg} errMsg={errMsg} scssMsg={scssMsg} tab={tab}></Tab1>
                            <Tab2 tab={tab}></Tab2>
                            <Tab3 tab={tab}></Tab3>
                            <Tab4 tab={tab}></Tab4>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>

    )
}

const Tab1 = ({ wrnMsg, scssMsg, errMsg, tab }) => {
    const [single, setSingle] = useState(true);
    const [invcAndNtDt, setInvcAndNtDt] = useState(true);
    const [tableData, setTableData] = useState([])
    const [formData, setFormData] = useState({
        invoiceNo: "",
        invoiceDate: "",
        fromDate: "",
        toDate: ""
    });



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

        const res = await fetch(`${import.meta.env.VITE_HOST_LINK}/api/v1/report/getStockDetails`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        const tblData = await res.json();
        setTableData(tblData.stockDetailsDto);

        if (tblData.message === "SUCCESS" && tblData.stockDetailsDto.length === 0) wrnMsg("No items found!!!")
        else if (tblData.message === "SUCCESS" && tblData.stockDetailsDto.length > 0) scssMsg("Found!!!")
        else if (tblData.message === "FAILED") errMsg("Failed!!!")


        console.log("HK: ", tblData)
    }


    return (
        <div style={{ transform: `translateX(-${tab * 100}%)` }} className={` transition-transform duration-500 ease-in-out abdsolute s-0  w-1/2 -translate-x-full p-4 min-w-full overflow-hidden bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg ${(tab == 1) ? ' ' : ' '} `}>
            <div className="p-0">
                <div className=" flex flex-col md:flex-row gap-2">
                    <div className="w-full overflow-hidden">
                        <div className={` flex transition-all duration-500 rounded-xl p-1  ${(single) ? '-translate-y-0' : '-translate-y-full'} h-full flex w-full border border-slate-800`}>
                            <div className=" h-0">
                                <div className="flex border border-gray-600 rounded-xl">
                                    <div onClick={() => invcAndNtDtAction(true)} className="flex items-center ps-4 rounded dark:border-gray-700">
                                        <input checked={invcAndNtDt === true} id="invoiceNo" type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600 cursor-pointer"></input>
                                        <div className="relative  ">
                                            <input name="invoiceNo" type="text" onChange={(e) => inputAction(e)} value={`${formData.invoiceNo}`} id="invc" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-red-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="invc" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Invoice No</label>
                                        </div>
                                    </div>
                                    <div onClick={() => invcAndNtDtAction(false)} className="flex items-center ps-4 rounded dark:border-gray-700">
                                        <input checked={invcAndNtDt === false} id="date" type="radio" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"></input>
                                        <label htmlFor="date" className="w-full ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            <input htmlFor="date" name="invoiceDate" onChange={(e) => inputAction(e)} value={`${formData.invoiceDate}`} type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  px-2 py-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select invoice date"></input>
                                        </label>
                                    </div>
                                    <button onClick={() => searchAction()} type="submit" className=" p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-xl ms-2 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg className="w-auto h-4" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
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
                                            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
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
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product Code
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Detail
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableData?.map(d =>
                                    <tr key={d.id} className="bg-white dark:bg-gray-800">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {d.productCode}
                                        </th>
                                        <td className="px-6 py-4">
                                            {d.productName}
                                        </td>
                                        <td className="px-6 py-4 text-end">
                                            <p className={`${((d.currentStockQty-d.previousStockQty)<0)?'text-red-500':'text-green-500'}`}>{d.previousStockQty}{((d.currentStockQty-d.previousStockQty)<0)?"-":"+"}{Math.abs(d.currentStockQty-d.previousStockQty)}{`=${d.currentStockQty}`}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {d.invoiceType}
                                        </td>
                                        <td>
                                            {d.createdDate}
                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
const Tab2 = ({ tab }) => {
    return (
        <div style={{ transform: `translateX(-${tab * 100}%)` }} className={` transition-transform duration-500 ease-in-out abdsolute s-0 w-1/2 -translate-x-full p-6 min-w-full overflow-hidden bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg ${(tab == 2) ? ' ' : ' '} `}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Dashboard Tab</h3>
            <p className="mb-2">Nitai.</p>
        </div>
    )
}
const Tab3 = ({ tab }) => {
    return (
        <div style={{ transform: `translateX(-${tab * 100}%)` }} className={` transition-transform duration-500 ease-in-out absoslute s-0 w-1/2 translate-x-full p-6 min-w-full overflow-hidden bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg ${(tab == 3) ? ' ' : ' '} `}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Setting Tab</h3>
            <p className="mb-2">Gouranga.</p>


            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Microsoft Surface Pro
                            </th>
                            <td className="px-6 py-4">
                                White
                            </td>
                            <td className="px-6 py-4">
                                Laptop PC
                            </td>
                            <td className="px-6 py-4">
                                $1999
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Magic Mouse 2
                            </th>
                            <td className="px-6 py-4">
                                Black
                            </td>
                            <td className="px-6 py-4">
                                Accessories
                            </td>
                            <td className="px-6 py-4">
                                $99
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}
const Tab4 = ({ tab }) => {
    return (
        <div style={{ transform: `translateX(-${tab * 100}%)` }} className={` transition-transform duration-500 ease-in-out absoslute s-0 w-1/2 translate-x-full p-6 min-w-full overflow-hidden bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg ${(tab == 3) ? ' ' : ' '} `}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Setting Tab</h3>
            <p className="mb-2">Nityananda.</p>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Microsoft Surface Pro
                            </th>
                            <td className="px-6 py-4">
                                White
                            </td>
                            <td className="px-6 py-4">
                                Laptop PC
                            </td>
                            <td className="px-6 py-4">
                                $1999
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Magic Mouse 2
                            </th>
                            <td className="px-6 py-4">
                                Black
                            </td>
                            <td className="px-6 py-4">
                                Accessories
                            </td>
                            <td className="px-6 py-4">
                                $99
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Report