import React from 'react'
import FormFooter from '../../common/FormFooter'

const JobStepFour = () => {
  return (
    <div>
      <h1 className='font-bold text-2xl mb-5'>Application Settings</h1>
      <div>
        <h4 className='font-bold'>Apply Method <span className='ml-1 text-red-600'>*</span></h4>
        <div className='flex gap-2 mt-4'>
          <input className='' id='platform-apply' name='job-apply' type='radio' placeholder=''>
          </input>
          <label className='text-md' for="platform-apply">Apply via platform</label>
        </div>
        <div className='flex gap-2 mt-4'>
          <input className='' id='external-apply' name='job-apply' type='radio' placeholder=''>
          </input>
          <label className='text-md' for="external-apply">External application link</label>
        </div>

        <div className='mt-5 h-28 hidden'>
          <label className='font-bold'>Application URL<span className='ml-1 text-red-600'>*</span></label>
          <input className='border-2 border-gray-400 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' type='text' placeholder='https://...'>
          </input>
        </div>

        <div className='mt-6'>
          <label className='font-bold'>Contact Email<span className='ml-1 text-red-600'>*</span></label>
          <input className='border-2 border-gray-400 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' type='email' placeholder=''>
          </input>
        </div>

        <div className='mt-6'>
          <label className='font-bold'>Application Deadline (optional)<span className='ml-1 text-red-600'>*</span></label>
          <input className='border-2 border-gray-400 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' type='date' placeholder=''>
          </input>
        </div>

        <div className='mt-6'>
          <label className='font-bold'>Job Visibility<span className='ml-1 text-red-600'>*</span></label>
          <select className='border-2 border-gray-300 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' placeholder='slect a category'>
            <option>Select visibility</option>
            <option>Public - Listed on job board</option>
            <option>Only Invited Candidates</option>
            <option>others</option>
          </select>
        </div>
      <div className='mt-10'>
        <FormFooter></FormFooter>
      </div>
      </div>
    </div>
  )
}

export default JobStepFour