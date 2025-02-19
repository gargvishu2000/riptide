import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import {products} from '../assets/assets.js';

// Doing this to avoid prop drilling.
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const getProductData = async () => {
        setData(products);
    }

    useEffect(() => {
        getProductData()
    }, [])

    // Whenever we will add any varieable, state varieable, function within this value object 
    // we can access it in any component using the context API. 
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
    }


    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;