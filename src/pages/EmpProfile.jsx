// pages/EmpProfileEdit.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaPoundSign,
  FaBriefcase,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaMap,
  FaInfoCircle,
  FaCamera
} from "react-icons/fa";
import Swal from "sweetalert2";
import { db } from "../firebaseConfig";
import { COLLECTIONS } from "../firebaseConstants";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  updateDoc, 
  serverTimestamp 
} from "firebase/firestore";

const EmpProfileEdit = () => {

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const IMAGE_BASE_URL = import.meta.env.VITE_API_IMAGE_BASE_URL;
  const userId = localStorage.getItem("user_id");

  const [user, setUser] = useState({
    name: "",
    hourly_rate: "",
    business_name: "",
    line_manager_name: "",
    business_number: "",
    address: "",
    city: "",
    country: "",
    post_code: "",
    aboutme: "",
    u_image: null,
    lat: "",
    lon: "",
    insurance_number: "",
    personal_utr: "",
    mobile_number: ""
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {

        const res = await fetch(`${BASE_URL}/api/users/profile/?id=${userId}`);
        const data = await res.json();

        if (data) {

          setUser({
            ...data,
            name: data.name || "",
            hourly_rate: data.hourly_rate || "",
            business_name: data.business_name || "",
            line_manager_name: data.line_manager_name || "",
            business_number: data.business_number || "",
            address: data.address || "",
            city: data.city || "",
            country: data.country || "",
            post_code: data.post_code || "",
            aboutme: data.aboutme || ""
          });

          setImagePreview(IMAGE_BASE_URL + data.u_image);

        }

      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [BASE_URL, userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {
      setUser({ ...user, u_image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setSaving(true);

    try {

      const formData = new FormData();

      formData.append("user_id", userId);
      formData.append("name", user.name);
      formData.append("hourly_rate", user.hourly_rate);
      formData.append("business_name", user.business_name);
      formData.append("line_manager_name", user.line_manager_name);
      formData.append("business_number", user.business_number);
      formData.append("address", user.address);
      formData.append("city", user.city);
      formData.append("country", user.country);
      formData.append("post_code", user.post_code);
      formData.append("aboutme", user.aboutme);

      formData.append("lat", user.lat || "0.0");
      formData.append("lon", user.lon || "0.0");
      formData.append("insurance_number", user.insurance_number || "");
      formData.append("personal_utr", user.personal_utr || "");
      formData.append("mobile_number", user.mobile_number || "");

      if (user.u_image instanceof File) {
        formData.append("u_image", user.u_image);
      }

      const response = await fetch(`${BASE_URL}/api/users/profile_update/`, {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.status === "success!") {
        // --- Firebase Sync Fix ---
        try {
          const usersRef = collection(db, COLLECTIONS.USERS, "StoredUsers", "Worker");
          const q = query(usersRef, where("userId", "==", userId.toString()));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            const updatedImage = result.u_image ? (IMAGE_BASE_URL + result.u_image) : user.u_image;
            
            await updateDoc(docRef, {
              name: user.name,
              profileImage: updatedImage,
              updatedAt: serverTimestamp()
            });
            console.log("Firebase profile updated successfully!");
          } else {
            console.warn("No matching Firebase document found for userId:", userId);
          }
        } catch (fbError) {
          console.error("Firebase Sync Error:", fbError);
        }
        // -------------------------

        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your changes have been saved successfully!",
          confirmButtonColor: "#1e73be"
        });

        navigate("/emp-dashboard");

      } else {
        throw new Error(result.message || "Update failed");
      }

    } catch (err) {

      Swal.fire("Error", err.message, "error");

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">

      <div className="w-full bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

        {/* PROFILE IMAGE */}
        <div className="flex justify-center mb-8">
          <div className="relative">

            <div className="w-32 h-32 rounded-full border-4 border-gray-200 overflow-hidden">

              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-100">
                  <FaUser className="text-4xl text-gray-400" />
                </div>
              )}

            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full"
            >
              <FaCamera size={14} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={handleImageChange}
            />

          </div>
        </div>

        {/* FORM */}
       {/* FORM */}
<form onSubmit={handleSubmit} className="space-y-6">

  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">

    <InputField label="Forenames*" name="name" value={user.name} icon={<FaUser />} onChange={handleChange} required />
    <InputField label="Business name (if any)" name="business_name" value={user.business_name} icon={<FaBriefcase />} onChange={handleChange} />
    <InputField label="Line Manager" name="line_manager_name" value={user.line_manager_name} icon={<FaUser />} onChange={handleChange} />
    <InputField label="Hourly Rate" name="hourly_rate" value={user.hourly_rate} icon={<FaPoundSign />} onChange={handleChange} type="number" />
    <InputField label="Business Telephone Number" name="business_number" value={user.business_number} icon={<FaPhone />} onChange={handleChange} />
    <InputField label="Mobile Number" name="mobile_number" value={user.mobile_number} icon={<FaPhone />} onChange={handleChange} />
    <InputField label="Address" name="address" value={user.address} icon={<FaMapMarkerAlt />} onChange={handleChange} />
    <InputField label="City/Region" name="city" value={user.city} icon={<FaGlobe />} onChange={handleChange} />
    <InputField label="Country" name="country" value={user.country} icon={<FaGlobe />} onChange={handleChange} />
    <InputField label="Post Code / Zip Code" name="post_code" value={user.post_code} icon={<FaMap />} onChange={handleChange} />
    <InputField label="Insurance Number" name="insurance_number" value={user.insurance_number} icon={<FaMap />} onChange={handleChange} />
    <InputField label="Personal UTR" name="personal_utr" value={user.personal_utr} icon={<FaMap />} onChange={handleChange} />

    {/* FULL WIDTH FIELD */}
    <div className="lg:col-span-3">
      <InputField
        label="About Me"
        name="aboutme"
        value={user.aboutme}
        icon={<FaInfoCircle />}
        onChange={handleChange}
        textarea
      />
    </div>

  </div>

  <button
    type="submit"
    disabled={saving}
    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold disabled:bg-gray-400"
  >
    {saving ? "Saving..." : "Save Changes"}
  </button>

</form>

      </div>

    </div>

  );
};

const InputField = ({ label, name, value, icon, onChange, required = false, type = "text", textarea = false }) => (

  <div>

    <label className="block text-sm text-gray-500 mb-1">{label}</label>

    <div className="flex items-center border rounded-lg px-3 py-2">

      <div className="mr-2 text-gray-400">{icon}</div>

      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full outline-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full outline-none"
        />
      )}

    </div>

  </div>

);

export default EmpProfileEdit;