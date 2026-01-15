import React, { useState, useEffect } from "react";

function EmpServices() {
  const [industries, setIndustries] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        // 1️⃣ Fetch all industries
        const resIndustries = await fetch(`${BASE_URL}/api/industry/list/`);
        const industriesData = await resIndustries.json();

        if (industriesData && Array.isArray(industriesData.data)) {
          setIndustries(industriesData.data);
        }

        // 2️⃣ Fetch user profile
        const resProfile = await fetch(`${BASE_URL}/api/users/profile/?id=${userId}`);
        const profileData = await resProfile.json();

        if (profileData) {
          // Preselect industries
          if (Array.isArray(profileData.industries)) {
            const userIndustryIds = profileData.industries.map((i) => String(i.id));
            setSelectedIndustries(userIndustryIds);
          }

          // Preselect skills ONLY from profile
          if (Array.isArray(profileData.skills)) {
            const userSkillIds = profileData.skills.map((s) => String(s.id));
            setSelectedSkills(userSkillIds);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchIndustries();
  }, [BASE_URL, userId]);

  // Toggle industry selection
  const handleIndustryChange = (industry) => {
    const id = String(industry.bid);

    if (selectedIndustries.includes(id)) {
      // Remove industry (do NOT remove skills automatically, user decides)
      setSelectedIndustries((prev) => prev.filter((x) => x !== id));
    } else {
      if (selectedIndustries.length >= 3) {
        alert("You can select only 3 industries.");
        return;
      }

      setSelectedIndustries((prev) => [...prev, id]);
    }
  };

  // Toggle individual skill selection
  const handleSkillChange = (skillId) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills((prev) => prev.filter((s) => s !== skillId));
    } else {
      setSelectedSkills((prev) => [...prev, skillId]);
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
        <div className="mt-6 mb-6 bg-white rounded shadow p-4">
          <p className="text-sm font-medium mb-2">Select your industries (max 3):</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {industries.map((industry) => {
              const industryId = String(industry.bid);
              const isIndustryChecked = selectedIndustries.includes(industryId);

              return (
                <div key={industryId} className="border rounded p-3">
                  {/* Industry checkbox */}
                  <label className="flex flex-col cursor-pointer">
                    <div className="flex items-center space-x-2 font-medium">
                      <input
                        type="checkbox"
                        value={industryId}
                        checked={isIndustryChecked}
                        onChange={() => handleIndustryChange(industry)}
                        className="form-checkbox h-4 w-4 text-orange-500"
                      />
                      <span className="text-gray-800">{industry.name}</span>
                    </div>

                    {/* Skills checkboxes */}
                    {industry.skills.length > 0 && (
                      <div className="ml-6 mt-2 space-y-1">
                        {industry.skills.map((skill) => {
                          const skillId = String(skill.sid);
                          const isSkillChecked = selectedSkills.includes(skillId);

                          return (
                            <label
                              key={skillId}
                              className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                value={skillId}
                                checked={isSkillChecked}
                                onChange={() => handleSkillChange(skillId)}
                                className="form-checkbox h-3 w-3 text-green-500"
                              />
                              <span>{skill.title}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </label>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      ) : (
        <div className="mt-6 bg-white rounded shadow p-4">
          <p className="text-sm text-gray-500">You have not added any services yet.</p>
        </div>
      )}
    </div>
  );
}

export default EmpServices;
