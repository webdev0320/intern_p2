import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaArrowLeft } from "react-icons/fa"; // Added Arrow icon
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* Fix Leaflet marker icon issue */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* Map Helper Components */
const RecenterMap = ({ lat, lng }) => {
  const map = useMapEvents({});
  useEffect(() => {
    map.setView([lat, lng], map.getZoom(), { animate: true });
  }, [lat, lng, map]);
  return null;
};

const MapClickHandler = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
};

const EmpFindWork = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = localStorage.getItem("user_id");

  // UI State
  const [showForm, setShowForm] = useState(true); // Control visibility of the form

  // State for Filters
  const [payRate, setPayRate] = useState(10);
  const [distance, setDistance] = useState(50);
  const [isRemote, setRemote] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState("");

  // State for Data
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // State for Location/Map
  const [locationName, setLocationName] = useState("Detecting location...");
  const [marker, setMarker] = useState({ lat: 33.6844, lng: 73.0479 });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/users/profile/?id=${userId}`);
        const data = await response.json();
        if (data) {
          setProfile(data);
          if (data.lat && data.lon) {
            setMarker({ lat: parseFloat(data.lat), lng: parseFloat(data.lon) });
            reverseGeocode(data.lat, data.lon);
          }
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setMarker({ lat: latitude, lng: longitude });
        reverseGeocode(latitude, longitude);
      });
    }
  }, [BASE_URL, userId]);

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      if (data?.display_name) setLocationName(data.display_name);
    } catch (err) {}
  };


    const handleApply = async (job) => {
    // Confirmation dialog
    const confirmApply = window.confirm(`Are you sure you want to apply for ${job.skill_name}?`);
    if (!confirmApply) return;

    setLoading(true);
    try {
      // payload data from the job object and local storage
      const payload = new FormData();
      payload.append("status", "Accept");
      payload.append("who_offer_job_user_id", job.user_id); // The person who posted the job
      payload.append("worker_id", userId); // The logged-in user (you)
      payload.append("job_id", job.offer_id); // Using offer_id as the unique job identifier
      payload.append("job_name", job.skill_name);

      const url = `${BASE_URL}/api/jobs/status_update?job_offer_id=${job.offer_id}`;      
      const response = await fetch(url, {
        method: "POST",
        body: payload
      });

      const result = await response.json();

      if (result.status === "success!") {
        alert("Application submitted successfully!");
        
        // Update local state to reflect the change immediately
       /* setJobs((prevJobs) =>
          prevJobs.map((j) =>
            j.offer_id === job.offer_id ? { ...j, offer_status: "Accept" } : j
          )
        );*/

        navigate('/employer-congrats-page', { 
            state: { 
                offerId: job.offer_id 
            } 
        });

      } else {
        alert(result.message || "Failed to update status.");
      }
    } catch (error) {
      console.log("Apply error:", error);
      alert("Something went wrong while applying.");
    } finally {
      setLoading(false);
    }
  };




  const handleMapSelect = (latlng) => {
    setMarker(latlng);
    reverseGeocode(latlng.lat, latlng.lng);
  };

  const handleSearch = async () => {
    if (!selectedSkillId) {
      alert("Please select a skill first.");
      return;
    }

    setLoading(true);
    try {
      const url = `${BASE_URL}/api/jobs/search?worker_id=${userId}&skill_id=${selectedSkillId}`;
      const remoteStatus = isRemote ? "Remote" : "Onsite";
      
      const payload = new FormData();
      payload.append("miles", distance);
      payload.append("lat", marker.lat);
      payload.append("long", marker.lng);
      payload.append("pay_Rate", payRate);
      payload.append("is_Remote", remoteStatus);

      const response = await fetch(url, {
        method: "POST",
        body: payload
      });

      const result = await response.json();
      if (result.status === "success!" && result.data && result.data.length > 0) {
        setJobs(result.data);
        setShowForm(false); 
      } 
      // Handle the "No Work Found" error response
      else if (result.status === "error!" || result.message === "No Work Found") {
        setJobs([]);
        alert("No Work Found. Try adjusting your filters or location.");
      }
      else {
        setJobs([]);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (id) => {
    alert(`Cancelling offer ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* 1. CONDITIONAL FORM VIEW */}
      {showForm ? (
        <>
          {/* Filters Section */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-6 transition-all">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 items-end">
              <div>
                <label className="block text-sm font-medium mb-2">Select Work</label>
                <select 
                  className="w-full border rounded-lg px-3 py-2"
                  value={selectedSkillId}
                  onChange={(e) => setSelectedSkillId(e.target.value)}
                >
                  <option value="">Select Skill</option>
                  {profile?.skills?.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Pay: £{payRate}</label>
                <input type="range" min="10" max="100" value={payRate} onChange={(e) => setPayRate(e.target.value)} className="w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Dist: {distance} mi</label>
                <input type="range" min="1" max="100" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full" />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <input type="checkbox" checked={isRemote} onChange={() => setRemote(!isRemote)} className="w-5 h-5" />
                <label className="text-sm font-medium">Remote</label>
              </div>

              <button onClick={handleSearch} className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition">
                {loading ? "Searching..." : "Find Work"}
              </button>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-4 border-b">
              <p className="text-sm text-gray-500">📍 Search Location</p>
              <h2 className="text-md font-semibold truncate">{locationName}</h2>
            </div>
            <div className="h-[400px]">
              <MapContainer center={[marker.lat, marker.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <RecenterMap lat={marker.lat} lng={marker.lng} />
                <MapClickHandler onSelect={handleMapSelect} />
                <Marker position={[marker.lat, marker.lng]} />
              </MapContainer>
            </div>
          </div>
        </>
      ) : (
        /* 2. HEADER FOR RESULTS VIEW */
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 text-blue-600 font-medium hover:underline"
          >
            <FaArrowLeft /> Edit Search & Filters
          </button>
          <h2 className="text-xl font-bold">{jobs.length} Jobs Found</h2>
        </div>
      )}

      {/* Jobs Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {!loading && jobs.map((job) => (
          <div key={job.offer_id} className="bg-white rounded-2xl shadow p-4 border border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-blue-600 font-semibold text-lg">{job.skill_name}</h2>
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium cursor-pointer" onClick={() => window.open("https://wa.me/44782345457", "_blank")}>
                <FaWhatsapp className="w-4 h-4" /> Help?
              </div>
            </div>

            <p className="text-blue-500 text-sm mt-2">
              {job.offer_status === "Waiting" ? "No worker accepted yet." : job.offer_status}
            </p>

            <hr className="my-3" />
            <p className="font-semibold text-sm">Work Description:</p>
            <p className="text-sm text-gray-600 line-clamp-2">{job.jobdetail}</p>
            <p className="text-xs mt-2 text-gray-500">📍 {job.job_location}</p>

            <hr className="my-3" />
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-500">💷 Rate</p>
                <p className="text-blue-600 font-bold">£{job.offer_rate}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">⏰ Posted</p>
                <p className="text-blue-600 font-semibold">{job.job_post_date}</p>
              </div>
            </div>

            <hr className="my-3" />
            <div className="grid grid-cols-3 text-center text-[10px] text-gray-400 font-bold mb-2">
              <div>DATE</div><div>DUR.</div><div>START</div>
            </div>

            {job.duration?.map((d) => (
              <div key={d.duration_id} className="grid grid-cols-3 text-center text-xs font-semibold text-blue-600 mb-1">
                <div>{d.start_date.split('-')[1]} {d.start_date.split('-')[2]}</div>
                <div>{d.duration_in_hours}h</div>
                <div>{d.start_time}</div>
              </div>
            ))}

            {job.offer_status === "Waiting" && (
              <button 
                  onClick={() => handleApply(job)} 
                  className="mt-5 w-full bg-blue-500 text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition"
                >
                  Apply For Work
                </button>
            )}
          </div>
        ))}
      </div>
      
      {jobs.length === 0 && !loading && !showForm && (
        <div className="text-center py-10 text-gray-400">
          No jobs match your criteria. 
          <button onClick={() => setShowForm(true)} className="ml-2 text-blue-600 underline">Try again</button>
        </div>
      )}
    </div>
  );
};

export default EmpFindWork;