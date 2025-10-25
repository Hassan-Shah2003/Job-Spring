import React from "react";
import {
  Bookmark,
  Slash,
  Link,
  Briefcase,
  Wallet,
  MapPin,
  Grid2x2,
  FileSpreadsheet,
  CreditCard,
  UserStar,
  GraduationCap,
  Settings,
} from "lucide-react";

const JobDetailsCard = ({ job }) => {
  return (
    <div className="max-w-2x w-[90%] bg-white border border-gray-400 rounded-xl shadow-sm overflow-hidden hover:shadow-gray-500">
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>

        <div className="mt-2 text-gray-600">
          <a
            href="#"
            className="text-blue-600 hover:underline font-medium flex items-center gap-1"
          >
            {job.company}
          </a>
          <p>{job.location}</p>
          <p> {job.minSalary} - {job.maxSalary} </p>
        </div>

        <div className="flex gap-3 mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer hover:bg-blue-700">
            Apply now
          </button>

          <button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
            <Bookmark className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
            <Slash className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
            <Link className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <hr />

      <div className="p-5 max-h-48 overflow-y-auto pr-2">
        <h3 className="text-lg font-semibold text-gray-900">Job details</h3>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Wallet className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-gray-800 font-medium">Pay</p>
              <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                {job.minSalary} - {job.maxSalary}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-gray-800 font-medium">Job type</p>
              <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                {job.type}
              </span>
            </div>
          </div>
        </div>

        <hr />

        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900">Location</h3>
          <div className="flex items-center gap-2 mt-2 text-gray-700">
            <MapPin className="w-5 h-5" />
            {job.location}
          </div>
        </div>

        <hr />

        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900">Category</h3>
          <div className="flex items-center gap-2 mt-2 text-gray-700">
            <Grid2x2 className="w-5 h-5" />
            {job.category}
          </div>
        </div>

        <hr />

        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Experience-Level
          </h3>
          <div className="flex items-center gap-2 mt-2 text-gray-700">
            <UserStar className="w-5 h-5" />
            {job.experienceLevel}
          </div>
        </div>

        <hr />

        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Education-Level
          </h3>
          <div className="flex items-center gap-2 mt-2 text-gray-700">
            <GraduationCap className="w-5 h-5" />
            {job.educationLevel}
          </div>
        </div>

        <hr />

        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
          <div className="flex items-center gap-2 mt-2 text-gray-700">
            <Settings className="w-5 h-5" />
            {job.skills}
          </div>
        </div>

        <hr />

        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Responsibilities
          </h3>
          <div className="flex items-center gap-2 mt-2 text-gray-700">
            {job.responsibilities}
          </div>
        </div>

        <hr />

        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900">Requirements</h3>
          <div className="flex items-center gap-2 mt-2 text-gray-700">
            <FileSpreadsheet className="w-5 h-5" />
            {job.requirements}
          </div>
        </div>

        <hr />

        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Full job description
          </h3>
          <div className="flex items-center gap-2 mt-2 text-gray-700">
            {job.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsCard;
