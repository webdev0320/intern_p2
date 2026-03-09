import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function EmpServices() {
  const [industries, setIndustries] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const resIndustries = await fetch(`${BASE_URL}/api/industry/list/`);
        const industriesData = await resIndustries.json();

        if (industriesData && Array.isArray(industriesData.data)) {
          setIndustries(industriesData.data);
        }

        const resProfile = await fetch(
          `${BASE_URL}/api/users/profile/?id=${userId}`
        );
        const profileData = await resProfile.json();

        if (profileData) {
          if (Array.isArray(profileData.industries)) {
            const userIndustryIds = profileData.industries.map((i) =>
              String(i.id)
            );
            setSelectedIndustries(userIndustryIds);
          }

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

  // Skill selection
const handleSkillChange = (skillId, industryId) => {
  const skillSelected = selectedSkills.includes(skillId);

  if (skillSelected) {
    // Remove skill
    setSelectedSkills((prev) => prev.filter((s) => s !== skillId));
  } else {
    // Limit skills to 3
    if (selectedSkills.length >= 3) {
      Swal.fire("Limit reached", "You can select only 3 skills.", "warning");
      return;
    }

    setSelectedSkills((prev) => [...prev, skillId]);

    // Auto add industry if not already selected
    if (!selectedIndustries.includes(industryId)) {
      setSelectedIndustries((prev) => [...prev, industryId]);
    }
  }
};

  const handleSubmit = async () => {
    if (selectedIndustries.length === 0) {
      Swal.fire("Required", "Please select at least one skill.", "warning");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      selectedIndustries.forEach((id) =>
        formData.append("industry_id[]", id)
      );

      selectedSkills.forEach((sid) =>
        formData.append("skill_id[]", sid)
      );

      formData.append("user_id", userId);

      const response = await fetch(`${BASE_URL}/api/users/industry/`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data && data.status === "success!") {
        Swal.fire("Success", "Industries and skills saved!", "success");
        navigate("/emp-dashboard");
      } else {
        Swal.fire("Error", "Failed to submit.", "error");
      }
    } catch (error) {
      console.error("Error submitting:", error);
      Swal.fire("Error", "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Services</h1>

      {industries.length > 0 ? (
        <div className="mt-6 mb-6 bg-white rounded shadow p-4">
          <p className="text-sm font-medium mb-4">
            Select your skills (Maximum 3 industries allowed)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {industries.map((industry) => {
              const industryId = String(industry.bid);
              const isIndustrySelected =
                selectedIndustries.includes(industryId);

              return (
                <div
                  key={industryId}
                  className={`border rounded p-3 transition ${
                    isIndustrySelected
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  {/* Industry Name */}
                  <div className="font-medium text-gray-800 mb-2">
                    {industry.name}
                  </div>

                  {/* Skills */}
                  {industry.skills.length > 0 && (
                    <div className="space-y-1">
                      {industry.skills.map((skill) => {
                        const skillId = String(skill.sid);
                        const isChecked =
                          selectedSkills.includes(skillId);

                        return (
                          <label
                            key={skillId}
                            className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() =>
                                handleSkillChange(skillId, industryId)
                              }
                              className="h-3 w-3 text-green-500"
                            />
                            <span>{skill.title}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
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

export default EmpServices;