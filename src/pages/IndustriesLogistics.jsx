import * as React from "react";
import { Truck, Package, PackageCheck, Repeat } from "lucide-react";

export default function IndustriesLogistics() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Truck className="w-16 h-16 text-[#FA822F] mx-auto mb-6" />
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Logistics & Supply Chain</h1>
          <p className="mt-4 text-xl text-gray-600">High-performance teams optimized for fulfillment, storage, and distribution workflows.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold mb-4">Supply Chain Agility</h3>
            <p className="text-gray-600 leading-relaxed">Optimize your fulfillment center performance with expert on-demand labor for order picking, pallet handling, and warehouse staging workflows. We bring vetted professionals who understand the pace and precision necessary for high-volume logistics environments.</p>
          </div>
          <div className="bg-brand-blue text-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Logistics Focus</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><Package className="w-6 h-6 text-[#FA822F]" /> <span>Order picking and packing services.</span></li>
              <li className="flex items-start gap-3"><PackageCheck className="w-6 h-6 text-[#FA822F]" /> <span>Warehouse staging and inventory handling.</span></li>
              <li className="flex items-start gap-3"><Repeat className="w-6 h-6 text-[#FA822F]" /> <span>Fast, scalable team mobilization.</span></li>
            </ul>
          </div>
        </div>

        <div className="text-center">
            <button className="bg-gray-900 text-white px-10 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors">Book Logistics Support</button>
        </div>
      </div>
    </div>
  );
}
