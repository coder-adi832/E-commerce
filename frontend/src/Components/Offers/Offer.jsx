import React from 'react'
import './Offers.css'
import exl_image from '../Assets/Frontend_Assets/exclusive_image.png'
const Offer = () => {
  return (
    <div className="offer">
        <div className="offer-left">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <button>Check Now</button>
        </div>
        <div className="offer-right">
            <img src={exl_image} alt="" />
        </div>
    </div>
  )
}

export default Offer