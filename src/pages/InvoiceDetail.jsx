import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const InvoiceDetail = () => {
  const { id } = useParams(); // Retrieves '8' from /invoice-detail/8
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoiceDetail = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/payment/invoice?invoice_id=${id}`);
        const result = await response.json();
        if (result.status === "success!" && result.data.length > 0) {
          setDetail(result.data[0]);
        }
      } catch (error) {
        console.error("Error fetching invoice details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceDetail();
  }, [id, BASE_URL]);

  if (loading) return <div className="p-5 text-center">Loading...</div>;
  if (!detail) return <div className="p-5 text-center">Invoice not found.</div>;

  const isRefund = detail.status === "Refund" || detail.Credit_Id;

  return (
    <div className="bg-white min-h-screen font-sans text-gray-700">
      {/* Orange Header */}
      <div className="bg-orange-500 p-4 pt-8 pb-10 flex items-center relative">
        <button onClick={() => navigate(-1)} className="text-white absolute left-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-white text-xl font-semibold w-full text-center">
          {isRefund ? "Credit Note Details" : "Invoice Details"}
        </h1>
      </div>

      {/* Sub-Header bar */}
      <div className="bg-gray-100 py-3 text-center text-gray-500 font-medium">
        {isRefund ? `Credit Note (${detail.Credit_Id})` : `Invoice (${detail.Invoice_no})`}
      </div>

      <div className="p-6 space-y-4">
        {/* Info Section */}
        <div className="space-y-3">
          <p><span className="font-bold text-gray-600">Date:</span> {new Date(detail.DATETIME).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
          <p><span className="font-bold text-gray-600">Invoice No:</span> {detail.Invoice_no}</p>
          <p><span className="font-bold text-gray-600">Payee Name:</span> {detail.Payee}</p>
        </div>

        {/* Work Details Section */}
        <div className="pt-6 text-center">
          <h2 className="text-gray-500 font-semibold mb-4">Work Details</h2>
          <div className="flex justify-between font-bold border-b border-gray-100 pb-2 mb-2">
            <span>Job Name</span>
            <span className="font-normal text-gray-500">{detail.job_Name}</span>
          </div>
          
          <div className="bg-gray-50 flex justify-between px-2 py-3 font-semibold text-gray-600 text-sm">
            <span>Description</span>
            <span>Amount</span>
          </div>

          <div className="flex justify-between py-4 border-b border-gray-100">
            <span className="text-gray-500">{detail.job_Name}</span>
            <span className="font-bold">£{detail.amount}</span>
          </div>
        </div>

        {/* Totals Section */}
        <div className="space-y-3 pt-4 px-4">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Sub Total</span>
            <span className="font-bold">£{detail.amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Less: Penalty</span>
            <span className="font-bold">£ {detail.Penalty || "0.00"}</span>
          </div>
          <div className="flex justify-between text-lg pt-2">
            <span className="text-gray-500 font-bold">Total</span>
            <span className="font-bold">£{detail.Total}</span>
          </div>
        </div>

        {/* Footer Company Details */}
        <div className="pt-10 space-y-1 text-sm text-gray-400">
          <p className="font-semibold text-gray-500">{detail.Company_Name}</p>
          <p>{detail.Company_Address}</p>
          <p>{detail.Email}</p>
          <p>Registered in England & Wales: {detail.Registeration_no}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;