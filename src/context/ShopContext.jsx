import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Doing this to avoid prop drilling.
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [refresh, setRefresh] =useState(false);

    const navigate = useNavigate();
    const backendUrl = "https://riptide-backend.onrender.com";

    const getProductData = async () => {
        if(!token) return ;
        console.log("Calling getProductData");
        
        const response = await axios.get(`${backendUrl}/api/product/list`, {headers: {token}});
        setProducts(response.data.products)
    }

    useEffect(() => {
        if(token){
            getProductData();   
        }
    }, [token,refresh]);

    const addProduct = async(formData)=> {
        try {
            
            const response = await axios.post(`${backendUrl}/api/product/add`, 
                formData, 
                {headers: {token}}
            )
            if(response.data.success){
                setProducts(prevProducts=> [...prevProducts, response.data.newProduct]  )
                setRefresh(prev => !prev)
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    

    // Whenever we will add any varieable, state varieable, function within this value object 
    // we can access it in any component using the context API. 
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        addProduct
    }


    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;