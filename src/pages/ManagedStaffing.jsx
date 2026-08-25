import { motion } from "framer-motion";
import {
  Building2,
  Wallet,
  ShieldCheck,
  CalendarRange,
  UserCheck,
  Headset,
  ClipboardList,
  TrendingUp,
  Check,
  X,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

const whatWeHandle = [
  { icon: UserCheck, title: "Sourcing & vetting workers", desc: "We maintain a pool of pre-screened, ID-verified workers across every industry so you never start a search from zero." },
  { icon: CalendarRange, title: "Scheduling & shift cover", desc: "Recurring rotas, seasonal peaks and last-minute absences — we keep every shift staffed without you lifting a finger." },
  { icon: Wallet, title: "Payroll & invoicing", desc: "Workers are paid within 5–7 days through the platform. You receive one clear invoice per period with our flat 2% service fee." },
  { icon: ShieldCheck, title: "Compliance & right to work", desc: "Right-to-work checks, DBS screening where required, certification tracking and ongoing monitoring are all handled for you." },
  { icon: TrendingUp, title: "Performance management", desc: "Every shift is rated by both sides. We flag underperformance early so your standards never slip." },
  { icon: Headset, title: "Dedicated support", desc: "A named point of contact who knows your business, your sites and your staffing patterns." },
];

const process = [
  { step: "01", title: "Tell us your workforce needs", desc: "Share your roles, typical shift patterns and locations. We map them against our verified worker pool." },
  { step: "02", title: "We build your talent bench", desc: "Vetted workers matching your requirements are onboarded to your account, ready for deployment." },
  { step: "03", title: "Shifts get filled — automatically", desc: "Gigs go out, applications flow in and shifts are confirmed. Gaps are escalated before they become problems." },
  { step: "04", title: "One invoice, full compliance trail", desc: "You approve timesheets in the app; we handle payroll, invoices, records and audit trails end to end." },
];

const comparison = [
  { feature: "Finding & vetting workers", self: "Your time spent advertising and screening", managed: "Pre-vetted pool, ready to deploy" },
  { feature: "Compliance & right-to-work checks", self: "Handled internally or outsourced", managed: "Continuous monitoring included" },
  { feature: "Payroll & invoicing admin", self: "Manual timesheets and payments", managed: "Automated — one invoice per period" },
  { feature: "Last-minute absence cover", self: "Panic calls and agency premiums", managed: "Backfill from your bench in minutes" },
  { feature: "Cost predictability", self: "Variable agency markups of 15–30%", managed: "Flat 2% service fee, nothing else" },
];

const faqs = [
  {
    q: "What is managed staffing?",
    a: "Managed staffing means we take operational ownership of your flexible workforce — sourcing, vetting, scheduling, payroll and compliance — while you stay in control of who works and when. It's a full outsourcing of temp staffing admin on top of the iyouwork platform.",
  },
  {
    q: "How much does managed staffing cost?",
    a: "There are no setup fees or subscriptions. You pay the same simple pricing as everyone else — a 2% service fee on each completed gig invoice — plus nothing for the managed layer itself.",
  },
  {
    q: "Do I still control who works for me?",
    a: "Yes. You approve every worker profile added to your bench and confirm every booking. We manage the process; you always make the hiring decisions.",
  },
  {
    q: "What size business is it for?",
    a: "It suits any business with recurring flexible needs — from a single site running weekly cleaning rotas to multi-site operations filling dozens of warehouse shifts daily.",
  },
  {
    q: "How quickly can we get started?",
    a: "Most accounts are live within days. Once we understand your roles and locations, we begin matching vetted workers and can fill first shifts the same week.",
  },
];

export default function ManagedStaffing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-[#1A6FB8]/10 text-[#1A6FB8] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Building2 className="h-4 w-4" /> Managed staffing
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Your flexible workforce, fully managed</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
              Hand us the temp staffing headaches — sourcing, vetting, scheduling, payroll and compliance — and focus on running your business. Same platform, same flat 2% fee, none of the admin.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup/hirer" className="inline-block bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors no-underline">
                Talk to us — free to start
              </Link>
              <Link to="/business/pricing" className="inline-block border-2 border-gray-300 text-gray-900 hover:bg-gray-50 px-8 py-3 rounded-lg font-bold text-lg transition-colors no-underline">
                See pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What we handle */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">What we take off your plate</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Everything that makes temporary staffing expensive and stressful becomes our job — not yours.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whatWeHandle.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-50 text-[#1A6FB8] p-3 rounded-lg w-fit mb-4">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How managed staffing works</h2>
          <div className="space-y-6">
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-5 items-start bg-white p-6 rounded-xl border border-gray-200"
              >
                <span className="bg-[#E87722]/10 text-[#E87722] font-bold text-lg px-4 py-2 rounded-full flex-shrink-0">{step.step}</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Self-managed vs. managed with iyouwork</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">Where does your time actually go?</p>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
        >
          <table className="w-full text-left bg-white">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-sm font-bold text-gray-900"></th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500"><ClipboardList className="inline h-4 w-4 mr-1" />Doing it yourself</th>
                <th className="px-6 py-4 text-sm font-bold text-[#E87722]"><Check className="inline h-4 w-4 mr-1" />Managed staffing</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.feature} className="border-b border-gray-100 last:border-0 align-top">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{row.feature}</td>
                  <td className="px-6 py-4 text-sm text-gray-500"><X className="inline h-4 w-4 mr-1 text-gray-300" />{row.self}</td>
                  <td className="px-6 py-4 text-sm text-gray-700"><Check className="inline h-4 w-4 mr-1 text-green-500" />{row.managed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-[#1A6FB8]">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: "100%", label: "Compliance-checked workers" },
            { val: "5–7 days", label: "Guaranteed worker payouts" },
            { val: "2%", label: "Flat fee — managed layer included" },
            { val: "7 days", label: "Support every week" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
              <div className="text-3xl font-extrabold text-white">{s.val}</div>
              <div className="text-sm text-blue-100 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Managed staffing FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.details
              key={faq.q}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
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
        <h2 className="text-3xl font-bold mb-4">Ready to hand over the hard part?</h2>
        <p className="text-gray-600 mb-8">Get a fully managed flexible workforce with zero setup fees and one flat rate.</p>
        <Link to="/signup/hirer" className="inline-block bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors no-underline">
          Get started for free
        </Link>
      </section>
    </div>
  );
}
