import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone, Apple, ShieldCheck, Lock, Clock, Monitor, Hammer, Calculator, Truck, Activity, Edit3, Star } from "lucide-react";
import HowItWorks from "../Componants/HowItWorks";
import iyouworkWorkersHero from "../assets/images/iyouwork_workers_hero_1783942223712.jpg";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div id="home-page">
      {/* Hero Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight mb-6">
              The right worker for every shift — <span className="text-[#E87722]">effortlessly.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              With iyouwork's Flexwork Platform, perfect your staffing for maximum productivity and minimum cost. Free to join as a hirer or worker.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <button 
                onClick={() => navigate("/signin")}
                className="bg-[#E87722] hover:bg-[#d6691c] text-white px-6 py-3 rounded-md font-medium transition-colors cursor-pointer"
              >
                Post a gig
              </button>
              <button 
                onClick={() => navigate("/signin")}
                className="bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 px-6 py-3 rounded-md font-medium transition-colors cursor-pointer"
              >
                Find work
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-md text-sm text-gray-600">
                <Smartphone className="h-4 w-4" /> Google Play
              </div>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-md text-sm text-gray-600">
                <Apple className="h-4 w-4" /> App Store
              </div>
            </div>

            <div className="flex flex-wrap gap-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <ShieldCheck className="h-5 w-5 text-[#E87722]" /> Free to join
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Lock className="h-5 w-5 text-[#E87722]" /> Secure payments
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Clock className="h-5 w-5 text-[#E87722]" /> Paid in 5–7 days
              </div>
            </div>
          </div>
          <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
             <img src={iyouworkWorkersHero} alt="iyouwork professionals" className="object-cover w-full h-full" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Categories */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Work across every industry</h2>
          <p className="text-gray-600 text-lg max-w-2xl">From hands-on labour to professional services — find the right gig or the right person.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="bg-blue-50 text-[#185FA5] p-3 rounded-lg flex-shrink-0">
              <Monitor className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-1">IT & Technology</h4>
              <p className="text-sm text-gray-600 mb-2">Developers, support techs, network engineers</p>
              <div className="text-xs font-semibold text-[#1A6FB8]">340+ active gigs</div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="bg-green-50 text-[#3B6D11] p-3 rounded-lg flex-shrink-0">
              <Hammer className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-1">Labour & Trades</h4>
              <p className="text-sm text-gray-600 mb-2">Builders, electricians, plumbers, general labour</p>
              <div className="text-xs font-semibold text-[#1A6FB8]">510+ active gigs</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="bg-orange-50 text-[#854F0B] p-3 rounded-lg flex-shrink-0">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-1">Finance & Accounting</h4>
              <p className="text-sm text-gray-600 mb-2">Bookkeepers, accountants, payroll specialists</p>
              <div className="text-xs font-semibold text-[#1A6FB8]">180+ active gigs</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="bg-red-50 text-[#993C1D] p-3 rounded-lg flex-shrink-0">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-1">Logistics & Delivery</h4>
              <p className="text-sm text-gray-600 mb-2">Drivers, warehouse staff, couriers</p>
              <div className="text-xs font-semibold text-[#1A6FB8]">290+ active gigs</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="bg-pink-50 text-[#993556] p-3 rounded-lg flex-shrink-0">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-1">Healthcare & Care</h4>
              <p className="text-sm text-gray-600 mb-2">Care assistants, medical support, cleaners</p>
              <div className="text-xs font-semibold text-[#1A6FB8]">220+ active gigs</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="bg-indigo-50 text-[#534AB7] p-3 rounded-lg flex-shrink-0">
              <Edit3 className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-1">Admin & Office</h4>
              <p className="text-sm text-gray-600 mb-2">Receptionists, data entry, PA support</p>
              <div className="text-xs font-semibold text-[#1A6FB8]">160+ active gigs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm">
              <div className="text-3xl font-display font-bold text-[#1A6FB8] mb-1">12k+</div>
              <div className="text-sm text-gray-600">Registered workers</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm">
              <div className="text-3xl font-display font-bold text-[#1A6FB8] mb-1">4.8<span className="text-xl">★</span></div>
              <div className="text-sm text-gray-600">App Store rating</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm">
              <div className="text-3xl font-display font-bold text-[#1A6FB8] mb-1">3,200+</div>
              <div className="text-sm text-gray-600">Gigs completed</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm">
              <div className="text-3xl font-display font-bold text-[#1A6FB8] mb-1">98%</div>
              <div className="text-sm text-gray-600">On-time payment</div>
            </div>
          </div>

          <div className="text-center md:text-left mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">What people are saying</h2>
            <p className="text-gray-600 text-lg">Real hirers and workers across the UK.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="flex text-[#E87722] mb-4">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="text-gray-700 italic mb-6 text-lg">"We filled three last-minute warehouse shifts in under an hour. The app is incredibly simple and the workers showed up exactly as described."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#185FA5] flex items-center justify-center font-bold text-lg">JM</div>
                <div>
                  <h5 className="font-bold text-gray-900">James M.</h5>
                  <span className="text-sm text-gray-500">Warehouse Manager, Manchester</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="flex text-[#E87722] mb-4">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="text-gray-700 italic mb-6 text-lg">"I picked up two IT support gigs in my first week. The pay landed in my account on time, no chasing. Best flex-work platform I've used."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-50 text-[#3B6D11] flex items-center justify-center font-bold text-lg">PS</div>
                <div>
                  <h5 className="font-bold text-gray-900">Priya S.</h5>
                  <span className="text-sm text-gray-500">IT Support Worker, London</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6">Ready to get started?</h2>
        <p className="text-xl text-gray-600 mb-10">Join thousands of hirers and workers already using iyouwork. Free to sign up — on web or mobile.</p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            onClick={() => navigate("/signin")}
            className="bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-md font-medium text-lg transition-colors cursor-pointer"
          >
            Post a gig
          </button>
          <button 
            onClick={() => navigate("/signin")}
            className="bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 px-8 py-3 rounded-md font-medium text-lg transition-colors cursor-pointer"
          >
            Find work near me
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="flex items-center gap-3 bg-white border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
            <Smartphone className="h-8 w-8 text-[#1A6FB8]" />
            <div className="text-left">
              <div className="text-xs text-gray-500">Get it on</div>
              <div className="text-sm font-bold text-gray-900">Google Play</div>
            </div>
          </button>
          <button className="flex items-center gap-3 bg-white border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
            <Apple className="h-8 w-8 text-gray-900" />
            <div className="text-left">
              <div className="text-xs text-gray-500">Download on the</div>
              <div className="text-sm font-bold text-gray-900">App Store</div>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}

