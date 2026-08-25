import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone, Apple, ShieldCheck, Lock, Clock, Monitor, Hammer, Calculator, Truck, Activity, Edit3, Star, BadgeCheck, Zap, CalendarCheck, TrendingUp, LifeBuoy, Quote, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import HowItWorks from "../Componants/HowItWorks";
import heroImg from "../assets/hero_img.jpg";
import SignIn_Modal from "../Componants/SignIn_btn";

export default function HomePageNew() {
  const navigate = useNavigate();
  const [isSignInOpen, setIsSignInOpen] = React.useState(false);

  return (
    <div id="home-page">
      {/* Hero Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight mb-6">
              The right worker for every shift — <span className="text-[#E87722]">effortlessly.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              With iyouwork's Flexwork Platform, perfect your staffing for maximum productivity and minimum cost. Free to join as a hirer or worker.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => {
                  if (localStorage.getItem("token")) {
                    navigate("/post-job");
                  } else {
                    setIsSignInOpen(true);
                  }
                }}
                className="bg-[#E87722] hover:bg-[#d6691c] text-white px-6 py-3 rounded-md font-medium transition-colors cursor-pointer"
              >
                Post a gig
              </button>
              <button
                onClick={() => {
                  if (localStorage.getItem("token")) {
                    navigate("/emp-find-work");
                  } else {
                    setIsSignInOpen(true);
                  }
                }}
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative h-80 md:h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200"
          >
            <img src={heroImg} alt="iyouwork professionals" className="object-cover object-top w-full h-full" />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Categories */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Work across every industry</h2>
          <p className="text-gray-600 text-lg max-w-2xl">From hands-on labour to professional services — find the right gig or the right person.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Monitor, color: "bg-blue-50 text-[#185FA5]", title: "IT & Technology", desc: "Developers, support techs, network engineers", gigs: "340+ active gigs" },
            { icon: Hammer, color: "bg-green-50 text-[#3B6D11]", title: "Labour & Trades", desc: "Builders, electricians, plumbers, general labour", gigs: "510+ active gigs" },
            { icon: Calculator, color: "bg-orange-50 text-[#854F0B]", title: "Finance & Accounting", desc: "Bookkeepers, accountants, payroll specialists", gigs: "180+ active gigs" },
            { icon: Truck, color: "bg-red-50 text-[#993C1D]", title: "Logistics & Delivery", desc: "Drivers, warehouse staff, couriers", gigs: "290+ active gigs" },
            { icon: Activity, color: "bg-pink-50 text-[#993556]", title: "Healthcare & Care", desc: "Care assistants, medical support, cleaners", gigs: "220+ active gigs" },
            { icon: Edit3, color: "bg-indigo-50 text-[#534AB7]", title: "Admin & Office", desc: "Receptionists, data entry, PA support", gigs: "160+ active gigs" },
          ].map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              <div className={`${cat.color} p-3 rounded-lg flex-shrink-0`}>
                <cat.icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-1">{cat.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{cat.desc}</p>
                <div className="text-xs font-semibold text-[#1A6FB8]">{cat.gigs}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why iYouWork */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Why thousands choose iyouwork for flexible staffing
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            iyouwork is the UK's flexible staffing platform for the gig economy. Whether you need last-minute cover for a warehouse shift, a weekend event team, or ongoing temp staff — or you're looking for flexible work that fits around your life — we make hiring and getting hired effortless.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: BadgeCheck, title: "Vetted & rated workers", desc: "Every worker verifies their identity, skills and experience before they can apply. Both sides rate each other after each shift, so quality stays high." },
            { icon: Zap, title: "Fill shifts in minutes", desc: "Post a gig and get applications from qualified workers near you — most hirers confirm their pick within the hour, even for same-day cover." },
            { icon: Lock, title: "Secure payments", desc: "All payments run through the platform. Hirers pay only when shifts are completed; workers never chase an invoice again." },
            { icon: CalendarCheck, title: "Total flexibility", desc: "Hire for one shift, a weekend, or an ongoing rota. Workers pick gigs that fit their schedule — no contracts, no commitment." },
            { icon: TrendingUp, title: "Transparent pricing", desc: "Free to join with no subscriptions or monthly fees. See exactly what you'll pay or earn upfront on every gig listing." },
            { icon: LifeBuoy, title: "Real human support", desc: "Questions about a shift or payment? Our UK-based support team is available seven days a week to keep things moving." },
          ].map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="bg-[#E87722]/10 text-[#E87722] w-fit p-3 rounded-lg mb-4">
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { val: "12k+", label: "Registered workers" },
              { val: "4.8★", label: "App Store rating" },
              { val: "3,200+", label: "Gigs completed" },
              { val: "98%", label: "On-time payment" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm"
              >
                <div className="text-3xl font-display font-bold text-[#1A6FB8] mb-1">{stat.val}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">What people are saying about iyouwork</h2>
            <p className="text-gray-600 text-lg mb-3">Real reviews from verified hirers and workers across the UK.</p>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="flex text-[#E87722]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">4.8 out of 5 — from 2,400+ verified reviews</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { initials: "JM", tone: "bg-blue-50 text-[#185FA5]", name: "James M.", role: "Warehouse Manager, Manchester", text: "We filled three last-minute warehouse shifts in under an hour. The app is incredibly simple and the workers showed up exactly as described." },
              { initials: "PS", tone: "bg-green-50 text-[#3B6D11]", name: "Priya S.", role: "IT Support Worker, London", text: "I picked up two IT support gigs in my first week. The pay landed in my account on time, no chasing. Best flex-work platform I've used." },
              { initials: "ST", tone: "bg-pink-50 text-[#993556]", name: "Sarah T.", role: "Events Manager, Birmingham", text: "Finding reliable event staff used to take days of phone calls. Now I post the gig in the morning and my team is confirmed by lunchtime." },
              { initials: "DK", tone: "bg-orange-50 text-[#854F0B]", name: "Daniel K.", role: "Delivery Driver, Leeds", text: "The flexibility is unreal. I choose shifts around my family, see the pay upfront, and every single payment has arrived within a week." },
              { initials: "ER", tone: "bg-indigo-50 text-[#534AB7]", name: "Emma R.", role: "Restaurant Owner, Bristol", text: "Kitchen cover at short notice was always our biggest headache. iyouwork gives us vetted staff who turn up ready to work. It's transformed how we roster." },
              { initials: "TW", tone: "bg-red-50 text-[#993C1D]", name: "Tom W.", role: "Care Assistant, Liverpool", text: "Signing up took ten minutes and I was offered care shifts near me the same day. The ratings mean you only work with good hirers." },
            ].map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#E87722]">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-gray-200" />
                </div>
                <p className="text-gray-700 italic mb-6 flex-grow">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${review.tone} flex items-center justify-center font-bold text-lg`}>{review.initials}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{review.name}</h3>
                    <span className="text-sm text-gray-500">{review.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Frequently asked questions</h2>
            <p className="text-gray-600 text-lg">Everything you need to know about hiring and working with iyouwork.</p>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: "How does iyouwork work?", a: "Hirers post a gig with the role, pay, location and shift times. Vetted workers nearby apply with one tap, the hirer confirms their chosen worker, and payment is handled securely through the platform after the shift is complete." },
              { q: "Is iyouwork free to join?", a: "Yes. iyouwork is completely free to join for both hirers and workers. There are no subscriptions or monthly fees — you only pay for the shifts you fill." },
              { q: "How do workers get paid?", a: "Workers are paid directly into their bank account within 5–7 days of completing a shift. All payments are processed securely through the platform, so there is no chasing invoices." },
              { q: "How quickly can I hire someone through iyouwork?", a: "Most hirers receive applications from qualified workers within minutes of posting a gig, and many shifts are filled the same day — even for last-minute cover." },
              { q: "What industries does iyouwork cover?", a: "iyouwork covers gig work across logistics and warehousing, hospitality and events, healthcare and care, IT and technology, finance and accounting, construction and trades, and office administration." },
              { q: "Are workers vetted before they can apply?", a: "Yes. Workers verify their identity, skills and experience during sign-up, and both hirers and workers rate each other after every shift to keep quality high across the community." },
            ].map((faq, i) => (
              <motion.details
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group bg-gray-50 border border-gray-200 rounded-xl overflow-hidden"
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
        <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6">Ready to get started?</h2>
        <p className="text-xl text-gray-600 mb-10">Join thousands of hirers and workers already using iyouwork. Free to sign up — on web or mobile.</p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => {
              if (localStorage.getItem("token")) {
                navigate("/post-job");
              } else {
                setIsSignInOpen(true);
              }
            }}
            className="bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-md font-medium text-lg transition-colors cursor-pointer"
          >
            Post a gig
          </button>
          <button
            onClick={() => {
              if (localStorage.getItem("token")) {
                navigate("/emp-find-work");
              } else {
                setIsSignInOpen(true);
              }
            }}
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

        <p className="text-sm text-gray-400 max-w-2xl mx-auto mt-10">
          iyouwork — flexible jobs and temp staffing in London, Manchester, Birmingham, Leeds, Bristol, Liverpool and across the UK.
        </p>
      </motion.section>
      <SignIn_Modal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
    </div>
  );
}
