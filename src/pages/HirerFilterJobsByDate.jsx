import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa6";

function HirerFilterJobsByDate() {
  const type = 'finished';
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getApiType = () => {
    return 4;
  };

  useEffect(() => {
    fetchJobs();
  }, [type]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const apiType = getApiType();
      
      const userId = localStorage.getItem("user_id");
      const url = `${BASE_URL}/api/jobs/owner?owner_id=${userId}&type=${apiType}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("API failed");
      const result = await response.json();
      setJobs(result.data || []);
    } catch (e) {
      console.error("API error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (jobId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/jobs/update_work_status?job_offer_id=${jobId}`,
      {
        method: "POST", // or GET if your API expects GET
      }
    );

    const data = await response.json();

    if (response.ok) {
      window.location.reload(); // 🔄 refresh page
    } else {
      console.error("Error:", data);
    }
  } catch (error) {
    console.error("API Error:", error);
  }
};

  const formatTitle = (t) =>
    t ? t.charAt(0).toUpperCase() + t.slice(1) : "";

  const buttons = [
    { label: "New", type: "new" },
    { label: "In Progress", type: "inprogress" },
    { label: "Completed", type: "finished" },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* TITLE */}
      <h1 className="text-xl font-bold mb-4">History</h1>


      {/* LOADING */}
      {loading && <p className="text-center">Loading...</p>}

      {/* EMPTY */}
      {!loading && jobs.length === 0 && (
        <p className="text-center text-gray-500">No work found.</p>
      )}

      {/* JOBS GRID */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {!loading &&
            jobs.map((job) => (
              <div key={job.job_id}  onClick={() => navigate(`/job-details-worker/${job.job_id}`)} className="bg-white rounded-2xl shadow p-4">
                {/* HEADER */}
                <div className="flex justify-between items-center">
                  <h2 className="text-orange-600 font-semibold text-lg">
                    {job.job_post_date}
                  </h2>
                  <h5 className="text-black-600 font-semibold text-lg">
                    {job.job_name}, {job.job_id}
                  </h5>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HirerFilterJobsByDate;
