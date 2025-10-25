import Radioinput from '../../common/FormInputs/Radioinput'
import FormInput from '../../common/FormInputs/FormInput'
import FormFooter from '../../common/FormFooter/FormFooter'

const JobStepFour = ({ onNext, onBack }) => {
  return (
    <div>
      <div>
        <h1 className='font-bold text-2xl mb-5'>Application Settings</h1>
      </div>

      <div>
        <Radioinput name="applyMethod"
          label="Apply Method"
          radioOptions={[
            { value: "platform", label: "Apply via platform" },
            { value: "external", label: "External application link" }
          ]}>
        </Radioinput>

        <FormInput
          name="contactEmail"
          label="Contact Email"
          type="email"
          placeholder="enter a email..."
        />
        <FormInput
          name="applicationDeadline"
          label="Application Deadline (optional)"
          type="date"
        />
        <FormInput
          name="visibility"
          label="Job Visibility"
          as="select"
          options={[
            "Public - Listed on job board",
            "Only Invited Candidates",
          ]}
        />
      </div>

      <div className='mt-10'>
        <FormFooter type="button" onNext={onNext} onBack={onBack} showPrevious={true}></FormFooter>
      </div>
    </div>
  )
}

export default JobStepFour