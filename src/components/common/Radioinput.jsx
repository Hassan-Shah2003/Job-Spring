import React from 'react'
import { useFormContext } from 'react-hook-form';

const Radioinput = ({radioOptions=[],name,label}) => {
    const {
    register,
    formState: { errors },
    watch
  } = useFormContext();
    const selectedValue = watch(name);
    
    return (
      <div className='mb-6'>
        <label className="font-bold block mb-4">
          {label} <span className="ml-1 text-red-600">*</span>
        </label>
        <div className="space-y-3">
          {radioOptions.map((option) => (
            <div key={option.value} className='flex gap-3 items-center'>
              <input 
                {...register(name)} 
                type='radio'
                value={option.value}
                className='w-4 h-4 accent-[#244034] text-darkgreen focus:ring-[#244034] border-gray-300'
              />
              <label className="text-gray-700 text-md">{option.label}</label>
            </div>
          ))}
        </div>
        
        {/* Conditional field - Application URL */}
        {selectedValue === "external" && (
          <div className='mt-5'>
            <label className='font-bold block mb-2'>
              Application URL<span className='ml-1 text-red-600'>*</span>
            </label>
            <input 
              {...register("applicationUrl")} 
              className='border-2 border-gray-400 w-full p-4 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]' 
              type='text' 
              placeholder='https://...'
            />
          </div>
        )}
      </div>
    );
}

export default Radioinput