import React from 'react'
import { useFormContext } from 'react-hook-form'

const CheckBoxInput = () => {
  const { register, watch,formState: { errors } } = useFormContext()
  const perksOptions = [
    "Remote Work",
    "Health Insurance",
    "Paid Leave",
    "Flexible Hours",
    "Performance Bonus"
  ];
  return (
    <div>
      <div className='mb-5'>
        <div className='flex gap-2 items-center'>
          <input {...register("negotiable")} type='checkbox' className={`w-4 h-4 ${errors? "border-red-500":"border-gray-300"}`}></input>
          <label>Salary is negotiable</label>
        </div>
        {errors.negotiable && (
          <p className="text-red-600 text-sm mt-2 font-bold text-md">{errors.perks.message}</p>
        )}
      </div>

      <div className='mb-6'>
        <label className='font-bold'>Perks & Benefits</label>
        <div className='grid grid-cols-2 gap-2'>
          {perksOptions.map((perk, i) => (
            <div key={i} className='flex gap-2 items-center mt-4'>
              <input
                {...register("perks")}
                value={perk}
                className={`w-4 h-4 ${errors? "border-red-500":"border-gray-300"}`}
                type='checkbox'
              />
              <label>{perk}</label>
              {errors.perks && (
                <p className="text-red-600 mt-2 font-bold text-md">{errors.perks.message}</p>
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default CheckBoxInput;