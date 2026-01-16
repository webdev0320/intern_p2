import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa6";

function WorkHistory() {
  const { type } = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // map route → api type
  const getApiType = () => {
    if (type === "new") return 1;
    if (type === "inprogress") return 2;
    if (type === "finished") return 3;
    return 1;
  };

  useEffect(() => {
    fetchJobs();
  }, [type]);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const apiType = getApiType();
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
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

  const formatTitle = (t) =>
    t ? t.charAt(0).toUpperCase() + t.slice(1) : "";

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* TITLE */}
      <h1 className="text-xl font-bold mb-4">
        History – {formatTitle(type)}
      </h1>

      {/* LOADING */}
      {loading && <p className="text-center">Loading...</p>}

      {/* EMPTY */}
      {!loading && jobs.length === 0 && (
        <p className="text-center text-gray-500">No work found.</p>
      )}

<div className="container">
  {/* Grid wrapper */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {!loading &&
      jobs.map((job) => (
        <div key={job.job_id} className="bg-white rounded-2xl shadow p-4">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h2 className="text-orange-600 font-semibold text-lg">
              {job.job_name}, {job.Worker_Required}
            </h2>
            <div
                className="flex items-center gap-1 text-green-600 text-sm font-medium cursor-pointer"
                onClick={() => window.open("https://wa.me/44782345457", "_blank")}
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

          {/* BUTTON */}
          {job.job_status === "Waiting" && (
            <button className="mt-5 w-full bg-orange-500 text-white py-3 rounded-xl shadow-lg text-lg font-medium">
              Refund Amount
            </button>
          )}
        </div>
      ))}
  </div>
</div>

    </div>
  );
}

export default WorkHistory;
