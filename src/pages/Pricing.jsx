import * as React from "react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Pricing & Fees</h1>
          <p className="mt-4 text-xl text-gray-600">Our flat 8% platform cost breakdown.</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Transparent Value</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            At iyouwork, we believe in simplicity and transparency. For business owners, 
            we charge a flat <strong>8% service fee</strong> on top of confirmed hourly gig wages.
          </p>
          
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">What's included in the 8% fee:</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="mr-3 text-[#1A6FB8] font-bold">✓</span> 
                <div><span className="font-semibold text-gray-900">Secure Payments:</span> Industry-leading transaction protection and rapid fund disbursement.</div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-[#1A6FB8] font-bold">✓</span> 
                <div><span className="font-semibold text-gray-900">Insurance Buffers:</span> Automatic inclusion in our regional workers' liability and bond insurance coverage.</div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-[#1A6FB8] font-bold">✓</span> 
                <div><span className="font-semibold text-gray-900">Premium Vetting:</span> Access to 24/7 continuous identity, license, and background verification systems.</div>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mb-8">
             <h3 className="font-semibold text-blue-900 mb-2">Why 8%?</h3>
             <p className="text-blue-800 text-sm leading-relaxed">
               Unlike legacy agencies that hide margins in inflated hourly rates, our 8% fee is 
               completely transparent. It covers our entire technology and support stack, allowing you 
               to keep worker wages high while lowering your overhead compared to traditional staffing.
             </p>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-4">
            <div className="flex justify-between items-center text-xl font-medium text-gray-900">
              <span>Hourly Gig Wage</span>
              <span className="font-bold">100%</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold text-[#FA822F] mt-3">
              <span>Platform Service Fee</span>
              <span>+8%</span>
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              No hidden setup costs, subscription fees, or cancellation penalties.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
