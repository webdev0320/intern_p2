import React, { useEffect, useState } from "react";
import logo from "../assets/logo_p2.png";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = localStorage.getItem("user_id");

  const format12Hour = (datetime) => {
    if (!datetime) return "";
    return new Date(datetime).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  
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
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3 text-gray-500">Loading notifications…</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto my-10 px-4">

      <h2 className="text-xl font-semibold mb-6">Notifications</h2>

      {notifications.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border">
          <div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-2xl">
            🔔
          </div>

          <h5 className="font-semibold mb-2">You're all caught up!</h5>
          <p className="text-gray-500">No new notifications right now.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.nid}
              className={`flex justify-between items-center p-4 rounded-lg border shadow-sm transition hover:shadow-md ${
                item.isSeen === null ? "bg-blue-50 border-blue-200" : "bg-white"
              }`}
            >
              <div>
                <p className="font-medium text-gray-800">{item.title}</p>

                {item.created_at && (
                  <p className="text-sm text-gray-500 mt-1">
                    {format12Hour(item.created_at)}
                  </p>
                )}
              </div>

              {item.isSeen === null && (
                <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  New
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;