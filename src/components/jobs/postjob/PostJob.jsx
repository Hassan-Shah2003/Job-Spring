import react, { useState } from "react"
import JobStepOne from './JobStepOne'
import JobStepTwo from './JobStepTwo'
import JobStepThree from './JobStepThree'
import JobStepFour from './JobStepFour'
import JobStepFive from './JobStepFive'
import Navbar from '../../common/navbar/Navbar.jsx'
import CustomStepper from '../../common/steepernav/SteeperNav.jsx'
import { FormProvider, useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import DefaultValues from "../../common/defaultValues/DefaultValues.jsx"
import JobSchema from "../../../schemas/JobSchema.jsx"
import { useMemo } from "react";
import supaBase from "../../../services/supabaseClient.js"

const PostJob = () => {
  const [ActiveStep, setActiveStep] = useState(0);
  const [completeStep, setcompleteStep] = useState([]);

  const methods = useForm({
    resolver: yupResolver(JobSchema),
    "defaultValues":DefaultValues,
    mode: "onChange", // real-time validation
  });
    const { handleSubmit, watch } = methods;
    const stepField = useMemo(()=>
      [["title", "category", "type", "location", "openings"],
        ["description", "responsibilities", "requirements", "experienceLevel",      "educationLevel", "skills"],
        ["minSalary", "maxSalary", "currency", "perks", "workSchedule"],
        ["applyMethod", "applicationUrl", "contactEmail", "applicationDeadline", "visibility"],
      ],[]
  );
  const nextStep = async () => {
      let currentFields = stepField[ActiveStep]|| [];
    const valid = await methods.trigger(currentFields);
      console.log("🔍 Validating:", currentFields, "Result:", valid);

   if (!valid){ 
    // console.log("❌ Validation failed, staying on same step");
    return;
  }
    // console.log("✅ Validation passed, going next");
    setcompleteStep((prev)=>
      prev.includes(ActiveStep)?prev:[...prev, ActiveStep]);
      setActiveStep((prev) => prev + 1);
  };
  const BackStep = () => {
    if (ActiveStep > 0) setActiveStep(ActiveStep - 1)
  }
 const onSubmit = async (data) => {
    // console.log("✅ Job Data:", data);

    const {error} = await supaBase.from("Jobs").insert([data]);
    if(error) {
      console.error("❌ Supabase Error:", error.message);
      alert("Failed to post job. Please try again!");
    } else {
      alert("🎉 Job successfully posted!");
      console.log("✅ Job added to Supabase")
  };
}
  const step = [
    <JobStepOne onNext={nextStep} onBack={BackStep} showPrevious={false}></JobStepOne>,
    <JobStepTwo onNext={nextStep} onBack={BackStep} showPrevious={true}></JobStepTwo>,
    <JobStepThree onNext={nextStep} onBack={BackStep} showPrevious={true}></JobStepThree>,
    <JobStepFour onNext={nextStep} onBack={BackStep} showPrevious={true}></JobStepFour>,
    <JobStepFive onNext={nextStep} onBack={BackStep} showPrevious={true} handleSubmit={handleSubmit} onSubmit={onSubmit}  isLastStep={true}></JobStepFive>
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
                <form onSubmit={handleSubmit(onSubmit)}>
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