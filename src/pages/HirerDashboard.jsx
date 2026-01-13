import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


const HirerDashboard = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchProfile = async () => {
      try {

        const response = await fetch(`${BASE_URL}/api/users/profile/?id=${userId}`);
        const data = await response.json();
        if (data) {
          setProfile(data);
        }

      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* Header */}
      <div className="relative bg-white shadow-sm pb-20">
        <div className="relative z-10 container mx-auto px-4 pt-6">
          {/* Profile Info */}
          <div className="flex items-center">
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-gray-500 mb-1">{profile.business_name}</p>
              <div className="flex items-center text-yellow-400">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                <span className="ml-2 text-gray-800 font-medium">5/5</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div onClick={() => navigate("/feedbacks")} className="bg-white rounded-lg shadow text-center p-4">
              <span className="block text-lg font-bold">0</span>
              <span className="text-sm text-gray-500 uppercase">Feedbacks</span>
            </div>
            <div onClick={() => navigate("/followers")} className="bg-white rounded-lg shadow text-center p-4">
              <span className="block text-lg font-bold">{profile.total_follower}</span>
              <span className="text-sm text-gray-500 uppercase">Followers</span>
            </div>
            <div onClick={() => navigate("/following")} className="bg-white rounded-lg shadow text-center p-4">
              <span className="block text-lg font-bold">{profile.total_following}</span>
              <span className="text-sm text-gray-500 uppercase">Following</span>
            </div>
            <div onClick={() => navigate("/work-history")} className="bg-white rounded-lg shadow text-center p-4">
              <span className="block text-lg font-bold">{profile.Waiting}</span>
              <span className="text-sm text-gray-500 uppercase">New Work</span>
            </div>
            <div onClick={() => navigate("/work-history")} className="bg-white rounded-lg shadow text-center p-4">
              <span className="block text-lg font-bold">{profile.Accept}</span>
              <span className="text-sm text-gray-500 uppercase">In-Progress</span>
            </div>
            <div onClick={() => navigate("/work-history")} className="bg-white rounded-lg shadow text-center p-4">
              <span className="block text-lg font-bold">{profile.Complete}</span>
              <span className="text-sm text-gray-500 uppercase">Finished</span>
            </div>
          </div>

          <p className="mt-4 text-gray-600">{profile.aboutme}</p>
        </div>
      </div>

      {/* Skills Card */}
      <div className="container mx-auto px-4 mt-6">
        <div className="bg-orange-500 text-white rounded-xl p-6 shadow">
          <h4 className="font-bold mb-4">My Industry & Skills</h4>
          <div className="flex flex-wrap gap-2">
            {profile.industries.map((industry) => (
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
