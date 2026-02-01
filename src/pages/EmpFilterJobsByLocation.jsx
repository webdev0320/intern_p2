import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa6";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ---------- MARKER ICONS ---------- */
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const activeIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

/* ---------- MAP CONTROLLER ---------- */
function FlyToJob({ job }) {
  const map = useMap();

  useEffect(() => {
    if (job?.lat && job?.lon) {
      map.flyTo([Number(job.lat), Number(job.lon)], 14, {
        duration: 1.2,
      });
    }
  }, [job, map]);

  return null;
}

function EmpFilterJobsByLocation() {
  const { type } = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeJob, setActiveJob] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchJobs();
  }, [type]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("user_id");

      const response = await fetch(
        `${BASE_URL}/api/jobs/workers?worker_id=${userId}&type=4`
      );

      const result = await response.json();
      setJobs(result.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 px-4">
      <h1 className="text-xl font-bold mb-4">Filter By Location</h1>

      {loading && <p className="text-center">Loading...</p>}

      {!loading && jobs.length === 0 && (
        <p className="text-center text-gray-500">No work found.</p>
      )}

      {!loading && jobs.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* ---------- LEFT: JOB LIST ---------- */}
          <div className="lg:col-span-1 space-y-4 overflow-y-auto max-h-[75vh] pr-1">
            {jobs.map((job) => (
              <div
                key={job.job_id}
                onClick={() => setActiveJob(job)}
                className={`bg-white rounded-2xl shadow p-4 cursor-pointer transition
                  ${
                    activeJob?.job_id === job.job_id
                      ? "ring-2 ring-blue-500"
                      : "hover:ring-2 hover:ring-blue-300"
                  }`}
              >
                <div className="flex justify-between">
                  <h2 className="text-blue-600 font-semibold">
                    {job.job_name}, {job.job_id}
                  </h2>

                  <FaWhatsapp
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open("https://wa.me/44782345457", "_blank");
                    }}
                    className="text-green-600 cursor-pointer"
                  />
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  📍 {job.job_location}
                </p>

                <p className="text-sm text-blue-500 mt-2">
                  £ {job.offer_rate}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {job.duration?.[0]?.start_date} ·{" "}
                  {job.duration?.[0]?.duration_in_hours} hrs
                </p>
              </div>
            ))}
          </div>

          {/* ---------- RIGHT: MAP ---------- */}
          <div className="lg:col-span-2 h-[75vh] rounded-2xl overflow-hidden shadow">
            <MapContainer
              center={[
                Number(jobs[0]?.lat) || 33.677,
                Number(jobs[0]?.lon) || 73.0633,
              ]}
              zoom={13}
              className="h-full w-full"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Auto fly when job selected */}
              <FlyToJob job={activeJob} />

              {jobs.map((job) => (
                <Marker
                  key={job.job_id}
                  position={[Number(job.lat), Number(job.lon)]}
                  icon={
                    activeJob?.job_id === job.job_id
                      ? activeIcon
                      : defaultIcon
                  }
                >
                  <Popup>
                    <strong>{job.job_name}</strong>
                    <br />
                    £ {job.offer_rate}
                    <br />
                    {job.job_location}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmpFilterJobsByLocation;
