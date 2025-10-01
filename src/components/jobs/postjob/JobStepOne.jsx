import React from 'react'
import ProTip from '../../common/ProTips'
import Button from '../../common/FormFooter'
import FormFooter from '../../common/FormFooter'

const JobStepOne = () => {
  return (
    <div>
      <h1 className='text-xl font-bold'>Basic Job Information</h1>
      <div className='mt-5 grid grid-cols-2 gap-6'>
        <div className=''>
          <label className='font-bold'>job title<span className='ml-1 text-red-600'>*</span></label>
          <input className='border-2 border-gray-400 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' placeholder='enter a name'>
          </input>
        </div>

        <div className=''>
          <label className='font-bold'>job Category<span className='ml-1 text-red-600'>*</span></label>
          <select className='border-2 border-gray-400 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' placeholder='slect a category'>
            <option>select A Category</option>
            <option>Architecture</option>
            <option>Urban Planning</option>
            <option>Interior Design</option>
            <option>Landscape Architecture</option>
            <option>Construction Management</option>
            <option>others</option>
          </select>
        </div>

        <div className=''>
          <label className='font-bold'>job Type<span className='ml-1 text-red-600'>*</span></label>
          <select className='border-2 border-gray-400 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' placeholder='slect a category'>
            <option>select Job Type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
            <option>Construction Management</option>
            <option>Remote</option>
          </select>
        </div>

        <div className=''>
          <label className='font-bold'>Location<span className='ml-1 text-red-600'>*</span></label>
          <input className='border-2 border-gray-400 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' placeholder='e.g., New York, USA or Remote'>
          </input>
        </div>


        <div className=''>
          <label className='font-bold'>Number Of Openings<span className='ml-1 text-red-600'>*</span></label>
          <input className='border-2 border-gray-400 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' type='number' placeholder=''>
          </input>
        </div>


        <div className='mt-3'>
          <ProTip title="Pro Tip" message="Be specific with your job title to attract the right candidates."></ProTip>
        </div>

        <div>
        </div>
      </div>

      <FormFooter></FormFooter>
    </div>
  )
}

export default JobStepOne