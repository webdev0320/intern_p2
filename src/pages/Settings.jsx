import React, { useState, useEffect } from "react";

const Settings = () => {
  const [isInvisible, setIsInvisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("user_id");

  // Optional: fetch current visibility status on mount
  useEffect(() => {
    const fetchVisibility = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;

        const response = await fetch(
          `${BASE_URL}/api/users/profile/?id=${userId}`
        );

        if (!response.ok) return;

        const data = await response.json();
        // Assuming 'status' 1 = invisible, 0 = visible
        setIsInvisible(data.status === "1" || data.visibility === 1);
      } catch (err) {
        console.error("Error fetching visibility:", err);
      }
    };

    fetchVisibility();
  }, []);

const handleToggle = async () => {
  const newStatus = isInvisible ? 2 : 1; // always 0 or 1
  setIsInvisible(!isInvisible); // optimistic UI
  setLoading(true);

  try {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const payload = new FormData();
    payload.append("user_id", userId);
    payload.append("status", newStatus); // <-- convert to string to be safe

    const response = await fetch(`${BASE_URL}/api/users/visibility/`, {
      method: "POST",
      body: payload,
    });

    const data = await response.json();

    if (response.ok && data.status === "success!") {
      console.log(`Visibility updated: ${newStatus ? "Invisible" : "Visible"}`);
    } else {
      alert(data.message || "Failed to update visibility");
      setIsInvisible(isInvisible); // revert if failed
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
    setIsInvisible(isInvisible); // revert if failed
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <div className="mt-6 bg-white rounded shadow p-4 flex items-center justify-between">
        <span className="text-gray-700 font-medium">Make me Invisible</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isInvisible}
            onChange={handleToggle}
            disabled={loading}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
          <span className="ml-3 text-sm text-gray-600">
            {isInvisible ? "Invisible" : "Visible"}
          </span>
        </label>
      </div>
    </div>
  );
};

export default Settings;
