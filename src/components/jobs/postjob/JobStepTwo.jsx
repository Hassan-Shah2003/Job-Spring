import React from "react";
import { useFormContext } from "react-hook-form";
import FormInput from "../../common/FormInput";
import ProTip from "../../common/ProTips";
import FormFooter from "../../common/FormFooter";

const JobStepOne = ({ onNext, onBack }) => {
  return (
    <div>
      <h1 className="text-xl font-bold">Job Details</h1>

      <div className="mt-5 grid grid-cols-2 gap-6">
        <FormInput
          name="description"
          label="Job Description "
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

        <FormInput
          name="experienceLevel"
          label="Experience Level"
          as="select"
          options={[
            "Select experience level",
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
            "Select education level",
            "High School Diploma",
            "Associate Degree",
            "Bachelor's Degree",
            "Master's Degree",
            "PhD",
          ]}
        />

        <FormInput
          name="skills"
          label="Skills"
          placeholder={"Add A Skill"}
        >

        </FormInput>
        <div className="mt-3">
          <ProTip
            title="Pro Tip"
            message="Be specific with your job title to attract the right candidates."
          />
        </div>
      </div>

      <FormFooter onNext={onNext} onBack={onBack} showPrevious={false} />
    </div>
  );
};

export default JobStepOne;
