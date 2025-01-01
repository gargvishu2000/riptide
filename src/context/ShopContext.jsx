import { createContext } from "react";
import { products } from "../assets/assets";
 
// Doing this to avoid prop drilling.
export const ShopContext = createContext();

const shopContextProvider=(props)=>{

     const currency ='$';
     const delivery_fee =10;

    // Whenever we will add any varieable, state varieable, function within this value object 
    // we can access it in any component using the context API. 
    const value ={
        products, currency, delivery_fee
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default shopContextProvider;