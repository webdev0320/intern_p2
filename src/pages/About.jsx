import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Scale,
  Eye,
  Zap,
  HeartHandshake,
  Briefcase,
  Users,
  Percent,
  ShieldCheck,
  MapPin,
  ArrowRight,
} from "lucide-react";
import logo from "../assets/logo_p2.png";

const values = [
  { icon: Scale, title: "Fairness", desc: "Workers keep 100% of their agreed rate and hirers pay no hidden margins. One flat 2% fee, visible to everyone." },
  { icon: Eye, title: "Transparency", desc: "Pay shown upfront, ratings on both sides, invoices generated automatically — nothing happens behind closed doors." },
  { icon: Zap, title: "Speed", desc: "Gigs posted in minutes, applications in minutes more. Staffing problems get solved the same day, not the same month." },
  { icon: HeartHandshake, title: "Community", desc: "Every completed shift builds reputation for both sides. Trust compounds — and everyone benefits from it." },
];

const milestones = [
  { year: "2016", text: "Our founder asks a simple question: why can't finding work be as easy as finding a taxi?" },
  { year: "2020", text: "A global pandemic proves how fragile traditional employment is — and how much the UK needs flexible work." },
  { year: "Today", text: "12,000+ registered workers and thousands of businesses staff shifts across the UK through iyouwork." },
];

const stats = [
  { val: "12k+", label: "Registered workers" },
  { val: "3,200+", label: "Gigs completed" },
  { val: "4.8★", label: "Average app rating" },
  { val: "98%", label: "On-time payments" },
];

const audiences = [
  {
    icon: Briefcase,
    title: "For hirers",
    desc: "Post gigs in minutes, review verified applicants, manage shifts, chat, approve timesheets and pay — all from one dashboard.",
    links: [
      { label: "See how posting works", path: "/post-a-gig" },
      { label: "Hirer dashboard features", path: "/business/hirer-dashboard" },
      { label: "Managed staffing", path: "/business/managed-staffing" },
    ],
  },
  {
    icon: Users,
    title: "For workers",
    desc: "Search gigs near you by pay, distance and skill. Apply in one tap, work when it suits you and keep every penny of your rate.",
    links: [
      { label: "How finding work works", path: "/workers/find-work" },
      { label: "Worker benefits", path: "/workers/overview" },
      { label: "How you get paid", path: "/workers/payments" },
    ],
  },
];

const differentiators = [
  { icon: Percent, title: "Flat 2% fee", desc: "No packages or subscriptions — the fairest pricing model in UK flexible staffing." },
  { icon: ShieldCheck, title: "Vetted on both sides", desc: "ID checks for workers, verification for hirers, and two-way ratings after every shift." },
  { icon: MapPin, title: "Truly local", desc: "Map-based matching means work and workers come from your area, not a call centre's spreadsheet." },
];

const faqs = [
  {
    q: "Who is iyouwork for?",
    a: "Anyone who needs flexibility. Businesses use iyouwork to fill shifts quickly with vetted people; workers use it to find paid gigs that fit around their lives — with no fees taken from their earnings.",
  },
  {
    q: "Which industries do you cover?",
    a: "Logistics and warehousing, hospitality and events, care, construction and trades, IT and tech, finance, and office administration — across London, Manchester, Birmingham, Leeds, Bristol, Liverpool and beyond.",
  },
  {
    q: "How does iyouwork make money?",
    a: "We charge hirers a flat 2% service fee on each completed gig invoice. Workers never pay anything, and there are no subscriptions for anyone.",
  },
  {
    q: "Where is iyouwork based?",
    a: "We're a UK company, headquartered in London, supporting hirers and workers across the whole country seven days a week.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center mb-6">
              <img src={logo} alt="iyouwork logo" className="h-14 w-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">About iyouwork</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              We're building a fairer, faster way for the UK to work. iyouwork connects businesses that need cover with vetted local people who want flexible work — in minutes, not weeks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Our story</h2>
        <div className="space-y-5">
          <p className="text-gray-600 leading-relaxed">
            In 2016, our founder watched uncertainty ripple through the UK jobs market and asked a deceptively simple question: what if finding work could be as quick and effortless as ordering almost anything else in your life?
          </p>
          <p className="text-gray-600 leading-relaxed">
            The idea matured through another shock — a global pandemic that showed exactly how fragile traditional employment can be, and how many people need work that bends around real life rather than breaking under it. Instead of discouraging us, it strengthened the mission.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Today, iyouwork bridges the gap between two groups who need each other: businesses that need reliable people for real shifts, and workers who want fair pay on schedules they control. Not enough work opportunities nearby? Connect with iyouwork. Not enough hands to get the job done? Connect with iyouwork.
          </p>
        </div>

        {/* Milestones */}
        <div className="mt-10 space-y-4">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-5 items-start bg-gray-50 border border-gray-200 rounded-xl p-6"
            >
              <span className="bg-[#E87722]/10 text-[#E87722] font-bold px-4 py-2 rounded-full flex-shrink-0">{m.year}</span>
              <p className="text-gray-600">{m.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-[#1A6FB8]">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
              <div className="text-3xl font-extrabold text-white">{s.val}</div>
              <div className="text-sm text-blue-100 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Aim */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Our aim</h2>
        <div className="space-y-5">
          <p className="text-gray-600 leading-relaxed">
            We exist to connect the right businesses with the right workers at the right time — and to widen access to work while doing it. That means encouraging hiring from every age group and background, bringing opportunities to local communities, and proving that flexible work can be fair work.
          </p>
          <p className="text-gray-600 leading-relaxed">
            For businesses, we take the pain out of cash-flow-heavy staffing: bring in extra people only when demand exists, and pay only for shifts actually worked. For workers, we offer dignity through transparency — rates you can see before you apply, payments that arrive when promised, and a rating system where your professionalism is your currency.
          </p>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 gap-6 mt-10">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white border border-gray-200 rounded-2xl p-6"
            >
              <div className="bg-[#E87722]/10 text-[#E87722] w-fit p-3 rounded-lg mb-4">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Two audiences */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">One platform, two sides</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">Everything we build serves both halves of the marketplace equally.</p>
          <div className="grid md:grid-cols-2 gap-8">
            {audiences.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-8"
              >
                <div className={`${i === 0 ? "bg-orange-50 text-[#E87722]" : "bg-blue-50 text-[#1A6FB8]"} w-fit p-3 rounded-lg mb-4`}>
                  <a.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">{a.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{a.desc}</p>
                <ul className="space-y-2">
                  {a.links.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path} className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A6FB8] hover:text-[#E87722] transition-colors no-underline">
                        {link.label} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">What makes iyouwork different</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
            >
              <d.icon className="h-6 w-6 text-[#1A6FB8] mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">{d.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h2 className="text-3xl font-bold text-center mb-10">About iyouwork — quick answers</h2>
          {faqs.map((faq, i) => (
            <details key={faq.q} className="group bg-white rounded-xl border border-gray-200 overflow-hidden">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 font-bold text-gray-900 [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span className="text-gray-400 group-open:hidden text-xl leading-none">+</span>
              </summary>
              <p className="px-6 pb-6 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Be part of the future of flexible work</h2>
        <p className="text-gray-600 mb-8">Join thousands of hirers and workers already building better weeks with iyouwork.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/signup/hirer" className="inline-block bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors no-underline">
            Hire staff
          </Link>
          <Link to="/signup/worker" className="inline-block bg-[#1A6FB8] hover:bg-[#155a94] text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors no-underline">
            Find work
          </Link>
        </div>
      </section>
    </div>
  );
}
