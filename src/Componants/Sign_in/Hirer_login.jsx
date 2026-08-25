import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Building2, Briefcase, Users } from 'lucide-react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { COLLECTIONS } from "../../firebaseConstants";
import Swal from "sweetalert2";

const HirerLoginPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
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
        payload.append("user_type", "emp");

        try {
            const BASE_URL = import.meta.env.VITE_API_BASE_URL;
            const response = await fetch(`${BASE_URL}/api/users/login`, {
                method: "POST",
                body: payload,
            });

            const responseText = await response.text();
            let data;
            try {
                data = JSON.parse(responseText);
            } catch {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: "Invalid email or password",
                    confirmButtonColor: '#f97316'
                });
                setLoading(false);
                return;
            }

            if (response.ok && (data.status || data.message)) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", 'emp');
                localStorage.setItem("user_id", data.user_id);
                localStorage.setItem("email", data.email);
                localStorage.setItem("name", data.name);
                localStorage.setItem("phone", data.mobile_number);
                localStorage.setItem("userData", JSON.stringify(data));

                const firestoreId = data.user_id.toString();
                localStorage.setItem("firebase_key", firestoreId);

                try {
                    const hirerRef = collection(db, "usersStaging/StoredUsers/Hirer");
                    const q = query(hirerRef, where("userId", "==", firestoreId));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const firebaseDoc = querySnapshot.docs[0];
                        const firebaseKey = firebaseDoc.id;
                        localStorage.setItem("firebase_key", firebaseKey);
                        const fbData = firebaseDoc.data();
                        if (fbData.profileImage) {
                            localStorage.setItem("profile_image", fbData.profileImage);
                        }
                    } else {
                        localStorage.setItem("firebase_key", firestoreId);
                    }
                } catch (fbError) {
                    console.error("Error fetching Firebase key:", fbError);
                }

                setIsLoggedIn(true);
                window.location.href = "/hirer-dashboard";
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: data.message || data.error || "Invalid email or password",
                    confirmButtonColor: '#f97316'
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: err.message || "Server Error",
                confirmButtonColor: '#f97316'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#E87722] to-[#d6691c] p-8">
                        <div className="flex items-center justify-center space-x-3">
                            <div className="bg-white p-3 rounded-full">
                                <Building2 className="w-8 h-8 text-[#E87722]" />
                            </div>
                            <h1 className="text-3xl font-bold text-white">Hirer Portal</h1>
                        </div>
                        <p className="text-orange-100 text-center mt-4">Sign in to manage your business and hire talent</p>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <div className="flex items-center justify-center space-x-6 mb-6">
                            <div className="flex items-center space-x-2">
                                <Briefcase className="w-4 h-4 text-[#E87722]" />
                                <span className="text-sm font-medium text-gray-600">Hire Professionals</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4 text-[#E87722]" />
                                <span className="text-sm font-medium text-gray-600">Manage Teams</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
                                    {error}
                                </div>
                            )}

                            {/* Email */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700 flex items-center">
                                    <Mail className="w-4 h-4 mr-1.5" />
                                    Business Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E87722] focus:border-[#E87722] transition-all duration-200"
                                        placeholder="company@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700 flex items-center">
                                    <Lock className="w-4 h-4 mr-1.5" />
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E87722] focus:border-[#E87722] transition-all duration-200"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-[#E87722] focus:ring-[#E87722] border-gray-300 rounded"
                                    />
                                    <label className="ml-2 text-sm text-gray-600">Remember me</label>
                                </div>
                                <button
                                    onClick={() => navigate("/hirer/forgot-password")}
                                    className="text-sm text-[#E87722] hover:text-[#d6691c] font-medium transition-colors"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#E87722] hover:bg-[#d6691c] text-white py-3 px-4 rounded-lg focus:ring-4 focus:ring-orange-200 transition-all duration-200 font-semibold shadow-md hover:shadow-lg disabled:opacity-60"
                            >
                                {loading ? "Signing in..." : "Sign In as Hirer"}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-400">or continue with</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => console.log('google clicked')}
                                className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </button>
                            <button
                                onClick={() => console.log('linkedin clicked')}
                                className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                LinkedIn
                            </button>
                        </div>

                        {/* Sign Up */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-600">
                                New to iyouwork?{' '}
                                <button
                                    onClick={() => navigate("/signup/hirer")}
                                    className="font-semibold text-[#E87722] hover:text-[#d6691c] transition-colors"
                                >
                                    Create Hirer Account
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HirerLoginPage;
