import * as React from "react";
import { ShieldCheck, UserCheck, Star } from "lucide-react";

export default function WorkerVerification() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Skill Verification</h1>
          <p className="mt-4 text-xl text-gray-600">Get verified to unlock higher rates and premium gigs.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Why get verified?</h2>
                <ul className="space-y-4 text-gray-700">
                    <li className="flex gap-3">
                        <Star className="w-6 h-6 text-[#FA822F]" />
                        <span>Unlock exclusive premium-paying gigs.</span>
                    </li>
                    <li className="flex gap-3">
                        <ShieldCheck className="w-6 h-6 text-[#FA822F]" />
                        <span>Build trust faster with business owners.</span>
                    </li>
                    <li className="flex gap-3">
                        <UserCheck className="w-6 h-6 text-[#FA822F]" />
                        <span>Stand out in search results with a verified badge.</span>
                    </li>
                </ul>
            </div>
            <div className="bg-[#1A6FB8] text-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                <p className="text-blue-100 mb-6">To earn your badge, ensure your profile is complete:</p>
                <ul className="space-y-2 list-disc list-inside text-blue-50">
                    <li>Valid government-issued ID</li>
                    <li>Completed safety screening</li>
                    <li>At least 1 shift with 4.8+ rating</li>
                    <li>Valid local professional licenses</li>
                </ul>
            </div>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Verification Process</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                    <div className="w-12 h-12 bg-[#FA822F] text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl">1</div>
                    <h4 className="font-semibold text-gray-900">Submit Docs</h4>
                    <p className="text-gray-600 text-xs">Upload your ID and professional licenses.</p>
                </div>
                <div className="text-center">
                    <div className="w-12 h-12 bg-[#FA822F] text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl">2</div>
                    <h4 className="font-semibold text-gray-900">Screening</h4>
                    <p className="text-gray-600 text-xs">Our team reviews your submission for accuracy.</p>
                </div>
                <div className="text-center">
                    <div className="w-12 h-12 bg-[#FA822F] text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl">3</div>
                    <h4 className="font-semibold text-gray-900">Get Verified</h4>
                    <p className="text-gray-600 text-xs">Receive your badge and premium access.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
