import * as React from "react";
import { Cpu, Zap, Server, ShieldCheck } from "lucide-react";

export default function IndustriesIT() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Cpu className="w-16 h-16 text-[#FA822F] mx-auto mb-6" />
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">IT & Tech Support</h1>
          <p className="mt-4 text-xl text-gray-600">Skilled contractors for technical infrastructure, support, and specialized IT initiatives.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold mb-4">Technical Agility</h3>
            <p className="text-gray-600 leading-relaxed">From network setup assistance to hardware deployment and technical helpdesk support, our verified IT contractors provide the agility your business needs to stay operational. Scale your IT team up or down based on your current project requirements.</p>
          </div>
          <div className="bg-brand-blue text-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Core Tech Capabilities</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><Zap className="w-6 h-6 text-[#FA822F]" /> <span>Hardware deployment and network configuration.</span></li>
              <li className="flex items-start gap-3"><Server className="w-6 h-6 text-[#FA822F]" /> <span>Scalable helpdesk and technical support.</span></li>
              <li className="flex items-start gap-3"><ShieldCheck className="w-6 h-6 text-[#FA822F]" /> <span>Secure, vetted IT talent for sensitive environments.</span></li>
            </ul>
          </div>
        </div>

        <div className="text-center">
            <button className="bg-gray-900 text-white px-10 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors">Book IT Support</button>
        </div>
      </div>
    </div>
  );
}
