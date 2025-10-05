import { CircleX } from 'lucide-react'
import React from 'react'
import FormFooter from '../../common/FormFooter'
import ProTip from '../../common/ProTips'
import { useFormContext } from 'react-hook-form'

const JobStepTwo = ({ onNext, onBack, showPrevious }) => {
  const {
      register,
      formState: { errors },
    } = useFormContext();
  return (
    <form>
      <div>
        <h1 className='font-bold text-2xl mb-5'>Job Details</h1>

        <div className='mb-15'>
          <div className='mb-6'>
            <label className='text-md font-medium'>Job Description<span className='ml-1 text-red-600'>*</span></label>
            <textarea {...register("description")} className='border-2 border-gray-400 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' placeholder='enter a name'>
            </textarea>
          </div>

          <div className='mb-6'>
            <label className='text-md font-medium'>Responsibilities<span className='ml-1 text-red-600'>*</span></label>
            <textarea {...register("responsibilities")} className='border-2 border-gray-400 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' placeholder='enter a name'>
            </textarea>
          </div>

          <div className='mb-6'>
            <label className='text-md font-medium'>Requirements / Qualifications <span className='ml-1 text-red-600'>*</span></label>
            <textarea {...register("requirements")} className='border-2 border-gray-400 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' placeholder='enter a name'>
            </textarea>
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div className='mb-6'>
              <label className='text-md font-medium'>Experience Level<span className='ml-1 text-red-600'>*</span></label>
              <select {...register("experienceLevel")} className='border-2 border-gray-400 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' placeholder='slect a category'>
                <option>Select experience level</option>
                <option>Entry Level (0-2 years)</option>
                <option>Mid Level (3-5 years)</option>
                <option>Senior Level (5+ years)</option>
                <option>Landscape Architecture</option>
                <option>Construction Management</option>
                <option>others</option>
              </select>
            </div>

            <div className='mb-6'>
              <label className='text-md font-medium'>Experience Level<span className='ml-1 text-red-600'>*</span></label>
              <select {...register("educationLevel")} className='border-2 border-gray-400 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' placeholder='slect a category'>
                <option>Select education level</option>
                <option>High School Diploma</option>
                <option>Associate Degree</option>
                <option>Bachelor's Degree</option>
                <option>Master's Degree</option>
                <option>PhD</option>
                <option>others</option>
              </select>
            </div>
          </div>

          <div className=''>
            <label className='text-md font-medium'>Skills<span className='ml-1 text-red-600'>*</span></label>
            <div className='mt-5 mb-5 h-32 overflow-y-auto hidden'>
              <span className='bg-gray-200 px-4 py-2 rounded-full inline-flex gap-1 ml-2.5'><CircleX className='w-5 hover:text-red-600' /></span>
              <span className='bg-gray-200 px-4 py-2 rounded-full inline-flex gap-1 ml-2.5'><CircleX className='w-5 hover:text-red-600' /></span>
              <span className='bg-gray-200 px-4 py-2 rounded-full inline-flex gap-1 ml-2.5'><CircleX className='w-5 hover:text-red-600' /></span>
            </div>
            <div className='mb-6 flex'>
              <input {...register("skills")} className='border-2 border-gray-400 border-r-0 w-full p-4 rounded-l-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' placeholder='enter a name'>
              </input>
              <button className='bg-[#244034] text-white font-bold px-6 py-4 rounded-r-lg border-2 border-[#132e13]'>Add</button>
            </div>
          </div>
          <div>
            <ProTip title="ProTips" message="A clear and detailed job description helps candidates quickly understand if they are the right fit."></ProTip>
          </div>
        </div>
        <FormFooter onNext={onNext} onBack={onBack} showPrevious={true}></FormFooter>
      </div>
    </form>
  )
}

export default JobStepTwo