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
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // 🔥 keep role in state
  const [role, setRole] = useState(localStorage.getItem("role"));

  const handleRedirect = () => {
    if (role === "self-emp") {
      navigate("/emp-dashboard");
    } else {
      navigate("/hirer-dashboard");
    }
  };
  //console.log(role)
  const handleSwitch = async () => {
  try {
    const userEmail = localStorage.getItem("email");

    // ------------------- 1️⃣ SwitchButtonMode API -------------------
    const switchPayload = new FormData();
    switchPayload.append("user_email", userEmail);

    const switchRes = await fetch(
      `${BASE_URL}/api/users/SwitchButtonMode/`,
      {
        method: "POST",
        body: switchPayload,
      }
    );
    const switchData = await switchRes.json();

    if (!switchData.SwitchAllowed) {
      alert("Role switch not allowed.");
      return;
    }

    // ------------------- 2️⃣ Fetch Password -------------------
    const currentRole = role; // emp or self-emp
    const passwordPayload = new FormData();
    passwordPayload.append("user_email", userEmail);
    passwordPayload.append("user_type", currentRole);

    const passwordRes = await fetch(
      `${BASE_URL}/api/users/userPasswordFetch/`,
      {
        method: "POST",
        body: passwordPayload,
      }
    );
    const passwordData = await passwordRes.json();

    if (!passwordData.Password) {
      alert("Failed to fetch password.");
      return;
    }

    // ------------------- 3️⃣ Login API -------------------
    const loginPayload = new FormData();
    loginPayload.append("password", passwordData.Password);
    loginPayload.append("user_type", currentRole === "emp" ? "self-emp" : "emp");
    loginPayload.append("device_token", "");
    loginPayload.append("device_type", "ANDROID");
    loginPayload.append("email", userEmail);

    const loginRes = await fetch(
      `${BASE_URL}/api/users/login/`,
      {
        method: "POST",
        body: loginPayload,
      }
    );
    const loginData = await loginRes.json();

    if (loginData.status !== "success!") {
      alert("Login failed after switching role.");
      return;
    }

    // ------------------- 4️⃣ Update LocalStorage & UI -------------------
    const newRole = currentRole === "emp" ? "self-emp" : "emp";
    localStorage.setItem("role", newRole);
    setRole(newRole); // update UI

    // Optionally update other localStorage items from loginData
    localStorage.setItem("user_id", loginData.user_id);
    localStorage.setItem("name", loginData.name);
    localStorage.setItem("User_type", loginData.User_type);

    // ------------------- 5️⃣ Redirect -------------------
    if (newRole === "self-emp") {
      navigate("/emp-dashboard");
    } else {
      navigate("/hirer-dashboard");
    }
  } catch (error) {
    console.error("Role switch error:", error);
    alert("An error occurred while switching roles.");
  }
};


  return (
<div className="fixed bottom-0 left-0 w-full bg-white shadow-t py-2 z-100-h">
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
        {role === "emp" && (
        <button onClick={() => navigate("/hirer-messages")} className="flex flex-col items-center text-gray-500 text-sm">
          <FaEnvelope className="text-xl mb-1" />
          Messages
        </button>
        )}

        {role === "self-emp" && (
        <button onClick={() => navigate("/messages")} className="flex flex-col items-center text-gray-500 text-sm">
          <FaEnvelope className="text-xl mb-1" />
          Messages
        </button>
        )}

        {/* Center Action */}
        {role === "emp" && (
          <div
            onClick={() => navigate("/post-job")}
            className="bg-orange-500 w-14 h-14 rounded-full flex items-center justify-center text-white -mt-7 shadow-lg cursor-pointer"
          >
            <FaBriefcase className="text-2xl" />
          </div>
        )}

        {role === "self-emp" && (
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
          {role === "self-emp" ? "Switch To Hirer" : "Switch To Worker"}
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
