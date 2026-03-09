import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaArrowLeft } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Swal from "sweetalert2";
import ProfileCompleteEmpAlert from '../Componants/ProfileCompleteEmpAlert';

/* Fix Leaflet marker icon issue */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
const IMAGE_BASE_URL = import.meta.env.VITE_API_IMAGE_BASE_URL;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
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

  const userId = localStorage.getItem("user_id");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  // UI State
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);

  // Filters State
  const [payRate, setPayRate] = useState(11);
  const [distance, setDistance] = useState(50);
  const [isRemote, setRemote] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState("");

  // Data State
  const userProfile = localStorage.getItem("userProfile");
  const profile = userProfile ? JSON.parse(userProfile) : null;
  const [jobs, setJobs] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Location State

  const [location, setLocation] = useState("Loading current location...");
  const [marker, setMarker] = useState({ lat: 33.6844, lng: 73.0479 });

  const isFormDisabled = !profile || 
    !profile.line_manager_name || 
    (!profile.industries || profile.industries.length === 0) || 
    !profile.stripe_account_id;

  
  // 3. Search Autocomplete Logic
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length < 3) { setSuggestions([]); return; }
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`);
        const data = await res.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (err) { console.error(err); }
    };
    const timer = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 4. Map Components
  const RecenterMap = ({ lat, lng }) => {
    const map = useMapEvents({});
    useEffect(() => { map.setView([lat, lng], map.getZoom(), { animate: true }); }, [lat, lng, map]);
    return null;
  };

  const MapClickHandler = ({ onSelect }) => {
    useMapEvents({ click(e) { onSelect(e.latlng); } });
    return null;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setMarker(coords);
        handleMapSelect(coords); // Re-use your existing logic to get address
      });
    }
  }, []);

  const handleMapSelect = async ({ lat, lng }) => {
    setMarker({ lat, lng });
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      if (data?.display_name) setLocation(data.display_name);
    } catch {}
  };  


  const stripeConnect = async () => {
    try {
      if (profile?.stripe_account_id) {
        const payload = new FormData();
        payload.append("email", email);
        payload.append("stripe_account_id", profile.stripe_account_id);
        payload.append("status", "test");
        payload.append("user_id", userId);

        const loginResponse = await fetch(`${BASE_URL}/api/payment/stripe_login_link`, {
          method: "POST",
          body: payload,
        });
        const loginData = await loginResponse.json();
        const stripeUrl = loginData?.chargerecord?.url;

        if (stripeUrl) {
          window.open(stripeUrl, "_blank", "noopener,noreferrer");
        } else {
          Swal.fire("Error", "Stripe login URL not found!", "error");
        }
      } else {
        const payload = new FormData();
        payload.append("email", email);
        payload.append("country", "GB");
        payload.append("status", "test");
        payload.append("user_id", userId);

        const createResponse = await fetch(`${BASE_URL}/api/payment/create_stripe_account`, {
          method: "POST",
          body: payload,
        });
        const createData = await createResponse.json();

        if (createData?.url) {
          window.location.href = createData.url;
        } else {
          Swal.fire("Error", "Stripe onboarding URL not found!", "error");
        }
      }
    } catch (error) {
      console.error("Stripe error:", error);
    }
  };

  const handleSearch = async () => {
    if (!selectedSkillId) {
      Swal.fire("Note", "Please select a skill first.", "info");
      return;
    }

    setLoading(true);
    try {
      const url = `${BASE_URL}/api/jobs/search?worker_id=${userId}&skill_id=${selectedSkillId}`;
      const payload = new FormData();
      payload.append("miles", distance);
      payload.append("lat", marker.lat);
      payload.append("long", marker.lng);
      payload.append("pay_Rate", payRate);
      payload.append("is_Remote", isRemote ? "Remote" : "Onsite");

      const response = await fetch(url, { method: "POST", body: payload });
      const result = await response.json();

      if (result.status === "success!" && result.data?.length > 0) {
        setJobs(result.data);
        setShowForm(false);
      } else {
        setJobs([]);
        Swal.fire("No Jobs", "Try adjusting your filters or location.", "warning");
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (job) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Apply for ${job.skill_name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, apply'
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("status", "Accept");
      payload.append("who_offer_job_user_id", job.user_id);
      payload.append("worker_id", userId);
      payload.append("job_id", job.offer_id);
      payload.append("job_name", job.skill_name);

      const response = await fetch(`${BASE_URL}/api/jobs/status_update?job_offer_id=${job.offer_id}`, {
        method: "POST",
        body: payload
      });

      const data = await response.json();
      if (data.status === "success!") {
        navigate('/employer-congrats-page', { state: { offerId: job.offer_id } });
      } else {
        Swal.fire("Failed", data.message || "Failed to apply.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {showForm ? (
        <>
          <ProfileCompleteEmpAlert profile={profile} role={role} navigate={navigate} />
          <div className={isFormDisabled ? "opacity-40 pointer-events-none" : ""}>
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
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
                  <input type="range" min="11" max="100" value={payRate} onChange={(e) => setPayRate(e.target.value)} className="w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Dist: {distance} mi</label>
                  <input type="range" min="1" max="100" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full" />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <input type="checkbox" id="remote" checked={isRemote} onChange={() => setRemote(!isRemote)} className="w-5 h-5" />
                  <label htmlFor="remote" className="text-sm font-medium cursor-pointer">Remote</label>
                </div>

                <button onClick={handleSearch} disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400">
                  {loading ? "Searching..." : "Find Work"}
                </button>
              </div>
            </div>

            {/* Location Search */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Job Location</label>
            <input type="text" value={searchQuery} onFocus={() => setShowSuggestions(true)} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Enter address..." className="w-full border rounded-lg px-4 py-2" />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-[2000] w-full bg-white border rounded-b-lg shadow-xl mt-1">
                {suggestions.map((item, i) => (
                  <li key={i} onClick={() => { setMarker({ lat: parseFloat(item.lat), lng: parseFloat(item.lon) }); setLocation(item.display_name); setSearchQuery(item.display_name); setShowSuggestions(false); }} className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm border-b">
                    {item.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Map */}
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-2 italic">Selected: {location}</p>
            <div className="h-[400px] rounded-xl overflow-hidden border-2 border-gray-200 z-0 relative">
              <MapContainer center={[marker.lat, marker.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <RecenterMap lat={marker.lat} lng={marker.lng} />
                <MapClickHandler onSelect={handleMapSelect} />
                <Marker position={[marker.lat, marker.lng]} />
              </MapContainer>
            </div>
          </div>


          </div>
        </>
      ) : (
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 text-blue-600 font-medium hover:underline">
            <FaArrowLeft /> Edit Search
          </button>
          <h2 className="text-xl font-bold">{jobs.length} Jobs Found</h2>
        </div>
      )}

      {/* Jobs Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div key={job.offer_id} className="bg-white rounded-2xl shadow p-4 border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-blue-600 font-semibold text-lg">{job.skill_name}</h2>
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium cursor-pointer" onClick={() => window.open("https://wa.me/44782345457", "_blank")}>
                  <FaWhatsapp /> Help?
                </div>
              </div>
              <p className="text-xs mt-1">
                {job.jobdetail}
              </p>
              <p className="text-xs mt-1">
                📍 {job.job_location}
              </p>
              <p className="text-blue-500 text-xs mt-1 italic">
                {job.offer_status === "Waiting" ? "Awaiting worker" : job.offer_status}
              </p>
              
              <hr className="my-3" />
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-3">
                <span><b className="text-blue-600">Pay Rate : £{job.offer_rate}</b></span>
                <span><b className="text-blue-600">Remote : {job.job_type!='Onsite'?'Yes':'No'}</b></span>
              </div>
              <hr className="my-3" />
              {job.duration?.map((duration, index) => (
                  <div key={index} className="flex justify-between text-sm mb-3 text-center">
  
                      <span className="flex-1">
                        Work Date : <br />{duration.start_date}
                      </span>

                      <span className="flex-1">
                        Work Duration : <br />{duration.duration_in_hours} hr
                      </span>

                      <span className="flex-1">
                        Work Time (24hr) : <br />{duration.start_time}
                      </span>

                    </div>
                ))}
              <hr className="my-3" />
             <div className="flex items-center justify-between text-sm mb-3">
                <div className="flex items-center gap-3">
                  
                  <img
                    src={`${IMAGE_BASE_URL}/${job.image}`}
                    alt={job.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <span>
                    <b className="text-blue-600">{job.name}</b>
                  </span>

                </div>

              </div>
               
              {job.offer_status === "Waiting" && (
                <button onClick={() => handleApply(job)} className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition">
                  Apply For Work
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {jobs.length === 0 && !loading && !showForm && (
        <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500">No jobs match your criteria.</p>
          <button onClick={() => setShowForm(true)} className="mt-2 text-blue-600 font-bold hover:underline">
            Try adjusting your search
          </button>
        </div>
      )}
    </div>
  );
};

export default EmpFindWork;