import * as React from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShieldCheck, 
  Clock, 
  Coins,
} from "lucide-react";
import { motion } from "framer-motion";
import aboutContractorSite from "../assets/images/about_contractor_site_1783942242009.jpg";
import aboutMissionTeam from "../assets/images/about_mission_team_1783942260271.jpg";
import aboutVisionLogistics from "../assets/images/about_vision_logistics_1783942278554.jpg";
import aboutTeamCollab from "../assets/images/about_team_collab_1783942298407.jpg";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen text-gray-900 selection:bg-[#1A6FB8]/10 selection:text-[#1A6FB8] font-sans overflow-x-hidden" id="about-page">
      
      {/* SECTION 1: ABOUT HERO SECTION */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Hero Left: Large Vertical Portrait Image */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col space-y-6"
          >
            <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-xl aspect-[3/4] bg-gray-100">
              <img 
                src={aboutContractorSite} 
                alt="iyouwork verified contractor on site" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Hero Right: Corporate Narrative and Bullet Points */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <span className="text-sm font-semibold tracking-wider text-[#E87722]">
              About iyouwork
            </span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 leading-tight tracking-tight">
              Welcome to iyouwork — <span className="text-[#E87722]">Your Local Staffing Partner</span>
            </h1>
            
            <p className="text-base sm:text-lg font-medium text-gray-700 leading-snug">
              Committed to providing our business partners and contractors with ultimate service.
            </p>

            <p className="text-sm text-gray-600 leading-relaxed">
              At iyouwork, our vision is simple: to be the <strong className="text-gray-900 font-semibold">trusted engine</strong> that keeps local businesses and their neighboring communities operating safely, efficiently, and reliably. We are more than just a job board; we are a dedicated local partner providing seamless workforce solutions for everyone.
            </p>

            <div className="pt-2 border-t border-gray-200">
              <h2 className="text-xl font-display font-bold text-gray-900 tracking-tight">
                Our Story and Expertise
              </h2>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                iyouwork was built on the foundation of understanding what local residents and businesses truly need: <strong className="text-gray-900 font-semibold">dependable support, day and night</strong>. Our operations are backed by the successful matching of thousands of shifts, giving us the proven expertise to handle everything from quick hospitality coverage to complex warehouse operations and large-scale event loadouts.
              </p>
            </div>

            <div className="pt-2 space-y-4">
              <h2 className="text-xl font-display font-bold text-gray-900 tracking-tight">
                What Makes Us Different?
              </h2>
              
              <ul className="space-y-3.5 text-sm text-gray-600">
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-semibold">Local Focus:</strong> We focus squarely on local staffing needs, ensuring our services directly support the people and businesses that make your community thrive. Our workers know your industry inside and out.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-semibold">Safety and Efficiency:</strong> Our commitment to compliance ensures every shift is verified, with active criminal background screenings, biometric selfie check-ins, and secure coordinates.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-semibold">Round-the-Clock Matching:</strong> We are <strong className="text-[#1A6FB8] font-bold">Always There When You Need Us</strong>, providing reliable, non-stop fulfillment dispatch 24 hours a day, 7 days a week.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-900 font-semibold">Effortless Booking:</strong> Our highly intuitive mobile layout makes posting and claiming shifts effortless—going from zero to matched in minutes.
                </li>
              </ul>

              <p className="text-sm text-[#1A6FB8] font-medium pt-3 italic">
                We are dedicated to moving our community forward, one safe, efficient, and reliable connection at a time.
              </p>
            </div>
          </motion.div>

        </div>

        {/* METRICS SECTION */}
        <div className="mt-20 pt-10 border-t border-gray-200 max-w-4xl space-y-10" id="platform-metrics-section">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E87722]">Performance Indicators</span>
            <h4 className="text-2xl font-display font-bold text-gray-900 tracking-tight">Platform Trust & Reliability</h4>
            <p className="text-xs text-gray-500">Our real-world operational statistics validated across thousands of localized gig matches.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
            
            {/* Metric 1 */}
            <div className="space-y-3 flex flex-col justify-between">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold text-gray-800 font-display">Fulfillment Rate</span>
                <span className="text-3xl font-display font-extrabold text-[#E87722]">99%</span>
              </div>
              <div className="bg-gray-100 rounded-full h-2 w-full overflow-hidden relative">
                <motion.div 
                  initial={{ width: "0%" }}
                  whileInView={{ width: "99%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="bg-[#E87722] h-full rounded-full"
                />
              </div>
              <div className="flex flex-col space-y-0.5">
                <span className="text-xs font-semibold text-gray-700">Always Covered & Dispatched</span>
                <span className="text-[10px] text-gray-400 font-medium">Industry Standard: 82%</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="space-y-3 flex flex-col justify-between">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold text-gray-800 font-display">Contractor Experience</span>
                <span className="text-3xl font-display font-extrabold text-[#E87722]">100%</span>
              </div>
              <div className="bg-gray-100 rounded-full h-2 w-full overflow-hidden relative">
                <motion.div 
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                  className="bg-[#E87722] h-full rounded-full"
                />
              </div>
              <div className="flex flex-col space-y-0.5">
                <span className="text-xs font-semibold text-gray-700">Pre-Vetted Professionals</span>
                <span className="text-[10px] text-gray-400 font-medium">Background Verification Active</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="space-y-3 flex flex-col justify-between">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold text-gray-800 font-display">Partner Satisfaction</span>
                <span className="text-3xl font-display font-extrabold text-[#E87722]">100%</span>
              </div>
              <div className="bg-gray-100 rounded-full h-2 w-full overflow-hidden relative">
                <motion.div 
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                  className="bg-[#E87722] h-full rounded-full"
                />
              </div>
              <div className="flex flex-col space-y-0.5">
                <span className="text-xs font-semibold text-gray-700">Seamless Client Operations</span>
                <span className="text-[10px] text-gray-400 font-medium">Zero Dispute Record</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: MISSION & VISION CARDS */}
      <section className="bg-gray-50 border-y border-gray-200 py-20 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Mission Card */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-6 md:p-10 border border-gray-200 shadow-sm overflow-hidden hover:border-gray-300 transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 text-left">
                <span className="text-sm font-semibold tracking-wider text-[#1A6FB8]">
                  Facilitating Success
                </span>
                <h3 className="text-2xl font-display font-bold text-gray-900 tracking-tight">
                  Our Mission
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Leveraging our proven expertise and the experience gained from facilitating thousands of matches, we are dedicated to addressing local labor shortages. We actively support communities by ensuring towns, cities, and workplaces move safely and efficiently.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md aspect-[4/3] bg-gray-100">
                  <img 
                    src={aboutMissionTeam} 
                    alt="Our Mission Setup Team" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-6 md:p-10 border border-gray-200 shadow-sm overflow-hidden hover:border-gray-300 transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 order-last lg:order-first">
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md aspect-[4/3] bg-gray-100">
                  <img 
                    src={aboutVisionLogistics} 
                    alt="Our Vision Logistics" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4 text-left">
                <span className="text-sm font-semibold tracking-wider text-[#E87722]">
                  A Better Standard
                </span>
                <h3 className="text-2xl font-display font-bold text-gray-900 tracking-tight">
                  Our Vision
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We believe that great staffing starts with understanding the unique needs of every neighborhood, town, and workplace. Our focus is squarely on the local level, ensuring that our services directly support the people and businesses that make your community thrive.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 3: COLLABORATE / HIRE WITH US */}
      <section className="py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-left space-y-4 max-w-3xl">
          <span className="text-sm font-semibold tracking-wider text-[#E87722]">
            Workforce Solutions
          </span>
          <h2 className="text-3xl font-display font-bold text-gray-900 tracking-tight">
            Collaborate With Us
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Hire with Confidence, Work with Ease. We combine round-the-clock availability and efficient matching with professional service, ensuring your staffing or working journey is always safe, punctual, and comfortable. Your journey starts here.
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-display font-bold text-gray-900 tracking-wide">
            Your Partner for Local Workforce Growth
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Cards List */}
          <div className="lg:col-span-6 space-y-4 text-left">
            
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 flex gap-4 items-start shadow-sm hover:border-gray-300 transition-colors">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#1A6FB8]/10 text-[#1A6FB8] border border-blue-100 flex items-center justify-center font-bold">
                <Clock className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-display font-bold text-gray-900 tracking-wide">
                  Easy & Fast Matching
                </h4>
                <p className="text-sm text-gray-500 leading-normal">
                  Posting or claiming shifts has never been simpler or quicker. Get instant confirmation and priority matches right from your pocket.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 flex gap-4 items-start shadow-sm hover:border-gray-300 transition-colors">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#E87722]/10 text-[#E87722] border border-orange-100 flex items-center justify-center font-bold">
                <Coins className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-display font-bold text-gray-900 tracking-wide">
                  Secure Escrow Payments
                </h4>
                <p className="text-sm text-gray-500 leading-normal">
                  Wages are secured in a digital ledger, safeguarding payments for both sides with automated same-day payouts and 0% worker commission.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 flex gap-4 items-start shadow-sm hover:border-gray-300 transition-colors">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-bold">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-display font-bold text-gray-900 tracking-wide">
                  Compliance Safeguard
                </h4>
                <p className="text-sm text-gray-500 leading-normal">
                  We handle biometric identity checks, credential audits, and 1099 tax paperwork so you can run operations with complete peace of mind.
                </p>
              </div>
            </div>

          </div>

          {/* Right Showcase Image */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-lg aspect-video bg-gray-100">
              <img 
                src={aboutTeamCollab} 
                alt="iyouwork diverse team collaborating" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}
