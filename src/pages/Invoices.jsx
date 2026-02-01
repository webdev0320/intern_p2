import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/payment/invoices?empr_id=${userId}`);
        const result = await response.json();
        if (result.status === "success!") {
          // Reversing to match the design (Refunds usually appear at the top in your screenshot)
          setInvoices(result.data.reverse());
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) return <div className="p-5 text-center">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-4 font-sans">
      {/* Header Section */}
      <div className="flex items-center mb-6">
        <button className="p-2 bg-white rounded-full shadow-sm mr-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-800">My Invoices</h1>
      </div>

      {/* Invoice List */}
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div 
            key={invoice.Invoice_Id} 
            onClick={() => navigate(`/invoice-detail/${invoice.Invoice_Id}`)}
            className="bg-white rounded-2xl p-4 flex items-center justify-between border border-gray-100 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              {/* Logo Placeholder (matching the blue/purple circle in your design) */}
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                 <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-800 rounded-full"></div>
              </div>
              
              <span className="text-lg font-semibold text-gray-700">
                {invoice.Company_Name}
              </span>
            </div>

            <div className="text-right">
              <span className={`text-lg font-bold ${
                invoice.status.includes('Refund') ? 'text-orange-500' : 'text-orange-500'
              }`}>
                {invoice.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invoices;