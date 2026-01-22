import {
  FaBriefcase,
  FaTableCellsLarge,
  FaEnvelope,
  FaArrowsRotate,
  FaGear,
  FaUser
} from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BottomNavigation = ({ setProfileOpen }) => {
  const navigate = useNavigate();

  // 🔥 keep role in state
  const [role, setRole] = useState(localStorage.getItem("role"));

  const handleRedirect = () => {
    if (role === "emp") {
      navigate("/emp-dashboard");
    } else {
      navigate("/hirer-dashboard");
    }
  };

  const handleSwitch = () => {
    if (role === "emp") {
      localStorage.setItem("role", "self-emp");
      setRole("self-emp");               // update UI
      navigate("/hirer-dashboard");
    } else {
      localStorage.setItem("role", "emp");
      setRole("emp");                    // update UI
      navigate("/emp-dashboard");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-t py-2">
      <div className="container mx-auto px-6 flex justify-between items-center">

        {/* Dashboard */}
        <button
          onClick={handleRedirect}
          className="flex flex-col items-center text-gray-500 text-sm"
        >
          <FaTableCellsLarge className="text-xl mb-1" />
          Dashboard
        </button>

        {/* Messages */}
        <button className="flex flex-col items-center text-gray-500 text-sm">
          <FaEnvelope className="text-xl mb-1" />
          Messages
        </button>

        {/* Center Action */}
        {role === "self-emp" && (
          <div
            onClick={() => navigate("/post-job")}
            className="bg-orange-500 w-14 h-14 rounded-full flex items-center justify-center text-white -mt-7 shadow-lg cursor-pointer"
          >
            <FaBriefcase className="text-2xl" />
          </div>
        )}

        {role === "emp" && (
          <div
            onClick={() => navigate("/emp-find-work")}
            className="bg-blue-500 w-14 h-14 rounded-full flex items-center justify-center text-white -mt-7 shadow-lg cursor-pointer"
          >
            <FaUser className="text-2xl" />
          </div>
        )}

        {/* Switch Button (single, dynamic) */}
        <button
          onClick={handleSwitch}
          className="flex flex-col items-center text-gray-500 text-sm"
        >
          <FaArrowsRotate className="text-xl mb-1" />
          {role === "emp" ? "Switch To Hirer" : "Switch To Worker"}
        </button>

        {/* Settings */}
        <button
          onClick={() => setProfileOpen(prev => !prev)}
          className="flex flex-col items-center text-gray-500 text-sm"
        >
          <FaGear className="text-xl mb-1" />
          Settings
        </button>

      </div>
    </div>
  );
};

export default BottomNavigation;
