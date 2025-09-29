import React from 'react'
import images from "../../assets/images/images.png";
const Navbar = () => {
  return (
    <div className='body-color flex justify-between items-center'>
      <img src={images} className='w-auto h-16 m-4'/>
      <div>
        <ul className='flex gap-7'>
          <li><a href='#' className='text-base font-bold hover:bg-[#c5f542] text-white rounded-2xl transition duration-300 p-3'>Home</a></li>
          <li><a href='#' className='text-base font-bold hover:bg-[#c5f542] text-white rounded-2xl transition duration-300 p-3'>Find Jobs</a></li>
          <li><a href='#' className='text-base font-bold hover:bg-[#c5f542] text-white rounded-2xl transition duration-300 p-3'>About</a></li>
          <li><a href='#' className='text-base font-bold hover:bg-[#c5f542] text-white rounded-2xl transition duration-300 p-3'>Blogs</a></li>
        </ul>
      </div>
      <div className='mr-9'>
        <ul className='flex gap-3'>
          <li><a href='#' className='text-base font-bold bg-[#c5f542] hover:text-white rounded-2xl transition duration-300 p-3'>Post Job</a></li>
          <li><a href='#' className='text-base font-bold bg-[#c5f542] hover:text-white rounded-2xl transition duration-300 p-3'>Login </a></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar