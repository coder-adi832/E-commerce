import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/Frontend_Assets/banner_mens.png';
import women_banner from './Components/Assets/Frontend_Assets/banner_women.png';
import kids_banner from './Components/Assets/Frontend_Assets/banner_kids.png';
import React, { lazy, Suspense } from 'react';
import './Pages/CSS/Loader.css'; // Spinner styles

// Lazy-loaded pages
const Shop = lazy(() => import('./Pages/Shop'));
const ShopCategory = lazy(() => import('./Pages/ShopCategory'));
const Product = lazy(() => import('./Pages/Product'));
const LoginSignUp = lazy(() => import('./Pages/LoginSignUp'));
const Cart = lazy(() => import('./Pages/Cart'));
const Login = lazy(() => import('./Pages/Login'));
const CheckOut = lazy(() => import('./Pages/CheckOut'));
const Payment = lazy(() => import('./Pages/Payment'));

// Spinner component
const Spinner = ({ label = "Page" }) => (
  <div className="spinner-container">
    <div className="spinner"></div>
    <p>Loading {label}...</p>
  </div>
);

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<Spinner label="Page" />}>
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/men" element={<ShopCategory banner={men_banner} category="men" />} />
            <Route path="/women" element={<ShopCategory banner={women_banner} category="women" />} />
            <Route path="/kids" element={<ShopCategory banner={kids_banner} category="kid" />} />
            <Route path="/product" element={<Product />}>
              <Route path=":productID" element={<Product />} />
            </Route>
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/userlogin" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
