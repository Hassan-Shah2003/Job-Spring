import toast from "react-hot-toast";
import react, { useState } from "react"
import JobStepOne from './JobStepOne'
import JobStepTwo from './JobStepTwo'
import JobStepThree from './JobStepThree'
import JobStepFour from './JobStepFour'
import JobStepFive from './JobStepFive'
import Navbar from '../../common/navbar/Navbar.jsx'
import CustomStepper from '../../common/steepernav/SteeperNav.jsx'
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import DefaultValues from "../../common/defaultValues/DefaultValues.jsx"
import JobSchema from "../../../services/utils/schemas/JobSchema.jsx"
import { useMemo } from "react";
import supaBase from "../../../services/supabaseClient.js"
import { Link, useNavigate } from "react-router-dom";
import { ArrowBigLeft, ArrowLeftCircle, ChevronLeft, MoveLeftIcon } from "lucide-react";
import { useAuth } from "../../Auth/AuthContext.jsx";
import Swal from "sweetalert2";

const PostJob = () => {
  const { user } = useAuth()
  // console.log(user);

  const [ActiveStep, setActiveStep] = useState(0);
  const [completeStep, setcompleteStep] = useState([]);
  const [publishing, setPublishing] = useState(false)
  const [previousLoading, setPreviousLoading] = useState(false)
  const [nextLoading, setNextloading] = useState(false)
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(JobSchema),
    "defaultValues": DefaultValues,
    mode: "onChange", // real-time validation
  });
  const { handleSubmit, clearErrors, reset, watch } = methods;
  const stepField = useMemo(() =>
    [["title", "category", "type", "location", "openings"],
    ["description", "responsibilities", "requirements", "experienceLevel", "educationLevel", "skills"],
    ["minSalary", "maxSalary", "currency", "perks", "workSchedule"],
    ["applyMethod", "applicationUrl", "contactEmail", "applicationDeadline", "visibility"],
    ], []
  );
  const nextStep = async () => {
    setNextloading(true)
    let currentFields = stepField[ActiveStep] || [];
    const valid = await methods.trigger(currentFields);
    // console.log("🔍 Validating:", currentFields, "Result:", valid);

    if (!valid) {
      // agar validation fail hui to loader band karo aur exit karo
      setNextloading(false);
      return;
    } // console.log("✅ Validation passed, going next");
    setcompleteStep((prev) =>
      prev.includes(ActiveStep) ? prev : [...prev, ActiveStep]);
    setTimeout(() => {
      setActiveStep((prev) => prev + 1);
      setNextloading(false)
    }, 600);
  };
  const BackStep = () => {
    if (ActiveStep > 0) {
      setPreviousLoading(true)
      setTimeout(() => {
        setActiveStep((prev) => prev - 1);
        setPreviousLoading(false);
      }, 400); // 400ms delay — spinner will show shortly
    }
  }

  const handleCancel = () => {
    Swal.fire({
      title: "Cancel Job Posting?",
      text: "Are you sure you want to cancel this job post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!"
    }).then((result) => {
      if (result.isConfirmed) {
        clearErrors();
        reset();
        toast("Job posting cancelled", { icon: "🚫" });

        setTimeout(() => navigate("/jobs"), 800);
      }
    });
  };

  const onSubmit = async (data) => {
    // console.log("✅ Job Data (before insert):", data);

    try {
      setPublishing(true);

      // // ✅ Get logged-in user
      // const { data: userData, error: userError } = await supaBase.auth.getUser();
      // if (userError || !userData?.user) {
      //   console.error("❌ Auth Error:", userError);
      //   toast.error("User not authenticated!");
      //   return;
      // }
      const { data: profileData, error: profileError } = await supaBase
        .from("profiles")
        .select("*") // 👈 fetch all columns, not just role
        .eq("user_id", user?.id)
        .single();

      // const user = userData.user;
      console.log("👤 Logged-in user:", user);
      console.log("👤 Logged-in user profile:", profileData);

      // ✅ Add user_id
      console.log(profileData);
      
      const jobData = {
        ...data,
        // user_avatar: profileData?.avatar,
        user_avatar: profileData?.avatar || "",   // store avatar
        user_name: profileData?.companyName || user?.email?.split("@")[0],
        companyName:user?.user_metadata?.companyName, // store name fallback
        user_id: user.id,

      };
      // console.log("🧱 Final jobData:", jobData);

      // ✅ Insert into Supabase
      const { data: insertData, error: insertError, status } = await supaBase
        .from("Jobs")
        .insert([jobData])
        .select();

      // console.log("📤 Insert response:", { insertData, insertError, status });

      if (insertError) {
        // console.error("❌ Supabase Insert Error:", insertError);
        toast.error(`Insert failed: ${insertError.message}`);
        return;
      }

      toast.success("🎉 Job successfully posted!");
      navigate("/jobs");
    } catch (error) {
      // console.error("❌ Unexpected Error:", error);
      toast.error("Unexpected error while posting job!");
    } finally {
      setPublishing(false);
    }
  };

  const step = [
    <JobStepOne onNext={nextStep} handleCancel={handleCancel} nextLoading={nextLoading} previousLoading={previousLoading} onBack={BackStep} showPrevious={false}></JobStepOne>,
    <JobStepTwo onNext={nextStep} handleCancel={handleCancel} nextLoading={nextLoading} previousLoading={previousLoading} onBack={BackStep} showPrevious={true}></JobStepTwo>,
    <JobStepThree onNext={nextStep} handleCancel={handleCancel} nextLoading={nextLoading} previousLoading={previousLoading} onBack={BackStep} showPrevious={true}></JobStepThree>,
    <JobStepFour onNext={nextStep} handleCancel={handleCancel} nextLoading={nextLoading} previousLoading={previousLoading} onBack={BackStep} showPrevious={true}></JobStepFour>,
    <JobStepFive publishing={publishing} handleCancel={handleCancel} nextLoading={nextLoading} previousLoading={previousLoading} onNext={nextStep} onBack={BackStep} showPrevious={true} handleSubmit={handleSubmit} onSubmit={onSubmit} isLastStep={true}></JobStepFive>
  ]
  return (
    <div className='min-h-full bg-gray-200'>
      <div className='bg-[#244034] h-[400px] p-5'>
        <Navbar></Navbar>
        <div className='text-white  pt-10'>
          <h1 className='text-center text-4xl sm:text-5xl md:text-7xl font-extrabold mb-7 mt-4'>Post a Job Opening</h1>
          <p className="text-white mb-6 text-center text-[14px] md:text-[20px]  font-medium mx-auto max-w-2xl">
            Fill out the form below to share your job opportunity with top talent on JobSpring.
            It only takes a few minutes!
          </p>
        </div>
        <FormProvider {...methods}>
          <div className='mt-20 px-10'>
            <div className="mb-5">
              {ActiveStep === 0 && (<Link
                to="/"
                className="flex items-center gap-2 text-white hover:text-amber-300"
              >
                <ArrowLeftCircle size={26} />
                <span className="text-xl">Back</span>
              </Link>
              )}
            </div>
            <div className=' bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-lg'>
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