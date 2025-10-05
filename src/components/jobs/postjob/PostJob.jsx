import react, { useState } from "react"
import JobStepOne from './JobStepOne'
import JobStepTwo from './JobStepTwo'
import JobStepThree from './JobStepThree'
import JobStepFour from './JobStepFour'
import JobStepFive from './JobStepFive'
import Navbar from '../../common/Navbar'
import CustomStepper from '../../common/SteeperNav.jsx'
import { FormProvider, useForm } from "react-hook-form"
import DefaultValues from "../../common/DefaultValues.jsx"
const PostJob = () => {
  const [ActiveStep, setActiveStep] = useState(0);
  const [completeStep, setcompleteStep] = useState([]);

  const methods = useForm({
    "defaultValues":DefaultValues,
    mode: "onChange", // real-time validation
  });

  const nextStep = () => {
    if (!completeStep.includes(ActiveStep)) {
      setcompleteStep([...completeStep, ActiveStep])
    }
    if (ActiveStep < 4) setActiveStep(ActiveStep + 1)
  }
  const BackStep = () => {
    if (ActiveStep > 0) setActiveStep(ActiveStep - 1)
  }
 const onSubmit = (data) => {
    console.log("✅ Job Data:", data);
  };
  const step = [
    <JobStepOne onNext={nextStep} onBack={BackStep} showPrevious={false}></JobStepOne>,
    <JobStepTwo onNext={nextStep} onBack={BackStep} showPrevious={true}></JobStepTwo>,
    <JobStepThree onNext={nextStep} onBack={BackStep} showPrevious={true}></JobStepThree>,
    <JobStepFour onNext={nextStep} onBack={BackStep} showPrevious={true}></JobStepFour>,
    <JobStepFive onNext={nextStep} onBack={BackStep} showPrevious={true} isLastStep={true}></JobStepFive>
  ]
  return (
    <div className='min-h-screen bg-gray-200'>
      <div className='bg-[#244034] h-[600px]'>
        <Navbar></Navbar>
        <div className='text-white  pt-4'>
          <h1 className='text-center text-6xl font-extrabold mb-7 mt-4'>Post a Job Opening</h1>
          <p className="text-white mb-6 text-center text-[18px] font-medium mx-auto max-w-2xl">
            Fill out the form below to share your job opportunity with top talent on JobSpring.
            It only takes a few minutes!
          </p>
        </div>
        <FormProvider {...methods}>
          <div className='mt-20'>
            <div className='bg-white w-7xl m-auto p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-lg'>
              <CustomStepper activeStep={ActiveStep}></CustomStepper>
              <div className='mt-10 p-'>
                <form    onSubmit={methods.handleSubmit(onSubmit)} className=" onSubmit={methods.handleSubmit(onSubmit)}">
                  {step[ActiveStep]}
                </form>
              </div>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  )
}

export default PostJob;