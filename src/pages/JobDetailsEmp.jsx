import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBell,
  FaUserCircle,
  FaMapMarkerAlt,
  FaBriefcase,
  FaPoundSign,
} from "react-icons/fa";
import Swal from "sweetalert2";

const JobDetails = () => {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const userId = localStorage.getItem("user_id"); // follower
  const token = localStorage.getItem("token");

  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/jobs/detail?offer_id=${offerId}`
        );
        const result = await response.json();

        if (result.status === "success!" && result.data?.length > 0) {
          setJobData(result.data[0]);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [offerId, BASE_URL]);

  // ✅ FOLLOW API
  const handleFollow = async () => {
    try {
      const payload = new FormData();
      payload.append("follower_id", userId);
      payload.append("following_id", jobData?.user_id);
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (!jobData)
    return (
      <div className="min-h-screen flex items-center justify-center">
        No details found.
      </div>
    );

return (
  <div className="min-h-screen bg-gray-100 pt-20 px-4">
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg p-6">

        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-bold text-blue-500">
            {jobData.job_name}, {jobData.job_id}
          </h2>
          <button
            onClick={() =>
              window.open("https://wa.me/44782345457", "_blank")
            }
            className="text-green-600 font-medium flex items-center gap-1"
          >
            💬 Need Help?
          </button>
        </div>

        <p className="text-sm text-blue-500 mb-4">
          No Worker has accepted this work yet.
        </p>

        <hr className="mb-4" />

        {/* Work Description */}
        <h3 className="font-semibold text-gray-800 mb-1">
          Work Description:
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          {jobData.jobdetail}
        </p>

        {/* Location */}
        <div className="flex gap-2 text-sm text-gray-600 mb-4">
          <FaMapMarkerAlt className="text-pink-500 mt-1" />
          <p>{jobData.job_location}</p>
        </div>

        <hr className="mb-4" />

        {/* Pay & Date */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div className="flex items-center gap-2">
            💷
            <div>
              <p className="text-gray-500">Pay Rate</p>
              <p className="text-blue-500 font-semibold">
                {jobData.offer_rate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            ⏰
            <div>
              <p className="text-gray-500">Date Posted</p>
              <p className="text-blue-500 font-semibold">
                {jobData.job_post_date}
              </p>
            </div>
          </div>
        </div>

        <hr className="mb-4" />

        {/* Remote */}
        <p className="text-sm mb-4">
          <span className="text-gray-500">Remote Work:</span>{" "}
          <span className="text-blue-500 font-semibold">No</span>
        </p>

        <hr className="mb-4" />

        {/* Work Table */}
        <div className="grid grid-cols-4 text-center text-sm mb-6">
          <div>
            <p className="text-gray-500">Work Date</p>
            <p className="text-blue-500 font-semibold">
              {jobData.duration?.[0]?.start_date}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Duration</p>
            <p className="text-blue-500 font-semibold">
              {jobData.duration?.[0]?.duration_in_hours} hrs
            </p>
          </div>

          <div>
            <p className="text-gray-500">Start Time</p>
            <p className="text-blue-500 font-semibold">
              {jobData.duration?.[0]?.start_time}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <p className="text-blue-500 font-semibold">
              Waiting
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
);

};

export default JobDetails;
