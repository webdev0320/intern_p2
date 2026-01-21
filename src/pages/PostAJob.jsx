import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* Fix Leaflet marker icon issue */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const PostAJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [payRate, setPayRate] = useState(50);
  const [distance, setDistance] = useState(50);
  const [is_Remote, setRemote] = useState(false);
  const [numWorkers, setNumWorkers] = useState(1); // default 1 worker
  // Post Job fields
  const [skillId, setSkillId] = useState("");
  const [industryId, setIndustryId] = useState("");
  const [duration, setDuration] = useState(8);
  const [startTime, setStartTime] = useState(13);
  const [startDate, setStartDate] = useState("");
  const [offerRate, setOfferRate] = useState(20);
  const [description, setDescription] = useState("");

  
  // Industry & Skills data
  const [industries, setIndustries] = useState([]);
  const [skills, setSkills] = useState([]);

  const [walletAmt, setWalletAmt] = useState(0);
  const [useWallet, setUseWallet] = useState(false);
   const [card, setCard] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
    const hours = Array.from({ length: 24 }, (_, i) =>
      String(i).padStart(2, "0")
    );
  // Location state

  const userId = localStorage.getItem("user_id");
  const [location, setLocation] = useState(
    "J42J+P72, Street 17, New Gulzar-e-Quaid, Islamabad"
  );


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

  /* Recenter map when marker updates */
  const RecenterMap = ({ lat, lng }) => {
    const map = useMapEvents({});
    useEffect(() => {
      map.setView([lat, lng], map.getZoom(), { animate: true });
    }, [lat, lng, map]);
    return null;
  };

  /* Map click handler */
  const MapClickHandler = ({ onSelect }) => {
    useMapEvents({
      click(e) {
        onSelect(e.latlng);
      },
    });
    return null;
  };


/* LOCATION */
  const [marker, setMarker] = useState({
    lat: 33.6844,
    lng: 73.0479,
  });

  useEffect(() => {
  const fetchWalletBalance = async () => {
    try {
      const payload = new FormData();
      payload.append("user_id", userId);
            const response = await fetch(
              `${BASE_URL}/api/payment/create_stripe_account`,
              {
                method: "POST",
                body: payload,
              }
            );      

      const data = await response.json();

      if (data?.status === "success!") {
        setWalletAmt(Number(data.Balance) || 0);
      }
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  };

  fetchWalletBalance();
}, [BASE_URL]);


/* GET USER LOCATION */
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setMarker({ lat, lng });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          const data = await res.json();
          if (data?.display_name) setLocation(data.display_name);
        } catch {}
      }
    );
  }, []);

   /* MAP CLICK */
  const handleMapSelect = async ({ lat, lng }) => {
    setMarker({ lat, lng });

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      if (data?.display_name) setLocation(data.display_name);
    } catch {}
  };


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

  // Calculate totalPayment similar to Kotlin logic
  const totalPayment = payRate * duration * numWorkers;
  console.log("Total Payment:", totalPayment);

// WALLET CHECK
  if (useWallet) {
    if (totalPayment > walletAmt) {
      alert(
        `Insufficient wallet balance.\nWallet: £${walletAmt}\nRequired: £${totalPayment}`
      );
      return;
    }

    const confirmWallet = window.confirm(
      `£${totalPayment} will be deducted from your wallet. Continue?`
    );
    if (!confirmWallet) return;
  } else {
    const confirmStripe = window.confirm(
      `£${totalPayment} will be charged via Stripe. Continue?`
    );
    if (!confirmStripe) return;
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
    formData.append("description", description);
    formData.append("job_location", location);
    formData.append("job_id", "1"); 
    formData.append("job_type", "1"); 
    formData.append("platform", "web");
    formData.append("worker_id", "1"); 



    const response = await fetch(
      `${BASE_URL}/api/jobs/offer?user_id=${userId}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

     if (useWallet) {
      // WALLET PAYMENT
      const walletRes = await fetch(`${BASE_URL}/api/payment/deductWallet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPayment,
        }),
      });

      const walletData = await walletRes.json();

      if (walletData?.status !== "success!") {
        alert("Wallet payment failed.");
        setLoading(false);
        return;
      }
    } else {
        
       console.log(data.job_id);

       const cardRes = await fetch(`${BASE_URL}/api/users/cardHistory?user_id=${userId}`, {
        method: "GET",
      });

      const card = await cardRes.json();
      const name = localStorage.getItem("name");
      const email = localStorage.getItem("email");
      const phone = localStorage.getItem("phone");
      const payload = new FormData();
      payload.append("userName", name);
      payload.append("email", email);
      payload.append("phone", phone);
      payload.append("zipcode", "");
      payload.append("job_name", description);
      payload.append("amount", totalPayment);
      payload.append("status", "test");
      payload.append("customer_id", "");
      payload.append("user_id", userId);
      payload.append("job_id", data.job_id);

      const stripeRes = await fetch(`${BASE_URL}/api/payment/chargeWeb`, {
        method: "POST",
        body: payload,
      });

      const stripeData = await stripeRes.json();

      if (stripeData?.status !== "success!") {
        alert("Stripe payment failed.");
        setLoading(false);
        return;
      }

    }


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
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select hour</option>
              {hours.map((h) => (
                <option key={h} value={h}>
                  {h}:00
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              min={new Date().toISOString().split("T")[0]}
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

        {/* Location + Map Section */}
       <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
          <label className="block text-sm font-medium mb-1">
            Job Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-md px-3 py-2 bg-gray-100"
          />
        </div>   

        <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
          <label className="block text-sm font-medium mb-1">
            Job Location
          </label>
          <input
            type="text"
            value={location}
            readOnly
            className="w-full border rounded-md px-3 py-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Select Location on Map
          </label>
          <div className="h-[450px] border rounded-lg overflow-hidden">
            <MapContainer
              center={[marker.lat, marker.lng]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <RecenterMap lat={marker.lat} lng={marker.lng} />
              <MapClickHandler onSelect={handleMapSelect} />
              <Marker position={[marker.lat, marker.lng]} />
            </MapContainer>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-100 rounded-lg flex items-center justify-between">
          <div>
            <span className="font-medium">Wallet Balance: </span>
            <span className="text-green-600">£{walletAmt}</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Pay from Wallet</label>
            <input
              type="checkbox"
              checked={useWallet}
              onChange={() => setUseWallet(!useWallet)}
              className="w-5 h-5"
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



      </div>
    </div>
  );
};

export default PostAJob;
