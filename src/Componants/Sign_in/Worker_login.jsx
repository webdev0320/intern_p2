import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { COLLECTIONS } from "../../firebaseConstants";
import Logo from "../Logo.jsx";

const generateRandomToken = (length = 140) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_:';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
const [isLoggedIn, setIsLoggedIn] = useState(false);
useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    setIsLoggedIn(!!user_id);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const payload = new FormData();
    payload.append("email", formData.email.trim());
    payload.append("password", formData.password);
    payload.append("user_type", "self-emp");

    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const formBody = new URLSearchParams(payload);

        const response = await fetch(`${BASE_URL}/api/users/login`, {
          method: "POST",
          body: payload,
        });

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error("Invalid server response");
      }

      if (response.ok && (data.status || data.message)) {

          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("role", 'self-emp');
          localStorage.setItem("email", data.email);
          localStorage.setItem("name", data.name);          
          localStorage.setItem("phone", data.mobile_number);
          localStorage.setItem("userData", JSON.stringify(data));

          // 1. Store the key immediately
            const firestoreId = data.user_id.toString();
            localStorage.setItem("firebase_key", firestoreId);

            /*try {
                  const deviceFormData = new FormData();
                  const randomToken = generateRandomToken(150);
                  // You can replace this hardcoded string with an actual FCM token if you have one
                  deviceFormData.append("Device_Token", randomToken);
                  deviceFormData.append("device_type", "web"); // Changed to web as it's a web app

                  await fetch(`${BASE_URL}/api/users/deviceToken?user_id=${data.user_id}`, {
                    method: "POST",
                    body: deviceFormData,
                  });
                  console.log("Device token registered successfully");
                } catch (deviceErr) {
                  console.error("Device token registration failed:", deviceErr);
                  // We usually don't block the login flow if just the notification token fails
                }*/

            try {
                    // 1. Point to the nested collection: users/StoredUsers/Worker
                    // Ensure this path matches your segments (3 segments = Collection)
                    const workerRef = collection(db, "usersStaging/StoredUsers/Worker");

                    // 2. Query for the document where the "userId" field matches our DB ID
                    const q = query(workerRef, where("userId", "==", firestoreId));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        // 3. The 'key' you want is the Document ID (the random string)
                        const firebaseDoc = querySnapshot.docs[0];
                        const firebaseKey = firebaseDoc.id; 
                        
                        console.log("Found Firebase Key:", firebaseKey);
                        localStorage.setItem("firebase_key", firebaseKey);

                        // Optional: Store the profile image from Firestore too
                        const fbData = firebaseDoc.data();
                        if (fbData.profileImage) {
                            localStorage.setItem("profile_image", fbData.profileImage);
                        }
                    } else {
                        console.warn("No Firebase document found with userId:", firestoreId);
                        // If it doesn't exist, you might want to use the DB ID as a fallback
                        localStorage.setItem("firebase_key", firestoreId);
                    }
                } catch (fbError) {
                    console.error("Error fetching Firebase key:", fbError);
                }

          setIsLoggedIn(true);      
            window.location.href = "/emp-dashboard";

      } else {
        setError(data.message || data.error || "Invalid email or password");
      }

    } catch (err) {
      setError(err.message || "Server Error 🚨");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-brand-blue/5 to-brand-blue/15 p-2 flex flex-col justify-center'>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

            {/* Header */}
            <div className="bg-gradient-to-r from-brand-blue to-brand-blue/90 p-8 text-center flex flex-col items-center">
              <div className="bg-white px-6 py-2.5 rounded-xl mb-4 shadow-sm">
                <Logo className="h-8" />
              </div>
              <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
              <p className="text-white/80 mt-1 text-sm">Sign in to your worker account</p>
            </div>

            {/* Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">

                {error && (
                  <div className="bg-red-50 text-red-700 border border-red-100 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-brand-blue" /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white px-4 py-3 border border-gray-200 rounded-lg mt-1 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Lock className="w-4 h-4 mr-2 text-brand-blue" /> Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-white px-4 py-3 border border-gray-200 rounded-lg mt-1 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                    required
                  />
                </div>

                {/* Remember me */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                    />
                    <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600 cursor-pointer">Remember me</label>
                  </div>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white py-3 rounded-lg font-semibold shadow-lg shadow-brand-blue/15 transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>

              </form>

              {/* Signup */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/signup/worker")}
                    className="text-brand-blue hover:underline font-semibold cursor-pointer"
                  >
                    Sign up
                  </button>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="p-2 max-w-md mx-auto w-full">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-brand-blue font-medium transition-colors cursor-pointer"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
