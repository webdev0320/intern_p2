import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_p2.png";

const SpendingDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [spendingData, setSpendingData] = useState({
    amount: 0,
    date: "No Date",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const userId = localStorage.getItem("user_id");

        const response = await fetch(
          `${BASE_URL}/api/users/payment?id=${userId}&type=spending`
        );
        const json = await response.json();

        if (json.status === "success!") {
          setSpendingData({
            amount: Number(json["Total Amount"]) || 0, // ✅ FIX
            date: json.date || "No Date",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          My Spendings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* LEFT SIDE */}
          <div className="md:col-span-6">
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-10 flex flex-col items-center h-full">
              <img src={logo} alt="Spending" className="w-40 mb-6" />

              <div className="flex items-start">
                <span className="text-2xl font-bold text-[#FF8C00] mt-2">£</span>
                <span className="text-6xl font-extrabold text-[#FF8C00]">
                  {loading ? "..." : spendingData.amount.toFixed(1)}
                </span>
              </div>

              <p className="text-gray-500 mt-4 text-lg">
                {loading ? "Loading..." : spendingData.date}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE – FILTERS */}
          <div className="md:col-span-6">
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 h-full">
              <h2 className="text-2xl font-bold text-[#FF8C00] mb-6">
                Filter
              </h2>

              <div className="space-y-4">
                <FilterButton
                  label="Filter by workers"
                  onClick={() =>
                    navigate("/hirer/filterjobs/workers")
                  }
                />
                <FilterButton
                  label="Filter by date"
                  onClick={() =>
                    navigate("/hirer/filterjobs/date")
                  }
                />
                <FilterButton
                  label="Filter by location"
                  onClick={() =>
                    navigate("/hirer/filterjobs/location")
                  }
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Reusable Button
const FilterButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex justify-between items-center px-6 py-4 border border-gray-200 rounded-full text-gray-500 hover:bg-gray-50 transition"
  >
    <span className="italic">{label}</span>
    <ChevronDown size={20} className="text-gray-800" />
  </button>
);

export default SpendingDashboard;
