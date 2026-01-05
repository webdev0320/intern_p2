// Componants/Sign_up/WorkerSignUpPage.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const WorkerSignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        forenames: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
        gender: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-2xl mx-auto">
                {/* Navigation Bar */}
                <div className="flex justify-between items-center mb-8 md:mb-12">
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

                {/* Main Content Grid */}
                <div className="flex flex-col justify-center">


                    <div className="">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-2xl shadow-xl p-6"
                        >
                            <div className="text-center bg-[#1E6EA7] py-4 text-white rounded-lg">
                                <h1 className="text-2xl md:text-3xl font-bold ">Worker Registration</h1>
                                <p className="text-sm md:text-base mt-1">Join our platform and find your dream job</p>
                            </div>

                            {/* Profile Picture */}
                            <div className="flex flex-col items-center mb-8">
                                <div className="relative">
                                    <div
                                        className="w-28 h-28 bg-gradient-to-r from-blue-100 to-green-100 rounded-full shadow-lg flex items-center justify-center border-8 border-white cursor-pointer hover:shadow-xl transition-all"
                                        onClick={() => document.getElementById('avatar-input').click()}
                                    >
                                        <span className="text-4xl text-gray-400">👤</span>
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="file"
                                        id="avatar-input"
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </div>
                                <p className="text-gray-500 text-sm mt-3">Click to upload profile picture</p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Forenames *
                                        </label>
                                        <input
                                            type="text"
                                            name="forenames"
                                            required
                                            value={formData.forenames}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                            placeholder="Enter your forenames"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Surname
                                        </label>
                                        <input
                                            type="text"
                                            name="surname"
                                            value={formData.surname}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                            placeholder="Enter your surname"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Password *
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                            placeholder="••••••••"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">At least 8 characters with uppercase, lowercase & number</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirm Password *
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            required
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Gender
                                        </label>
                                        <div className="flex gap-4">
                                            {['Male', 'Female', 'Other'].map((gender) => (
                                                <label key={gender} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value={gender.toLowerCase()}
                                                        checked={formData.gender === gender.toLowerCase()}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600"
                                                    />
                                                    <span className="text-gray-700">{gender}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Terms and Conditions */}
                                <div className="flex items-start gap-3 mt-8">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        required
                                        className="mt-1 w-4 h-4 text-blue-600 rounded"
                                    />
                                    <label htmlFor="terms" className="text-sm text-gray-600">
                                        I agree to the{' '}
                                        <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
                                        {' '}and{' '}
                                        <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <div className=" flex justify-center">
                                <button
                                    type="submit"
                                    className=" bg-[#1E6EA7] hover:bg-[#106098] rounded-lg text-white px-16 py-3 transition-all shadow-lg hover:shadow-xl mt-6"
                                >
                                    Create Account
                                </button>
                                </div>
                                {/* Already have account */}
                                <div className="text-center pt-4 border-t border-gray-200">
                                    <p className="text-gray-600">
                                        Already have an account?{' '}
                                        <button
                                            type="button"
                                            className="text-blue-600 font-semibold hover:text-blue-800 transition"
                                            onClick={() => navigate('/login/worker')}
                                        >
                                            Sign In
                                        </button>
                                    </p>
                                </div>
                            </form>
                        </motion.div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default WorkerSignUpPage;