import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const PostAJob = () => {
  // Top filters
  const [payRate, setPayRate] = useState(50);
  const [distance, setDistance] = useState(50);
  const [remote, setRemote] = useState(false);

  // Post Job fields
  const [skillId, setSkillId] = useState(2);
  const [industryId, setIndustryId] = useState(3);
  const [duration, setDuration] = useState(8);
  const [startTime, setStartTime] = useState(13);
  const [startDate, setStartDate] = useState("");
  const [offerRate, setOfferRate] = useState(20);

  // Location state
  const [location, setLocation] = useState(
    "J42J+P72, Street 17, New Gulzar-e-Quaid, Islamabad"
  );
  const [marker, setMarker] = useState({ lat: 33.6844, lng: 73.0479 }); // Default Islamabad

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
  const handleSubmit = () => {
    const payload = {
      skill_id: skillId,
      industry_id: industryId,
      duration_in_hours: [duration],
      start_time: [startTime],
      start_date: [startDate],
      offer_rate: `£${offerRate}`,
      offer_status: "Waiting",
      job_id: 1,
      location,
    };

    console.log("POST DATA 👉", payload);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* ================= TOP SECTION ================= */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-end">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Work
            </label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>Web Developer</option>
              <option>Designer</option>
              <option>Electrician</option>
              <option>Plumber</option>
            </select>
          </div>

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

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remote}
              onChange={() => setRemote(!remote)}
              className="w-5 h-5"
            />
            <label className="text-sm font-medium">Remote Work</label>
          </div>
        </div>
      </div>

      {/* ================= POST JOB SECTION ================= */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Post a Job</h2>

        <div className="grid p-2 grid-cols-1 md:grid-cols-3 gap-6">
          {/* Skill ID */}
          <div>
            <label className="block text-sm font-medium mb-1">Skill</label>
            <select
              value={skillId}
              onChange={(e) => setSkillId(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value={2}>Skill 2</option>
              <option value={3}>Skill 3</option>
            </select>
          </div>

          {/* Industry ID */}
          <div>
            <label className="block text-sm font-medium mb-1">Industry</label>
            <select
              value={industryId}
              onChange={(e) => setIndustryId(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value={3}>Industry 3</option>
              <option value={4}>Industry 4</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Duration (Hours)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Start Time (Hour)
            </label>
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

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Post Job
        </button>

        {/* Location + Map Section */}
        <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
          {/* Location Text */}
          <div className="p-4 border-b">
            <p className="text-sm text-gray-600">📍 Location</p>
            <h2 className="text-lg font-semibold">{location}</h2>
          </div>

          {/* Google Map */}
          <div className="h-[500px]">
            <LoadScript googleMapsApiKey="AIzaSyC6F4Ue_5dQ_g5_RK6HjtNcEkMgwlxLAzY">
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
