import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa6";
import Swal from "sweetalert2";
import logo from '../assets/logo_p2.png'
import { getStatusTerm } from "../constants/statuses";
function WorkHistory() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const IMAGE_BASE_URL = import.meta.env.VITE_API_IMAGE_BASE_URL;
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = localStorage.getItem("user_id");
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
    setJobs([]); // clear previous jobs
      const apiType = getApiType();


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


  const handleInProgressCancel = async (job) => {
  try {


      const payload = new FormData();
      payload.append("status", 'Cancel');
      payload.append("job_name", job.job_name);
      payload.append("worker_id",job.Workers[0].user_id);
      payload.append("who_offer_job_user_id", job.user_id);


    try {
      const response = await fetch(
        `${BASE_URL}/api/jobs/status_update?job_offer_id=${job.job_id}`,
        {
          method: "POST",
          body: payload,
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (response.status!=400) {
        Swal.fire("Cancelled", data.message, "success");
        window.location.reload();
      } else {
        Swal.fire("Error", data.message || "Failed to cancel job", "error");
      }
    } catch (error) {
      console.error("Cancel API error:", error);
      Swal.fire("Error", "Something went wrong", "error");
    }

  } catch (error) {
    console.error("API Error:", error);
    Swal.fire("Error", "Something went wrong", "error");
  }
};

  
  const handleCancel = async (job) => {
  try {

    const response = await fetch(
      `${BASE_URL}/api/jobs/reject_reason?type=1`,
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

    console.log(job);

      const payload = new FormData();
      payload.append("status", 'Cancel');
      payload.append("job_name", job.job_name);
      payload.append("worker_id",null);
      payload.append("who_offer_job_user_id", job.user_id);
      payload.append("Reason_Id", selectedReason);


    try {
      const response = await fetch(
        `${BASE_URL}/api/jobs/status_update?job_offer_id=${job.job_id}`,
        {
          method: "POST",
          body: payload,
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        Swal.fire("Cancelled", data.message, "success");
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
  

const handleAssignWork = async (job, worker) => {
  const confirm = await Swal.fire({
    title: 'Assign Work?',
    text: `Are you sure you want to assign this job to ${worker.name}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#f97316',
  });

  if (!confirm.isConfirmed) return;

  setLoading(true); // Assuming you have a loading state

  try {
    const formData = new FormData();
    formData.append("who_offer_job_user_id", job.user_id);
    formData.append("job_name", job.job_name);
    formData.append("status", "approve"); // Status set to 'approve' as per your payload
    formData.append("worker_id", worker.user_id);

    const response = await fetch(`${BASE_URL}/api/jobs/status_update?job_offer_id=${job.job_id}`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.status === "success!") {
      await Swal.fire({
        icon: 'success',
        title: 'Assigned!',
        text: data.message,
        timer: 2000,
        showConfirmButton: false
      });
      // Refresh your job list here or navigate
      window.location.reload(); 
    } else {
      throw new Error(data.message || "Failed to update status");
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message || "Could not complete assignment."
    });
  } finally {
    setLoading(false);
  }
};


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


const handleStartWork = async (job, worker) => {

  // ⛔ Time-window validation (Android logic applied)
/*  if (!canStartJob(job)) {
    Swal.fire({
      title: "Not Allowed",
      text: "You can only start the job within 15 minutes of its scheduled time.",
      icon: "warning",
    });
    return;
  }*/

  const confirm = await Swal.fire({
    title: 'Start Work?',
    text: "Are you ready to start this job?",
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#ea580c',
  });

  if (!confirm.isConfirmed) return;

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("who_offer_job_user_id", userId);
    formData.append("job_name", job.job_name);
    formData.append("status", "start");
    formData.append("worker_id", worker.user_id);

    const response = await fetch(
      `${BASE_URL}/api/jobs/status_update?job_offer_id=${job.job_id}`,
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    if (response.ok) {
      Swal.fire("Started!", "Job is now in progress.", "success");
      window.location.reload();
    } else {
      Swal.fire("Warning!", data.message, "warning");
    }

  } catch (error) {
    Swal.fire("Failed!", "Job Start Failed", "error");
  } finally {
    setLoading(false);
  }
};


const handleEndWork = async (job, worker) => {

  const confirm = await Swal.fire({
    title: "Hang On!",
    text: "You will still be charged for the original amount of work even you end this work before/after time. Do you still want to end this work?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#ea580c",
    allowOutsideClick: false, // same as setCanceledOnTouchOutside(false)
  });

  if (!confirm.isConfirmed) return;

  // ✅ Same as Android: updateJobStatusCall(..., COMPLETE)
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("who_offer_job_user_id", userId);
    formData.append("job_name", job.job_name);
    formData.append("status", "Complete"); // JOB_STATUS_COMPLETE
    formData.append("worker_id", worker.user_id);

    const response = await fetch(
      `${BASE_URL}/api/jobs/status_update?job_offer_id=${job.job_id}`,
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    if (data.status=='success!') {
      Swal.fire("Completed!", "Job has been marked as completed.", "success");
    } else {
      Swal.fire("Failed!", data.message, "error");
    }

  } catch (error) {
    Swal.fire("Failed!", "Job End Failed", "error");
  } finally {
    setLoading(false);
  }
};


const canStartJob = (job) => {
  const now = Date.now(); // current time in ms
const date = new Date(now);


  return job.duration.some(d => {
    const jobStart = new Date(`${d.startDate} ${d.startTime}`).getTime();
    const diff = jobStart - now;

    console.log("Job start:", jobStart, "Now:", now, "Diff:", diff);

    return diff >= 0 && diff <= 900000; // 15 minutes
  });
};


const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  
  // PadStart ensures 3 becomes 03
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};


  const formatTitle = (t) =>
    t ? t.charAt(0).toUpperCase() + t.slice(1) : "";

  const buttons = [
    { label: "New", type: "new" },
    { label: "In Progress", type: "inprogress" },
    { label: "Completed", type: "finished" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 py-4 overflow-x-hidden">
        {/* TITLE */}
        <h1 className="text-xl font-bold mb-4">
          History – {formatTitle(type)}
        </h1>

        {/* BUTTONS */}
        <div className="flex mb-6 w-full">
          {buttons.map((btn) => (
            <button
              key={btn.type}
              onClick={() => navigate(`/work-history/${btn.type}`)}
              className={`flex-1 py-2 font-medium ${
                type === btn.type
                  ? "bg-orange-500 text-white"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {!loading &&
            jobs.map((job) => (
              <div
                key={job.job_id}
                className="bg-white rounded-2xl shadow p-4 w-full"
              >
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

                {/* STATUS */}
                <p className="text-orange-500 text-sm mt-2">
                  {job.job_status === "Waiting" ? "No Worker has accepted this work yet": ''}
                </p>

                <hr className="my-3" />

                {/* DESCRIPTION */}
                <p className="font-semibold">Work Description:</p>
                <p className="text-sm text-gray-600">{job.jobdetail}</p>

                {/* LOCATION */}
                <p className="text-sm mt-2 text-gray-500">
                  📍 {job.job_location}
                </p>

                <hr className="my-3" />

                {/* PAY & DATE */}
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-gray-500">💷 Pay Rate</p>
                    <p className="text-orange-600 font-semibold">
                      {job.offer_rate}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">⏰ Date Posted</p>
                    <p className="text-orange-600 font-semibold">
                      {job.job_post_date}
                    </p>
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
                  <div>Start Time</div>
                  <div>Status</div>
                </div>

               {/* TABLE ROW */}
                  {job.duration?.map((d) => (
                    <div
                      key={d.duration_id}
                      className="grid grid-cols-4 text-center text-sm font-semibold text-orange-600"
                    >
                      <div>{formatDate(d.start_date)}</div>
                      <div>{d.duration_in_hours} hrs</div>
                      <div>{d.start_time}</div>
                      <div className="capitalize">
                        {getStatusTerm(d.offer_status)}
                      </div>
                    </div>
                  ))}

                {/* Images */}
                    <div className="flex gap-3 mt-3 justify-center">
                      {job.Image1 && (
                        <img
                          src={`${IMAGE_BASE_URL}/${job.Image1}`}
                          alt="Job Image 1"
                          className="w-20 h-20 object-cover rounded border"
                        />
                      )}

                      {job.Image2 && (
                        <img
                          src={`${IMAGE_BASE_URL}/${job.Image2}`}
                          alt="Job Image 2"
                          className="w-20 h-20 object-cover rounded border"
                        />
                      )}

                      {job.Image3 && (
                        <img
                          src={`${IMAGE_BASE_URL}/${job.Image3}`}
                          alt="Job Image 3"
                          className="w-20 h-20 object-cover rounded border"
                        />
                      )}
                    </div>  

                {/* CANCEL BUTTON */}
                {type=='inprogress'  && job.job_status === "Waiting" && (
                  <button
                    onClick={() => handleCancel(job)}
                    className="mt-5 w-full bg-orange-500 text-white py-3 rounded-xl shadow-lg text-lg font-medium"
                  >
                    Cancel
                  </button>
                )}

                 {type === "new" && job.job_status === "Waiting" && (
                    <button
                      onClick={() => handleCancel(job)}
                      className="mt-5 w-full bg-orange-500 text-white py-3 rounded-xl shadow-lg text-lg font-medium"
                    >
                      Refund Amount
                    </button>
                  )}

                  {type === "new" && job.job_status === "Accept" && job.Workers?.map((worker, idx) => (
                    <div key={idx} className="mt-4 p-4 border border-gray-100 rounded-xl bg-gray-50 flex items-center justify-between">
                      {/* Worker Info Side */}
                      <div className="flex items-center gap-3">
                        <img 
                          src={worker.image ? `${IMAGE_BASE_URL}/${worker.image}` : logo}
                          alt={worker.name} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div>
                          <p className="font-bold text-gray-800">{worker.name}</p>
                        </div>
                      </div>

                      {/* Assign Button Side */}
                      <button
                        onClick={() => handleAssignWork(job, worker)} 
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md text-sm font-semibold hover:bg-orange-600 active:scale-95 transition-all"
                      >
                        Assign Work
                      </button>
                    </div>
                  ))}

  {type === "inprogress" && job.job_status === "approve" && (
  <>
    <div className="mt-5 mb-2">
      <h3 className="text-lg font-bold text-gray-700">Accepted By</h3>
    </div>

    {job.Workers?.map((worker, idx) => (
      
      <div key={idx} className="mt-2 p-4 border border-gray-100 rounded-xl bg-gray-50 flex flex-col shadow-sm">
        
        {/* Row 1: Worker Info */}
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={worker.image ? `${IMAGE_BASE_URL}/${worker.image}` : logo}
            alt={worker.name} 
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div>
            <p className="font-bold text-gray-800">{worker.name}</p>
            <p className="text-xs text-gray-500">Professional Worker</p>
          </div>
        </div>

        {/* Row 2: Action Buttons */}
        <div className="flex flex-wrap md:flex-nowrap gap-2 border-t pt-4"> 
          <button
            onClick={() => navigate(`/hirer-chat/${job.user_id}-${worker.user_id}`)}
            className="flex-1 bg-green-500 text-white py-2 rounded-lg shadow text-sm font-medium hover:bg-green-600 transition-colors"
          >
            Contact Worker
          </button>

          <button
            onClick={() => handleFollow(worker.user_id)}
            className="flex-1 bg-yellow-500 text-white py-2 rounded-lg shadow text-sm font-medium hover:bg-yellow-600 transition-colors"
          >
            Follow Worker
          </button>

          <button
            onClick={() => handleInProgressCancel(job)}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg shadow text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* NEW: Row 3: Start Work Button */}
        <button
          onClick={() => handleStartWork(job, worker)}
          className="mt-3 w-full bg-orange-600 text-white py-2.5 rounded-lg shadow-md text-sm font-bold hover:bg-orange-700 active:scale-95 transition-all"
        >
          Start Work
        </button>

      </div>
    ))}
  </>

)}

  {type === "inprogress" && job.job_status === "Start" && (
  <>
    <div className="mt-5 mb-2">
      <h3 className="text-lg font-bold text-gray-700">Accepted By</h3>
    </div>

    {job.Workers?.map((worker, idx) => (
      <div key={idx} className="mt-2 p-4 border border-gray-100 rounded-xl bg-gray-50 flex flex-col shadow-sm">
        
        {/* Row 1: Worker Info */}
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={worker.image ? `${IMAGE_BASE_URL}/${worker.image}` : logo}
            alt={worker.name} 
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div>
            <p className="font-bold text-gray-800">{worker.name}</p>
            <p className="text-xs text-gray-500">Professional Worker</p>
          </div>
        </div>


        {/* NEW: Row 3: Start Work Button */}
        <button
            onClick={() => handleEndWork(job, worker)}
            className="mt-3 w-full bg-orange-600 text-white py-2.5 rounded-lg shadow-md text-sm font-bold hover:bg-orange-700 active:scale-95 transition-all"
          >
            End Work
          </button>


      </div>
    ))}
  </>
)}


    {type === "finished" && job.job_status === "Complete" && (
  <>
    <div className="mt-5 mb-2">
      <h3 className="text-lg font-bold text-gray-700">Accepted By</h3>
    </div>

    {job.Workers?.map((worker, idx) => (
      <div key={idx} className="mt-2 p-4 border border-gray-100 rounded-xl bg-gray-50 flex flex-col shadow-sm">
        
        {/* Row 1: Worker Info */}
        <div className="flex items-center gap-3 mb-4">
          <img 
           src={worker.image ? `${IMAGE_BASE_URL}/${worker.image}` : logo}
            alt={worker.name} 
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div>
            <p className="font-bold text-gray-800">{worker.name}</p>
            <p className="text-xs text-gray-500">Professional Worker</p>
          </div>
        </div>


        {/* NEW: Row 3: Start Work Button */}
        <button
            onClick={() => navigate(`/hirer/work-leave-feedback/${job.job_id}`)}
            className="mt-3 w-full bg-orange-600 text-white py-2.5 rounded-lg shadow-md text-sm font-bold hover:bg-orange-700 active:scale-95 transition-all"
          >
            Leave Feedback
          </button>


      </div>
    ))}
  </>
)}


              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default WorkHistory;
