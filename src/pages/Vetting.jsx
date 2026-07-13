import * as React from "react";

export default function VettingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Managed Staffing</h1>
          <p className="mt-4 text-xl text-gray-600">Learn how we handle payroll & compliance.</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payroll & Compliance Simplified</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            At iyouwork, we take the administrative burden off your plate. Our platform 
            handles the complexities of contractor management, ensuring you remain compliant 
            while focusing on your core business operations.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">Payroll Processing</h3>
              <p className="text-gray-600 text-sm mb-4">Automated payouts, tax form generation (1099-NEC), and instant confirmation of work completion.</p>
              <div className="text-xs text-[#1A6FB8] font-medium uppercase tracking-wider">Secure & Instant</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">Compliance & Vetting</h3>
              <p className="text-gray-600 text-sm mb-4">Continuous background checks, identity verification, and regional license validation for every contractor.</p>
              <div className="text-xs text-[#FA822F] font-medium uppercase tracking-wider">Always Monitored</div>
            </div>
          </div>
          
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
            <h3 className="font-semibold text-indigo-900 mb-3">The iyouwork Difference</h3>
            <p className="text-indigo-800 text-sm leading-relaxed">
              Beyond standard checks, our continuous monitoring ensures that credentials remain valid throughout 
              the lifecycle of every professional partnership. If a certification expires, our system 
              automatically pauses shift eligibility until the contractor updates their documents, 
              giving you peace of mind 24/7.
            </p>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-8 text-center">
             <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors">
               Start Hiring Securely
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
