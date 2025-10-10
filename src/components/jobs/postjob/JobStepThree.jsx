import React from 'react'
import ProTip from '../../common/tipsform/ProTips'
import FormFooter from '../../common/FormFooter/FormFooter'
import { useFormContext } from 'react-hook-form';
import FormInput from '../../common/FormInputs/FormInput';
import CheckBoxInput from '../../common/FormInputs/CheckBoxInput';

const JobStepThree = ({ onNext, onBack }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <h1 className="text-xl font-bold mb-5">Salary & Benefits</h1>

      <div className='grid grid-cols-3 gap-3 mb-5'>
        <FormInput
          name="minSalary"
          label="Minimum Salary"
          type="number"
          placeholder="e.g.,60000"
        />
        <FormInput
          name="maxSalary"
          label="Maximum Salary"
          type="number"
          placeholder="e.g.,90000"
        />
        <FormInput
          name="currency"
          label="Currency"
          as="select"
          options={[
            "USD ($)",
            "EUR (€)",
            "GBP (£)",
            "PKR (₨)",
            "INR (₹)",
          ]}
        />
      </div>
      <div>
        <CheckBoxInput></CheckBoxInput>
        <FormInput
          name="workSchedule"
          label="Work Schedule"
          as="select"
          options={[
            "Select schedule",
            "Day shift",
            "Night shift",
            "Flexible",
            "Shift work",
          ]}
        />

      </div>
      <div className='mt-10'>
        <FormFooter type="button" onNext={onNext} onBack={onBack} showPrevious={true}></FormFooter>
      </div>
    </div>
  )
}

export default JobStepThree