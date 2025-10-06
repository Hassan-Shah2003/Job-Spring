import React from 'react'
import { useFormContext } from 'react-hook-form'

const CheckBoxInput = () => {
    const { register, watch } = useFormContext()

    return (
        <div>
            <div className='mb-5'>
          <div className='flex gap-2 items-center'>
            <input {...register("negotiable")} type='checkbox' className='w-4 h-4'></input>
            <label>Salary is negotiable</label>
          </div>
        </div>

        <div className='mb-6'>
          <label className='font-bold'>Perks & Benefits</label>
          <div className='grid grid-cols-2 gap-2'>
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
              <input {...register("perks")} type='checkbox' className='w-4 h-4'></input>
              <label>Flexible Hours</label>
            </div>
                        <div className='flex gap-2 items-center mt-4'>
              <input {...register("perks")} type='checkbox' className='w-4 h-4'></input>
              <label>Performance Bonus</label>
            </div>

          </div>
        </div>
      </div>
    )
}

export default CheckBoxInput;