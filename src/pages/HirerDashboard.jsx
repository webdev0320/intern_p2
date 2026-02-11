import React, { useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ProfileCompleteHirerAlert from '../Componants/profileCompleteHirerAlert';
const HirerDashboard = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [profile, setProfile] = useState(null);
  const [rating, setRating] = useState(0);
  const [totalFeedback, setTotalFeedback] = useState(0);

  const userId = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  // Refs to prevent duplicate API calls in React 18 StrictMode (dev)
  const profileFetched = useRef(false);
  const ratingFetched = useRef(false);

  /* ======================
     Fetch Profile
  ====================== */
  useEffect(() => {
    if (profileFetched.current) return; // prevent duplicate calls
    profileFetched.current = true;

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/users/profile/?id=${userId}`);
        const data = await response.json();
        console.log(data);
        if (data) {
          setProfile(data);
          localStorage.setItem("userProfile", JSON.stringify(data)); // store as string
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    if (userId) fetchUserProfile();
  }, [BASE_URL, userId]);

  /* ======================
     Fetch Rating
  ====================== */
  useEffect(() => {
    if (!userId || ratingFetched.current) return;
    ratingFetched.current = true;

    const fetchRating = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/users/userRating/?user_id=${userId}`
        );
        const data = await response.json();

        const totalStars =
          (data.star_rating1 || 0) +
          (data.star_rating2 || 0) +
          (data.star_rating3 || 0) +
          (data.star_rating4 || 0) +
          (data.star_rating5 || 0);

        setRating(totalStars / 5);
        setTotalFeedback(data?.data?.length || 0);
      } catch (error) {
        console.error("Failed to fetch rating:", error);
      }
    };

    fetchRating();
  }, [BASE_URL, userId]);

  if (!profile) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-24 pt-3 relative">
      {/* Header */}
      <div className="relative bg-white shadow-sm pb-20">
        <div className="relative z-10 container mx-auto gap-2 px-4 pt-6">
          {/* Profile Info */}
          <div className="flex items-center">
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-gray-500 mb-1">{profile.business_name}</p>

              <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={star <= rating ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
                <span className="ml-2 text-gray-800 font-medium">
                  {rating ? rating.toFixed(1) : 0}/5
                </span>
              </div>
            </div>
          </div>

          <ProfileCompleteHirerAlert 
                profile={profile} 
                role={role} 
                navigate={navigate} 
            />            

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div
              onClick={() => navigate("/feedbacks")}
              className="bg-white rounded-lg shadow text-center p-4 links"
            >
              <span className="block text-lg font-bold">{totalFeedback}</span>
              <span className="text-sm text-gray-500 uppercase">Feedbacks</span>
            </div>
            <div
              onClick={() => navigate("/followers")}
              className="bg-white rounded-lg shadow text-center p-4 links"
            >
              <span className="block text-lg font-bold">{profile.total_follower || 0}</span>
              <span className="text-sm text-gray-500 uppercase">Followers</span>
            </div>
            <div
              onClick={() => navigate("/following")}
              className="bg-white rounded-lg shadow text-center p-4 links"
            >
              <span className="block text-lg font-bold">{profile.total_following || 0}</span>
              <span className="text-sm text-gray-500 uppercase">Following</span>
            </div>
            <div
              onClick={() => navigate("/work-history/new")}
              className="bg-white rounded-lg shadow text-center p-4 links"
            >
              <span className="block text-lg font-bold">{profile.Waiting || 0}</span>
              <span className="text-sm text-gray-500 uppercase">New Work</span>
            </div>
            <div
              onClick={() => navigate("/work-history/inprogress")}
              className="bg-white rounded-lg shadow text-center p-4 links"
            >
              <span className="block text-lg font-bold">{profile.Approve || 0}</span>
              <span className="text-sm text-gray-500 uppercase">In-Progress</span>
            </div>
            <div
              onClick={() => navigate("/work-history/finished")}
              className="bg-white rounded-lg shadow text-center p-4 links"
            >
              <span className="block text-lg font-bold">{profile.Complete || 0}</span>
              <span className="text-sm text-gray-500 uppercase">Finished</span>
            </div>
          </div>

          <p className="mt-4 text-gray-600">{profile.aboutme || ""}</p>
        </div>
      </div>

      {/* Skills Card */}
      <div className="container mx-auto px-4 mt-6">
        <div className="bg-orange-500 text-white rounded-xl p-6 shadow">
          <h4 className="font-bold mb-4">My Industry & Skills</h4>
          <div className="flex flex-wrap gap-2">
            {profile.industries?.map((industry) => (
              <div
                key={industry.id}
                className="bg-white text-gray-800 rounded-lg px-4 py-2 font-medium"
              >
                {industry.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HirerDashboard;
