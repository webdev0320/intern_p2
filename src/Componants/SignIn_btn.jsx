import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Person_logo from "../assets/person_logo.png";
import building_logo from "../assets/building_logo.png";

const SignIn_Modal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-lg p-6 max-w-md w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Sign In</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-4">

                        {/* Worker */}
                        <button
                            onClick={() => {
                                onClose();
                                navigate("/login/worker"); // <-- goes to Worker_login page
                            }}
                            className="w-full flex gap-4 p-4 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left"
                        >
                            <img src={Person_logo} className="w-20" alt="" />
                            <div className="flex flex-col justify-center">
                                <h2 className="font-bold text-gray-800">I'm a Worker</h2>
                                <p className="text-gray-600 text-sm">I'm looking for Job</p>
                            </div>
                        </button>


                        {/* Hirer */}
                        <button
                            onClick={() => {
                                onClose();
                                navigate("/login/hirer");
                            }}
                            className="w-full flex gap-4 p-4 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left"
                        >
                            <img src={building_logo} className="w-20" alt="" />
                            <div className="flex flex-col justify-center">
                                <h2 className="font-bold text-gray-800">I'm a Hirer</h2>
                                <p className="text-gray-600 text-sm">I'm looking for staff</p>
                            </div>
                        </button>

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SignIn_Modal;
