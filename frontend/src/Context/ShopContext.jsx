import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import baseproducts from '../Components/Assets/Frontend_Assets/all_product';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/allproducts");
        const fetchedProducts = res.data;

        const combinedProducts = [...baseproducts, ...fetchedProducts];
        setAllProduct(combinedProducts);

        console.log("Base products:", baseproducts);
        console.log("Fetched products:", fetchedProducts);
        console.log("Combined products:", combinedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setAllProduct(baseproducts);
      }
    };

    fetchAllProducts();
  }, []);

  const addToCart = (itemId) => {
    setAllProduct((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === itemId) {
          if (product.quantity > 0) {
            // ✅ Reduce product stock by 1
            return { ...product, quantity: product.quantity - 1 };
          } else {
            alert("This product is out of stock!");
          }
        }
        return product;
      })
    );

    const product = all_product.find((p) => p.id === itemId);
    if (product && product.quantity > 0) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      console.log(cartItems);
    }
  };

  const removeFromCart = (itemId) => {
    if (cartItems[itemId] > 0) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      setAllProduct((prevProducts) =>
        prevProducts.map((product) => {
          if (product.id === itemId) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        })
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
