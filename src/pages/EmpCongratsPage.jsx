import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBriefcase, FaHome } from "react-icons/fa";

const EmpCongratsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Destructure data passed from the search page
    const { jobName, hirerName, offerId } = location.state || {
        jobName: "Job",
        hirerName: "the Hirer",
        offerId: null
    };

    return (
        <div className="min-h-screen bg-[#248fcb] flex flex-col items-center text-white relative font-sans">
            
            {/* Top Home Icon */}
            <div className="absolute top-6 left-6 cursor-pointer" onClick={() => navigate('/')}>
                <FaHome className="text-2xl" />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
                
                {/* Briefcase Icon */}
                <div className="mb-6">
                    <div className="border-4 border-white rounded-2xl p-6">
                        <FaBriefcase className="text-6xl text-white" />
                    </div>
                </div>

                <h1 className="text-4xl font-bold mb-6">Congratulations!</h1>

                <p className="text-lg leading-relaxed mb-10">
                    You have Accepted the <span className="font-bold">{jobName}</span> job 
                    offer from <span className="font-bold">{hirerName}</span>
                </p>

                <p className="text-md opacity-90 italic">
                    Now, don't forget to be there on time
                </p>
            </div>

            {/* Bottom Curve & Buttons Container */}
            <div className="bg-white w-full rounded-t-[50px] pt-12 pb-10 px-8 flex flex-col gap-4">
                <div className="flex gap-4 max-w-lg mx-auto w-full">
                    
                    {/* View Details Button */}
                    <button 
                        onClick={() => navigate(`/job-details/${offerId}`)}
                        className="flex-1 py-4 border-2 border-[#248fcb] text-[#248fcb] rounded-2xl font-bold text-lg hover:bg-gray-50 transition"
                    >
                        View Details
                    </button>

                    {/* Contact Hirer Button */}
                    <button 
                        onClick={() => window.open("https://wa.me/44782345457", "_blank")}
                        className="flex-1 py-4 bg-gradient-to-r from-[#248fcb] to-[#1a6b99] text-white rounded-2xl font-bold text-lg shadow-lg hover:opacity-90 transition"
                    >
                        Contact Hirer
                    </button>
                    
                </div>
            </div>

            {/* Android Navigation Bar Spacer (Optional) */}
            <div className="bg-white w-full h-6"></div>
        </div>
    );
};

export default EmpCongratsPage;