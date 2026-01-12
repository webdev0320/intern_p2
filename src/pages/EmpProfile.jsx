// pages/EmpProfile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmpProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const userId = localStorage.getItem("user_id");

        const response = await fetch(
          `${BASE_URL}/api/users/profile/?id=${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();

        if (data && data.user) {
          setUser(data.user); // Assuming API returns { user: { ... } }
        } else {
          throw new Error(data.message || "Profile data not found");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>

        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400 mb-2">
            👤
          </div>
          <button
            onClick={() => navigate("/profile/edit")}
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
          >
            Edit Profile
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-sm text-gray-500">Name</h2>
            <p className="text-gray-800 font-medium">{user.name || "-"}</p>
          </div>

          <div>
            <h2 className="text-sm text-gray-500">Email</h2>
            <p className="text-gray-800 font-medium">{user.email || "-"}</p>
          </div>

          <div>
            <h2 className="text-sm text-gray-500">Date of Birth</h2>
            <p className="text-gray-800 font-medium">{user.dateofbirth || "-"}</p>
          </div>

          <div>
            <h2 className="text-sm text-gray-500">Gender</h2>
            <p className="text-gray-800 font-medium">{user.sex || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpProfile;
