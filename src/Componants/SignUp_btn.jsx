import Person_logo from "../assets/person_logo.png";
import building_logo from "../assets/building_logo.png";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SignUpModal = ({ isOpen, onClose }) => {
    const [signupType, setSignupType] = useState(null); // "worker" | "hirer"
    const navigate = useNavigate();

    // If isOpen is explicitly passed as false, don't render
    if (isOpen === false) return null;

    // Check if used as a standalone page (when isOpen is undefined)
    const isPage = isOpen === undefined;

    // Function to handle navigation
    const handleSignupTypeSelect = (type) => {
        setSignupType(null);
        if (onClose) onClose(); // Close the modal if open
        navigate(`/signup/${type}`); // Navigate to the full page
    };

    if (isPage) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-16">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
                    </div>

                    <div className="space-y-4">
                        {/* Worker */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSignupTypeSelect("worker")}
                            className="w-full flex gap-4 p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50/30 transition-all text-left cursor-pointer"
                        >
                            <img src={Person_logo} className="w-16 h-16 object-contain shrink-0" alt="Worker" />
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg">I'm a Worker</h3>
                                <p className="text-gray-500 text-sm mt-0.5">
                                    I'm looking for a job and same-day payouts.
                                </p>
                            </div>
                        </motion.button>

                        {/* Hirer */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSignupTypeSelect("hirer")}
                            className="w-full flex gap-4 p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50/30 transition-all text-left cursor-pointer"
                        >
                            <img src={building_logo} className="w-16 h-16 object-contain shrink-0" alt="Hirer" />
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg">I'm a Hirer</h3>
                                <p className="text-gray-500 text-sm mt-0.5">
                                    I'm looking for vetted on-demand staff.
                                </p>
                            </div>
                        </motion.button>
                    </div>
                </div>
            </div>
        );
    }

    // Modal view
    if (!isOpen) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    key="modal-container"
                    className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-100"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* If no signup type selected, show selection page */}
                    {!signupType ? (
                        <motion.div
                            key="selection-page"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Sign Up</h2>
                                <button
                                    onClick={onClose}
                                    className="text-gray-500 hover:text-gray-700 text-lg"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Worker */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSignupTypeSelect("worker")}
                                    className="w-full flex gap-4 p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50/30 transition-all text-left cursor-pointer"
                                >
                                    <img src={Person_logo} className="w-16 h-16 object-contain shrink-0" alt="Worker" />
                                    <div>
                                        <h3 className="font-bold text-gray-800">I'm a Worker</h3>
                                        <p className="text-gray-500 text-xs mt-0.5">
                                            I'm looking for a job
                                        </p>
                                    </div>
                                </motion.button>

                                {/* Hirer */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSignupTypeSelect("hirer")}
                                    className="w-full flex gap-4 p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50/30 transition-all text-left cursor-pointer"
                                >
                                    <img src={building_logo} className="w-16 h-16 object-contain shrink-0" alt="Hirer" />
                                    <div>
                                        <h3 className="font-bold text-gray-800">I'm a Hirer</h3>
                                        <p className="text-gray-500 text-xs mt-0.5">
                                            I'm looking for staff
                                        </p>
                                    </div>
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <AnimatePresence mode="wait">
                            {/* Worker Signup Page */}
                            {signupType === "worker" && (
                                <motion.div
                                    key="worker-signup"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-full"
                                >
                                    <div className="text-center py-8">
                                        <p>Redirecting to worker signup page...</p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Hirer Signup Page */}
                            {signupType === "hirer" && (
                                <motion.div
                                    key="hirer-signup"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-full"
                                >
                                    <div className="text-center py-8">
                                        <p>Redirecting to hirer signup page...</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SignUpModal;
