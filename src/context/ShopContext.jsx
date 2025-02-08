import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios'

// Doing this to avoid prop drilling.
export const ShopContext = createContext();

const shopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItem, setCartItem] = useState({})
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');

    const navigate = useNavigate()

    const addToCart = async (itemId, size) => {
        let cartData = structuredClone(cartItem);
        if (!size) {
            toast.error("Please Select Size");
            return;
        }
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1
        }
        setCartItem(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + "/api/cart/add", { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                if (cartItem[items][item] > 0) {
                    totalCount += cartItem[items][item];
                } else {
                    totalCount = 1;
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity;
        setCartItem(cartData);

        if(token){
            try {
                await axios.post(backendUrl+"/api/cart/update", {itemId,size,quantity},{headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItem) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItem[items]) {
                if (cartItem[items][item] > 0) {
                    totalAmount += itemInfo.price * cartItem[items][item];
                }
            }
        }
        return totalAmount;
    }

    const getProductData = async () => {
        try {
            const resposne = await axios.get(backendUrl + "/api/product/list");
            if (resposne.data.success) {
                setProducts(resposne.data.products)
            } else {
                toast.error(resposne.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'));
        }
    }, [])

    const getUserCart = async(token)=> {
        try {
            const response = await axios.post(backendUrl+"/api/cart/get",{},{headers:{token}})
            if(response.data.success){
                setCartItem(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    // Whenever we will add any varieable, state varieable, function within this value object 
    // we can access it in any component using the context API. 
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        addToCart, cartItem, getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl, setToken, token,
        setCartItem
    }


    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default shopContextProvider;