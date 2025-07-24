import React, { useContext, useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/Frontend_Assets/logo.png';
import cart_icon from '../Assets/Frontend_Assets/cart_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import drop_down_icon from '../Assets/Frontend_Assets/nav_dropdown.png';

export const Navbar = () => {
  const { cartItems } = useContext(ShopContext);
  const [menu, setMenu] = useState('shop');
  const menuRef = useRef();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    alert('Logged out successfully');
  };

  const getCartCount = () => {
    let total = 0;
    for (const key in cartItems) {
      total += cartItems[key];
    }
    return total;
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <img className="nav-dropdown" onClick={dropdown_toggle} src={drop_down_icon} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => { setMenu('shop'); }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Shop</Link>
          {menu === 'shop' ? <hr /> : null}
        </li>
        <li onClick={() => { setMenu('men'); }}>
          <Link to="/men" style={{ textDecoration: 'none', color: 'inherit' }}>Men</Link>
          {menu === 'men' ? <hr /> : null}
        </li>
        <li onClick={() => { setMenu('women'); }}>
          <Link to="/women" style={{ textDecoration: 'none', color: 'inherit' }}>Women</Link>
          {menu === 'women' ? <hr /> : null}
        </li>
        <li onClick={() => { setMenu('kids'); }}>
          <Link to="/kids" style={{ textDecoration: 'none', color: 'inherit' }}>Kids</Link>
          {menu === 'kids' ? <hr /> : null}
        </li>
      </ul>
      <div className="nav-login-cart">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getCartCount()}</div>
      </div>
    </div>
  );
};
