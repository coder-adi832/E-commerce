import React from 'react'
import Sidebar from '../../Components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct'
import ListProduct from '../../Components/ListProduct'
import RemoveProduct from '../../Components/RemoveProduct'

const Admin = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100 overflow-auto">
        <Routes>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/listproduct" element={<ListProduct />} />
          <Route path="/removeproduct" element={<RemoveProduct />} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin
