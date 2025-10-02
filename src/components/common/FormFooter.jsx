import { CircleX, MoveRight, X } from 'lucide-react';
import React from 'react'

const FormFooter = () => {
  return (
    <div className='flex justify-between mt-4 border-t-2 border-gray-300'>
      <div className='mt-6'>
        <button className='bg-red-500 cursor-pointer hover:bg-red-600 flex items-center gap-2 font-bold text-white p-4 rounded-lg'>Cancel
        <CircleX/>
        </button>
      </div>

      <div className='flex gap-5 mt-6'>
        <div>
          <button className='cursor-pointer flex items-center gap-3 font-bold p-4 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200'>Save Draft
            <MoveRight></MoveRight>
          </button>
        </div>
        <div>
          <button className='bg-[#244034] flex items-center gap-3 font-bold text-white p-4 cursor-pointer rounded-lg'>Next Step
            <MoveRight></MoveRight>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormFooter;