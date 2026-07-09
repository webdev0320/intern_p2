import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useState, useRef } from "react";
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

const WorkerSignUpPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [formData, setFormData] = useState({
        // Step 1
        forenames: '', surname: '', email: '', password: '', confirmPassword: '',
        dob: '', sex: '',
        // Step 2
        businessName: '', contactNumber: '', hourlyRate: '',
        addressLine1: '', addressLine2: '', city: '', postcode: '',
        country: 'United Kingdom', aboutMe: '', referralEmail: '',
        createDualAccount: false,
        // Step 3
        lat: 51.505, lng: -0.09,
        profile_image: null,
        image_preview: null
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                Swal.fire("Error", "Please upload an image file.", "error");
                return;
            }
            setFormData(prev => ({
                ...prev,
                profile_image: file,
                image_preview: URL.createObjectURL(file)
            }));
        }
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
            payloadVerify.append('user_type', 'self-emp'); 
            
            const response = await fetch(`${BASE_URL}/api/users/verifyemail/`, {
                method: "POST",
                body: payloadVerify,
            });
            const data = await response.json();

            if (response.ok) {
                setStep(2);
            } else {
                Swal.fire({ icon: 'error', title: 'Verify Failed', text: data.message || "Email already exists." });
            }
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Error', text: "Server unreachable." });
        } finally {
            setLoading(false);
        }
    };

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

            // Core Fields matching backend: $user_data['...']
            payload.append("name", fullName);
            payload.append("u_type", 'self-emp');
            payload.append("email", formData.email);
            payload.append("password", formData.password);
            payload.append("dateofbirth", formData.dob);
            payload.append("sex", formData.sex);
            
            // Location Fields matching backend: $this->post('lat') and $this->post('lon')
            payload.append("lat", formData.lat);
            payload.append("lon", formData.lng); // Backend expects 'lon'
            payload.append("city", formData.city);
            payload.append("post_code", formData.postcode);
            payload.append("country", formData.country);

            // Professional Fields matching backend logic
            payload.append("business_name", formData.businessName);
            payload.append("mobile_number", formData.contactNumber);
            payload.append("hourly_rate", formData.hourlyRate);
            payload.append("address", `${formData.addressLine1}, ${formData.addressLine2}`);
            payload.append("aboutme", formData.aboutMe);
            payload.append("Reffral_email", formData.referralEmail); // Backend expects 'Reffral_email'
            payload.append("u_dual", formData.createDualAccount ? "1" : "0");

            // Image Field matching backend: $_FILES['u_image']
            if (formData.profile_image) {
                payload.append("u_image", formData.profile_image);
            }

            const response = await fetch(`${BASE_URL}/api/users/dualuser_register`, {
                method: "POST",
                body: payload,
            });

            const data = await response.json();

            if (response.ok) {
                // Firebase Sync
                try {
                    const firestoreUserId = data.user_id.toString();

                    const workerCollectionRef = collection(
                            db, 
                            COLLECTIONS.USERS, 
                            "StoredUsers", 
                            "Worker"
                        );

                        await addDoc(workerCollectionRef, {
                            email: formData.email,
                            name: fullName,
                            profileImage: data.u_image || formData.image_preview || "",
                            userId: firestoreUserId, // Storing your MySQL ID inside the doc
                            userType: "Worker",
                            createdAt: new Date()
                        });
                } catch (fbError) {
                    console.error("Firebase Sync Error:", fbError);
                }

                await Swal.fire({ icon: 'success', title: 'Success!', text: data.message || "Worker account created!", timer: 2000 });
                navigate("/login/worker");
            } else {
                Swal.fire({ icon: 'error', title: 'Failed', text: data.message || "Registration error" });
            }
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Error', text: "Connection failed." });
        } finally {
            setLoading(false);
        }
    };

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
                    <div className="text-center bg-[#1E6EA7] py-6 text-white">
                        <h1 className="text-2xl font-bold">Worker Registration</h1>
                        <p className="text-sm opacity-90">Step {step} of 3</p>
                    </div>

                    <div className="p-6">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.form 
                                    key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    onSubmit={handleStep1} className="space-y-4"
                                >
                                    <div className="flex flex-col items-center mb-6">
                                        <div 
                                            onClick={() => fileInputRef.current.click()}
                                            className="relative w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center border-2 border-dashed border-blue-200 cursor-pointer overflow-hidden group"
                                        >
                                            {formData.image_preview ? (
                                                <img src={formData.image_preview} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-center text-gray-400">
                                                    <span className="text-3xl">👤</span>
                                                    <p className="text-[10px] font-bold uppercase">Photo</p>
                                                </div>
                                            )}
                                        </div>
                                        <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageChange} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <input name="forenames" placeholder="Forenames *" required onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                        <input name="surname" placeholder="Surname" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>
                                    <input name="email" type="email" placeholder="Email Address *" required onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <select name="sex" required onChange={handleChange} className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none">
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                        <input name="dob" type="date" required onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <input name="password" type="password" placeholder="Password *" required onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                        <input name="confirmPassword" type="password" placeholder="Confirm Password *" required onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>

                                    <button type="submit" disabled={loading} className="w-full bg-[#1E6EA7] hover:bg-[#155a8a] text-white py-4 rounded-xl font-bold transition-all">
                                        {loading ? "Verifying..." : "Next Step"}
                                    </button>
                                </motion.form>
                            )}

                            {step === 2 && (
                                <motion.form 
                                    key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    onSubmit={handleStep2} className="space-y-4"
                                >
                                    <h3 className="font-bold text-gray-700 border-b pb-2">Professional Details</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input name="businessName" placeholder="Business Name (if any)" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                        <input name="contactNumber" type="tel" placeholder="Mobile Number *" required onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <span className="absolute left-3 top-3 text-gray-400">£</span>
                                            <input name="hourlyRate" type="number" placeholder="Hourly Rate" onChange={handleChange} className="w-full p-3 pl-7 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                        </div>
                                        <input name="referralEmail" type="email" placeholder="Referral Email" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>

                                    <div className="space-y-3">
                                        <input name="addressLine1" placeholder="First line of Address *" required onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                        <input name="addressLine2" placeholder="Second line of Address" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <input name="city" placeholder="City / Region *" required onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                        <input name="postcode" placeholder="Post Code *" required onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>

                                    <textarea name="aboutMe" placeholder="About Me" rows="2" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />

                                    <div className="space-y-2 pt-2">
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" name="createDualAccount" id="dual" onChange={handleChange} className="w-4 h-4 accent-blue-600" />
                                            <label htmlFor="dual" className="text-sm text-gray-700">Create dual accounts</label>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <input type="checkbox" required id="terms" className="mt-1 w-4 h-4 accent-blue-600" />
                                            <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                                                I agree to the <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">Terms & Conditions</Link> and <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">Privacy Policy</Link>
                                            </label>
                                        </div>
                                    </div>

                                    <button type="submit" className="w-full bg-[#1E6EA7] text-white py-4 rounded-xl font-bold shadow-lg">
                                        Next: Set Location
                                    </button>
                                    <button type="button" onClick={() => setStep(1)} className="w-full text-gray-500 text-sm">Back</button>
                                </motion.form>
                            )}

                            {step === 3 && (
                                <motion.div 
                                    key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                    className="space-y-4"
                                >
                                    <h3 className="font-bold text-gray-700">Set Work Location</h3>
                                    <div className="h-72 w-full rounded-lg overflow-hidden border">
                                        <MapContainer center={[formData.lat, formData.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
                                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                            <LocationMarker />
                                        </MapContainer>
                                    </div>
                                    <button onClick={handleFinalSubmit} disabled={loading} className="w-full bg-[#1E6EA7] text-white py-4 rounded-xl font-bold shadow-lg">
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

export default WorkerSignUpPage;