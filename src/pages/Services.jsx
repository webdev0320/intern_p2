import React, { useState, useEffect } from "react";

function Services() {
  const [industries, setIndustries] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]); // hidden skills
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const userId = localStorage.getItem("user_id");


  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        // 1️⃣ Fetch all industries
        const response = await fetch(`${BASE_URL}/api/industry/list/`);
        const data = await response.json();
        if (data && Array.isArray(data.data)) {
          setIndustries(data.data);
        }

        // 2️⃣ Fetch user profile
        const profileRes = await fetch(`${BASE_URL}/api/users/profile/?id=${userId}`);
        const profileData = await profileRes.json();

        if (profileData && Array.isArray(profileData.industries)) {
          const userIndustryIds = profileData.industries.map((i) => i.id);
          setSelectedIndustries(userIndustryIds);

          // Preselect all skills of these industries
          const skillsFromIndustries = [];

          data.data.forEach((industry) => {
            if (userIndustryIds.includes(industry.bid)) {
              industry.skills.forEach((skill) => {
                skillsFromIndustries.push(skill.sid);
              });
            }
          });

          setSelectedSkills(skillsFromIndustries);
        }
      } catch (error) {
        console.error("Error fetching industries or profile:", error);
      }
    };

    fetchIndustries();
  }, [BASE_URL, userId]);

  const handleCheckboxChange = (industry) => {
    const id = industry.bid;

    if (selectedIndustries.includes(id)) {
      // Remove industry and its skills
      setSelectedIndustries((prev) => prev.filter((x) => x !== id));
      setSelectedSkills((prev) =>
        prev.filter((sid) => !industry.skills.some((s) => s.sid === sid))
      );
    } else {
      if (selectedIndustries.length < 3) {
        // Add industry
        setSelectedIndustries((prev) => [...prev, id]);

        // Add all its skills
        const skillIds = industry.skills.map((s) => s.sid);
        setSelectedSkills((prev) => [...prev, ...skillIds]);
      } else {
        alert("You can select only 3 industries.");
      }
    }
  };

  const handleSubmit = async () => {
    if (selectedIndustries.length === 0) {
      alert("Please select at least one industry.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      selectedIndustries.forEach((id) => formData.append("industry_id[]", id));
      selectedSkills.forEach((sid) => formData.append("skill_id[]", sid));
      formData.append("user_id", userId);

      const response = await fetch(`${BASE_URL}/api/users/industry/`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Response:", data);

      if (data && data.status === "success!") {
        alert("Industries and skills submitted successfully!");
      } else {
        alert("Failed to submit.");
      }
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Services</h1>

      {industries.length > 0 ? (
        <div className="mt-6 bg-white rounded shadow p-4">
          <p className="text-sm font-medium mb-2">
            Select your industries (max 3):
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {industries.map((industry) => {
              const id = industry.bid;
              return (
                <label
                  key={id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={id}
                    checked={selectedIndustries.includes(id)}
                    onChange={() => handleCheckboxChange(industry)}
                    className="form-checkbox h-4 w-4 text-orange-500"
                  />
                  <span className="text-gray-700">{industry.name}</span>
                </label>
              );
            })}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      ) : (
        <div className="mt-6 bg-white rounded shadow p-4">
          <p className="text-sm text-gray-500">
            You have not added any services yet.
          </p>
        </div>
      )}
    </div>
  );
}

export default Services;
