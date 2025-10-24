import { useState, useEffect } from "react";
import { supabase } from "../supabase/src/supabaseClient";
import JobCard from "./jobCard;
import JobDetailsCard from "./jobDetailsCard";
import SearchBar from "./searchBar";

const FindJobsPage = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  //  Fetch all jobs from Supabase
  const fetchJobs = async () => {
    const { data, error } = await supabase.from("Jobs").select("*");
    if (error) {
      console.error("Error fetching jobs:", error);
    } else {
      setAllJobs(data);
      setJobs(data);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (filters) => {
    const { location, title, keyword } = filters;
    let filtered = allJobs;

    if (location && location.trim() !== "") {
      filtered = filtered.filter(
        (job) =>
          job.location?.trim().toLowerCase() === location.trim().toLowerCase()
      );
    }

    if (title && title.trim() !== "") {
      filtered = filtered.filter(
        (job) =>
          job.title?.trim().toLowerCase() === title.trim().toLowerCase()
      );
    }

    if (keyword && keyword.trim() !== "") {
      const lowerKeyword = keyword.trim().toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title?.toLowerCase().includes(lowerKeyword) ||
          job.company?.toLowerCase().includes(lowerKeyword) ||
          job.description?.toLowerCase().includes(lowerKeyword) ||
          job.location?.toLowerCase().includes(lowerKeyword)
      );
    }

    setJobs(filtered);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />

      <div className="h-full flex p-5 m-10 gap-4 justify-center items-center">
        <div className="w-[50%] h-screen">
          <div className="w-full flex flex-col gap-4 overflow-y-auto h-screen pr-2">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex justify-center"
                  onClick={() => setSelectedJob(job)}
                >
                  <JobCard job={job} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-10">
                No jobs found.
              </p>
            )}
          </div>
        </div>

        <div className="w-[50%] h-screen flex flex-col items-center">
          {selectedJob ? (
            <JobDetailsCard job={selectedJob} />
          ) : (
            <p className="text-gray-500">Select a job to see details</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FindJobsPage;
