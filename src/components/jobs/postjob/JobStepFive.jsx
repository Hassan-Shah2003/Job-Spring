import { Eye, MapPin, Rocket } from 'lucide-react'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faCheckCircle, faCircleCheck, faClock, faCog, faCogs, faEye, faGift, faGraduationCap, faListCheck, faLocation, faLocationDot, faScrewdriver, faScrewdriverWrench, faStar } from "@fortawesome/free-solid-svg-icons";
import FormFooter from '../../common/FormFooter';
import { useFormContext } from 'react-hook-form';


const JobStepFive = ({ onNext, onBack, showPrevious, isLastStep ,handleSubmit,onSubmit }) => {
  // console.log("✅ JobStepFive Rendered");
  const { getValues, watch } = useFormContext();

  const formData = getValues();
  const watchedData = watch();
  return (
    <div className='w-auto'>
      <div className='flex items-center gap-3'>
        <FontAwesomeIcon icon={faEye} size="xl" /><h1 className='text-2xl font-extrabold'>Preview & Publish Your Job</h1>
      </div>
      <div className='bg-gradient-to-r from-green-100 to-gray-100 border border-green-300       rounded-xl p-5 shadow-md mt-6'>
        <div className='flex gap-1'>
          <FontAwesomeIcon
            icon={faCircleCheck}
            size="xl"
            className="text-green-500"
            style={{ margin: "5px" }}
          />
          <div>
            <h1 className='font-black text-xl'>Ready to Publish!</h1>
            <p className='text-sm mt-2'>Review your job listing before making it live</p>
          </div>
        </div>
      </div>
      {/* parent div of preview */}
      {/* parent div of preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full mt-8 mb-10">

        {/* LEFT SIDE (Job Preview Column — takes 2/3 width) */}
        <div className="lg:col-span-2 space-y-10">
          {/* 1st div */}
          <div className='border-2 p-6 border-gray-200 rounded-lg hover:border-l-[#284A3A] hover:border-l-5 w-full flex flex-col items-start shadow-lg transition-all duration-300 ease-in-out  hover:scale-105'>
            {/* top div of logo etc */}
            <div className='flex items-start justify-between gap-4 mt-3 w-full'>
              <div className='w-20 h-20 bg-gradient-to-br from-[#284A3A] to-[#367353] rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out  hover:scale-105'>
                <FontAwesomeIcon icon={faBuilding} size="2xl" style={{ color: "white", }} />
              </div>
              <div className='flex-1'>
                <h1 className='text-2xl font-extrabold mb-2.5'>{formData.companyname || "Microsoft"}</h1>
                <h3 className='text-xl font-light text-gray-900'>{formData.title}</h3>
                <div className='flex gap-2 mt-2'>
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{formData.location}</span>
                  <div className='flex items-center gap-1'>
                  </div>
                  <div className='flex items-center gap-1'>
                    <FontAwesomeIcon icon={faClock} style={{ color: "#bfbfbf" }} />
                    <span>{formData.type}</span>
                  </div>
                </div>
              </div>
              <div>
                <p className='font-extrabold text-2xl'><span>{formData.minSalary}</span> - <span>{formData.maxSalary}</span></p>
                <p className='text-right font-light text-xl text-gray-700'>per month</p>
              </div>
            </div>

            <div className='mt-5'>
              <h2 className='text-lg font-black mb-3'>Job Description</h2>
              <p className='text-gray-600'>
                {formData.description}
              </p>
            </div>
          </div>

          {/* Responsibilities */}
          <div className='border-2 p-6 border-gray-200 rounded-lg hover:border-l-[#284A3A] hover:border-l-5 w-full shadow-lg transition-all duration-300 ease-in-out  hover:scale-105'>
            <div className='flex items-center mb-4 gap-2'>
              <FontAwesomeIcon icon={faListCheck} />
              <h2 className='text-lg font-black'>Key Responsibilities</h2>
            </div>
            <ul className="text-gray-700 space-y-3" id="preview-responsibilities">
              {formData.responsibilities?.length > 0 ? (
                formData.responsibilities.filter((res)=>res.trim()!=="").map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-3 mt-1"></FontAwesomeIcon>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 italic">No responsibilities added</p>
              )}
            </ul>

          </div>

          {/* Requirements */}
          <div className='border-2 p-6 border-gray-200 rounded-lg hover:border-l-[#284A3A] hover:border-l-5 transition-all duration-300 ease-in-out  hover:scale-105 w-full shadow-lg'>
            <div className='flex items-center mb-4 gap-2'>
              <FontAwesomeIcon icon={faGraduationCap} />
              <h2 className='text-lg font-black'>Requirements & Qualifications</h2>
            </div>
            <ul className="text-gray-700 space-y-3" id="preview-responsibilities">
              {formData.requirements?.length > 0 ? (
                formData.requirements.filter((req)=>req.trim()!=="").map((elem, index) => (
                  <li key={index} className="flex items-start">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-3 mt-1"></FontAwesomeIcon>
                    <span>{elem}</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 italic">No responsibilities added</p>
              )}
            </ul>
          </div>

          {/* Skills */}
          <div className='border-2 p-6 border-gray-200 rounded-lg hover:border-l-[#284A3A] hover:border-l-5 w-full shadow-lg transition-all duration-300 ease-in-out  hover:scale-105'>
            <div className='flex items-center gap-2 mb-3'>
              <FontAwesomeIcon icon={faScrewdriverWrench} />
              <h2 className='font-semibold text-lg'>Skills & Technologies</h2>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
              {formData.perks?.length > 0 ? (
                formData.perks.map((perk, index) => (
                  <span
                    key={index}
                    className='inline-flex justify-center items-center border border-[#d1e0d9] bg-gradient-to-br from-[#244034] to-[#2a4b3c] text-white px-4 py-2 rounded-full m-1 text-sm font-medium transition-all duration-300 ease-in-out 
        hover:bg-green-700 hover:scale-105 shadow-[0_2px_8px_rgba(36,64,52,0.2)]'
                  >
                    {perk}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 italic">No perks added</p>
              )}
            </div>
          </div>
        </div>
        {/* RIGHT SIDE (Extra section / DSA Box) */}
        <div>
          <div className='border-2 p-6 border-gray-200 rounded-lg hover:border-l-[#284A3A] hover:border-l-5 transition-all duration-300 ease-in-out  hover:scale-105  shadow-lg'>
            <div className='flex items-center gap-2'>
              <FontAwesomeIcon icon={faGift}></FontAwesomeIcon><h2 className='text-xl font-bold'>Benefits & Perks</h2>
            </div>
            <div className='mt-4 h-auto '>
              {formData.perks?.length > 0 ? (
                formData.perks.map((perk, index) => (
                  <span
                    key={index}
                    className='inline-flex items-center border border-[#d1e0d9] bg-gradient-to-br from-[#244034] to-[#2a4b3c] text-white px-4 py-2 rounded-full m-1 text-sm font-medium transition-all duration-300 ease-in-out 
        hover:bg-green-700 hover:scale-105 shadow-[0_2px_8px_rgba(36,64,52,0.2)]'
                  >
                    {perk}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 italic">No perks added</p>
              )}
            </div>
          </div>

          <div className='border-2 p-6 border-gray-200 rounded-lg hover:border-l-[#284A3A] hover:border-l-5  shadow-lg mt-10 transition-all duration-300 ease-in-out  hover:scale-105'>
            <div className='flex items-center gap-2 mb-6'>
              <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
              <h2 className='text-lg font-black'>Application Settings</h2>
            </div>
            <div className='flex items-center text-lg justify-between gap-2 mb-6'>
              <p>Apply Method:</p>
              <h2 className='text-lg font-black'>{formData.applyMethod}</h2>
            </div>
            <div className='flex items-center text-lg justify-between gap-2 mb-6'>
              <p>Contact Email:</p>
              <h2 className='text-lg font-black'>{formData.contactEmail}</h2>
            </div>
            <div className='flex items-center text-lg justify-between gap-2 mb-6'>
              <p>Visibility:</p>
              <h2 className='text-lg font-black'>{formData.visibility}</h2>
            </div>
            <div className='flex items-center justify-between gap-2 mb-6'>
              <p className='text-gray-700 text-lg'>Deadline::</p>
              <h2 className='text-lg font-black'>{formData.applicationDeadline}</h2>
            </div>
          </div>

          <div className='border-2 p-6 border-gray-200 rounded-3xl  shadow-lg mt-10 bg-[#284A3A] text-white'>
            <h3 className='text-lg font-black mb-3 transition-all duration-300 ease-in-out  hover:scale-105'>Ready to Publish?</h3>
            <p className='text-sm font-medium transition-all duration-300 ease-in-out  hover:scale-105'>Your job will be visible to thousands of architecture professionals</p>
            <div className='flex gap-2 text-lg items-center font-medium mt-3 transition-all duration-300 ease-in-out  hover:scale-105'>
              <input type='checkbox' className='w-5 h-5'></input>
              <label>I confirm all information is accurate</label>
            </div>
            <div className='flex gap-2 items-center text-lg font-medium mt-3 transition-all duration-300 ease-in-out  hover:scale-105'>
              <input type='checkbox' className='w-5 h-5'></input>
              <label>This listing complies with policies</label>
            </div>
            <div className='flex gap-2 items-center mt-5 border-2 rounded-full p-4 bg-white text-black transition-all duration-300 ease-in-out  hover:scale-105'>
              <div><Rocket /></div><button className='text-2xl font-extrabold cursor-pointer' onClick={handleSubmit(onSubmit)}>Publish Job Listing</button></div>
          </div>
        </div>
      </div>
      <div className='mt-4'><FormFooter onNext={onNext} onBack={onBack} showPrevious={true} isLastStep={true}></FormFooter></div>
    </div>
  )
}

export default JobStepFive