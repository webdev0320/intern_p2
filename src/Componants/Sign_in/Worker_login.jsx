import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- IMPORT useNavigate
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';

const LoginPage = () => {
    const navigate = useNavigate(); // <-- INITIATE navigate

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', formData);
        // Add your authentication logic here
    };

    const handleSocialLogin = (provider) => {
        console.log(`${provider} login clicked`);
        // Add social login logic here
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 p-2 flex flex-col justify-center to-indigo-100'>
          

            <div className=" flex flex-col  items-center justify-center p-4">
                {/* Navigation Bar */}

                <div className="max-w-md w-full">
                    {/* Login Card */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Decorative Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8">
                            <div className="flex items-center justify-center space-x-3">
                                <div className="bg-white p-3 rounded-full">
                                    <LogIn className="w-8 h-8 text-blue-600" />
                                </div>
                                <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                            </div>
                            <p className="text-blue-100 text-center mt-4">Sign in to your account to continue</p>
                        </div>

                        {/* Login Form */}
                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center">
                                        <Lock className="w-4 h-4 mr-2" />
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="pl-10 pr-10 w-full  px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            placeholder="Enter your password"
                                            required
                                        />
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
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 text-sm text-gray-600">Remember me</label>
                                    </div>
                                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                        Forgot password?
                                    </a>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    Sign In
                                </button>
                            </form>

                            {/* Sign Up Link */}
                            <div className="mt-8 text-center">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <button
                                        onClick={() => navigate("/signup/worker")}
                                        className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                        Sign up
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
              <div className=" p-2">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2  text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-medium">Back to Home</span>
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
