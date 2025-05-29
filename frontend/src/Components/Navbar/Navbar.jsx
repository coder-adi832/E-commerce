import React, {useState} from 'react'
import './Navbar.css'
import logo from '../Assets/Frontend_Assets/logo.png'
import cart_icon from '../Assets/Frontend_Assets/cart_icon.png'
import { Link } from 'react-router-dom'



export const Navbar = () => {
    const [menu, setmenu] = useState("shop")
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setmenu("shop")}}><Link to = '/' style={{textDecoration: 'none', color: 'inherit'}}>Shop</Link>{menu === "shop" ? <hr/> : <></>}</li>
            <li onClick={()=>{setmenu("men")}}><Link to = '/men' style={{textDecoration: 'none', color: 'inherit'}}>Men</Link>{menu === "men" ? <hr/> : <></>}</li>
            <li onClick={()=>{setmenu("women")}}><Link to = '/women' style={{textDecoration: 'none', color: 'inherit'}}>Women</Link>{menu === "women" ? <hr/> : <></>}</li>
            <li onClick={()=>{setmenu("kids")}}><Link to = '/kids' style={{textDecoration: 'none', color: 'inherit'}}>Kids</Link>{menu === "kids" ? <hr/> : <></>}</li>
        </ul>
        <div className="nav-login-cart">
            <Link to ='/login' style={{textDecoration: 'none', color: 'inherit'}}><button>Login</button></Link>
            <Link to = '/cart' style={{textDecoration: 'none', color: 'inherit'}}><img src={cart_icon} alt="" /></Link> 
            <div className="nav-cart-count">0</div>
        </div>
    </div>
  )
}
