// pages/EditHirerProfile.jsx
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

  // Replace this with dynamic user ID if you have authentication
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
    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;

      // Prepare payload
      const payload = new FormData();
      Object.keys(user).forEach((key) => {
        payload.append(key, user[key] || "");
      });
      payload.append("user_id", userId); // API expects user_id

      const response = await fetch(
        `${BASE_URL}/api/users/profile_update/`,
        {
          method: "POST",
          body: payload,
        }
      );

      const data = await response.json();

      if (response.ok && data.status === "success!") {
        alert(data.message || "Profile updated successfully!");
        navigate("/hirer-profile");
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Server error");
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
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name *</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

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

          <div>
            <label className="block text-sm text-gray-600 mb-1">Business Name</label>
            <input
              type="text"
              name="business_name"
              value={user.business_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Line Manager</label>
            <input
              type="text"
              name="line_manager_name"
              value={user.line_manager_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Business Telephone Number</label>
            <input
              type="text"
              name="business_number"
              value={user.business_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">City / Region</label>
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

          <div>
            <label className="block text-sm text-gray-600 mb-1">Post Code / Zip Code</label>
            <input
              type="text"
              name="post_code"
              value={user.post_code}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Insurance Number</label>
            <input
              type="text"
              name="insurance_number"
              value={user.insurance_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

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

          <div>
            <label className="block text-sm text-gray-600 mb-1">Mobile Number</label>
            <input
              type="text"
              name="mobile_number"
              value={user.mobile_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Hourly Rate</label>
            <input
              type="number"
              name="hourly_rate"
              value={user.hourly_rate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>


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
