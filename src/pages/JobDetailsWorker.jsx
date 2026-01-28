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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Job Details
        </h1>
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          {/* Hirer */}
          <div className="flex items-center gap-4 mb-4">
            {jobData.image ? (
              <img
                src={jobData.image}
                alt="Hirer"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-6xl text-gray-400" />
            )}
            <h2 className="text-xl font-bold text-gray-800">
              {jobData.name}
            </h2>
          </div>

          {/* Location */}
          <div className="flex gap-2 mb-6 text-sm text-orange">
            <FaMapMarkerAlt />
            <p>{jobData.job_location}</p>
          </div>

          <hr className="mb-6" />

          {/* Job Info */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <p className="text-gray-400 text-sm">Work Offered</p>
              <p className="text-orange font-semibold">
                {jobData.job_name}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Pay Rate</p>
              <p className="text-orange font-semibold">
                £ {jobData.offer_rate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
