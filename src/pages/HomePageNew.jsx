import React, { useState } from 'react';
import { 
  MapPin, 
  CreditCard, 
  Briefcase, 
  TrendingUp, 
  Building2, 
  User 
} from 'lucide-react';

// --- Sub-Components (Internal for now) ---

const JobCard = ({ role, location, pay, type, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
    <h3 className="font-bold text-lg text-slate-900 mb-3">{role}</h3>
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="flex items-center gap-1 text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
        <MapPin size={14} /> {location}
      </span>
      <span className="flex items-center gap-1 text-sm font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-md">
        <CreditCard size={14} /> {pay}
      </span>
      <span className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{type}</span>
    </div>
    <p className="text-slate-600 text-sm mb-4">{description}</p>
    <button className="w-full text-blue-600 border border-blue-600 hover:bg-blue-50 py-2 rounded-lg font-medium transition">
      Apply Now
    </button>
  </div>
);

// --- Main Page Component ---

const HomePageNew = () => {
  const [activeTab, setActiveTab] = useState('business');

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">


      {/* 1. Hero Section */}
      <section className="px-8 py-16 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Flexible staffing across the UK, simplified.
          </h1>
          <p className="text-xl text-slate-600">
            Join the UK’s leading platform for flexible work. Find reliable staff in minutes, or discover local shifts that fit your schedule—from London to Manchester.
          </p>
          <div className="flex gap-4 pt-4">
            <button className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition">Hire Staff Today</button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition">Find Local Shifts</button>
          </div>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" alt="Team" className="rounded-3xl shadow-2xl" />
          <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
            <span className="text-3xl">⭐</span>
            <div>
              <p className="font-bold text-lg">4.8/5</p>
              <p className="text-slate-500 text-sm">from 10,000+ UK reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Banner */}
      <section className="bg-slate-50 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-center text-3xl font-bold mb-12">Trusted by thousands of businesses nationwide.</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: 'Registered UK Workers', val: '150,000+' },
              { label: 'Hiring Companies', val: '5,000+' },
              { label: 'Shift Fulfillment', val: '98%' },
              { label: 'Wages Paid This Year', val: '£15m+' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-3xl font-extrabold text-blue-600 mb-2">{stat.val}</p>
                <p className="text-slate-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="py-20 max-w-4xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-10">How it works</h2>
        <div className="flex justify-center gap-4 mb-12">
          <button onClick={() => setActiveTab('business')} className={`px-6 py-2 rounded-full font-semibold ${activeTab === 'business' ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}>For Businesses</button>
          <button onClick={() => setActiveTab('worker')} className={`px-6 py-2 rounded-full font-semibold ${activeTab === 'worker' ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}>For Workers</button>
        </div>
        
        {activeTab === 'business' ? (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-center">Fill your rotas instantly without the agency fees.</h3>
            {['Post your shifts.', 'Review matches.', 'Hire and manage.'].map((step, i) => (
              <div key={i} className="flex gap-4 items-start bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <span className="bg-orange-100 text-orange-600 font-bold px-4 py-2 rounded-full">0{i+1}</span>
                <p className="text-lg pt-1"><strong className="text-blue-700">{step}</strong> Description here...</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-center">Work when you want, where you want.</h3>
            {['Build your profile.', 'Browse and apply.', 'Get paid weekly.'].map((step, i) => (
              <div key={i} className="flex gap-4 items-start bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <span className="bg-blue-100 text-blue-600 font-bold px-4 py-2 rounded-full">0{i+1}</span>
                <p className="text-lg pt-1"><strong className="text-blue-700">{step}</strong> Description here...</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Industries */}
      <section className="py-20 bg-white max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold mb-4">Opportunities across every major sector.</h2>
        <p className="text-lg text-slate-600 mb-12 max-w-2xl">Whether you need extra hands for a busy weekend or want to pick up a side hustle, we cover the UK's biggest industries.</p>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: 'Hospitality', icon: <Briefcase /> },
            { title: 'Retail', icon: <TrendingUp /> },
            { title: 'Logistics', icon: <Building2 /> },
            { title: 'Admin', icon: <User /> },
          ].map((ind, i) => (
            <div key={i} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition">
              <div className="text-blue-600 mb-4">{ind.icon}</div>
              <h4 className="font-bold text-xl mb-2">{ind.title}</h4>
              <p className="text-sm text-slate-500">Roles: Bartenders, Sales Assistants, Drivers...</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Featured Shifts */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold mb-12">Hot shifts available right now</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <JobCard role="Experienced Bartender" location="Central London" pay="£13.50 / hr" type="Flexible Shift" description="Fast-paced cocktail bar looking for experienced staff." />
            <JobCard role="Warehouse Operative" location="Birmingham" pay="£11.44 / hr" type="Fixed Term" description="Urgent cover needed for a busy distribution centre." />
            <JobCard role="Event Steward" location="Manchester Arena" pay="£12.00 / hr" type="Weekend Shift" description="Crowd management and ticket scanning for a festival." />
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900 text-white p-10 rounded-3xl">
          <p className="text-lg mb-6">"Since switching from traditional temp agencies, we've cut our staffing costs by 20% and always have reliable cover for busy weekends."</p>
          <p className="font-bold">— Sarah T., Area Manager (London)</p>
        </div>
        <div className="bg-orange-100 text-slate-900 p-10 rounded-3xl">
          <p className="text-lg mb-6">"I use the app to pick up extra shifts around my university timetable. The weekly pay is a lifesaver, and it's so easy to use."</p>
          <p className="font-bold">— James M., Student (Leeds)</p>
        </div>
      </section>

      {/* 7. Dual CTA */}
      <section className="flex flex-col md:flex-row">
        <div className="flex-1 bg-blue-700 text-white p-16 text-center">
          <h3 className="text-3xl font-bold mb-4">Looking for flexible work?</h3>
          <p className="mb-8 opacity-90">Take control of your schedule. Sign up today and start earning.</p>
          <button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-bold">Download the App</button>
        </div>
        <div className="flex-1 bg-orange-500 text-white p-16 text-center">
          <h3 className="text-3xl font-bold mb-4">Need staff urgently?</h3>
          <p className="mb-8 opacity-90">Don't let staff shortages slow you down. Post a shift in minutes.</p>
          <button className="bg-white text-orange-500 px-8 py-3 rounded-lg font-bold">Create Company Account</button>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="bg-slate-50 py-16 px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div><h4 className="font-bold mb-4">For Workers</h4><ul className="space-y-2 text-slate-600 text-sm"><li>Browse Jobs</li><li>Worker FAQs</li></ul></div>
          <div><h4 className="font-bold mb-4">For Businesses</h4><ul className="space-y-2 text-slate-600 text-sm"><li>Post a Job</li><li>Pricing</li></ul></div>
          <div><h4 className="font-bold mb-4">Company</h4><ul className="space-y-2 text-slate-600 text-sm"><li>About Us</li><li>Careers</li></ul></div>
          <div className="text-sm text-slate-500 mt-auto">© 2026 iyouwork UK Ltd. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default HomePageNew;
