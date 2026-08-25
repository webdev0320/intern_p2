import * as React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  PoundSterling,
  SlidersHorizontal,
  Zap,
  MessageSquare,
  Star,
  Wallet,
  CalendarCheck,
  Search,
  ChevronDown,
  Quote,
} from "lucide-react";
import SignIn_Modal from "../Componants/SignIn_btn";

const steps = [
  { num: "01", title: "Set your search preferences", desc: "Pick your trade or skill, set a minimum pay rate and choose how far you're willing to travel — up to 50 km from your location." },
  { num: "02", title: "Browse gigs near you", desc: "See every matching shift on an interactive map with pay, hours and distance upfront. No accounts to call, no agencies to visit." },
  { num: "03", title: "Apply with one tap", desc: "Found the right gig? Apply instantly — your profile, skills and ratings go straight to the hirer." },
  { num: "04", title: "Get confirmed & do the shift", desc: "Chat with the hirer if you have questions, get confirmed, then turn up, do the work and check out." },
  { num: "05", title: "Get paid in 5–7 days", desc: "Payment lands directly in your bank account automatically. No invoicing, no chasing — ever." },
];

const searchFeatures = [
  { icon: MapPin, title: "Interactive map search", desc: "Move the pin anywhere to centre your search — perfect for finding work near home, uni or your partner's workplace." },
  { icon: SlidersHorizontal, title: "Distance you control", desc: "Slide your travel radius from right next door up to 50 km away. Only see gigs you'd actually accept." },
  { icon: PoundSterling, title: "Minimum pay rate filter", desc: "Set the lowest rate you'll work for. Gigs below your line never clutter your results." },
  { icon: Briefcase, title: "Matched to your skills", desc: "Filter by your verified trades — warehouse, care, events, IT, admin and more — so results fit what you actually do." },
  { icon: Zap, title: "Pay shown upfront", desc: "Every listing displays the exact rate before you apply. What you see is what you're paid." },
  { icon: MessageSquare, title: "Ask before you commit", desc: "Message the hirer inside the app to check details before accepting — no phone numbers needed." },
];

const testimonials = [
  { name: "Daniel K.", role: "Delivery Driver, Leeds", initials: "DK", tone: "bg-orange-50 text-[#854F0B]", text: "I set my rate at £14/hr and a 15 km radius. Every morning there's fresh work on my map that fits around the school run." },
  { name: "Priya S.", role: "IT Support Worker, London", initials: "PS", tone: "bg-green-50 text-[#3B6D11]", text: "The skill filter means I only see IT gigs. Applied Sunday night, confirmed Monday morning, worked Tuesday." },
  { name: "Tom W.", role: "Care Assistant, Liverpool", initials: "TW", tone: "bg-red-50 text-[#993C1D]", text: "Seeing the pay before I apply changed everything for me. No awkward negotiations — the rate is just there." },
];

const faqs = [
  {
    q: "How do I find gigs near me?",
    a: "Once you've signed up, open Find Work, drop the map pin where it's convenient for you, and filter by distance (up to 50 km), minimum pay rate and your skills. Matching gigs appear instantly.",
  },
  {
    q: "Is it free to apply for gigs?",
    a: "Completely. Signing up, browsing and applying are all free for workers — iyouwork never takes a cut of your earnings.",
  },
  {
    q: "How fast can I start working?",
    a: "Many hirers confirm applicants within minutes, and lots of gigs are same-day or next-day. Complete your profile and verification first to move faster.",
  },
  {
    q: "Do I need experience or qualifications?",
    a: "It depends on the gig. Plenty of roles need no experience at all; specialist roles may ask for certifications, which are checked when you verify your profile.",
  },
  {
    q: "Can I work around my existing job or studies?",
    a: "Yes — that's the point. You only apply to shifts that suit your schedule, and there's no minimum commitment. Work one evening a week or every day.",
  },
];

export default function FindWorkLanding() {
  const navigate = useNavigate();
  const [isSignInOpen, setIsSignInOpen] = React.useState(false);

  const handleFindWork = () => {
    if (localStorage.getItem("token")) {
      navigate("/emp-find-work");
    } else {
      setIsSignInOpen(true);
    }
  };

  return (
    <div id="find-work-page">
      {/* Hero */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-[#E87722]/10 text-[#E87722] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <Briefcase className="h-4 w-4" /> For workers
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight mb-6">
            Find gig work that <span className="text-[#E87722]">fits your life</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Search real shifts near you on a live map, filter by pay, distance and skill, apply in one tap and get paid within 5–7 days. You choose when and where you work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleFindWork}
              className="bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-md font-medium text-lg transition-colors cursor-pointer"
            >
              Find work near me
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">Free forever for workers · Keep 100% of your rate · No CV needed</p>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">How finding work works</h2>
            <p className="text-gray-600 text-lg">From empty profile to paid shift — five simple steps.</p>
          </motion.div>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex gap-5 items-start bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
              >
                <span className="bg-[#E87722]/10 text-[#E87722] font-bold text-lg px-4 py-2 rounded-full flex-shrink-0">{step.num}</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search tools */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Search tools that respect your time</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Finding the right gig shouldn't feel like a part-time job. Our search puts you in control of everything first.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="bg-[#E87722]/10 text-[#E87722] w-fit p-3 rounded-lg mb-4">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits band */}
      <section className="py-14 bg-[#1A6FB8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Wallet, label: "Paid within 5–7 days" },
              { icon: PoundSterling, label: "Keep 100% of your rate" },
              { icon: CalendarCheck, label: "Work when you want" },
              { icon: Star, label: "Ratings build your reputation" },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <item.icon className="h-8 w-8 text-white mx-auto mb-2" />
                <div className="text-sm font-medium text-blue-100">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Workers found their rhythm here</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-[#E87722]">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <Quote className="h-5 w-5 text-gray-200" />
              </div>
              <blockquote className="text-gray-700 italic mb-6">"{t.text}"</blockquote>
              <figcaption className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${t.tone} flex items-center justify-center font-bold text-lg`}>{t.initials}</div>
                <div>
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <span className="text-sm text-gray-500">{t.role}</span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Questions about finding work</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.details
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6">Your next shift is on the map</h2>
        <p className="text-xl text-gray-600 mb-10">Join thousands of UK workers choosing when, where and how much they work.</p>
        <button
          onClick={handleFindWork}
          className="bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-md font-medium text-lg transition-colors cursor-pointer"
        >
          Start browsing gigs
        </button>
      </motion.section>

      <SignIn_Modal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
    </div>
  );
}
