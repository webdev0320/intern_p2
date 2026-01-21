import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const SpendingDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [spendingData, setSpendingData] = useState({
    amount: 0,
    date: "No Date",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://iyouworks.taxaccolega.co.uk/index.php/api/users/payment?id=30&type=spending"
        );
        const json = await response.json();

        if (json.status === "success!") {
          setSpendingData({
            amount: json["Total Amount"],
            date: json.date,
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

        {/* GRID 6 / 6 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* LEFT SIDE – SPENDING CARD */}
          <div className="md:col-span-6">
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-10 flex flex-col items-center h-full">
              <img
                src="https://i.ibb.co/Lz0zX3y/illustration.png"
                alt="Spending Illustration"
                className="w-40 mb-6"
              />

              <div className="flex items-start">
                <span className="text-2xl font-bold text-[#FF8C00] mt-2">
                  £
                </span>
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
                <FilterButton label="Filter by workers" />
                <FilterButton label="Filter by date" />
                <FilterButton label="Filter by location" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Reusable Dropdown Button
const FilterButton = ({ label }) => (
  <button className="w-full flex justify-between items-center px-6 py-4 border border-gray-200 rounded-full text-gray-500 hover:bg-gray-50 transition">
    <span className="italic">{label}</span>
    <ChevronDown size={20} className="text-gray-800" />
  </button>
);

export default SpendingDashboard;
