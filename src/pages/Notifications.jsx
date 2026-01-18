import React, { useEffect, useState } from "react";
import logo from "../assets/logo_p2.png";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/users/notification?id=${userId}`
        );
        const result = await response.json();

        if (result.status === "success!") {
          setNotifications(result.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
        <p className="mt-3 text-muted">Loading notifications…</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 px-4">
      {/* Using Tailwind Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {/* Notifications Card */}
        <div className="w-full card border-0 shadow-sm">
          {/* Empty State */}
          {notifications.length === 0 ? (
            <div className="card-body text-center py-10">
              <div className="mx-auto mb-4 flex items-center justify-center w-18 h-18 rounded-full bg-gray-100 text-2xl">
                🔔
              </div>

              <h5 className="font-semibold mb-2">You’re all caught up!</h5>
              <p className="text-gray-500 mb-0">No new notifications right now.</p>
            </div>
          ) : (
            <div className="list-group list-group-flush">
              {notifications.map((item) => (
                <div
                  key={item.nid}
                  className={`flex justify-between items-start py-3 mb-2 border rounded shadow-sm px-4 ${
                    item.isSeen === null ? "bg-gray-100" : ""
                  }`}
                >
                  <div>
                    <p className="font-semibold mb-1">{item.title}</p>
                    {item.added_date && (
                      <small className="text-gray-500">{item.added_date}</small>
                    )}
                  </div>

                  {item.isSeen === null && (
                    <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
