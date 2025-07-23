import React from 'react'
import navlogo from '../assets/Admin_Assets/nav-logo.svg'
import navprofile from '../assets/Admin_Assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <img src={navlogo} alt="Logo" className="h-10 w-auto" />
      <img
        src={navprofile}
        alt="Profile"
        className="h-14 w-14 rounded-full cursor-pointer hover:scale-105 transition-transform duration-200"
      />
    </div>
  )
}

export default Navbar
