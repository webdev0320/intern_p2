import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Flexible staffing across the UK, simplified.
          </h1>
          <p className="text-lg text-slate-600 max-w-lg">
            Join the UK's leading platform for flexible work. Find reliable staff in minutes, or discover local shifts that fit your schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200">
              Hire Staff
            </button>
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition duration-200">
              Find Jobs
            </button>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
            alt="Team working"
            className="rounded-2xl shadow-2xl w-full h-auto object-cover"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="font-bold text-slate-900">4.8/5</p>
              <p className="text-xs text-slate-500">from 10,000+ UK reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
