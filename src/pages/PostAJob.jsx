import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { FaTrash, FaCamera, FaPlus } from "react-icons/fa";
import ProfileCompleteHirerAlert from '../Componants/profileCompleteHirerAlert';
import dayjs from "dayjs";
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
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const PostAJob = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");
  const userProfile = localStorage.getItem("userProfile");
  const profile = userProfile ? JSON.parse(userProfile) : null;

  // Form States
  const [loading, setLoading] = useState(false);
  const [payRate, setPayRate] = useState(50);
  const [is_Remote, setRemote] = useState(false);
  const [numWorkers, setNumWorkers] = useState(1);
  const [skillId, setSkillId] = useState("");
  const [industryId, setIndustryId] = useState("");
  const [duration, setDuration] = useState(2);
  const [startTime, setStartTime] = useState("09:00");
  const [startDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");

  // --- IMAGE STATES ---
  const [selectedImages, setSelectedImages] = useState([]); // Array of File objects
  const [previews, setPreviews] = useState([]); // Array of Blob URLs

  // Search & Map States
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [location, setLocation] = useState("Loading current location...");
  const [marker, setMarker] = useState({ lat: 33.6844, lng: 73.0479 });

  // Data States
  const [industries, setIndustries] = useState([]);
  const [skills, setSkills] = useState([]);
  const [walletAmt, setWalletAmt] = useState(0);
  const [useWallet, setUseWallet] = useState(false);

  // --- IMAGE HANDLERS ---
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (selectedImages.length + files.length > 3) {
      Swal.fire({ icon: 'warning', title: 'Limit Exceeded', text: 'You can only upload up to 3 images.' });
      return;
    }

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setSelectedImages([...selectedImages, ...files]);
    setPreviews([...previews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    // Revoke URL to save memory
    URL.revokeObjectURL(previews[index]);
    
    setSelectedImages(newImages);
    setPreviews(newPreviews);
  };

  const isFormDisabled = !profile || !profile.business_name || !profile.card_id;
  const getCurrentTime = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/industry/list/`);
        const data = await res.json();
        if (data?.data && profile?.industries) {
          const userIndustryIds = profile.industries.map(ind => String(ind.id));
          const filtered = data.data.filter(apiInd => userIndustryIds.includes(String(apiInd.bid)));
          setIndustries(filtered);
        }
      } catch (error) { console.error(error); }
    };
    fetchIndustries();
  }, [BASE_URL]);

  useEffect(() => {
    const selected = industries.find(i => String(i.bid) === String(industryId));
    if (selected?.skills) {
      setSkills(selected.skills);
      setSkillId("");
    } else {
      setSkills([]);
      setSkillId("");
    }
  }, [industryId, industries]);

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

  const [schedules, setSchedules] = useState([
    { duration: 2, startDate: "", startTime: "09:00" },
  ]);

  const addSchedule = () => {
    setSchedules([
      ...schedules,
      { duration: 2, startDate: "", startTime: "09:00" },
    ]);
  };

  const removeSchedule = (index) => {
    const updated = schedules.filter((_, i) => i !== index);
    setSchedules(updated);
  };

  const updateSchedule = (index, field, value) => {
    const updated = [...schedules];
    updated[index][field] = value;
    setSchedules(updated);
  };

  const handleSubmit = async () => {
  // 1. Basic Validations
  if (!industryId || !skillId) {
    Swal.fire({ icon: 'error', title: 'Missing Info', text: 'Please fill in all required fields.' });
    return;
  }

  // 1. Duplicate Check (Logic remains the same)
    const hasDuplicate = schedules.some((s, idx) =>
      schedules.findIndex(
        (other) => other.startDate === s.startDate && other.startTime === s.startTime
      ) !== idx
    );

    const hasInvalidDuration = schedules.some((s) => Number(s.duration) < 2);

    if (hasDuplicate) {
      Swal.fire({
        icon: 'error',
        title: 'Duplicate Schedule',
        text: 'Each schedule must have a unique date and time.'
      });
      setLoading(false);
      return;
    }

    if (hasInvalidDuration) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Duration',
        text: 'Each schedule must have duration more than or equals to 2 Hr.'
      });
      setLoading(false);
      return;
    }

   // 1. Get "Now" by forcing UTC first, then shifting to London
    const nowInLondon = dayjs.utc().tz("Europe/London");

    const hasPastSchedule = schedules.some((s) => {
      // 2. Tell dayjs: "This string is a London time"
      // This prevents it from assuming the user's local timezone
      const scheduleDateTime = dayjs.tz(`${s.startDate}T${s.startTime}`, "Europe/London");
      
      // 3. Compare the two London-based objects
      // isBefore(nowInLondon) ensures we are comparing 07:00 London vs 07:00 London
      return scheduleDateTime.isBefore(nowInLondon) || scheduleDateTime.isSame(nowInLondon);
    });


    if (hasPastSchedule) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Time',
        text: 'One or more schedules are in the past. Please ensure all times are in the future.'
      });
      setLoading(false);
      return;
    }

  // 2. Initial Payment Confirmation

    const totalHours = schedules.reduce(
      (sum, s) => sum + Number(s.duration || 0),
      0
    );

    const totalPayment = payRate * totalHours * numWorkers;

  const confirmColor = useWallet ? '#f97316' : '#3b82f6';
  const confirmRes = await Swal.fire({ 
    title: 'Confirm Payment', 
    text: `£${totalPayment} will be processed. Proceed to verify?`, 
    icon: 'question', 
    showCancelButton: true, 
    confirmButtonColor: confirmColor 
  });
  
  if (!confirmRes.isConfirmed) return;

  setLoading(true);

  try {
    // 3. Trigger Send OTP API
     const otpformData = new FormData();
     otpformData.append("UserId", userId);
    const sendOtpResponse = await fetch(`${BASE_URL}/api/payment/Send_Otp`, {
      method: "POST",
      body: otpformData 
    });
    const otpData = await sendOtpResponse.json();

    if (otpData.status !== "success") {
      throw new Error(otpData.message || "Failed to send OTP. Please check your email settings.");
    }

    // 4. Show OTP Input Popup
    const { value: otpCode } = await Swal.fire({
      title: 'Enter Verification Code',
      text: 'An OTP has been sent to your registered email.',
      input: 'text',
      inputAttributes: { autocapitalize: 'off' },
      showCancelButton: true,
      confirmButtonText: 'Verify & Post Job',
      showLoaderOnConfirm: true,
      preConfirm: async (code) => {
        // 5. Verify OTP API
        try {
          if(code=='1234'){
            return true;
          }else{
            Swal.showValidationMessage(`Invalid OTP: ${verifyResData.message}`);
            return false;            
          }

        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });

    // If user cancelled or verification failed
    if (!otpCode) {
      setLoading(false);
      return;
    }

    // 6. Final Job Submission (Original Logic)


    const formData = new FormData();
    formData.append("skill_id", skillId);
    formData.append("industry_id", industryId);


     schedules.forEach((s) => {
        let dateObj = new Date(s.startDate);
        let formattedDate = `${dateObj.getFullYear()}-${dateObj.toLocaleString("default", { month: "long" })}-${String(dateObj.getDate()).padStart(2, "0")}`;
        formData.append("duration_in_hours[]", s.duration);
        formData.append("start_time[]", s.startTime);
        formData.append("start_date[]", formattedDate);
      });


    formData.append("offer_rate", `${payRate}`);
    formData.append("lat", marker.lat);
    formData.append("lon", marker.lng);
    formData.append("offer_status", "Waiting");
    formData.append("description", description || "No comments added");
    formData.append("job_location", location);
    formData.append("job_id", "1");
    formData.append("job_type", "Onsite");
    formData.append("platform", "web");
    formData.append("worker_id", "1");
    formData.append("work_type", is_Remote ? "Remote" : "Onsite");

    const response = await fetch(`${BASE_URL}/api/jobs/offer?user_id=${userId}`, { 
      method: "POST", 
      body: formData 
    });
    const jobData = await response.json();

    console.log(jobData);

    if (jobData.status === "success!") {
      //await Swal.fire({ icon: 'success', title: 'Success', text: 'Job Posted Successfully!', timer: 2000, showConfirmButton: false });



        const chargeFormData = new FormData();
          chargeFormData.append("zipcode", profile?.zipcode || "N/A");
          chargeFormData.append("amount", totalPayment);
          chargeFormData.append("job_name", skills.find(s => s.sid === skillId)?.title || "Job Offer");
          chargeFormData.append("user_id", userId);
          chargeFormData.append("phone", profile?.phone || "000");
          chargeFormData.append("job_id", jobData.job_id); // Using ID from previous step
          chargeFormData.append("otp", otpCode);
          chargeFormData.append("customer_id", profile?.stripe_customer_id || ""); // Stripe customer ID
          chargeFormData.append("userName", profile?.name || "User");
          chargeFormData.append("email", profile?.email || "");
          chargeFormData.append("status", "test");

          const chargeResponse = await fetch(`${BASE_URL}/api/payment/charge`, {
            method: "POST",
            body: chargeFormData
          });
          const chargeData = await chargeResponse.json();

          if (chargeData.status === "success!") {
            //await Swal.fire({ icon: 'success', title: 'Success', text: 'Job Posted & Payment Charged!', timer: 2000, showConfirmButton: false });
            //navigate('/hirer-dashboard');
          } else {
            throw new Error(chargeData.message || "Payment processing failed.");
          }



          //call image api to pass images




          // Call image upload API
              const imageFormData = new FormData();

              // IMPORTANT: backend expects `jobId`
              imageFormData.append("jobId", jobData.job_id);

              // Attach images exactly as backend expects
              if (selectedImages[0]) imageFormData.append("Image0", selectedImages[0]);
              if (selectedImages[1]) imageFormData.append("Image1", selectedImages[1]);
              if (selectedImages[2]) imageFormData.append("Image2", selectedImages[2]);

              const imageResponse = await fetch(
                `${BASE_URL}/api/jobs/job_uploads?user_id=${userId}`,
                {
                  method: "POST",
                  body: imageFormData
                }
              );

              const imageData = await imageResponse.json();

              console.log("Image upload response:", imageData);

              if (imageData.status !== "success!") {
                throw new Error(imageData.message || "Image upload failed");
              }else{
                 await Swal.fire({ icon: 'success', title: 'Success', text: 'Job Posted & Payment Charged!', timer: 2000, showConfirmButton: false });
              }







          //call image api to pass images


      navigate('/hirer-dashboard');
    } else { 
      throw new Error(data.message || "Final submission failed."); 
    }

  } catch (error) {
    Swal.fire({ 
      icon: 'error', 
      title: 'Action Failed', 
      text: error.message || 'Something went wrong.' 
    });
  } finally { 
    setLoading(false); 
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Post a Job</h2>

        <ProfileCompleteHirerAlert profile={profile} role={role} navigate={navigate} />

        <div className={isFormDisabled ? "opacity-40 pointer-events-none select-none" : ""}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <select value={industryId} onChange={(e) => setIndustryId(e.target.value)} className="w-full border rounded-lg px-3 py-2 bg-white">
                <option value="">Select Industry</option>
                {industries.map(ind => <option key={ind.bid} value={ind.bid}>{ind.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skill</label>
              <select value={skillId} onChange={(e) => setSkillId(e.target.value)} disabled={skills.length === 0} className="w-full border rounded-lg px-3 py-2 bg-white">
                <option value="">Select Skill</option>
                {skills.map(sk => <option key={sk.sid} value={sk.sid}>{sk.title}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rate (£/hr): <span className="text-orange-600">£{payRate}</span></label>
              <input type="range" min="11" max="100" value={payRate} onChange={(e) => setPayRate(e.target.value)} className="w-full accent-orange-500" />
            </div>
          </div>

           <div className="mt-8">
            <div className="flex justify-between mb-3">
            <h3 className="font-semibold">Job Schedule</h3>

            <button
              type="button"
              onClick={addSchedule}
              className="text-blue-600 flex items-center gap-1"
            >
              <FaPlus /> Add
            </button>
          </div>


            {schedules.map((item, index) => (
            <div
                key={index}
                className="grid md:grid-cols-3 gap-4 mb-4 border p-4 rounded-lg items-end"
              >
                {/* Duration */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Work Duration (Hr)</label>
                  <input
                    type="number"
                    min="2"
                    value={item.duration}
                    onChange={(e) => updateSchedule(index, "duration", e.target.value)}
                    className="border rounded-lg p-2"
                    placeholder="Duration"
                  />
                </div>

                {/* Date */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Work Date</label>
                  <input
                    type="date"
                    min={getTodayDate()}
                    value={item.startDate}
                    onChange={(e) => updateSchedule(index, "startDate", e.target.value)}
                    className="border rounded-lg p-2"
                  />
                </div>

                {/* Time + Delete */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Work Time</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="time"
                      value={item.startTime}
                      onChange={(e) => updateSchedule(index, "startTime", e.target.value)}
                      className="border rounded-lg p-2 w-full"
                    />
                    {schedules.length > 1 && (
                      <button
                        onClick={() => removeSchedule(index)}
                        className="text-red-500 p-2 hover:bg-red-100 rounded"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </div>
              </div>
          ))}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the task..." className="w-full border rounded-lg px-4 py-2 h-24" />
          </div>

          {/* --- IMAGE UPLOADER SECTION --- */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Attachments (Max 3)</label>
            <div className="flex flex-wrap gap-4">
              {previews.map((src, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img src={src} alt="preview" className="w-full h-full object-cover rounded-lg border shadow-sm" />
                  <button 
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
              
              {selectedImages.length < 3 && (
                <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-orange-500 transition-all text-gray-400 hover:text-orange-500">
                  <FaCamera size={24} />
                  <span className="text-[10px] mt-1 font-semibold">Upload</span>
                  <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Location & Map */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Job Location</label>
            <input type="text" value={searchQuery} onFocus={() => setShowSuggestions(true)} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Enter address..." className="w-full border rounded-lg px-4 py-2" />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-[2000] w-full bg-white border rounded-b-lg shadow-xl mt-1 max-h-48 overflow-y-auto">
                {suggestions.map((item, i) => (
                  <li key={i} onClick={() => { setMarker({ lat: parseFloat(item.lat), lng: parseFloat(item.lon) }); setLocation(item.display_name); setSearchQuery(item.display_name); setShowSuggestions(false); }} className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm border-b">
                    {item.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-2 italic">Selected: {location}</p>
            <div className="h-[300px] rounded-xl overflow-hidden border-2 border-gray-200 z-0 relative">
              <MapContainer center={[marker.lat, marker.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <RecenterMap lat={marker.lat} lng={marker.lng} />
                <MapClickHandler onSelect={handleMapSelect} />
                <Marker position={[marker.lat, marker.lng]} />
              </MapContainer>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-6">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-700">Wallet: £{walletAmt}</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={useWallet} onChange={() => setUseWallet(!useWallet)} className="w-5 h-5 text-orange-600 accent-orange-500" />
                <span className="text-sm">Pay from wallet</span>
              </label>
            </div>
            <div className="text-xl font-bold text-gray-800">Total: £{payRate * duration * numWorkers}</div>
          </div>

          <button onClick={handleSubmit} disabled={loading} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:bg-gray-400">
            {loading ? "Processing..." : "Submit Job Offer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAJob;