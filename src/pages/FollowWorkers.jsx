import React, { useEffect, useState } from "react";

const FollowWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = 30;
  const status = 4;

  useEffect(() => {
    fetch(
      `https://iyouworks.taxaccolega.co.uk/index.php/api/users/follow/?&user_id=${userId}&status=${status}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setWorkers(data.data);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ marginBottom: "16px" }}>Following</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        {workers.map((worker) => (
          <div
            key={worker.fid}
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              textAlign: "center",
              background: "#fafafa",
            }}
          >
            {worker.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowWorkers;
