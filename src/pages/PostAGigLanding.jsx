import * as React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  DollarSign,
  CalendarClock,
  MapPin,
  Users,
  BadgeCheck,
  FileText,
  Zap,
  ShieldCheck,
  TrendingUp,
  Clock,
  Star,
  ChevronDown,
} from "lucide-react";
import SignIn_Modal from "../Componants/SignIn_btn";

const listingDetails = [
  { icon: FileText, title: "Role & description", desc: "Name the job and add a short description so workers know exactly what to expect." },
  { icon: DollarSign, title: "Pay rate", desc: "Set an hourly or fixed rate. Workers see the pay upfront — no negotiation needed." },
  { icon: CalendarClock, title: "Date & shift times", desc: "Pick the date, start time and end time, whether it's a single evening or a full week." },
  { icon: MapPin, title: "Location", desc: "Drop a pin or enter the address so workers nearby can find your gig instantly." },
  { icon: Users, title: "Number of workers", desc: "Need one person or a whole crew? Set how many workers the gig requires." },
  { icon: BadgeCheck, title: "Skills & requirements", desc: "Add any must-have skills, certifications, dress code or equipment requirements." },
];

const faqs = [
  { q: "How long does it take to post a gig?", a: "Most hirers complete a gig listing in under three minutes. Fill in the pay rate, date, times, location and number of workers — that's all you need to go live." },
  { q: "How quickly will I get applications?", a: "Your gig is pushed instantly to verified workers near your location who match the role and availability. Most hirers receive their first application within minutes." },
  { q: "What does it cost to post a gig?", a: "Posting is free — you only pay a 2% service fee on shifts that are actually completed. No subscriptions, no monthly minimums, no hidden charges." },
  { q: "Can I edit or cancel a gig after posting?", a: "Yes. You can update details like times, pay or worker count at any point before a gig starts, as long as no confirmed shift is affected." },
  { q: "Who are the workers applying to my gigs?", a: "Every worker on iyouwork verifies their identity and experience during sign-up. You can review each applicant's profile, skills and ratings from previous gigs before you confirm." },
];

export default function PostAGigLanding() {
  const navigate = useNavigate();
  const [isSignInOpen, setIsSignInOpen] = React.useState(false);

  const handlePostGig = () => {
    if (localStorage.getItem("token")) {
      navigate("/post-job");
    } else {
      setIsSignInOpen(true);
    }
  };

  return (
    <div id="post-a-gig-page">
      <HeroSection onPostGig={handlePostGig} />
      <StepsSection onPostGig={handlePostGig} />
      <ListingDetailsSection />
      <StatsBand />
      <BenefitsSection />
      <HirerVoices />
      <FaqSection />
      <FinalCta onPostGig={handlePostGig} />
      <SignIn_Modal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
    </div>
  );
}

function HeroSection({ onPostGig }) {
  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 bg-[#E87722]/10 text-[#E87722] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          <Sparkles className="h-4 w-4" /> For hirers &amp; businesses
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight mb-6">
          Post a gig in minutes. <span className="text-[#E87722]">Fill it in hours.</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Skip the agencies and job boards. Describe the shift once, and iyouwork instantly matches it with vetted workers near you — for one evening or every week.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={onPostGig}
            className="bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-md font-medium text-lg transition-colors cursor-pointer"
          >
            Post a gig now
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-4">Free to post · No subscription · Only pay when a shift is filled</p>
      </motion.div>
    </section>
  );
}

function StepsSection({ onPostGig }) {
  const steps = [
    { num: "01", title: "Describe your gig", desc: "Enter the role, pay rate, date, shift times, location and how many workers you need. Takes about three minutes." },
    { num: "02", title: "Review applicants", desc: "Verified workers near you apply instantly. Compare profiles, skills and ratings from past gigs in one place." },
    { num: "03", title: "Confirm & relax", desc: "Confirm your pick and track attendance on the day. Payment is handled automatically through the platform." },
  ];

  return (
    <section className="py-20 bg-gray-50 border-y border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Posting a gig couldn't be easier</h2>
          <p className="text-gray-600 text-lg">Three steps between you and a fully staffed shift.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm"
            >
              <span className="bg-[#E87722]/10 text-[#E87722] font-bold text-lg inline-block px-4 py-2 rounded-full mb-5">{step.num}</span>
              <h3 className="font-bold text-gray-900 text-xl mb-2">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <button
            onClick={onPostGig}
            className="bg-[#1A6FB8] hover:bg-[#155f9f] text-white px-8 py-3 rounded-md font-medium transition-colors cursor-pointer"
          >
            Try it — post your first gig free
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function ListingDetailsSection() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 lg:sticky lg:top-28"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Everything a great gig listing needs</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            The more detail you add, the faster your gig gets filled. Our smart form guides you through each field — nothing technical, nothing complicated.
          </p>
          <ul className="space-y-3">
            {["Guided form with helpful prompts", "Save favourite locations for reuse", "Duplicate past gigs in one tap"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                <BadgeCheck className="h-5 w-5 text-[#E87722] flex-shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {listingDetails.map((detail, i) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="bg-[#E87722]/10 text-[#E87722] w-fit p-3 rounded-lg mb-4">
                <detail.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1.5">{detail.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{detail.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  const stats = [
    { val: "~3 min", label: "Average time to create a listing" },
    { val: "< 12 min", label: "Typical time to first application" },
    { val: "92%", label: "Of gigs filled within 24 hours" },
    { val: "2%", label: "Service fee — no other costs" },
  ];

  return (
    <section className="py-16 bg-[#1A6FB8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">{stat.val}</div>
              <div className="text-sm text-blue-100">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    { icon: Zap, title: "Instant matching", desc: "Your gig is pushed straight to qualified, available workers near your location — no waiting for job boards to rank you." },
    { icon: ShieldCheck, title: "Only vetted applicants", desc: "Every applicant has passed ID verification. Check ratings from previous hirers before confirming anyone." },
    { icon: Clock, title: "Last-minute friendly", desc: "Need cover for tonight? Many gigs posted same-day are still filled within a few hours." },
    { icon: TrendingUp, title: "Scale up anytime", desc: "From one extra pair of hands to a recurring weekly rota — post once and let the platform do the legwork." },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Why hirers post their gigs on iyouwork</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Whether it's warehouse cover, event staff, care support or office admin — posting a gig is the fastest way to keep your business running.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {benefits.map((benefit, i) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-white border border-gray-200 rounded-2xl p-8 flex items-start gap-5 hover:shadow-md transition-shadow"
          >
            <div className="bg-[#E87722]/10 text-[#E87722] w-fit p-3 rounded-lg flex-shrink-0">
              <benefit.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1.5">{benefit.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{benefit.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function HirerVoices() {
  const quotes = [
    { name: "James M.", role: "Warehouse Manager, Manchester", initials: "JM", tone: "bg-blue-50 text-[#185FA5]", text: "I posted a Friday-night pallet shift at 9am and had four verified applicants by 9:15. Confirmed two and never opened a spreadsheet." },
    { name: "Emma R.", role: "Restaurant Owner, Bristol", initials: "ER", tone: "bg-indigo-50 text-[#534AB7]", text: "Posting takes me less time than making a phone call to one agency — and I get a whole shortlist instead of one option." },
    { name: "Sarah T.", role: "Events Manager, Birmingham", initials: "ST", tone: "bg-pink-50 text-[#993556]", text: "For a 12-person setup crew I just duplicated last month's gig, changed the date, and it filled itself overnight." },
  ];

  return (
    <section className="py-20 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Hirers who post gigs here, stay here</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex text-[#E87722]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">4.8 average hirer rating</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((quote, i) => (
            <motion.figure
              key={quote.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
            >
              <blockquote className="text-gray-700 italic mb-6">"{quote.text}"</blockquote>
              <figcaption className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${quote.tone} flex items-center justify-center font-bold text-lg`}>{quote.initials}</div>
                <div>
                  <div className="font-bold text-gray-900">{quote.name}</div>
                  <span className="text-sm text-gray-500">{quote.role}</span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Questions about posting a gig</h2>
        <p className="text-gray-600 text-lg">Everything hirers usually ask before their first listing.</p>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
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
    </section>
  );
}

function FinalCta({ onPostGig }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-gray-50 border-t border-gray-100 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6">Your next great hire is three minutes away</h2>
      <p className="text-xl text-gray-600 mb-10">Create your first gig listing today — free to post, and you only ever pay for shifts you fill.</p>
      <button
        onClick={onPostGig}
        className="bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-md font-medium text-lg transition-colors cursor-pointer"
      >
        Post a gig now
      </button>
    </motion.section>
  );
}
