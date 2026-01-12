import React, { useState, useEffect } from "react";

function Services() {
  const [industries, setIndustries] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);

  // Fetch industries from API
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch(
          "https://iyouworks.taxaccolega.co.uk/index.php/api/industry/list/"
        );
        const data = await response.json();
        if (data && Array.isArray(data.data)) {
          setIndustries(data.data);
        } else {
          console.error("Unexpected API response:", data);
        }
      } catch (error) {
        console.error("Error fetching industries:", error);
      }
    };

    fetchIndustries();
  }, []);

  // Handle checkbox toggle with max 3 selections
  const handleCheckboxChange = (industryId) => {
    if (selectedIndustries.includes(industryId)) {
      // Remove if already selected
      setSelectedIndustries((prev) =>
        prev.filter((id) => id !== industryId)
      );
    } else {
      // Add if less than 3 selected
      if (selectedIndustries.length < 3) {
        setSelectedIndustries((prev) => [...prev, industryId]);
      } else {
        alert("You can select only 3 industries.");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Services</h1>

      {industries.length > 0 ? (
        <div className="mt-6 bg-white rounded shadow p-4">
          <p className="text-sm font-medium mb-2">Select your industries (max 3):</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {industries.map((industry) => (
              <label
                key={industry.id} // <-- unique key is very important
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedIndustries.includes(industry.id)} // <-- must use unique id
                  onChange={() => handleCheckboxChange(industry.id)} // <-- toggle with id
                  className="form-checkbox h-4 w-4 text-orange-500"
                />
                <span className="text-gray-700">{industry.name}</span>
              </label>
            ))}
          </div>
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
