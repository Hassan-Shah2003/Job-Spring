import React, { useState } from 'react'
import images from "../../../assets/images/images.png";
import { Menu, X } from 'lucide-react';
const Navbar = () => {
  const [open, setopen] = useState(false)
  const menuItems = [
    "Home",
    "Find Jobs",
    "About",
    "Blogs",
  ];
  const sideAction = [
    "Home",
    "Find Jobs",
    "About",
    "Blogs",
    "LogIn",
    "Post Job",
  ];
  return (
    <nav className='flex justify-between bg-[#244034] items-center h-16'>
      <img src={images} className='w-auto h-16 mb-4 md:m-4' />
      <div className='h-[100%] justify-center hidden md:flex items-center'>
        <ul className='flex gap-2 lg:gap-7'>
          {menuItems.map((item, i) => {
            return (
              <li key={i}>
                <a className='text-base font-bold hover:bg-[#c5f542] text-white rounded-2xl transition duration-300 p-3'>{item}</a>
              </li>
            )
          })}
        </ul>
      </div>
      <div className='mr-9 hidden md:block'>
        <ul className='flex gap-3'>
          <li><a href='#' className='text-base font-bold bg-[#c5f542] hover:text-white rounded-2xl transition duration-300 p-3'>Post Job</a></li>
          <li><a href='#' className='text-base font-bold bg-[#c5f542] hover:text-white rounded-2xl transition duration-300 p-3'>Login </a></li>
        </ul>
      </div>
      <button
        onClick={() => setopen(!open)}
        className="md:hidden text-white focus:outline-none"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-50">
          <ul className="flex flex-col items-center space-y-4 py-4 text-gray-800 font-semibold">
            {sideAction.map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="text-base font-bold hover:bg-[#c5f542] rounded-2xl transition duration-300 p-3"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar