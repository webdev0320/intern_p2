import * as React from "react";
import { Wrench, CheckCircle, Clock, Shield } from "lucide-react";

export default function IndustriesLabour() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Wrench className="w-16 h-16 text-[#FA822F] mx-auto mb-6" />
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Labour & Trades</h1>
          <p className="mt-4 text-xl text-gray-600">Reliable, skilled crews ready to deploy for warehouse, production, and site setup.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold mb-4">On-Demand Expertise</h3>
            <p className="text-gray-600 leading-relaxed">Whether you need a specialized warehouse team to meet a shipping deadline or general production crew for facility maintenance, our marketplace connects you with vetted, local talent ready to deploy. We ensure quality and speed so your operations don't miss a beat.</p>
          </div>
          <div className="bg-brand-blue text-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Why Partner With Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><CheckCircle className="w-6 h-6 text-[#FA822F]" /> <span>Vetted talent pool ready for quick deployment.</span></li>
              <li className="flex items-start gap-3"><Clock className="w-6 h-6 text-[#FA822F]" /> <span>Flexible shift scheduling for peak productivity.</span></li>
              <li className="flex items-start gap-3"><Shield className="w-6 h-6 text-[#FA822F]" /> <span>Compliance and safety-focused recruitment.</span></li>
            </ul>
          </div>
        </div>

        <div className="text-center">
            <button className="bg-gray-900 text-white px-10 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors">Request a Labour Crew</button>
        </div>
      </div>
    </div>
  );
}
