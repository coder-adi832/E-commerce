import React from 'react'
import './Footer.css'
import insta from '../Assets/Frontend_Assets/instagram_icon.png'
import whats from '../Assets/Frontend_Assets/whatsapp_icon.png'
import pin from '../Assets/Frontend_Assets/pintester_icon.png'
import footer_logo from '../Assets/Frontend_Assets/logo_big.png'
const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Product</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icons">
            <div className="footer-icons-container">
                <img src={insta} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={pin} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={whats} alt="" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2025 - All Right reserved</p>
        </div>
    </div>
  )
}

export default Footer