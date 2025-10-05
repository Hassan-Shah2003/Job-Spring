import { CircleX, FileEdit, MoveLeft, MoveRight, Rocket, X } from 'lucide-react';
import React from 'react'

const FormFooter = ({onNext, onBack ,showPrevious, isLastStep}) => {
  return (
    <div className='flex justify-between mt-4 border-t-2 border-gray-300'>
      <div className='mt-6'>
        <button className='bg-red-500 cursor-pointer hover:bg-red-600 flex items-center gap-2 font-bold text-white p-4 rounded-lg'>Cancel
          <CircleX />
        </button>
      </div>

      <div className='flex gap-5 mt-6'>
        <div>
          <button className='cursor-pointer flex items-center gap-3 font-bold p-4 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200'>Save Draft
            <FileEdit></FileEdit>
          </button>
        </div>
        <div className='flex items-center'>
          {showPrevious&&<button onClick={onBack} className='cursor-pointer flex items-center gap-3 font-bold p-4 rounded-lg bg-gradient-to-r from-[#a8d5ba] to-[#6fbf8d] text-[#0e241d] hover:from-[#99cfae] hover:to-[#63b582]




'><MoveLeft></MoveLeft>Previous
          </button>}
        </div>
        <div>
          {!isLastStep?(<button onClick={onNext} className='bg-[#244034] flex items-center gap-3 font-bold text-white p-4 cursor-pointer rounded-lg'>Next Step
            <MoveRight></MoveRight>
          </button>):
          (<button
            className='bg-green-600 flex items-center gap-3 font-bold text-white p-4 cursor-pointer rounded-lg'
          >
           <Rocket></Rocket> Publish 
          </button> )}
        </div>
      </div>
    </div>
  )
}

export default FormFooter;