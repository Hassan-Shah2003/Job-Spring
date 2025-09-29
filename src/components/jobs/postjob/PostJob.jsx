import JobStepOne from './JobStepOne'
import JobStepTwo from './JobStepTwo'
import JobStepThree from './JobStepThree'
import JobStepFour from './JobStepFour'
import JobStepFive from './JobStepFive'
import Navbar from '../../common/Navbar'
import DefaultStepper from '../../common/SteeperNav.jsx'
import HorizontalLinearAlternativeLabelStepper from '../../common/SteeperNav.jsx'
import CustomStepper from '../../common/SteeperNav.jsx'
import InputField from '../../common/FormInput.jsx'

const PostJob = () => {
  return (
    <div>
      <div className='bg-[#244034] h-[600px]'>
        <Navbar></Navbar>
        <div className='text-white  pt-4'>
          <h1 className='text-center text-6xl font-extrabold mb-7 mt-4'>Post a Job Opening</h1>
          <p className="text-white mb-6 text-center text-[18px] font-medium">
           Fill out the form below to share your job opportunity with top talent on JobSpring.
            It only takes a few minutes!
          </p>
        </div>
        <div className='bg-white'>
        </div>
      </div>
    </div>
  )
}

export default PostJob;