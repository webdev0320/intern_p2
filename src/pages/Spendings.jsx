import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowLeft, Bell } from 'lucide-react';

const SpendingDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [spendingData, setSpendingData] = useState({
    amount: 0,
    date: 'No Date'
  });

  // Fetching data from your provided API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://iyouworks.taxaccolega.co.uk/index.php/api/users/payment?id=30&type=spending');
        const json = await response.json();
        
        if (json.status === "success!") {
          setSpendingData({
            amount: json["Total Amount"],
            date: json.date
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
    <div className="relative min-h-screen bg-[#F8F9FA] font-sans pb-10 overflow-hidden">
      
      {/* Top Decorative Orange Shape */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FF6B00] rounded-full z-0" />

      {/* Header Section */}
      <header className="relative z-10 flex justify-between items-center px-6 pt-6">
        <button className="p-3 bg-white rounded-full shadow-md hover:bg-gray-50 transition">
          <ArrowLeft size={24} className="text-[#0056b3]" />
        </button>
        
        {/* Replace with your actual Logo SVG or Image */}
        <div className="flex items-center">
           <span className="text-3xl font-bold italic text-[#0056b3]">i</span>
           <span className="text-3xl font-bold italic text-[#FF6B00]">W</span>
        </div>

        <button className="p-3 bg-white rounded-full shadow-md hover:bg-gray-50 transition">
          <Bell size={24} className="text-gray-600" />
        </button>
      </header>

      <main className="relative z-10 px-6 mt-8 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-[#333] mb-6">My Spendings</h1>

        {/* Main Amount Card */}
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-10 flex flex-col items-center mb-8">
          {/* Illustration Placeholder */}
          <div className="mb-6">
            <img 
              src="https://i.ibb.co/Lz0zX3y/illustration.png" // Mock illustration from your design
              alt="Spending Illustration" 
              className="w-40 h-auto"
            />
          </div>

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

        {/* Filter Section */}
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-[#FF8C00] mb-6">Filter</h2>
          
          <div className="space-y-4">
            <FilterButton label="Filter by workers" />
            <FilterButton label="Filter by date" />
            <FilterButton label="Filter by location" />
          </div>
        </div>
      </main>
    </div>
  );
};

// Reusable Dropdown Component
const FilterButton = ({ label }) => (
  <button className="w-full flex justify-between items-center px-6 py-4 border border-gray-200 rounded-full text-gray-500 hover:bg-gray-50 transition">
    <span className="italic">{label}</span>
    <ChevronDown size={20} className="text-gray-800" />
  </button>
);

export default SpendingDashboard;