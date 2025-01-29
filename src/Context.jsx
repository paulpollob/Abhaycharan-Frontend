import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
/* eslint-disable react/prop-types */


const MyContext = createContext();
export { MyContext }

const Context = ({ children }) => {


    const scssMsg = (msg) => toast.success(msg);
    const errMsg = (msg) => toast.error(msg);
    const wrnMsg = (msg) => toast.warn(msg);
    const [flg, setFlg] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [category, setCategory] = useState([])


    useEffect(() => {
        fetch(`${import.meta.env.VITE_HOST_LINK}/api/v1/products/findAllProduct/`)
            .then(response => response.json())
            .then(data => setAllProducts(data?.productInfoDtos));
    }, [flg])

    useEffect(()=>{
        const category =  allProducts.map(({productCategory})=>({ value:productCategory, label:productCategory }))
        const uniqueCategory = Array.from(
            new Map(category.map(item => [item.value, item])).values()
        );
        setCategory(uniqueCategory);
    }, [allProducts])



    const value = { allProducts, category, setCategory, setFlg, scssMsg, errMsg, wrnMsg }
    // const value = { loading, createUser, LogIn, logOut, user, setUser, products, setProducts, cart, setCart, orderdItem, setItem};
    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>

    )
}

export default Context