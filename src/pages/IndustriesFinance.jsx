import * as React from "react";
import { Coins, BookOpen, BarChart, FileCheck } from "lucide-react";

export default function IndustriesFinance() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Coins className="w-16 h-16 text-[#FA822F] mx-auto mb-6" />
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Finance & Accounts</h1>
          <p className="mt-4 text-xl text-gray-600">Efficient, reliable support for financial transactions and accounting operations.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold mb-4">Operational Consistency</h3>
            <p className="text-gray-600 leading-relaxed">Ensure your operational throughput remains consistent with on-demand support for transactional processing, retail cashier services, and basic account bookkeeping tasks. We provide vetted contractors who understand the precision required in financial environments.</p>
          </div>
          <div className="bg-brand-blue text-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Finance Support Focus</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><BookOpen className="w-6 h-6 text-[#FA822F]" /> <span>Basic bookkeeping and account reconciliation.</span></li>
              <li className="flex items-start gap-3"><BarChart className="w-6 h-6 text-[#FA822F]" /> <span>Retail and transactional processing support.</span></li>
              <li className="flex items-start gap-3"><FileCheck className="w-6 h-6 text-[#FA822F]" /> <span>Reliable, trust-verified financial contractors.</span></li>
            </ul>
          </div>
        </div>

        <div className="text-center">
            <button className="bg-gray-900 text-white px-10 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors">Find Finance Support</button>
        </div>
      </div>
    </div>
  );
}
