import React from 'react'
import { Link } from 'react-router-dom'
import addproductimg from '../assets/Admin_Assets/Product_Cart.svg'
import listproductimg from '../assets/Admin_Assets/Product_list_icon.svg'
import removeproductimg from '../assets/Admin_Assets/remove.png'

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col py-8 px-4 shadow-md">
      <Link
        to="/addproduct"
        className="flex items-center gap-4 mb-4 p-3 rounded hover:bg-gray-700 transition-colors"
      >
        <img src={addproductimg} alt="Add Product" className="h-6 w-6" />
        <p className="text-lg">Add Product</p>
      </Link>

      <Link
        to="/listproduct"
        className="flex items-center gap-4 mb-4 p-3 rounded hover:bg-gray-700 transition-colors"
      >
        <img src={listproductimg} alt="List Product" className="h-6 w-6" />
        <p className="text-lg">List Product</p>
      </Link>

      <Link
        to="/removeproduct"
        className="flex items-center gap-4 p-3 rounded hover:bg-gray-700 transition-colors"
      >
        <img src={removeproductimg} alt="Remove Product" className="h-6 w-6" />
        <p className="text-lg">Remove Product</p>
      </Link>
    </div>
  )
}

export default Sidebar
