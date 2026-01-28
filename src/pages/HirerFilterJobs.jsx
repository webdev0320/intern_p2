import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa6";

function HirerFilterJobs() {
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
              <div key={job.job_id} className="bg-white rounded-2xl shadow p-4">
                {/* HEADER */}
                <div className="flex justify-between items-center">
                  <h2 className="text-orange-600 font-semibold text-lg">
                    {job.job_name}, {job.job_id}
                  </h2>
                  <div
                    className="flex items-center gap-1 text-green-600 text-sm font-medium cursor-pointer"
                    onClick={() =>
                      window.open("https://wa.me/44782345457", "_blank")
                    }
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    Need Help?
                  </div>
                </div>

                {/* STATUS MESSAGE */}
                <p className="text-orange-500 text-sm mt-2">
                  {job.job_status === "Waiting"
                    ? "No Worker has accepted this work yet."
                    : job.job_status}
                </p>

                <hr className="my-3" />

                {/* DESCRIPTION */}
                <p className="font-semibold">Work Description:</p>
                <p className="text-sm text-gray-600">{job.jobdetail}</p>

                {/* LOCATION */}
                <p className="text-sm mt-2 text-gray-500 flex items-center gap-1">
                  📍 {job.job_location}
                </p>

                <hr className="my-3" />

                {/* PAY & DATE */}
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-gray-500 flex items-center gap-1">💷 Pay Rate</p>
                    <p className="text-orange-600 font-semibold">{job.offer_rate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 flex items-center gap-1">⏰ Date Posted</p>
                    <p className="text-orange-600 font-semibold">{job.job_post_date}</p>
                  </div>
                </div>

                <hr className="my-3" />

                {/* REMOTE */}
                <p className="text-sm">
                  <span className="text-gray-500">Remote Work:</span>{" "}
                  <span className="text-orange-600 font-semibold">No</span>
                </p>

                <hr className="my-3" />

                {/* TABLE HEADER */}
                <div className="grid grid-cols-4 text-center text-xs text-gray-500 font-medium mb-2">
                  <div>Work Date</div>
                  <div>Duration</div>
                  <div>Start Time (24h)</div>
                  <div>Status</div>
                </div>

                {/* TABLE ROW */}
                {job.duration?.map((d) => (
                  <div
                    key={d.duration_id}
                    className="grid grid-cols-4 text-center text-sm font-semibold text-orange-600"
                  >
                    <div>{d.start_date}</div>
                    <div>{d.duration_in_hours} hrs</div>
                    <div>{d.start_time}</div>
                    <div>{job.job_status}</div>
                  </div>
                ))}

                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => navigate(`/hirer/work-leave-feedback/${job.job_id}`)}
                      className="flex-1 bg-green-500 text-white py-3 rounded-xl shadow-lg text-sm font-small"
                    >
                      Leave FeedBack
                    </button>

                  </div>
                
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HirerFilterJobs;
