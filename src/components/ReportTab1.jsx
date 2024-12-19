import { useState } from "react";

const ReportTab1 = ({ setLoading, wrnMsg, scssMsg, errMsg, tab }) => {
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

        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_HOST_LINK}/api/v1/report/getStockDetails`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }) 
            const tblData = await res.json();
            setTableData(tblData.stockDetailsDto);
            setLoading(false)
            if (tblData.message === "SUCCESS" && tblData.stockDetailsDto.length === 0) wrnMsg("No items found!!!")
            else if (tblData.message === "SUCCESS" && tblData.stockDetailsDto.length > 0) scssMsg("Found!!!")
            else if (tblData.message === "FAILED") errMsg("Failed!!!")
        }
        catch (error) {
            setLoading(false)
            errMsg("Server may not connected!!!")
            console.log("error: ", error)

        }
    }
    const copy = (msg)=>{   
        navigator.clipboard.writeText(msg)
          .then(() => {
            scssMsg("Copied to clipboard!"); 
          })
          .catch(err => {
            console.error("Failed to copy: ", err);
          });
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
                                <th scope="col" className="block w-[10px] text-wrap px-6 py-3">
                                    Invoice No.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product Code
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Transaction Detail
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Transaction Type
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
                                        <th style={{ width: "10%" }} scope="row" className="w-1/4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <p onClick={()=>copy(d.invoiceNo)} title={d.invoiceNo}  className="w-28 overflow-x-clip">{d.invoiceNo}</p>
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {d.productCode}
                                        </th>
                                        <td className="px-6 py-4">
                                            {d.productName}
                                        </td>
                                        <td className="px-6 py-4 text-end">
                                            <p className={`${((d.currentStockQty - d.previousStockQty) < 0) ? 'text-red-500' : 'text-green-500'}`}>{d.previousStockQty}{((d.currentStockQty - d.previousStockQty) < 0) ? "-" : "+"}{Math.abs(d.currentStockQty - d.previousStockQty)}{`=${d.currentStockQty}`}</p>
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

export default ReportTab1