import { useState, useEffect, useMemo } from "react";
import supabase from "../../../services/supabaseClient";
import JobCard from "./JobCard";
import JobDetailsCard from "../Find Jobs/jobDeatilsCard";
import SearchBar from "../SearchBar/searchBar";
import NavBar from "../../common/navbar/Navbar"
import debounce from "lodash.debounce";
import { useLocation, useParams } from "react-router-dom";
import NeoJobLoader from "../../common/loader/NeoJobLoader";
import AnimatedJobPlaceholder from "../../common/loader/AnimatedJobPlaceholder";
import NoJobsFound from "../../common/loader/NoJobsFound";
import BigJobLoader from "../../common/loader/BigJobLoader";
import { CircleArrowLeft } from "lucide-react";
const FindJobsPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const [allJobs, setAllJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [jobLoading, setJobLoading] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  // console.log(queryParams);

  const categoryFilter = queryParams.get("category");
  // console.log(categoryFilter);

  const handleSelectedJob = (job) => {
    setJobLoading(true);
    setSelectedJob(null);
    setTimeout(() => {
      setSelectedJob(job);
      setJobLoading(false);
    }, 400);
  }
  //  Fetch all jobs from Supabase


  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      let query = supabase.from("Jobs").select("*");
      if (categoryFilter) {
        query = query.eq("category", categoryFilter);
      }
      const { data, error } = await query;
      // console.log(data);

      setLoading(false);
      if (error) {
        // console.error("Error fetching jobs:", error);
      } else {
        setAllJobs(data || []);
        setJobs(data || []);
      }
    };
    fetchJobs();
  }, [categoryFilter]);
  useEffect(() => {
    if (id) {
      setJobLoading(true);
      const fetchSingleJob = async () => {
        const { data, error } = await supabase.from("Jobs").select("*").eq("id", id).single()
        if (!error && data) setSelectedJob(data);
        setJobLoading(false);
      }
      fetchSingleJob();
    }
  }, [id])
  useEffect(() => {
    if (selectedJob) window.scrollTo(0, 0);
  }, [selectedJob]);
  useEffect(() => {
    if (location.state) {
      const { keyword, location: jobLocation } = location.state;
      handleSearch({ keyword, location: jobLocation });

    }
  }, [location.state])

  const fetchLocationSuggestion = async (query) => {
    if (!query || query.trim().length < 2) {
      setLocationSuggestions([]);
      return;
    }
    const { data, error } = await supabase.from("Jobs").select("location").ilike("location", `%${query}%`).limit(10);
    if (!error && data) {
      const unique = [...new Set(data.map((item) => item.location).filter(Boolean))];
      setLocationSuggestions(unique)
    }
  }
  const debouncedFetch = useMemo(() => debounce(fetchLocationSuggestion, 350), [])
  useEffect(() => {
    return () => debouncedFetch.cancel();
  }, [debouncedFetch]);
  const handleSearch = (filters) => {
    // console.log(filters);

    const { location, keyword } = filters;
    // console.log(filters);

    // console.log("🔍 SEARCH STARTED ==========");
    // console.log("Filters received:", filters);
    // console.log("Total jobs in allJobs:", allJobs.length);
    let filtered = allJobs;

    if (location && location.trim() !== "") {
      // console.log("📍 Filtering by location:", location);
      filtered = filtered.filter(
        (job) =>
          job.location?.toLowerCase().includes(location.trim().toLowerCase())
      );
      // console.log("After location filter:", filtered.length);

    }

    // if (title && title.trim() !== "") {
    //   filtered = filtered.filter(
    //     (job) =>
    //       job.title?.trim().toLowerCase() === title.trim().toLowerCase()
    //   );
    // }
    if (keyword && keyword.trim() !== "") {
      const lowerKeyword = keyword.trim().toLowerCase();

      filtered = filtered.filter((job) => {
        // Check multiple fields with partial matching
        const titleMatch = job.title?.toLowerCase().includes(lowerKeyword);
        const companyMatch = job.company?.toLowerCase().includes(lowerKeyword);
        const descriptionMatch = job.description?.toLowerCase().includes(lowerKeyword);

        // ✅ TYPO TOLERANCE: Check for close matches
        const closeMatch = job.title?.toLowerCase().includes(lowerKeyword.slice(0, 5)); // "front" se bhi match karega

        return titleMatch || companyMatch || descriptionMatch || closeMatch;
      });
    }

    // console.log("🎯 FINAL RESULTS:", filtered.length);
    setJobs(filtered);
    // setJobs(filtered);
  };
  // const handleSelectedJob=(job)=>{
  //   setJobLoading(true);
  //   setSelectedJob(null);
  //   setTimeout(() => {
  //     setSelectedJob(job);
  //     setJobLoading(false)
  //   }, 4000);
  // }

  return (
    <>
      <div className="p-5 bg-[#244034]">
        <NavBar></NavBar>
      </div>
      <SearchBar onSearch={handleSearch} />
      {categoryFilter && (
        <div className="text-center mt-6 mb-10 p-4">
          <h2 className="text-xl font-semibold text-[#244034]">
            Showing jobs for category:{" "}
            <span className="font-bold">{categoryFilter}</span>
          </h2>
          {loading ? (
            <div className="text-center text-gray-500 text-lg">Refreshing....</div>
          ) : (
            <button
              onClick={() => (window.location.href = "/jobs")}
              className="mt-3 px-7 py-3 bg-[#244034] text-white rounded-full transition-all cursor-pointer hover:bg-[#d2f34c] hover:text-black duration-300 ease-in font-bold"
            >
              Show All Jobs
            </button>
          )}
        </div>
      )}
      {loading ? (<NeoJobLoader></NeoJobLoader>) : jobs.length === 0 ? (
        <div className="flex  items-center justify-center min-h-full">
          <NoJobsFound message="No jobs available right now" />
        </div>
      ) : (
        <div className="h-screen flex flex-col lg:flex-row overflow-hidden p-4 sm:p-6 md:p-8 gap-4 items-stretch">
          <div className={`${selectedJob ? "hidden lg:flex" : "flex"
            } flex-col w-full lg:w-[30%] overflow-y-auto pr-2`}>
            <div className="w-full flex flex-col gap-4 overflow-y-auto h-full pr-2" style={{ maxHeight: "calc(100vh - 150px)" }}>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="cursor-pointer flex justify-center"
                  onClick={() => handleSelectedJob(job)}

                >
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          </div>

          <div className={`${selectedJob ? "flex" : "hidden lg:flex"
            } flex-col lg:w-[70%]`}>
            <button
              onClick={() => setSelectedJob(null)}
              className="text-[#244034] underline hover:text-[#244034] mb-3 lg:hidden"
            >
              <CircleArrowLeft className="w-10 h-10" />
            </button>
            {jobLoading ? (<BigJobLoader></BigJobLoader>) : selectedJob ? (
              <div className="animate-fadeIn"><JobDetailsCard job={selectedJob} /></div>
            ) : (
              <AnimatedJobPlaceholder></AnimatedJobPlaceholder>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FindJobsPage;