import * as React from "react";
import { Users, Calendar, Shield } from "lucide-react";

export default function WorkerBenefits() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Worker Benefits</h1>
          <p className="mt-4 text-xl text-gray-600">Enjoy scheduling freedom with built-in protections.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Calendar, title: "Total Freedom", desc: "Choose when, where, and how much you work. No minimums." },
            { icon: Shield, title: "Worker Protections", desc: "Backed by regional insurance buffers for your safety." },
            { icon: Users, title: "Community", desc: "Join a growing network of elite on-demand contractors." },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <item.icon className="w-10 h-10 text-[#FA822F] mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why contractors choose iyouwork</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">With thousands of shifts posted daily, you have the flexibility to design a lifestyle that works for you. Whether you're saving for a goal, learning a new trade, or just prefer the freedom of on-demand work, we're here to make it secure, fast, and fair.</p>
            <button className="bg-[#1A6FB8] text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition-colors">Find Your Next Gig</button>
        </div>
      </div>
    </div>
  );
}
