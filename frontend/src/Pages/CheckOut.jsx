import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import './CSS/CheckOut.css'; 
import { Link } from 'react-router-dom';

const CheckOut = () => {
  const { all_product, cartItems, getTotalCartAmount } = useContext(ShopContext);
  
  

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Your Cart</h1>
      <div className="checkout-items">
        {Object.keys(cartItems).map((id) => {
          if (cartItems[id] > 0) {
            const item = all_product.find((p) => p.id === Number(id));
            if (!item) return null;

            return (
              <div key={id} className="checkout-item">
                <span>{item.name} x {cartItems[id]}</span>
                <span>₹{item.new_price * cartItems[id]}</span>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="checkout-total">
        <strong>Total:</strong> ₹{getTotalCartAmount()}
      </div>
      <Link to = '/payment' className="checkout-button" >
        Checkout
      </Link>
    </div>
  );
};

export default CheckOut;
