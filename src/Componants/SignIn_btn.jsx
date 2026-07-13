import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Person_logo from "../assets/person_logo.png";
import building_logo from "../assets/building_logo.png";

const SignIn_Modal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    // If isOpen is explicitly passed as false, don't render
    if (isOpen === false) return null;

    // Check if used as a standalone page (when isOpen is undefined)
    const isPage = isOpen === undefined;

    if (isPage) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-16">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
                    </div>

                    <div className="space-y-4">
                        {/* Worker */}
                        <button
                            onClick={() => {
                                navigate("/login/worker");
                            }}
                            className="w-full flex gap-4 p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50/30 transition-all text-left cursor-pointer"
                        >
                            <img src={Person_logo} className="w-16 h-16 object-contain shrink-0" alt="Worker" />
                            <div className="flex flex-col justify-center">
                                <h3 className="font-bold text-gray-800 text-lg">I'm a Worker</h3>
                                <p className="text-gray-500 text-sm">I want to find gigs and log in.</p>
                            </div>
                        </button>

                        {/* Hirer */}
                        <button
                            onClick={() => {
                                navigate("/login/hirer");
                            }}
                            className="w-full flex gap-4 p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50/30 transition-all text-left cursor-pointer"
                        >
                            <img src={building_logo} className="w-16 h-16 object-contain shrink-0" alt="Hirer" />
                            <div className="flex flex-col justify-center">
                                <h3 className="font-bold text-gray-800 text-lg">I'm a Hirer</h3>
                                <p className="text-gray-500 text-sm">I want to find staff and log in.</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Sign In</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 text-lg"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Worker */}
                        <button
                            onClick={() => {
                                onClose();
                                navigate("/login/worker");
                            }}
                            className="w-full flex gap-4 p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50/30 transition-all text-left cursor-pointer"
                        >
                            <img src={Person_logo} className="w-16 h-16 object-contain shrink-0" alt="Worker" />
                            <div className="flex flex-col justify-center">
                                <h3 className="font-bold text-gray-800">I'm a Worker</h3>
                                <p className="text-gray-500 text-xs">I'm looking for a job</p>
                            </div>
                        </button>

                        {/* Hirer */}
                        <button
                            onClick={() => {
                                onClose();
                                navigate("/login/hirer");
                            }}
                            className="w-full flex gap-4 p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50/30 transition-all text-left cursor-pointer"
                        >
                            <img src={building_logo} className="w-16 h-16 object-contain shrink-0" alt="Hirer" />
                            <div className="flex flex-col justify-center">
                                <h3 className="font-bold text-gray-800">I'm a Hirer</h3>
                                <p className="text-gray-500 text-xs">I'm looking for staff</p>
                            </div>
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SignIn_Modal;
