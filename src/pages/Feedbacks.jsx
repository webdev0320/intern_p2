import React, { useEffect, useState } from "react";

const StarRating = ({ value }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          fill={star <= value ? "#0f4c75" : "none"}
          viewBox="0 0 24 24"
          stroke={star <= value ? "#0f4c75" : "#d1d5db"}
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.48 3.499a.75.75 0 011.04 0l2.592 2.632 3.642.53a.75.75 0 01.416 1.279l-2.635 2.568.622 3.63a.75.75 0 01-1.088.791L12 13.347l-3.27 1.722a.75.75 0 01-1.088-.79l.622-3.63-2.635-2.57a.75.75 0 01.416-1.278l3.642-.53 2.592-2.632z"
          />
        </svg>
      ))}
    </div>
  );
};

function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    fetch(`${BASE_URL}/api/users/userRating?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6">Loading feedbacks...</div>;
  }

  if (feedbacks.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Feedbacks</h1>
        <p className="text-gray-500">No feedbacks yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Feedbacks</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {feedbacks.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow p-4 mb-4 card card-hover"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-semibold">
                {item.user_name.charAt(0)}
              </span>
            </div>

            <div className="flex-1">
              <p className="font-semibold">{item.user_name}</p>
              <p className="text-sm text-gray-500">
                {item.job_name}
              </p>
            </div>

            <p className="text-sm text-gray-500">
              Work ID: {item.job_id}
            </p>
          </div>

          {/* Ratings */}
          <div className="space-y-3">
            <div>
              <p className="text-sm mb-1">Worker presentation</p>
              <StarRating value={Number(item.rating1)} />
            </div>

            <div>
              <p className="text-sm mb-1">Time keeping</p>
              <StarRating value={Number(item.rating2)} />
            </div>

            <div>
              <p className="text-sm mb-1">Skills and expertise</p>
              <StarRating value={Number(item.rating3)} />
            </div>

            <div>
              <p className="text-sm mb-1">Communication</p>
              <StarRating value={Number(item.rating4)} />
            </div>
          </div>

          {/* Comment */}
          <div className="mt-4">
            <p className="font-semibold">Comments</p>
            <p className="text-gray-600">{item.comment}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Feedbacks;
