import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditHirerProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    aboutme: "",
    business_name: "",
    line_manager_name: "",
    business_number: "",
    address: "",
    city: "",
    country: "",
    post_code: "",
    insurance_number: "",
    personal_utr: "",
    mobile_number: "",
    hourly_rate: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("user_id");

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;

        const response = await fetch(
          `${BASE_URL}/api/users/profile/?id=${userId}`
        );

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();

        if (data && data.uid) {
          setUser({
            name: data.name || "",
            aboutme: data.aboutme || "",
            business_name: data.business_name || "",
            line_manager_name: data.line_manager_name || "",
            business_number: data.business_number || "",
            address: data.address || "",
            city: data.city || "",
            country: data.country || "",
            post_code: data.post_code || "",
            insurance_number: data.insurance_number || "",
            personal_utr: data.personal_utr || "",
            mobile_number: data.mobile_number || "",
            hourly_rate: data.hourly_rate || "",
          });
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

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation for required fields
    if (!user.name || !user.mobile_number || !user.hourly_rate) {
      Swal.fire({
        icon: "error",
        title: "Missing Required Fields",
        text: "Please fill all required fields.",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;

      // Prepare payload
      const payload = new FormData();
      Object.keys(user).forEach((key) => {
        payload.append(key, user[key] || "");
      });
      payload.append("user_id", userId);

      const response = await fetch(`${BASE_URL}/api/users/profile_update/`, {
        method: "POST",
        body: payload,
      });

      const data = await response.json();

      if (response.ok && data.status === "success!") {
        Swal.fire({
          icon: "success",
          title: "Profile Update",
          text: data.message || "Profile updated successfully!",
          confirmButtonColor: "#f97316",
        });
        navigate("/hirer-dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Profile Update",
          text: data.message || "Failed to update profile",
          confirmButtonColor: "#f97316",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Profile Update",
        text: err.message || "Failed to update profile",
        confirmButtonColor: "#f97316",
      });
    }
  };

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
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* About Me */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">About Me</label>
            <textarea
              name="aboutme"
              value={user.aboutme}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Business Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Business Name
            </label>
            <input
              type="text"
              name="business_name"
              value={user.business_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Line Manager */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Line Manager
            </label>
            <input
              type="text"
              name="line_manager_name"
              value={user.line_manager_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Business Telephone Number */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Business Telephone Number
            </label>
            <input
              type="text"
              name="business_number"
              value={user.business_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* City / Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                City / Region
              </label>
              <input
                type="text"
                name="city"
                value={user.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={user.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Post Code / Zip Code */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Post Code / Zip Code
            </label>
            <input
              type="text"
              name="post_code"
              value={user.post_code}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Insurance Number */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Insurance Number
            </label>
            <input
              type="text"
              name="insurance_number"
              value={user.insurance_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Personal UTR */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Personal UTR</label>
            <input
              type="text"
              name="personal_utr"
              value={user.personal_utr}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Mobile Number (Required) */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="mobile_number"
              value={user.mobile_number}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Hourly Rate (Required) */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Hourly Rate <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="hourly_rate"
              value={user.hourly_rate}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHirerProfile;
