import { Select } from '@mui/material';
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import SkillsInput from './SkillsInput';


const FormInput = ({ name, label, type = "text", as = "input", options = [], placeholder,radioOptions=[]}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  if (as === "skills") {
    return <SkillsInput name={name} label={label} />
  }
  // if (as === "radio") {
  //   return <Radioinput name={name} label={label} radioOptions={radioOptions} />
  // }

  // <CheckBoxInput></CheckBoxInput>
  return (
    <div className='mb-4'>
      <label className="font-bold">
        {label} <span className="ml-1 text-red-600">*</span>
      </label>
      {as==="select"?(
        <select
          {...register(name)}
          className="border-2 border-gray-400 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]"
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ):as === "textarea"?(
        <textarea
          {...register(name)}
          rows={4}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-darkgreen focus:border-darkgreen"
        />
      ):(
        <input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className="border-2 border-gray-400 w-full p-4 mt-2 rounded-lg focus:ring-1 focus:outline-none focus:border-[#132e13]"
        />
      )}
      {errors[name] && (
        <p className="text-red-600 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  )
}


export default FormInput;