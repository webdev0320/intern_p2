// Componants/Sign_up/HirerSignUpPage.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HirerSignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyName: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        companySize: '',
        industry: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Hirer form submitted:', formData);
    };

    return (
        <div className="min-h-screen py-8 px-4">

            <div className=" max-w-2xl mx-auto">

                <div className="flex justify-start  mb-8 md:mb-12">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="font-medium">Back to Home</span>
                    </button>


                </div>
                {/* Navigation Bar */}


                <div className=" flex justify-center flex-col">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
                        >
                            <div className="text-center bg-orange-500 py-4 text-white rounded-lg">
                                <h1 className="text-2xl md:text-3xl font-bold ">Hirer Registration</h1>
                                <p className=" text-sm md:text-base mt-1">Find skilled workers for your business</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Company Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        required
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                        placeholder="Enter company name"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                            placeholder="Enter your name"
                                        />
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
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                            placeholder="you@company.com"
                                        />
                                    </div>
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
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                            placeholder="••••••••"
                                        />
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
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                            placeholder="+92 347 6722 423"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Company Size
                                        </label>
                                        <select
                                            name="companySize"
                                            value={formData.companySize}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                        >
                                            <option value="">Select company size</option>
                                            <option value="1-10">1-10 employees</option>
                                            <option value="11-50">11-50 employees</option>
                                            <option value="51-200">51-200 employees</option>
                                            <option value="200+">200+ employees</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Industry
                                    </label>
                                    <select
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                    >
                                        <option value="">Select industry</option>
                                        <option value="technology">Technology</option>
                                        <option value="retail">Retail</option>
                                        <option value="healthcare">Healthcare</option>
                                        <option value="construction">Construction</option>
                                        <option value="hospitality">Hospitality</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="flex items-start gap-3 mt-8">
                                    <input
                                        type="checkbox"
                                        id="hirer-terms"
                                        required
                                        className="mt-1 w-4 h-4 text-orange-600 rounded"
                                    />
                                    <label htmlFor="hirer-terms" className="text-sm text-gray-600">
                                        I agree to the{' '}
                                        <a href="/terms" className="text-orange-600 hover:underline">Terms of Service</a>
                                        {' '}and confirm I have authority to represent this company
                                    </label>
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className=" bg-orange-500 hover:bg-orange-600 rounded-lg text-white px-16 py-3 transition-all shadow-lg hover:shadow-xl mt-6"
                                    >
                                        Create Company Account
                                    </button>
                                </div>

                                <div className="text-center pt-4 border-t border-gray-200">
                                    <p className="text-gray-600">
                                        Already have an account?{' '}
                                        <button
                                            type="button"
                                            className="text-orange-600 font-semibold hover:text-orange-800 transition"
                                            onClick={() => navigate('/login/hirer')}
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

export default HirerSignUpPage;