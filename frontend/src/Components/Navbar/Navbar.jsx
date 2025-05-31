import React, {useContext, useRef, useState} from 'react'
import './Navbar.css'
import logo from '../Assets/Frontend_Assets/logo.png'
import cart_icon from '../Assets/Frontend_Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import drop_down_icon from '../Assets/Frontend_Assets/nav_dropdown.png'


export const Navbar = () => {
    const {getTotalCartItems} = useContext(ShopContext)
    const [menu, setmenu] = useState("shop")
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open')
    }
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <img className='nav-dropdown' onClick ={dropdown_toggle} src={drop_down_icon} alt="" />
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setmenu("shop")}}><Link to = '/' style={{textDecoration: 'none', color: 'inherit'}}>Shop</Link>{menu === "shop" ? <hr/> : <></>}</li>
            <li onClick={()=>{setmenu("men")}}><Link to = '/men' style={{textDecoration: 'none', color: 'inherit'}}>Men</Link>{menu === "men" ? <hr/> : <></>}</li>
            <li onClick={()=>{setmenu("women")}}><Link to = '/women' style={{textDecoration: 'none', color: 'inherit'}}>Women</Link>{menu === "women" ? <hr/> : <></>}</li>
            <li onClick={()=>{setmenu("kids")}}><Link to = '/kids' style={{textDecoration: 'none', color: 'inherit'}}>Kids</Link>{menu === "kids" ? <hr/> : <></>}</li>
        </ul>
        <div className="nav-login-cart">
            <Link to ='/login' style={{textDecoration: 'none', color: 'inherit'}}><button>Login</button></Link>
            <Link to = '/cart' style={{textDecoration: 'none', color: 'inherit'}}><img src={cart_icon} alt="" /></Link> 
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}
