import React from 'react'
import ProTip from '../../common/ProTips'
import FormFooter from '../../common/FormFooter'
import { useFormContext } from 'react-hook-form';

const JobStepThree = ({ onNext, onBack }) => {
  const {
        register,
        formState: { errors },
      } = useFormContext();
  return (
    
    <form>
      <div>
        <h1 className="text-xl font-bold mb-5">Salary & Benefits</h1>

        <div>
          <div className='grid grid-cols-3 gap-3 mb-5'>
            <div>
              <label className='font-bold'>Minimum Salary<span className='ml-1 text-red-600'>*</span></label>
              <input {...register("minSalary")} className='border-2 border-gray-300 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' type='number' placeholder='e.g.,5000'>
              </input>
            </div>
            <div>
              <label className='font-bold'>Maximum Salary<span className='ml-1 text-red-600'>*</span></label>
              <input {...register("maxSalary")} className='border-2 border-gray-300 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' type='number' placeholder='e.g.,5000'>
              </input>
            </div>
            <div>
              <label className='font-bold'>Currency<span className='ml-1 text-red-600'>*</span></label>
              <select {...register("currency")} className='border-2 border-gray-300 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' placeholder='slect a category'>
                <option>Select Currecncy</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>PKR (₨)</option>
                <option>INR (₹)</option>
                <option>others</option>
              </select>
            </div>
          </div>
          <div className='mb-5'>
            <div className='flex gap-2 items-center'>
              <input {...register("negotiable")} type='checkbox' className='w-4 h-4'></input>
              <label>Salary is negotiable</label>
            </div>
          </div>

          <div className='mb-6'>
            <label className='font-bold'>Perks & Benefits</label>
            <div className='grid grid-cols-2'>
              <div className='flex gap-2 items-center mt-4'>
                <input {...register("perks")} type='checkbox' className='w-4 h-4'></input>
                <label>Remote Work</label>
              </div>
              <div className='flex gap-2 items-center mt-4'>
                <input {...register("perks")} type='checkbox' className='w-4 h-4'></input>
                <label>Health Insurance</label>
              </div>
              <div className='flex gap-2 items-center mt-4'>
                <input {...register("perks")} type='checkbox' className='w-4 h-4'></input>
                <label>Paid Leave</label>
              </div>
              <div className='flex gap-2 items-center mt-4'>
              </div>
                <input {...register("perks")} type='checkbox' className='w-4 h-4'></input>
                <label>Flexible Hours</label>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3 mb-10'>
          <div>
            <label className='font-bold'>Work Schedule<span className='ml-1 text-red-600'>*</span></label>
            <select {...register("workSchedule")} className='border-2 border-gray-300 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' placeholder='slect a category'>
              <option>Select Currecncy</option>
              <option>Select schedule</option>
              <option>Day shift</option>
              <option>Night shift</option>
              <option>Flexible</option>
              <option>Shift work</option>
              <option>others</option>
            </select>
          </div>
          <div className="mt-6">
            <ProTip title="ProTip" message="Candidates are more likely to apply when perks & benefits are highlighted"></ProTip>
          </div>
        </div>

        <div>
          <FormFooter onNext={onNext} onBack={onBack} showPrevious={true}></FormFooter>
        </div>
      </div>
    </form>
  )
}

export default JobStepThree