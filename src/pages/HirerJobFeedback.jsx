import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RatingRow = ({ label, value, onChange }) => (
  <div className="mb-6">
    <p className="font-medium text-gray-800 mb-2">{label}</p>
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={28}
          onClick={() => onChange(star)}
          className={`cursor-pointer ${
            star <= value
              ? "fill-orange-500 text-orange-500"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  </div>
);

function HirerJobFeedback() {
  const { job_id } = useParams();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasRated, setHasRated] = useState(false);


  const [ratings, setRatings] = useState({
    presentation: 0,
    timeKeeping: 0,
    skills: 0,
    communication: 0,
  });

  const [comment, setComment] = useState("");

  /* ---------------- FETCH JOB DETAIL ---------------- */
  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/jobs/detail?offer_id=${job_id}`
        );
        const json = await res.json();

        const jobData = json?.data?.[0]; // ✅ FIX
        setJob(jobData);
        setDuration(jobData?.duration?.[0] || null);
      } catch (e) {
        console.error("Job detail error:", e);
      }
    };

    fetchJobDetail();
  }, [job_id]);

  /* ---------------- FETCH EXISTING RATING ---------------- */
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/users/rating?user_id=${userId}&job_id=${job_id}`
        );
        const json = await res.json();

        if (json?.data?.length) {
          const r = json.data[0];

          setRatings({
            presentation: Number(r.rating1),
            timeKeeping: Number(r.rating2),
            skills: Number(r.rating3),
            communication: Number(r.rating4),
          });

          setComment(r.comment || "");
          setHasRated(true); // ✅ rating already exists
        }
      } catch (e) {
        console.error("Rating fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, [job_id, userId]);

  const handleSubmit = async () => {
    try {
    console.log(job);  
    const payload = new FormData();
    payload.append("giving_star_user_id", Number(userId));
    payload.append("taking_star_user_id", job?.user_id);
    payload.append("job_id", Number(job_id));
    payload.append("rating1", ratings.presentation);
    payload.append("rating2", ratings.timeKeeping);
    payload.append("rating3", ratings.skills);
    payload.append("rating4", ratings.communication);
    payload.append("rating5", 5); // or adjust if needed
    payload.append("comment", comment);



      const res = await fetch(`${BASE_URL}/api/users/rating/`, {
        method: "POST",
        body: payload,
      });

      const json = await res.json();

      if (res.ok) {
        alert("Feedback submitted successfully ✅");
        navigate("/hirer/feedback-success/"); // redirect to success page
      } else {
        alert(json.message || "Failed to submit feedback");
      }
    } catch (e) {
      console.error("Submit rating error:", e);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

return (
  <div className="min-h-screen bg-gray-100">
    <div className="bg-orange-500 text-white text-center py-4 text-lg font-semibold">
      Leave Feedback
    </div>

    <div className="max-w-6xl mx-auto px-4 mt-6">
      <div className="grid grid-cols-12 gap-6">

        {/* JOB DETAILS – 6 COL */}
        {job && (
          <div className="col-span-12 md:col-span-6 bg-white rounded-2xl shadow p-6">
            <h2 className="text-orange-500 font-semibold text-lg mb-4">
              Job Details
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              📍 {job.job_location}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <Info label="Work Offered" value={job.job_name} />
              <Info label="Pay Rate" value={`£ ${job.offer_rate}`} />
              <Info label="Date" value={job.job_post_date} />
              <Info
                label="Duration"
                value={`${duration?.duration_in_hours} hrs`}
              />
              <Info label="Work Start Time" value={duration?.start_time} />
            </div>
          </div>
        )}

        {/* FEEDBACK – 6 COL */}
        <div className="col-span-12 md:col-span-6 bg-white rounded-2xl shadow p-6">
          <h2 className="text-orange-500 font-semibold text-lg mb-4">
            Give the Worker Feedback
          </h2>

          <RatingRow
            label="Worker presentation"
            value={ratings.presentation}
            onChange={(v) =>
              setRatings({ ...ratings, presentation: v })
            }
          />
          <RatingRow
            label="Time keeping"
            value={ratings.timeKeeping}
            onChange={(v) =>
              setRatings({ ...ratings, timeKeeping: v })
            }
          />
          <RatingRow
            label="Skills and expertise"
            value={ratings.skills}
            onChange={(v) =>
              setRatings({ ...ratings, skills: v })
            }
          />
          <RatingRow
            label="Communication"
            value={ratings.communication}
            onChange={(v) =>
              setRatings({ ...ratings, communication: v })
            }
          />

          <textarea
            className="w-full border rounded-xl p-4 h-28 mt-4"
            placeholder="Do you want to add something?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

         {!hasRated && (
              <button
                onClick={handleSubmit}
                className="mt-6 w-full bg-orange-500 text-white py-4 rounded-xl text-lg font-semibold"
              >
                Submit Feedback
              </button>
            )}
        </div>

      </div>
    </div>
  </div>
);

}

const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="text-orange-500 font-semibold">{value || "-"}</p>
  </div>
);

export default HirerJobFeedback;
