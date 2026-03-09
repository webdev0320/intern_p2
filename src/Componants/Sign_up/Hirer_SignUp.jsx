import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { COLLECTIONS } from "../../firebaseConstants";
// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
iconRetinaUrl:
"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
iconUrl:
"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
shadowUrl:
"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});
const HirerSignUpPage = () => {
const navigate = useNavigate();
const fileInputRef = useRef(null);
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const [step, setStep] = useState(1);
const [loading, setLoading] = useState(false);
const [addressQuery, setAddressQuery] = useState("");
const [suggestions, setSuggestions] = useState([]);
const [formData, setFormData] = useState({
forenames: "",
surname: "",
email: "",
password: "",
confirmPassword: "",
dateofbirth: "",
gender: "",
businessName: "",
contactNumber: "",
addressLine1: "",
addressLine2: "",
city: "",
country: "United Kingdom",
postcode: "",
aboutMe: "",
createDualAccount: false,
lat: 51.505,
lng: -0.09,
});
// ---------------- Image Upload ----------------
const handleImageChange = (e) => {
const file = e.target.files[0];
if (!file) return;
if (!file.type.startsWith("image/")) {
alert("Please upload an image file");
return;
}
setFormData((prev) => ({
...prev,
profile_image: file,
image_preview: URL.createObjectURL(file),
}));
};
// ---------------- Input Change ----------------
const handleChange = (e) => {
const { name, value, type, checked } = e.target;
setFormData((prev) => ({
...prev,
[name]: type === "checkbox" ? checked : value,
}));
};
// ---------------- Step 1 ----------------
const handleStep1 = async (e) => {
e.preventDefault();
if (formData.password !== formData.confirmPassword) {
Swal.fire("Error", "Passwords do not match", "error");
return;
}
setLoading(true);
try {
const payload = new FormData();
payload.append("email", formData.email);
payload.append("user_type", "emp");
const response = await fetch(
`${BASE_URL}/api/users/verifyemail/`,
{
method: "POST",
body: payload,
}
);
const data = await response.json();
if (response.ok) {
setStep(2);
} else {
Swal.fire("Error", data.message || "Email invalid", "error");
}
} catch {
Swal.fire("Error", "Server unreachable", "error");
}
setLoading(false);
};
// ---------------- Step 2 ----------------
const handleStep2 = (e) => {
e.preventDefault();
setStep(3);
};
// ---------------- GPS Location ----------------
const getUserLocation = () => {
if (!navigator.geolocation) {
Swal.fire("Error", "Geolocation not supported", "error");
return;
}
navigator.geolocation.getCurrentPosition((position) => {
const lat = position.coords.latitude;
const lng = position.coords.longitude;
setFormData((prev) => ({
...prev,
lat,
lng,
}));
});
};

useEffect(() => {
  if (step === 3) {
    getUserLocation();
  }
}, [step]);

// ---------------- Search Address ----------------
const searchAddress = async () => {
if (!addressQuery) return;
try {
const res = await fetch(
`https://nominatim.openstreetmap.org/search?format=json&q=${addressQuery}`
);
const data = await res.json();
if (data.length > 0) {
const lat = parseFloat(data[0].lat);
const lng = parseFloat(data[0].lon);
setFormData((prev) => ({
...prev,
lat,
lng,
}));
}
} catch (err) {
console.error(err);
}
};

const fetchSuggestions = async (query) => {
  if (!query || query.length < 3) {
    setSuggestions([]);
    return;
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${query}`
    );

    const data = await res.json();
    setSuggestions(data);
  } catch (err) {
    console.error(err);
  }
};
// ---------------- Reverse Geocode ----------------
const reverseGeocode = async (lat, lng) => {
try {
const res = await fetch(
`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
);
const data = await res.json();
if (data?.display_name) {
setAddressQuery(data.display_name);
}
} catch (err) {
console.error(err);
}
};
// ---------------- Map Marker ----------------
const LocationMarker = () => {
const map = useMapEvents({
click(e) {
const lat = e.latlng.lat;
const lng = e.latlng.lng;
setFormData((prev) => ({
...prev,
lat,
lng,
}));
reverseGeocode(lat, lng);
},
});
useEffect(() => {
map.setView([formData.lat, formData.lng], 13);
}, [formData.lat, formData.lng]);
return <Marker position={[formData.lat, formData.lng]} />;
};
// ---------------- Final Submit ----------------
const handleFinalSubmit = async () => {
setLoading(true);
try {
const fullName = `${formData.forenames} ${formData.surname}`.trim();
const payload = new FormData();
payload.append("name", fullName);
payload.append("u_type", "emp");
payload.append("email", formData.email);
payload.append("password", formData.password);
payload.append("dateofbirth", formData.dateofbirth);
payload.append("sex", formData.gender);
payload.append("lat", formData.lat);
payload.append("lon", formData.lng);
payload.append("city", formData.city);
payload.append("post_code", formData.postcode);
payload.append("country", formData.country);
payload.append("business_name", formData.businessName);
payload.append("mobile_number", formData.contactNumber);
payload.append(
"address",
`${formData.addressLine1}, ${formData.addressLine2}`
);
payload.append("aboutme", formData.aboutMe);
payload.append("u_dual", formData.createDualAccount ? "1" : "0");
if (formData.profile_image) {
payload.append("u_image", formData.profile_image);
}
const response = await fetch(
`${BASE_URL}/api/users/dualuser_register`,
{
method: "POST",
body: payload,
}
);
const data = await response.json();
if (response.ok) {
try {
const workerRef = collection(
db,
COLLECTIONS.USERS,
"StoredUsers",
"Hirer"
);
await addDoc(workerRef, {
email: formData.email,
name: fullName,
profileImage:
data.u_image || formData.image_preview || "",
userId: data.user_id.toString(),
userType: "Hirer",
createdAt: new Date(),
});
} catch (err) {
console.error("Firebase error:", err);
}
Swal.fire("Success", "Account created!", "success");
navigate("/login/hirer");
} else {
Swal.fire("Error", data.message || "Registration failed", "error");
}
} catch {
Swal.fire("Error", "Connection failed", "error");
}
setLoading(false);
};
return (
<div className="min-h-screen py-8 px-4 bg-gray-50">
    <div className="max-w-2xl mx-auto">
        <motion.div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="text-center bg-orange-500 py-6 text-white">
            <h1 className="text-2xl font-bold">Hirer Registration</h1>
            <p className="text-sm opacity-90">Step {step} of 3</p>
        </div>
        <div className="p-6">
            <AnimatePresence mode="wait">
                {/* STEP 1: BASIC INFO */}
                {step === 1 && (
                <motion.form
                key="step1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                onSubmit={handleStep1}
                className="space-y-4"
                >
                {/* Profile Image Upload Section */}
                <div className="flex flex-col items-center mb-6">
                    <div
                        onClick={() => fileInputRef.current.click()}
                        className="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer overflow-hidden group"
                        >
                        {formData.image_preview ? (
                        <img
                        src={formData.image_preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        />
                        ) : (
                        <div className="text-center">
                            <span className="text-2xl text-gray-400">📷</span>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Upload</p>
                        </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white text-xs font-bold">Change</span>
                        </div>
                    </div>
                    <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                    />
                </div>
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                    <input name="forenames" placeholder="Forenames" required onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                    <input name="surname" placeholder="Surname" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                {/* Email Field */}
                <input name="email" type="email" placeholder="Email Address" required onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                {/* Gender & DOB Selection */}
                <div className="grid grid-cols-2 gap-4">
                    <select
                        name="gender"
                        required
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
                        >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <input name="dateofbirth" type="date" required onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                {/* Password Fields */}
                <div className="grid grid-cols-2 gap-4">
                    <input name="password" type="password" placeholder="Password" required onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                    <input name="confirmPassword" type="password" placeholder="Confirm Password" required onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg transition-colors active:scale-95">
                {loading ? "Verifying..." : "Next Step"}
                </button>
                </motion.form>
                )}
                {/* STEP 2: BUSINESS DETAILS (FROM IMAGE) */}
                {step === 2 && (
                <motion.form key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} onSubmit={handleStep2} className="space-y-4">
                <h3 className="font-bold text-gray-700">Business Details</h3>
                <input name="businessName" placeholder="Business name (if any)" onChange={handleChange} className="w-full p-3 border rounded-lg" />
                <input name="contactNumber" placeholder="Contact Number" onChange={handleChange} className="w-full p-3 border rounded-lg" />
                <input name="addressLine1" placeholder="First line of Address" onChange={handleChange} className="w-full p-3 border rounded-lg" />
                <input name="addressLine2" placeholder="Second line of Address" onChange={handleChange} className="w-full p-3 border rounded-lg" />
                <div className="grid grid-cols-2 gap-4">
                    <input name="city" placeholder="City/Region" onChange={handleChange} className="w-full p-3 border rounded-lg" />
                    <input name="postcode" placeholder="Post Code" onChange={handleChange} className="w-full p-3 border rounded-lg" />
                </div>
                <textarea name="aboutMe" placeholder="About Me" onChange={handleChange} className="w-full p-3 border rounded-lg" rows="3" />
                <div className="flex items-center gap-2">
                    <input type="checkbox" name="createDualAccount" onChange={handleChange} id="dual" />
                    <label htmlFor="dual" className="text-sm">Create dual accounts</label>
                </div>
                {/* Terms and Conditions Checkbox */}
                <div className="flex items-start gap-2">
                    <input
                    type="checkbox"
                    name="agreed"
                    required
                    onChange={handleChange}
                    id="terms"
                    className="w-4 h-4 mt-0.5 accent-orange-500 cursor-pointer"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                        I agree that I have read and accepted the{" "}
                        <span className="text-orange-500 font-bold hover:underline">
                            Terms of Use & Privacy Policy
                        </span>
                    </label>
                </div>
                <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold">Next: Set Location</button>
                </motion.form>
                )}
                {/* STEP 3: MAP LOCATION */}
                {step === 3 && (
                <motion.div
                key="step3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-4"
                >
                <h3 className="font-bold text-gray-700">Select Business Location</h3>
                {/* Address Search */}
                <div className="relative flex gap-2 z-[10000]">
                   <input
                      type="text"
                      placeholder="Search address..."
                      value={addressQuery}
                      onChange={(e) => {
                        setAddressQuery(e.target.value);
                        fetchSuggestions(e.target.value);
                      }}
                      className="flex-1 p-3 border rounded-lg"
                    />
                    <button
                    onClick={searchAddress}
                    className="bg-orange-500 text-white px-4 rounded-lg"
                    >
                    Search
                    </button>

                    {/* Suggestions dropdown */}
                        {suggestions.length > 0 && (
                          <div className="absolute top-12 left-0 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                            {suggestions.map((item, index) => (
                              <div
                                key={index}
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => {
                                  const lat = parseFloat(item.lat);
                                  const lng = parseFloat(item.lon);

                                  setFormData((prev) => ({
                                    ...prev,
                                    lat,
                                    lng
                                  }));

                                  setAddressQuery(item.display_name);
                                  setSuggestions([]);
                                }}
                              >
                                {item.display_name}
                              </div>
                            ))}
                          </div>
                        )}

                </div>
                {/* Find My Location Button */}
                <button
                onClick={getUserLocation}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
                >
                📍 Find My Location
                </button>
                {/* Map */}
                <div className="h-64 w-full rounded-lg overflow-hidden border">
                    <MapContainer
                    center={[formData.lat, formData.lng]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <LocationMarker />
                    </MapContainer>
                </div>
                <p className="text-xs text-gray-500">
                    Selected: {formData.lat.toFixed(4)}, {formData.lng.toFixed(4)}
                </p>
                <button
                onClick={handleFinalSubmit}
                disabled={loading}
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold shadow-lg"
                >
                {loading ? "Registering..." : "Complete Registration"}
                </button>
                <button
                onClick={() => setStep(2)}
                className="w-full text-gray-500 text-sm"
                >
                Back
                </button>
                </motion.div>
                )}
            </AnimatePresence>
        </div>
        </motion.div>
    </div>
</div>
);
};
export default HirerSignUpPage;