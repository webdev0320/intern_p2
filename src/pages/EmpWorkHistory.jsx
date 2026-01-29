import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa6";
import Swal from "sweetalert2";

function EmpWorkHistory() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getApiType = () => {
    if (type === "new") return 1;
    if (type === "inprogress") return 2;
    if (type === "finished") return 3;
    return 1;
  };

  useEffect(() => {
    fetchJobs();
  }, [type]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = localStorage.getItem("user_id");
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const apiType = getApiType();
      

      const url = `${BASE_URL}/api/jobs/workers?worker_id=${userId}&type=${apiType}&IsEnterprise=false`;
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

  const handleCancel = async (job) => {
  try {

    const response = await fetch(
      `${BASE_URL}/api/jobs/reject_reason?type=2`,
      {
        method: "GET",
      }
    );

    const result = await response.json();

    if (!response.ok || result.status !== "success!") {
      Swal.fire("Error", "Failed to load rejection reasons", "error");
      return;
    }

    // 🔹 Convert API response to Swal select options
    const reasonOptions = {};
    result.data.forEach((item) => {
      reasonOptions[item.rj_id] = item.reason;
    });

    // 🔹 Show Swal Modal
    const { value: selectedReason } = await Swal.fire({
      title: "Cancel Job",
      text: "Please select a rejection reason",
      icon: "warning",
      input: "select",
      inputOptions: reasonOptions,
      inputPlaceholder: "Select a reason",
      showCancelButton: true,
      confirmButtonText: "Confirm Cancel",
      cancelButtonText: "Close",
      inputValidator: (value) => {
        if (!value) {
          return "You must select a reason";
        }
      },
    });

    // ❌ User cancelled
    if (!selectedReason) return;

    console.log("Job ID:", job.offer_id);
    console.log("Selected Reason ID:", selectedReason);

   

      const payload = new FormData();
      payload.append("status", 'Cancel');
      payload.append("job_name", job.job_name);
      payload.append("worker_id", userId);
      payload.append("who_offer_job_user_id", job.user_id);
      payload.append("Reason_Id", selectedReason);


    try {
      const response = await fetch(
        `${BASE_URL}/api/jobs/worker_cancel_job?job_offer_id=${job.job_id}`,
        {
          method: "POST",
          body: payload,
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        Swal.fire("Cancelled", "Job cancelled successfully", "success");
        window.location.reload();
      } else {
        Swal.fire("Error", data.message || "Failed to cancel job", "error");
      }
    } catch (error) {
      console.error("Cancel API error:", error);
      Swal.fire("Error", "Something went wrong", "error");
    }

    Swal.fire("Cancelled", "Job cancelled successfully", "success");

  } catch (error) {
    console.error("API Error:", error);
    Swal.fire("Error", "Something went wrong", "error");
  }
};

  const formatTitle = (t) =>
    t ? t.charAt(0).toUpperCase() + t.slice(1) : "";

  const buttons = [
    { label: "New", type: "new" },
    { label: "In Progress", type: "inprogress" },
    { label: "Completed", type: "finished" },
  ];

// ✅ FOLLOW API
const handleFollow = async (followId) => {
  if (!followId) {
    console.error("Invalid followId");
    return;
  }

  try {
    const payload = new FormData();
    payload.append("follower_id", userId);
    payload.append("following_id", followId);
    payload.append("status", 2);

    const response = await fetch(`${BASE_URL}/api/users/follow/`, {
      method: "POST",
      body: payload,
    });

    const data = await response.json();

    if (response.ok) {

      Swal.fire({
        title: "Success!",
        text: "Followed successfully",
        icon: "success",
      });


    } else {
      Swal.fire({
        title: "Success!",
        text: "Follow failed",
        icon: "error",
      });

    }
  } catch (error) {
      Swal.fire({
        title: "Success!",
        text: "Follow failed",
        icon: "error",
      });
  }
};


  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* TITLE */}
      <h1 className="text-xl font-bold mb-4">History – {formatTitle(type)}</h1>

      {/* BUTTONS */}
      <div className="flex mb-6">
  {buttons.map((btn) => (
    <button
      key={btn.type}
      onClick={() => navigate(`/work-history/${btn.type}`)}
      className={`flex-1 py-2 font-medium rounded-none ${
        type === btn.type
          ? "bg-blue-500 text-white"
          : "bg-white text-gray-600 border border-gray-300"
      }`}
    >
      {btn.label}
    </button>
  ))}
</div>

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
                  <div className="space-y-2">
                    <h6 className="text-blue-600">
                      {job.address}
                    </h6>

                    <h2 className="text-blue-600 font-semibold text-lg">
                      {job.job_name}, {job.job_id}
                    </h2>
                  </div>
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
                    <p className="text-blue-600 font-semibold">{job.offer_rate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 flex items-center gap-1">⏰ Date Posted</p>
                    <p className="text-blue-600 font-semibold">{job.job_post_date}</p>
                  </div>
                </div>

                <hr className="my-3" />

                {/* REMOTE */}
                <p className="text-sm">
                  <span className="text-gray-500">Remote Work:</span>{" "}
                  <span className="text-blue-600 font-semibold">No</span>
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
                    className="grid grid-cols-4 text-center text-sm font-semibold text-blue-600"
                  >
                    <div>{d.start_date}</div>
                    <div>{d.duration_in_hours} hrs</div>
                    <div>{d.start_time}</div>
                    <div>{job.job_status === 'Accept' ? 'Accepted' : ''}</div>
                  </div>
                ))}

                {/* BUTTON */}
               {job.job_status === "Accept" && (
                  <div className="mt-5 flex gap-3">
                    

                    <button
                      onClick={() =>
                        window.open("https://wa.me/44782345457", "_blank")
                      }
                      className="flex-1 bg-green-500 text-white py-3 rounded-xl shadow-lg text-sm font-small"
                    >
                      Contact Hirer
                    </button>

                    <button
                      onClick={() => handleFollow(job.user_id)}
                      className="flex-1 bg-yellow-500 text-white py-3 rounded-xl shadow-lg text-sm font-small"
                    >
                      Follow Hirer
                    </button>


                    <button
                      onClick={() => handleCancel(job)}
                      className="flex-1 bg-red-500 text-white py-3 rounded-xl shadow-lg text-sm font-small"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default EmpWorkHistory;
