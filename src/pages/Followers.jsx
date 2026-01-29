import React, { useEffect, useState } from "react";

function Followers() {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${BASE_URL}/api/users/follower/?&user_id=${userId}&status=4`, {
      method: "GET",
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data?.data) {
          setFollowers(data.data);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("API Error:", error);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    // cleanup on unmount
    return () => controller.abort();
  }, [BASE_URL, userId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Followers</h1>

      {/* Loading */}
      {loading && (
        <p className="text-sm text-gray-500">Loading...</p>
      )}

      {/* Empty State */}
      {!loading && followers.length === 0 && (
        <div className="mt-6 bg-white rounded shadow p-4">
          <p className="text-sm text-gray-500">
            You have no followers.
          </p>
        </div>
      )}

      {/* Followers Grid */}
      {!loading && followers.length > 0 && (
        <div className="grid grid-cols-6 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
          {followers.map((user) => (
            <div
              key={user.uid}
              className="bg-white rounded shadow p-4 flex items-center gap-3"
            >
              <img
                src={user.u_image}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg";
                }}
              />

              <p className="font-medium text-gray-800">
                {user.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Followers;
