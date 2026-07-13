import * as React from "react";
import { DollarSign, Clock, CreditCard } from "lucide-react";

export default function WorkerPayments() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">How You Get Paid</h1>
          <p className="mt-4 text-xl text-gray-600">Fast, transparent, and fair payouts for your hard work.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: Clock, title: "Same-Day Payouts", desc: "Get paid within 12-24 hours after shift completion." },
            { icon: DollarSign, title: "Zero Fees", desc: "The rate you see is the rate you keep. No hidden deductions." },
            { icon: CreditCard, title: "Direct Deposit", desc: "Funds transferred securely to your connected banking wallet." },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <item.icon className="w-12 h-12 text-[#1A6FB8] mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Workflow</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#1A6FB8] text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h4 className="font-semibold text-gray-900">Finish Your Shift</h4>
                <p className="text-gray-600 text-sm">Check out on-site via the iyouwork app to signal completion.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#1A6FB8] text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h4 className="font-semibold text-gray-900">Instant Processing</h4>
                <p className="text-gray-600 text-sm">Business owner confirms the gig, triggering immediate payment initiation.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#1A6FB8] text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h4 className="font-semibold text-gray-900">Wallet Deposit</h4>
                <p className="text-gray-600 text-sm">See your earnings appear in your secure digital wallet within hours.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900">Are there taxes deducted?</h4>
              <p className="text-gray-600 text-sm">We provide 1099-NEC forms for tax purposes if eligible, but we do not automatically withhold taxes from your payouts. Please consult a tax professional.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">What if a payout is delayed?</h4>
              <p className="text-gray-600 text-sm">Most payouts are instant. If delayed, please check that your connected bank account information is accurate and fully verified in your wallet settings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
