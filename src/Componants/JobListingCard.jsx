import React from 'react';

const JobListingCard = ({ title, location, pay, type, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 transition-all duration-300 hover:shadow-md hover:scale-[1.02] w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-slate-900">{title}</h3>
        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xs text-slate-400">Logo</div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-full text-sm text-slate-600">
          📍 {location}
        </span>
        <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-sm font-medium">
          💷 {pay}
        </span>
        <span className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-full text-sm text-slate-600">
          {type}
        </span>
      </div>
      <p className="text-slate-600 text-sm mb-6 leading-relaxed">{description}</p>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2.5 transition duration-200">
        Apply Now
      </button>
    </div>
  );
};

export default JobListingCard;
