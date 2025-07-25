import React, { useContext } from 'react'
import './CartItems.css'
import remove_icon from '../Assets/Frontend_Assets/cart_cross_icon.png'

import { ShopContext } from '../../Context/ShopContext.jsx'
import { Link } from 'react-router-dom'
const CartItems = () => {
    const {all_product,cartItems,addTocart,removeFromCart,getTotalCartAmount} = useContext(ShopContext)

    return (
    <div className="cartitems">
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            if(cartItems[e.id] > 0)
            {
                return (
                <div>
                    <div className="cartitems-format cartitems-format-main">
                    <img src={e.image} alt="" className='cartitems-product-icons' />
                    <p>{e.name}</p>
                    <p>&#8377;{e.new_price}</p>
                    <button className="cartitems-quantity">{cartItems[e.id]}</button>
                    <p>&#8377;{e.new_price*cartItems[e.id]}</p>
                    <img className="cartitems-remove-icons" src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                    </div>
                </div>
                ) 
            }
            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-items">
                        <p>Subtotal</p>
                        <p>&#8377;{getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-items">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-items">
                        <h3>Total</h3>
                        <h3>&#8377;{getTotalCartAmount()}</h3>
                    </div>
                    <Link to= '/checkout'>PROCEED TO CHECK OUT</Link>
                </div>
            </div>
            <div className="cartitems-promocode">
                    <p>If you have a promo code enter here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='Promo Code'/>
                        <button>Submit</button>
                    </div>
                </div>
        </div>

    </div>
  )
}

export default CartItems