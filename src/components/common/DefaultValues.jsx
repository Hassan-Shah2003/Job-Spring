const DefaultValues = {
  // STEP 1: Basic Info
  title: "",
  category: "",
  type: "", 
  location: "",
  openings: 1,

  // STEP 2: Job Details
  description: "",
  responsibilities: "",
  requirements: "",
  experienceLevel: "",
  educationLevel: "",
  skills: [],

  // STEP 3: Salary & Benefits
  minSalary: "",
  maxSalary: "",
  currency: "PKR (₨)",
  negotiable: false,
  perks: [], 
  workSchedule: "",

  // STEP 4: Application Settings
  applyMethod: "platform",
  applicationUrl: "",
  contactEmail: "",
  applicationDeadline: "",
  visibility: "Public - Listed on job board",
};

export default DefaultValues;