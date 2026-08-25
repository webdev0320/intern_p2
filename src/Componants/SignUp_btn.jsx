// Componants/SignUp_btn.jsx (Updated)
import Person_logo from "../assets/person_logo.png"
import building_logo from "../assets/building_logo.png"
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SignUpModal = ({ isOpen, onClose }) => {
    const [signupType, setSignupType] = useState(null); // "worker" | "hirer"
    const navigate = useNavigate();

    if (!isOpen) return null;

    // Function to handle navigation
    const handleSignupTypeSelect = (type) => {
        setSignupType(null);
        onClose(); // Close the modal
        navigate(`/signup/${type}`); // Navigate to the full page
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    key="modal-container"
                    className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-hidden"
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
                                <h2 className="text-xl font-bold">Sign Up</h2>
                                <button
                                    onClick={onClose}
                                    className="text-gray-500 hover:text-gray-700"
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
                                    className="w-full flex gap-4 p-4 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left"
                                >
                                    <img src={Person_logo} className="w-20" alt="Worker" />
                                    <div>
                                        <h2 className="font-bold text-gray-800">I'm a Worker</h2>
                                        <p className="text-gray-600 text-sm mt-1">
                                            I'm looking for a job
                                        </p>
                                    </div>
                                </motion.button>

                                {/* Hirer */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSignupTypeSelect("hirer")}
                                    className="w-full flex gap-4 p-4 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left"
                                >
                                    <img src={building_logo} className="w-20" alt="Hirer" />
                                    <div>
                                        <h2 className="font-bold text-gray-800">I'm a Hirer</h2>
                                        <p className="text-gray-600 text-sm mt-1">
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
                                    {/* This will now redirect to full page */}
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
                                    {/* This will now redirect to full page */}
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