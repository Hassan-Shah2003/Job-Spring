import React from "react";
import { useFormContext } from "react-hook-form";
import FormInput from "../../common/FormInput";
import ProTip from "../../common/ProTips";
import FormFooter from "../../common/FormFooter";
import SkillsInput from "../../common/SkillsInput";

const JobStepTwo = ({ onNext, onBack, showPrevious }) => {
  console.log("jobstep2");
  
  return (
    <div>
      <h1 className="text-xl font-bold">Job Details</h1>

      <div className="mt-5 grid grid-cols-1 gap-6">
        <FormInput
          name="description"
          label="Job Description"
          as="textarea"
          placeholder="Describe the role, company culture, and projects..."
        />

        <FormInput
          name="responsibilities"
          label="Responsibilities"
          as="textarea"
          placeholder={"List key responsibilities (one per line)"}
        />

        <FormInput
          name="requirements"
          label="Requirements / Qualifications"
          as="textarea"
          placeholder={"List requirements (one per line)"}
        />
      </div> 
      <div className="grid grid-cols-2 gap-3">
      <FormInput
        name="experienceLevel"
        label="Experience Level"
        as="select"
        options={[
          "Entry Level (0-2 years)",
          "Mid Level (3-5 years)",
          "Senior Level (5+ years)",
          "Others",
        ]}
      />

      <FormInput
        name="educationLevel"
        label="Education Requirement (optional)"
        as="select"
        options={[
          "High School Diploma",
          "Associate Degree",
          "Bachelor's Degree",
          "Master's Degree",
          "PhD",
        ]}
      />
      </div>
      <SkillsInput
        name="skills"
        label="Skills"
        as="skills"
        placeholder={"Add A skills..."}
      >
      </SkillsInput>
      <div className="mt-10">
        <ProTip
          title="Pro Tip"
          message="Be specific with your job title to attract the right candidates."
        />
      </div>
        <div className="mt-10">
      <FormFooter type="button" onNext={onNext} onBack={onBack} showPrevious={true} />
          </div>
    </div>
  );
};

export default JobStepTwo;
