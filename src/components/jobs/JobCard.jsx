import { Bookmark, Slash } from "lucide-react";

const JobCard = ({ job }) => {
  return (
    <div className="border border-gray-400 rounded-xl p-4 shadow-sm hover:shadow-gray-500 transition w-[100%] relative bg-white max-w-md cursor-pointer">
      <div className="flex gap-2 mb-2">
        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
          {job.tag}
        </span>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 hover:underline cursor-pointer">
        {job.title}
      </h2>

      <p className="text-gray-600 mt-1">{job.company}</p>
      <p className="text-gray-600">{job.location}</p>

      <div className="flex gap-2 mt-2">
        <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
          {job.minSalary} - {job.maxSalary}
        </span>
        <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
          {job.type}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-3 text-blue-600 font-medium cursor-pointer">
        <span className="text-xl">›</span> Easily apply
      </div>

      <div className="absolute top-3 right-3 flex gap-2">
        <Bookmark className="w-4 h-4 text-gray-500 cursor-pointer hover:text-blue-600" />
        <Slash className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-600" />
      </div>
    </div>
  );
};

export default JobCard;
