import React from "react";
import { FaStar, FaBriefcase, FaTableCellsLarge, FaEnvelope, FaArrowsRotate, FaGear } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const EmpDashboard = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* Header */}
      <div className="relative bg-white shadow-sm pb-20">
        {/* Orange Circle */}


        <div className="relative z-10 container mx-auto px-4 pt-6">
          {/* Top Bar */}
          
          {/* Profile Info */}
          <div className="flex items-center">
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Arif</h1>
              <p className="text-gray-500 mb-1">Cinch</p>
              <div className="flex items-center text-yellow-400">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                <span className="ml-2 text-gray-800 font-medium">5/5</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div  onClick={() => navigate("/feedbacks")} className="bg-white rounded-lg shadow text-center p-4">
              <span className="block text-lg font-bold">0</span>
              <span className="text-sm text-gray-500 uppercase">Feedbacks</span>
            </div>
            <div  onClick={() => navigate("/followers")} className="bg-white rounded-lg shadow text-center p-4">
              <span className="block text-lg font-bold">0</span>
              <span className="text-sm text-gray-500 uppercase">Followers</span>
            </div>
            <div  onClick={() => navigate("/following")} className="bg-white rounded-lg shadow text-center p-4">
              <span className="block text-lg font-bold">0</span>
              <span className="text-sm text-gray-500 uppercase">Following</span>
            </div>
            <div  onClick={() => navigate("/work-history")} className="bg-white rounded-lg shadow text-center p-4">
              <span className="block text-lg font-bold">2</span>
              <span className="text-sm text-gray-500 uppercase">New Work</span>
            </div>
            <div  onClick={() => navigate("/work-history")} className="bg-white rounded-lg shadow text-center p-4">
              <span className="block text-lg font-bold">0</span>
              <span className="text-sm text-gray-500 uppercase">In-Progress</span>
            </div>
            <div  onClick={() => navigate("/work-history")} className="bg-white rounded-lg shadow text-center p-4">
              <span className="block text-lg font-bold">0</span>
              <span className="text-sm text-gray-500 uppercase">Finished</span>
            </div>
          </div>

          <p className="mt-4 text-gray-600">about me text here</p>
        </div>
      </div>

      {/* Skills Card */}
      <div className="container mx-auto px-4 mt-6">
        <div className="bg-orange-500 text-white rounded-xl p-6 shadow">
          <h4 className="font-bold mb-4">My Industry & Skills</h4>
          <div className="bg-white text-gray-800 rounded-lg px-4 py-2 font-medium">
            Accounting & Finance
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-t py-2">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button className="flex flex-col items-center text-gray-500 text-sm">
            <FaTableCellsLarge className="text-xl mb-1" />
            Dashboard
          </button>
          <button className="flex flex-col items-center text-gray-500 text-sm">
            <FaEnvelope className="text-xl mb-1" />
            Messages
          </button>
          <div className="bg-orange-500 w-14 h-14 rounded-full flex items-center justify-center text-white -mt-7 shadow-lg">
            <FaBriefcase className="text-2xl" />
          </div>
          <button className="flex flex-col items-center text-gray-500 text-sm">
            <FaArrowsRotate className="text-xl mb-1" />
            Switch
          </button>
          <button className="flex flex-col items-center text-gray-500 text-sm">
            <FaGear className="text-xl mb-1" />
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmpDashboard;
