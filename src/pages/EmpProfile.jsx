// pages/EmpProfileEdit.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, FaUser, FaPoundSign, FaBriefcase, 
  FaPhone, FaMapMarkerAlt, FaGlobe, FaMap, 
  FaInfoCircle, FaBell, FaCamera 
} from "react-icons/fa";
import Swal from "sweetalert2";

const EmpProfileEdit = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
    // Including hidden fields for payload completeness
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
        const response = await fetch(`${BASE_URL}/api/users/profile/?id=${userId}`);
        const data = await response.json();
        if (data) {
          setUser({
            ...data,
            // Ensure values are strings to avoid controlled/uncontrolled input warnings
            name: data.name || "",
            hourly_rate: data.hourly_rate || "",
            business_name: data.business_name || "",
            line_manager_name: data.line_manager_name || "",
            business_number: data.business_number || "",
            address: data.address || "",
            city: data.city || "",
            country: data.country || "",
            post_code: data.post_code || "",
            aboutme: data.aboutme || "",
          });
          setImagePreview(data.u_image);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [BASE_URL, userId]);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

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
      
      // Build payload exactly as shown in your curl
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
      
      // Coordinates and additional fields
      formData.append("lat", user.lat || "0.0");
      formData.append("lon", user.lon || "0.0");
      formData.append("insurance_number", user.insurance_number || "");
      formData.append("personal_utr", user.personal_utr || "");
      formData.append("mobile_number", user.mobile_number || "");

      // Handle Image: Only append if it's a new File object
      if (user.u_image instanceof File) {
        formData.append("u_image", user.u_image);
      } else {
        // Append empty string/null if no new image as per curl length 0
        formData.append("u_image", "");
      }

      const response = await fetch(`${BASE_URL}/api/users/profile_update/`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.status === "success!") {
        // Update local storage so other pages see the new data

        
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your changes have been saved successfully!",
          confirmButtonColor: "#1e73be"
        });
        window.location.href = 'emp-dashboard';
      } else {
        throw new Error(result.message || "Update failed");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1565C0]"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans pb-10">
      {/* HEADER SECTION */}
    

      {/* PROFILE IMAGE */}
      <div className="flex justify-center relative z-20">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-gray-50">
            {imagePreview ? (
              <img src={imagePreview} className="w-full h-full object-cover" alt="Profile" />
            ) : (
              <div className="w-full h-full flex items-center justify-center"><FaUser className="text-5xl text-gray-300" /></div>
            )}
          </div>
          <button 
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-1 right-1 bg-blue-600 p-3 rounded-full text-white border-4 border-white shadow-lg"
          >
            <FaCamera size={14} />
          </button>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
        </div>
      </div>

      {/* FORM SECTION */}
      <form onSubmit={handleSubmit} className="px-8 mt-10 space-y-7 max-w-2xl mx-auto">
        <InputField label="Forenames*" name="name" value={user.name} icon={<FaUser />} onChange={handleChange} required />
        <InputField label="Hourly Rate" name="hourly_rate" value={user.hourly_rate} icon={<FaPoundSign />} onChange={handleChange} />
        <InputField label="Business name (if any)" name="business_name" value={user.business_name} icon={<FaBriefcase />} onChange={handleChange} />
        <InputField label="Line Manager" name="line_manager_name" value={user.line_manager_name} icon={<FaUser />} onChange={handleChange} />
        <InputField label="Business Telephone Number" name="business_number" value={user.business_number} icon={<FaPhone />} onChange={handleChange} />
        <InputField label="Address" name="address" value={user.address} icon={<FaMapMarkerAlt />} onChange={handleChange} />
        <InputField label="City/Region" name="city" value={user.city} icon={<FaGlobe />} onChange={handleChange} />
        <InputField label="Country" name="country" value={user.country} icon={<FaGlobe />} onChange={handleChange} />
        <InputField label="Post Code / Zip Code" name="post_code" value={user.post_code} icon={<FaMap />} onChange={handleChange} />
        <InputField label="About Me" name="aboutme" value={user.aboutme} icon={<FaInfoCircle />} onChange={handleChange} />

        <button 
          type="submit"
          disabled={saving}
          className="w-full bg-[#1e73be] text-white font-bold py-5 rounded-xl shadow-xl active:scale-95 disabled:bg-gray-400 transition-all uppercase tracking-widest text-sm mt-12"
        >
          {saving ? "Saving Changes..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, icon, onChange, required = false }) => (
  <div className="group border-b border-gray-100 pb-2 focus-within:border-blue-400 transition-colors">
    <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-1 ml-10">
      {label}
    </label>
    <div className="flex items-center">
      <div className="w-10 text-gray-300 text-lg flex justify-center group-focus-within:text-blue-500 transition-colors">
        {icon}
      </div>
      <input 
        name={name} 
        value={value} 
        onChange={onChange} 
        required={required}
        className="flex-1 bg-transparent outline-none text-gray-700 font-semibold placeholder-gray-300 text-[15px]"
        placeholder={label.replace('*', '')}
      />
    </div>
  </div>
);

export default EmpProfileEdit;