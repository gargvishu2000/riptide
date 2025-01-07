import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { products } from "../assets/assets";
 
// Doing this to avoid prop drilling.
export const ShopContext = createContext();

const shopContextProvider=(props)=>{

     const currency ='$';
     const delivery_fee =10;
     const [search,setSearch]= useState('');
     const [showSearch,setShowSearch] = useState(false);
     const[cartItem,setCartItem]= useState({})

     const addToCart = async (itemId,size)=>{
        let cartData = structuredClone(cartItem);

        if(!size){
            toast.error("Please Select Size");
            return;
        }

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }else{
                cartData[itemId][size]=1;
            }
        }else{
            cartData[itemId]={};
            cartData[itemId][size]=1
        }
        setCartItem(cartData);
     }

     const getCartCount = ()=>{
        let totalCount=0;
        for(const items in cartItem){
            for(const item in cartItem[items]){
                console.log(cartItem[items][item]);
                console.log(item);
                if(cartItem[items][item]>0){
                    totalCount+= cartItem[items][item];
                }else{
                    totalCount =1;
                }
            }
        }
        return totalCount;
    }

    // Whenever we will add any varieable, state varieable, function within this value object 
    // we can access it in any component using the context API. 
    const value ={
        products, currency, delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        addToCart,cartItem,getCartCount
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default shopContextProvider;