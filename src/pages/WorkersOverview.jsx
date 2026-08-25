import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Wallet,
  Shield,
  Smartphone,
  MapPin,
  Star,
  MessageSquare,
  HeartHandshake,
  Bell,
  ChevronDown,
  Lock,
  Scale,
  EyeOff,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: Calendar, title: "Flexible scheduling", desc: "Choose shifts that fit your life — mornings, evenings, weekends or the odd spare evening. No minimum hours, ever." },
  { icon: Wallet, title: "Fair pay, on time", desc: "See the rate before you apply and keep 100% of it. Payments land in your bank within 5–7 days, automatically." },
  { icon: Shield, title: "Worker protections", desc: "ID-verified hirers, clear gig descriptions, a resolution centre for disputes and fair-treatment policies across the platform." },
  { icon: Smartphone, title: "Everything in your pocket", desc: "Find gigs, chat with hirers, track earnings and manage shifts entirely from your phone or any browser." },
  { icon: MapPin, title: "Local opportunities", desc: "Set your travel radius up to 50 km and only see work that's genuinely within reach of home." },
  { icon: Star, title: "Ratings that work for you", desc: "Every completed shift builds your reputation. Strong ratings unlock better-paid, repeat offers from hirers who trust you." },
  { icon: MessageSquare, title: "Direct messaging", desc: "Ask questions before accepting a booking and coordinate on the day — no phone numbers exchanged." },
  { icon: HeartHandshake, title: "Build a following", desc: "Hirers can follow great workers. Grow a fanbase that gets first notification whenever you're available." },
  { icon: Bell, title: "Instant gig alerts", desc: "Turn on notifications and be among the first to apply when new shifts matching your skills are posted nearby." },
];

const earnings = [
  { sector: "General labour", range: "£11–14/hr", note: "Warehouse picking, packing, events setup" },
  { sector: "Care & support", range: "£12–17/hr", note: "Care assistant shifts, domiciliary support" },
  { sector: "Hospitality", range: "£11–16/hr", note: "Kitchen porter, barista, waiting staff" },
  { sector: "Driving & delivery", range: "£13–19/hr", note: "Courier runs, van driving, multi-drop" },
  { sector: "Skilled trades", range: "£15–25/hr", note: "Electrician's mate, carpentry, decorating" },
  { sector: "IT & tech", range: "£15–45/hr", note: "Helpdesk, support techs, developers" },
];

const protections = [
  { icon: UserCheck, title: "ID-checked hirers only", desc: "Every business is verified before it can post a gig, so you always know who you're working for." },
  { icon: Wallet, title: "Payment protection", desc: "Funds are handled through Stripe and released against completed work — if a shift isn't worked, you're not out of pocket." },
  { icon: Scale, title: "Resolution centre", desc: "Disagreements are rare, but when they happen a neutral process reviews both sides before any outcome." },
  { icon: Lock, title: "Your data stays yours", desc: "Personal documents are encrypted and never shared with hirers. Contact details stay private until you both agree." },
  { icon: EyeOff, title: "Block unwanted contacts", desc: "You can block any hirer from seeing or contacting you with one tap — no questions asked." },
  { icon: Star, title: "Two-way ratings", desc: "Rate hirers honestly after each shift. Your feedback shapes who stays on the platform." },
];

const weekExample = [
  { day: "Monday", plan: "No work — notifications off. You don't owe anyone availability." },
  { day: "Tuesday evening", plan: "2-hour barista shift near home at £12/hr, found via map search." },
  { day: "Wednesday", plan: "Day job or study. Gig alerts pile up silently for later." },
  { day: "Thursday", plan: "Warehouse pick day at £13/hr — 8 hours, paid travel radius of 20 km." },
  { day: "Friday", plan: "Off again. Rate the hirer from Thursday, check earnings so far." },
  { day: "Weekend", plan: "Event crew Saturday night at premium rate; Sunday completely free." },
];

const comparison = [
  { aspect: "Pay visibility", agency: "Negotiated case by case", iyouwork: "Exact rate shown before you apply" },
  { aspect: "Your cut", agency: "Agency margin often hidden in rates", iyouwork: "100% of the advertised rate" },
  { aspect: "Getting paid", agency: "Weekly timesheets, variable delays", iyouwork: "Automatic within 5–7 days" },
  { aspect: "Choosing shifts", agency: "Told what's available", iyouwork: "Browse, filter and apply on your terms" },
  { aspect: "Commitment", agency: "Availability expectations", iyouwork: "None — work one shift or fifty" },
];

const stats = [
  { val: "12k+", label: "Registered workers" },
  { val: "£0", label: "Fees for workers" },
  { val: "5–7 days", label: "Payment guarantee" },
  { val: "4.8★", label: "Worker app rating" },
];

const steps = [
  { num: "01", title: "Create your profile", desc: "Sign up free in about two minutes. Add your skills, experience and availability." },
  { num: "02", title: "Get verified (optional)", desc: "Verify your ID and skills to unlock premium gigs and stand out to every hirer." },
  { num: "03", title: "Browse & apply", desc: "Search gigs near you by pay, distance and skill. Apply with one tap." },
  { num: "04", title: "Work & earn", desc: "Complete your shift, build your ratings and get paid within 5–7 days." },
];

const testimonials = [
  { name: "Daniel K.", role: "Delivery Driver, Leeds", initials: "DK", tone: "bg-orange-50 text-[#854F0B]", text: "The flexibility is unreal. I choose shifts around my family and every payment has arrived on time." },
  { name: "Priya S.", role: "IT Support Worker, London", initials: "PS", tone: "bg-green-50 text-[#3B6D11]", text: "I picked up two IT gigs in my first week. Best flex-work platform I've used — no fees eating my rate." },
  { name: "Tom W.", role: "Care Assistant, Liverpool", initials: "TW", tone: "bg-red-50 text-[#993C1D]", text: "Signing up took ten minutes and I was offered care shifts near me the same day. The ratings mean you only work with good hirers." },
];

const industries = [
  { label: "Logistics & Delivery", path: "/business/industries/logistics" },
  { label: "Labour & Trades", path: "/business/industries/labour" },
  { label: "IT & Technology", path: "/business/industries/it" },
  { label: "Finance & Accounting", path: "/business/industries/finance" },
  { label: "Healthcare & Care", path: "/workers/find-work" },
  { label: "Hospitality & Events", path: "/workers/find-work" },
  { label: "Admin & Office", path: "/workers/find-work" },
];

const faqs = [
  {
    q: "Is iyouwork really free for workers?",
    a: "Yes — completely. Signing up, applying, chatting with hirers and getting paid are all free. iyouwork never takes a percentage of your earnings.",
  },
  {
    q: "How much can I earn?",
    a: "It depends on your trade and availability. Typical rates range from £11/hr for general labour to £45/hr for specialist IT roles, and verified workers average around 25% more.",
  },
  {
    q: "Am I tied into minimum hours?",
    a: "Never. Work one shift a month or five a week — there are no minimum commitments and no penalties for taking time off.",
  },
  {
    q: "What protections do I have?",
    a: "Every hirer is ID-verified, payments are handled securely through Stripe, disputes go to our resolution centre, and both sides rate each other after every shift.",
  },
  {
    q: "Can this fit around another job or studies?",
    a: "Absolutely — most of our workers use iyouwork alongside other commitments. You only apply for shifts that suit your schedule.",
  },
  {
    q: "How do taxes work?",
    a: "As with any gig income, what you earn may be taxable depending on your overall circumstances. Your Work History and Invoices pages give you clean records for self-assessment.",
  },
  {
    q: "What if I need to cancel a shift I accepted?",
    a: "Life happens. Cancel as early as possible through the app so the hirer can rebook — repeated last-minute cancellations can affect your rating.",
  },
  {
    q: "Do I need previous experience?",
    a: "For many roles, no. Plenty of gigs are entry-level. Specialist roles list required certifications clearly before you apply.",
  },
];

export default function WorkersOverview() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-[#1A6FB8]/10 text-[#1A6FB8] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Users className="h-4 w-4" /> For workers
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Work on your terms</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Flexible gig work that fits around your life — fair pay upfront, zero worker fees, real protections and an app built around you.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to="/signup/worker" className="inline-block bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors no-underline">
                Sign up for free
              </Link>
              <Link to="/workers/find-work" className="inline-block border-2 border-gray-300 text-gray-900 hover:bg-gray-50 px-8 py-3 rounded-lg font-bold text-lg transition-colors no-underline">
                Browse gigs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="text-center">
              <div className="text-3xl font-extrabold text-[#1A6FB8]">{s.val}</div>
              <div className="text-sm text-gray-600 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Why workers love iyouwork</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">We built this platform for you. Here's what you get when you join.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-50 text-[#1A6FB8] p-3 rounded-lg inline-flex mb-4">
                <item.icon className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Earnings */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">What could you earn?</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">Typical rate ranges across the sectors hiring on iyouwork right now.</p>
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
            {earnings.map((row, i) => (
              <div key={row.sector} className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-6 py-4 ${i < earnings.length - 1 ? "border-b border-gray-100" : ""}`}>
                <span className="text-sm font-bold text-gray-900 sm:w-44 flex-shrink-0">{row.sector}</span>
                <span className="text-sm font-extrabold text-[#E87722] sm:w-28 flex-shrink-0">{row.range}</span>
                <span className="text-sm text-gray-500">{row.note}</span>
              </div>
            ))}
          </motion.div>
          <p className="text-xs text-gray-400 text-center mt-4">Rates vary by location, shift time and demand. Verified workers typically earn around 25% more.</p>
        </div>
      </section>

      {/* Protections */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Protections that actually protect</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Flexibility shouldn't mean vulnerability. Six safeguards come as standard for every worker.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {protections.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="bg-green-50 text-green-700 w-fit p-3 rounded-lg mb-4">
                <item.icon className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Week example */}
      <section className="py-16 bg-[#1A6FB8]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-4">What "your terms" actually looks like</h2>
          <p className="text-blue-100 text-center mb-10">One worker's week on iyouwork — built entirely from choices they made.</p>
          <div className="space-y-3">
            {weekExample.map((row, i) => (
              <motion.div key={row.day} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }} className="flex gap-4 items-start bg-white/10 rounded-xl px-6 py-4">
                <span className="text-sm font-bold text-white sm:w-40 flex-shrink-0">{row.day}</span>
                <span className="text-sm text-blue-50">{row.plan}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Agency work vs. iyouwork</h2>
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">
          <div className="flex bg-gray-50 border-b border-gray-200 font-bold text-sm">
            <span className="flex-1 px-6 py-4"></span>
            <span className="flex-1 px-6 py-4 text-gray-500">Traditional agency</span>
            <span className="flex-1 px-6 py-4 text-[#E87722]">iyouwork</span>
          </div>
          {comparison.map((row, i) => (
            <div key={row.aspect} className={`flex flex-col sm:flex-row ${i < comparison.length - 1 ? "border-b border-gray-100" : ""}`}>
              <span className="flex-1 px-6 pt-4 sm:py-4 text-sm font-bold text-gray-900">{row.aspect}</span>
              <span className="flex-1 px-6 pb-4 sm:py-4 text-sm text-gray-500">{row.agency}</span>
              <span className="flex-1 px-6 pb-4 sm:py-4 text-sm font-medium text-gray-800">{row.iyouwork}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
            >
              <div className="flex text-[#E87722] mb-4">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 italic mb-6">"{t.text}"</blockquote>
              <figcaption className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${t.tone} flex items-center justify-center font-bold`}>{t.initials}</div>
                <div>
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <span className="text-sm text-gray-500">{t.role}</span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Find work in your industry</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">Thousands of active gigs across seven sectors — explore what's on offer.</p>
        <div className="flex flex-wrap justify-center gap-3">
          {industries.map((ind, i) => (
            <motion.span key={ind.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}>
              <Link to={ind.path} className="inline-block bg-white border border-gray-200 px-5 py-2.5 rounded-full text-sm font-medium text-gray-700 hover:border-[#1A6FB8] hover:text-[#1A6FB8] transition-colors no-underline">
                {ind.label}
              </Link>
            </motion.span>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Getting started is easy</h2>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-5 items-start bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
              >
                <span className="bg-[#1A6FB8]/10 text-[#1A6FB8] font-bold text-lg px-4 py-2 rounded-full flex-shrink-0">{step.num}</span>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">{step.title}</h4>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Worker FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.details
              key={faq.q}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 font-bold text-gray-900 [&::-webkit-details-marker]:hidden">
                {faq.q}
                <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-6 pb-6 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
            </motion.details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to start earning?</h2>
        <p className="text-gray-600 mb-8">Join 12,000+ workers already finding flexible work on iyouwork.</p>
        <Link to="/signup/worker" className="inline-block bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors no-underline">
          Create your account
        </Link>
      </section>
    </div>
  );
}
