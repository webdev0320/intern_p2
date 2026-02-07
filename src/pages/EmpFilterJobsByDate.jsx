import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaBriefcase, FaArrowRight } from "react-icons/fa";

function EmpFilterJobsByDate() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = localStorage.getItem("user_id");

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const apiType = 4; // Completed/Finished
      const url = `${BASE_URL}/api/jobs/workers?worker_id=${userId}&type=${apiType}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("API failed");
      const result = await response.json();
      setJobs(result.data || []);
    } catch (e) {
      console.error("API error:", e);
    } finally {
      setLoading(false);
    }
  }, [BASE_URL, userId]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Job History</h1>
        <p className="text-gray-500 text-sm">Review your completed assignments by date.</p>
      </div>

      {/* STATUS INDICATORS */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Fetching jobs...</p>
        </div>
      )}

      {!loading && jobs.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
          <p className="text-gray-400">No completed work found for this period.</p>
        </div>
      )}

      {/* JOBS GRID */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {!loading &&
            jobs.map((job) => (
              <div
                key={job.job_id}
                onClick={() => navigate(`/emp-job-details/${job.job_id}`)}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* FIRST ROW: DATE */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <FaCalendarAlt size={14} />
                    </div>
                    <span className="text-sm font-bold text-blue-600 tracking-wide uppercase">
                      {job.duration?.[0]?.start_date || "No Date"}
                    </span>
                  </div>

                  {/* SECOND ROW: JOB INFO */}
                  <div className="mt-2">
                    <div className="flex items-start space-x-2">
                      <FaBriefcase className="text-gray-400 mt-1 flex-shrink-0" size={14} />
                      <div>
                        <h3 className="text-gray-900 font-bold text-lg leading-tight group-hover:text-blue-700 transition-colors">
                          {job.job_name}
                        </h3>
                        <p className="text-gray-400 text-xs mt-1">
                          Job ID: <span className="font-mono">#{job.job_id}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BOTTOM DECORATION */}
                <div className="mt-6 flex justify-end items-center text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-semibold mr-1">View Details</span>
                  <FaArrowRight size={10} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default EmpFilterJobsByDate;