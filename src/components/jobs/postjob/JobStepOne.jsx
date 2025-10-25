import React from "react";
import { useFormContext } from "react-hook-form";
import FormInput from "../../common/FormInputs/FormInput";
import ProTip from "../../common/tipsform/ProTips";
import FormFooter from "../../common/FormFooter/FormFooter";
import CategoryOptions from "../../common/CategoryOptions/CategoryOptions";

const JobStepOne = ({ onNext, onBack }) => {
  return (
    <div>
      <h1 className="text-xl font-bold">Basic Job Information</h1>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  gap-6">
        <FormInput
          name="title"
          label="Job Title"
          placeholder="Enter job title"
        />

        <FormInput
          name="category"
          label="Job Category"
          as="select"
          options={CategoryOptions}
        />

        <FormInput
          name="type"
          label="Job Type"
          as="select"
          options={[
            "Full-time",
            "Part-time",
            "Contract",
            "Internship",
            "Remote",
          ]}
        />

        <FormInput
          name="location"
          label="Location"
          placeholder="e.g., New York, USA or Remote"
        />

        <FormInput
          name="openings"
          label="Number of Openings"
          type="number"
          placeholder="0"
        />

        <div className="mt-8">
          <ProTip
            title="Pro Tip"
            message="Be specific with your job title to attract the right candidates."
          />
        </div>
      </div>
      <div className="mt-10">
        <FormFooter type="button" onNext={onNext} onBack={onBack} showPrevious={false} />
      </div>
    </div>

  );
};

export default JobStepOne;
