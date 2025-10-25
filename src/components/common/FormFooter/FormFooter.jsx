import { CircleX, FileEdit, MoveLeft, MoveRight, Rocket, X } from 'lucide-react';
import React from 'react'

const FormFooter = ({onNext, onBack ,showPrevious, isLastStep}) => {
  return (
    <div className='w-full md:flex md:justify-between mt-4 border-t-2 border-gray-300'>
      <div className='mt-6 flex flex-clo md:flex-row gap-4 md:gap-0'>
        <button className='w-full md:w-auto bg-red-500 cursor-pointer hover:bg-red-600 flex items-center gap-2 font-bold text-white p-4 rounded-lg justify-between'>Cancel
          <CircleX className=''/>
        </button>
      </div>

      <div className='flex flex-col md:flex-row gap-5 mt-6'>
        <div>
          <button className='w-full md:w-auto cursor-pointer flex items-center gap-3 font-bold p-4 rounded-lg bg-gray-100 justify-between text-gray-800 hover:bg-gray-200'>Save Draft
            <FileEdit className=''></FileEdit>
          </button>
        </div>
        <div className='flex items-center'>
          {showPrevious&&<button onClick={onBack} className='w-full md:w-auto cursor-pointer flex items-center justify-between gap-3 font-bold p-4 rounded-lg bg-gradient-to-r from-[#a8d5ba] to-[#6fbf8d] text-[#0e241d] hover:from-[#99cfae] hover:to-[#63b582]
'><MoveLeft className=''></MoveLeft>Previous
          </button>}
        </div>
        <div>
          {!isLastStep?(<button type='button' onClick={onNext} className='w-full md:w-auto bg-[#244034] flex items-center justify-between gap-3 font-bold text-white p-4 cursor-pointer rounded-lg'>Next Step
            <MoveRight className=''></MoveRight>
          </button>):
          (<button
            className='w-full bg-green-600 flex items-center justify-between gap-3 font-bold text-white p-4 cursor-pointer rounded-lg'
          >
            Publish <Rocket className=''></Rocket>
          </button> )}
        </div>
      </div>
    </div>
  )
}

export default FormFooter;