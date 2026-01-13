import { FaBriefcase, FaTableCellsLarge, FaEnvelope, FaArrowsRotate, FaGear } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BottomNavigation = ({ setProfileOpen }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  return (
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

       {role === 'self-emp' && (
  <button
    onClick={() => {
      localStorage.setItem("role", "emp");
      navigate("/emp-dashboard");
    }}
    className="flex flex-col items-center text-gray-500 text-sm"
  >
    <FaArrowsRotate className="text-xl mb-1" />
    Switch To Worker
  </button>
)}

{role === 'emp' && (
  <button
    onClick={() => {
      localStorage.setItem("role", "self-emp");
      navigate("/hirer-dashboard");
    }}
    className="flex flex-col items-center text-gray-500 text-sm"
  >
    <FaArrowsRotate className="text-xl mb-1" />
    Switch To Hirer
  </button>
)}

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
