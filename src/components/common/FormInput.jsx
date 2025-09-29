import React from 'react'

const FormInput = () => {
  return (
    <div className='flex flex-col m-4'>
      <label htmlFor={name} className='font-bold m-1'>Job Title</label>
    <input className='border-2 border-gray-400 w-72 p-4 rounded-lg focus:outline-none focus:border-[#132e13]' placeholder='enter na neame'>
    </input>
    </div>
  )
}



export default FormInput