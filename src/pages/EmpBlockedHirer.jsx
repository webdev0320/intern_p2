import React, { useEffect, useState } from "react";

function EmpBlockedHirer() {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unblockingId, setUnblockingId] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = localStorage.getItem("user_id"); // current employee ID

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${BASE_URL}/api/users/follow/?user_id=${userId}&status=3`, {
      method: "GET",
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (data?.data) setFollowers(data.data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error("API Error:", err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [BASE_URL, userId]);

  // Unblock a user via the POST API with multipart/form-data
  const handleUnblock = async (blockedUserId) => {
    if (!window.confirm("Are you sure you want to unblock this hirer?")) return;

    try {
      setUnblockingId(blockedUserId);

      const formData = new FormData();
      formData.append("follower_id", userId); // the blocked hirer
      formData.append("following_id", blockedUserId); // current employee
      formData.append("status", 4); // unblock status

      const response = await fetch(
        `${BASE_URL}/api/users/follow/`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok && result.status === "success") {
        // Remove user from UI
        setFollowers((prev) => prev.filter((u) => u.uid !== blockedUserId));
        window.location.reload();
      } else {
        alert(result.message || "Failed to unblock user");
      }
    } catch (error) {
      console.error("Unblock Error:", error);
      alert("Something went wrong while unblocking");
    } finally {
      setUnblockingId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blocked Hirer</h1>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}

      {!loading && followers.length === 0 && (
        <div className="mt-6 bg-white rounded shadow p-4">
          <p className="text-sm text-gray-500">
            You do not have any blocked hirer as of yet.
          </p>
        </div>
      )}

      {!loading && followers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
          {followers.map((user) => (
            <div
              key={user.uid}
              className="bg-white rounded shadow p-4 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.u_image}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) =>
                    (e.target.src =
                      "https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg")
                  }
                />
                <p className="font-medium text-gray-800">{user.name}</p>
              </div>

              <button
                onClick={() => handleUnblock(user.uid)}
                disabled={unblockingId === user.uid}
                className={`px-3 py-1 rounded-full text-white font-semibold ${
                  unblockingId === user.uid
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } transition-colors`}
              >
                {unblockingId === user.uid ? "Unblocking..." : "Unblock"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmpBlockedHirer;
