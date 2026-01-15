import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const PostAJob = () => {
  // Top filters
  const [loading, setLoading] = useState(false);
  const [payRate, setPayRate] = useState(50);
  const [distance, setDistance] = useState(50);
  const [is_Remote, setRemote] = useState(false);

  // Post Job fields
  const [skillId, setSkillId] = useState("");
  const [industryId, setIndustryId] = useState("");
  const [duration, setDuration] = useState(8);
  const [startTime, setStartTime] = useState(13);
  const [startDate, setStartDate] = useState("");
  const [offerRate, setOfferRate] = useState(20);
  const userId = localStorage.getItem("user_id");
  // Industry & Skills data
  const [industries, setIndustries] = useState([]);
  const [skills, setSkills] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Location state
  const [location, setLocation] = useState(
    "J42J+P72, Street 17, New Gulzar-e-Quaid, Islamabad"
  );
  const [marker, setMarker] = useState({ lat: 33.6844, lng: 73.0479 }); // Default Islamabad

  // Fetch industries on mount
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/industry/list/`);
        const data = await res.json();
        if (data && Array.isArray(data.data)) {
          setIndustries(data.data);
        }
      } catch (error) {
        console.error("Error fetching industries:", error);
      }
    };

    fetchIndustries();
  }, [BASE_URL]);

  // Update skills when industry changes
  useEffect(() => {
    const selectedIndustry = industries.find((i) => String(i.bid) === String(industryId));
    if (selectedIndustry && Array.isArray(selectedIndustry.skills)) {
      setSkills(selectedIndustry.skills);
      // Reset selected skill when industry changes
      setSkillId("");
    } else {
      setSkills([]);
      setSkillId("");
    }
  }, [industryId, industries]);

  // Handle Map Click
  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarker({ lat, lng });

    // Reverse geocoding to get address
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        setLocation(results[0].formatted_address);
      } else {
        setLocation("Address not found");
      }
    });
  };

  // Handle submit
  // Handle submit
const handleSubmit = async () => {
  if (!industryId || !skillId) {
    alert("Please select both industry and skill.");
    return;
  }

  if (!startDate) {
    alert("Please select a start date.");
    return;
  }

  setLoading(true);

  try {
    // Prepare form data
    const formData = new FormData();
    formData.append("skill_id", skillId);
    formData.append("industry_id", industryId);
    formData.append("duration_in_hours[]", duration);
    formData.append("start_time[]", startTime);
    formData.append("start_date[]", startDate);
    formData.append("offer_rate", `£${offerRate}`);
    formData.append("lat", marker.lat);
    formData.append("lon", marker.lng);
    formData.append("offer_status", "Waiting");
    formData.append("description", "Job description here"); // you can replace with a field from input
    formData.append("job_location", location);
    formData.append("job_id", "1"); 
    formData.append("job_type", "1"); 

    const response = await fetch(
      `${BASE_URL}/api/jobs/offer?user_id=${userId}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    console.log("API Response:", data);

    if (data && data.status === "success!") {
      alert("Job offer submitted successfully!");
      navigate('hirer-dashboard')
    } else {
      alert("Failed to submit job offer.");
    }
  } catch (error) {
    console.error("Error submitting job offer:", error);
    alert("Something went wrong while submitting.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Post a Job</h2>

        <div className="grid p-2 grid-cols-1 md:grid-cols-3 gap-6">
          {/* Industry Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Industry</label>
            <select
              value={industryId}
              onChange={(e) => setIndustryId(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select Industry</option>
              {industries.map((industry) => (
                <option key={industry.bid} value={industry.bid}>
                  {industry.name}
                </option>
              ))}
            </select>
          </div>

          {/* Skills Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Skill</label>
            <select
              value={skillId}
              onChange={(e) => setSkillId(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              disabled={skills.length === 0}
            >
              <option value="">Select Skill</option>
              {skills.map((skill) => (
                <option key={skill.sid} value={skill.sid}>
                  {skill.title}
                </option>
              ))}
            </select>
          </div>

          {/* Pay Rate */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Pay Rate (£/hr): <span className="text-blue-600">£{payRate}</span>
            </label>
            <input
              type="range"
              min="10"
              max="50"
              value={payRate}
              onChange={(e) => setPayRate(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Distance */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Distance: <span className="text-blue-600">{distance} miles</span>
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Remote Work */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={is_Remote}
              onChange={() => setRemote(!is_Remote)}
              className="w-5 h-5"
            />
            <label className="text-sm font-medium">Remote Work</label>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium mb-1">Duration (Hours)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-sm font-medium mb-1">Start Time (Hour)</label>
            <input
              type="number"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Offer Rate */}
          <div>
            <label className="block text-sm font-medium mb-1">Offer Rate (£)</label>
            <input
              type="number"
              value={offerRate}
              onChange={(e) => setOfferRate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Post Job
        </button>

        {/* Location + Map Section */}
        <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <p className="text-sm text-gray-600">📍 Location</p>
            <h2 className="text-lg font-semibold">{location}</h2>
          </div>

          <div className="h-[500px]">
            <LoadScript googleMapsApiKey="{GOOGLE_MAPS_API_KEY}">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={marker}
                zoom={13}
                onClick={handleMapClick}
              >
                <Marker position={marker} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAJob;
