import React, { createContext, useState } from "react";

import all_product from "../Components/Assets/Frontend_Assets/all_product.js"
export const ShopContext = createContext(null);
const getDefaultCart = ()=>{
        let cart = {}
        for(let index = 0;index< all_product.length+1;index++){
            cart[index] = 0;
        }
        return cart;
    }
const ShopContextProvider = (props) => {

    const [cartItems, setcartItems] = useState(getDefaultCart());
    
    
    const addToCart = (itemId)=> {
        setcartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(cartItems)
    }
    
    const removeFromCart = (itemId)=> {
        setcartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    
    const getTotalCartAmount = () => {
        let totalAmout = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = all_product.find((product)=>product.id === Number(item))
                totalAmout += itemInfo.new_price * cartItems[item]
            }
        }
        return totalAmout;
    }

    const getTotalCartItems = () => {
        let totalItems = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                totalItems += cartItems[item]
            }
        }
        return totalItems;
    }
    const contextValue = {all_product,cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider