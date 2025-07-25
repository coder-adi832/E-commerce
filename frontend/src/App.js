
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignUp from './Pages/LoginSignUp';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/Frontend_Assets/banner_mens.png'
import women_banner from './Components/Assets/Frontend_Assets/banner_women.png'
import kids_banner from './Components/Assets/Frontend_Assets/banner_kids.png'
import Login from './Pages/Login';
import CheckOut from './Pages/CheckOut';
import Payment from './Pages/Payment';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/' element = {<Shop></Shop>}/>
            <Route path='/men' element = {<ShopCategory banner = {men_banner} category = "men"/>}/>
            <Route path='/women' element = {<ShopCategory banner = {women_banner} category = "women"/>}/>
            <Route path='/kids' element = {<ShopCategory banner = {kids_banner} category = "kid"/>}/>
            <Route path='product' element = {<Product/>}>
              <Route path=':productID' element = {<Product/>}/>
            </Route>
            <Route path='/login' element = {<LoginSignUp/>}/>
            <Route path='/userlogin' element = {<Login/>}/>
            <Route path='/cart' element = {<Cart/>}/>
            <Route path='/checkout' element = {<CheckOut/>}/>
            <Route path='/payment' element = {<Payment/>}/>
          </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
