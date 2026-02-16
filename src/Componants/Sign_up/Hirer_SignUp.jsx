import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect,useRef } from "react";
import Swal from "sweetalert2";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { COLLECTIONS } from "../../firebaseConstants";

// Fix for default leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const HirerSignUpPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        // Step 1 fields
        forenames: '', surname: '', email: '', password: '', confirmPassword: '',
        dateofbirth: '', sex: '',
        // Step 2 fields (from image)
        businessName: '', contactNumber: '', addressLine1: '', addressLine2: '',
        city: '', country: 'United Kingdom', postcode: '', aboutMe: '', referralEmail: '',
        createDualAccount: false,
        // Step 3 fields
        lat: 51.505, lng: -0.09
    });

   const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        // Validation: Ensure it's an image
        if (!file.type.startsWith('image/')) {
            alert("Please upload an image file.");
            return;
        }

        setFormData((prev) => ({
            ...prev,
            profile_image: file, // This stores the actual file for the API
            image_preview: URL.createObjectURL(file) // This creates the UI preview
        }));
    }
};

const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
    }));
};

    // --- STEP 1: Email Verification ---
    const handleStep1 = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Passwords do not match!' });
            return;
        }

        setLoading(true);
        try {
            const payloadVerify = new FormData();
            payloadVerify.append('email', formData.email);
            payloadVerify.append('user_type', 'emp'); // As per your request
            const response = await fetch(`${BASE_URL}/api/users/verifyemail/`, {
                method: "POST",

                body: payloadVerify,
            });
            const data = await response.json();

            if (response.ok) {
                setStep(2);
            } else {
                Swal.fire({ icon: 'error', title: 'Verify Failed', text: data.message || "Email already exists or is invalid." });
            }
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Error', text: "Server unreachable." });
        } finally {
            setLoading(false);
        }
    };

    // --- STEP 2: Logic to move to Map ---
    const handleStep2 = (e) => {
        e.preventDefault();
        setStep(3);
    };

    // --- STEP 3: Final Registration ---
const handleFinalSubmit = async () => {
    setLoading(true);
    try {
        const fullName = `${formData.forenames} ${formData.surname}`.trim();
        const payload = new FormData();

        // --- Exact mapping based on your CURL log ---
        payload.append("name", fullName);
        payload.append("u_type", 'emp');
        payload.append("email", formData.email);
        payload.append("password", formData.password);
        payload.append("dateofbirth", formData.dateofbirth); // Ensure format is DD-MM-YYYY if required
        payload.append("sex", formData.gender); // Sent as "Male" or "Female"
        
        // --- Location ---
        payload.append("lat", formData.lat);
        payload.append("lon", formData.lng);
        payload.append("city", formData.city);
        payload.append("post_code", formData.postcode); // API expects post_code
        payload.append("country", formData.country);
        
        // --- Business & Contact ---
        payload.append("business_name", formData.businessName);
        payload.append("mobile_number", formData.contactNumber); // API expects mobile_number
        payload.append("address", `${formData.addressLine1}, ${formData.addressLine2}`);
        payload.append("aboutme", formData.aboutMe); // API expects aboutme (no underscore)
        
        // --- System Flags & Empty Fields ---
        payload.append("u_dual", formData.createDualAccount ? "1" : "0"); // API expects u_dual


        // --- Profile Image ---
        if (formData.profile_image) {
            payload.append("image", formData.profile_image);
        }

        const response = await fetch(`${BASE_URL}/api/users/dualuser_register`, {
            method: "POST",
            body: payload,
        });

        const data = await response.json();

        if (response.ok) {
            // --- FIREBASE SYNC ---
            try {
               const firestoreUserId = data.user_id.toString();

                    const workerCollectionRef = collection(
                            db, 
                            COLLECTIONS.USERS, 
                            "StoredUsers", 
                            "Hirer"
                        );

                        await addDoc(workerCollectionRef, {
                            email: formData.email,
                            name: fullName,
                            profileImage: data.u_image || formData.image_preview || "",
                            userId: firestoreUserId, // Storing your MySQL ID inside the doc
                            userType: "Hirer",
                            createdAt: new Date()
                        });
            } catch (fbError) {
                console.error("Firebase Sync Error:", fbError);
            }

            await Swal.fire({ icon: 'success', title: 'Success!', text: "Account created!", timer: 2000 });
            //navigate("/login/hirer");
        } else {
            Swal.fire({ icon: 'error', title: 'Failed', text: data.message || "Registration error" });
        }
    } catch (err) {
        Swal.fire({ icon: 'error', title: 'Error', text: "Connection failed." });
    } finally {
        setLoading(false);
    }
};

    // Map Click Handler Component
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setFormData(prev => ({ ...prev, lat: e.latlng.lat, lng: e.latlng.lng }));
            },
        });
        return <Marker position={[formData.lat, formData.lng]} />;
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
                                <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                                    <h3 className="font-bold text-gray-700">Select Business Location</h3>
                                    <div className="h-64 w-full rounded-lg overflow-hidden border">
                                        <MapContainer center={[formData.lat, formData.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
                                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                            <LocationMarker />
                                        </MapContainer>
                                    </div>
                                    <p className="text-xs text-gray-500">Selected: {formData.lat.toFixed(4)}, {formData.lng.toFixed(4)}</p>
                                    <button onClick={handleFinalSubmit} disabled={loading} className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold shadow-lg">
                                        {loading ? "Registering..." : "Complete Registration"}
                                    </button>
                                    <button onClick={() => setStep(2)} className="w-full text-gray-500 text-sm">Back</button>
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