import React from 'react';
import { Check, ArrowLeft } from 'lucide-react'; // Optional: for icons

const HirerJobFeedbackSuccess = () => {
  const handleHomeClick = () => {
    console.log("Navigating to Home...");
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#FF7A00] text-white font-sans relative">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        
        {/* Checkmark Circle */}
        <div className="w-24 h-24 border-4 border-white rounded-full flex items-center justify-center mb-8">
          <Check size={48} strokeWidth={4} color="white" />
        </div>

        {/* Success Text */}
        <h1 className="text-2xl md:text-3xl font-bold leading-tight max-w-[250px]">
          Thanks for Submitting the Feedback
        </h1>
      </div>

    </div>
  );
};

export default HirerJobFeedbackSuccess;