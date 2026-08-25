import { motion } from "framer-motion";
import {
  ShieldCheck,
  Star,
  Zap,
  TrendingUp,
  Award,
  FileCheck,
  UserCheck,
  ClipboardCheck,
  IdCard,
  RefreshCcw,
  ChevronDown,
  BadgeCheck,
  CircleDot,
  Crown,
} from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  { icon: TrendingUp, title: "Access premium rates", desc: "Verified workers earn up to 25% more per shift than unverified profiles." },
  { icon: Zap, title: "Get priority matching", desc: "Your profile is shown first to hirers looking for reliable, vetted workers." },
  { icon: Award, title: "Earn a trust badge", desc: "Display a verified badge on your profile to stand out from other applicants." },
  { icon: Star, title: "Unlock top gigs", desc: "Access exclusive high-paying shifts that require verified workers only." },
];

const levels = [
  {
    icon: CircleDot,
    name: "Basic profile",
    desc: "Signed up with skills and availability added.",
    unlocks: ["Apply for standard gigs", "Set search filters", "Chat with hirers"],
  },
  {
    icon: BadgeCheck,
    name: "ID verified",
    desc: "Identity and right-to-work confirmed.",
    unlocks: ["Verified tick on your profile", "Higher hirer trust", "Faster confirmations"],
    highlight: true,
  },
  {
    icon: Crown,
    name: "Fully verified",
    desc: "Skills, certifications and references approved.",
    unlocks: ["Premium-rate gigs only", "Priority matching", "Up to 25% higher pay", "Exclusive top shifts"],
  },
];

const whatWeVerify = [
  { icon: IdCard, title: "Identity & right to work", desc: "Photo ID and right-to-work documents are checked so hirers can book you with confidence." },
  { icon: ClipboardCheck, title: "Skills assessments", desc: "Short role-specific tests prove you can do the job — warehouse, care, IT, admin and more." },
  { icon: FileCheck, title: "Certifications", desc: "SIA licence, CSCS card, food hygiene certificate or DBS? Upload it, get it validated and displayed on your profile." },
  { icon: UserCheck, title: "References", desc: "Two professional references confirm your work history and reliability before you're badged." },
];

const skillChecks = [
  { sector: "Warehouse & logistics", checks: "Picking & packing accuracy, manual handling awareness" },
  { sector: "Hospitality & events", checks: "Food hygiene basics, service standards, allergen awareness" },
  { sector: "Care", checks: "Duty-of-care scenarios, safeguarding module" },
  { sector: "IT support", checks: "Troubleshooting scenario, ticket-handling etiquette" },
  { sector: "Admin & office", checks: "Data accuracy exercise, phone manner checklist" },
  { sector: "Retail", checks: "POS handling, customer interaction basics" },
];

const comparison = [
  { aspect: "Position in applicant lists", basic: "Standard order", verified: "Shown near the top" },
  { aspect: "Gigs you can apply for", basic: "Standard listings only", verified: "All listings, incl. verified-only premium shifts" },
  { aspect: "Average pay offered", basic: "Base rates from £11/hr", verified: "Around 25% higher on average" },
  { aspect: "Hirer confidence", basic: "Reviews your profile manually", verified: "Books instantly knowing checks passed" },
  { aspect: "Repeat-hire potential", basic: "Builds slowly over shifts", verified: "Starts ahead — badge signals reliability" },
];

const stats = [
  { val: "+25%", label: "Higher average pay" },
  { val: "3x", label: "More gig offers" },
  { val: "92%", label: "Application acceptance" },
  { val: "~48 hrs", label: "Average verification time" },
];

const steps = [
  { num: "01", title: "Submit your documents", desc: "Upload your ID, right-to-work documents and any relevant certifications straight from the app." },
  { num: "02", title: "Complete skill checks", desc: "Pass quick role-specific assessments that prove competency in the work you want." },
  { num: "03", title: "Provide references", desc: "Add two professional references so we can verify your track record." },
  { num: "04", title: "Receive your badge", desc: "Once approved, your profile shows a verified badge and you unlock premium-rate gigs." },
];

const faqs = [
  {
    q: "How much does verification cost?",
    a: "Nothing. Verification is completely free for workers — it's part of how we keep quality high across the platform.",
  },
  {
    q: "How long does verification take?",
    a: "Most workers are verified within about 48 hours of submitting documents and references. You'll get a notification the moment your badge is active.",
  },
  {
    q: "Can I work while waiting for verification?",
    a: "Yes. You can apply for standard gigs immediately, but verified-only and premium-rate listings unlock once your badge is approved.",
  },
  {
    q: "What documents do I need?",
    a: "A photo ID and proof of your right to work in the UK. Certifications like SIA, CSCS or food hygiene are optional but boost your profile for specialist roles.",
  },
  {
    q: "What happens if I fail a skill check?",
    a: "Nothing drastic — you get feedback and can retake most assessments after a short wait. Your account stays active for standard gigs either way.",
  },
  {
    q: "Do I need to re-verify later?",
    a: "Documents occasionally expire. We'll notify you before anything lapses so your badge never disappears unexpectedly.",
  },
  {
    q: "Does verification guarantee me work?",
    a: "It dramatically improves your odds — verified workers get around three times more gig offers — but hirers still choose who they confirm for each shift.",
  },
  {
    q: "Is my personal data safe during verification?",
    a: "Yes. Documents are encrypted, used only for verification purposes, and never shared with hirers — they only ever see your badge status.",
  },
];

export default function GetVerified() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-[#E87722]/10 text-[#E87722] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <ShieldCheck className="h-4 w-4" /> Skill verification
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get verified. Earn more.</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
              Prove your identity, skills and experience once — then stand out to every hirer on iyouwork. Verified workers earn up to 25% more and get three times more offers.
            </p>
            <Link to="/signup/worker" className="inline-block bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-lg font-bold transition-colors no-underline">
              Start verification — it's free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="text-center">
              <div className="text-3xl font-extrabold text-[#1A6FB8]">{s.val}</div>
              <div className="text-sm text-gray-600 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Levels */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Three levels of trust</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Verification isn't all-or-nothing. Climb the ladder at your own pace — every step unlocks more.
        </p>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {levels.map((level, i) => (
            <motion.div
              key={level.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className={`rounded-2xl p-8 flex flex-col ${level.highlight ? "bg-[#1A6FB8] text-white shadow-xl" : "bg-white border border-gray-200"}`}
            >
              <div className={`w-fit p-3 rounded-lg mb-4 ${level.highlight ? "bg-white/10 text-white" : "bg-orange-50 text-[#E87722]"}`}>
                <level.icon className="h-6 w-6" />
              </div>
              <h3 className={`font-bold text-xl mb-1 ${level.highlight ? "text-white" : "text-gray-900"}`}>{level.name}</h3>
              <p className={`text-sm mb-6 ${level.highlight ? "text-blue-100" : "text-gray-500"}`}>{level.desc}</p>
              <ul className="space-y-3 mt-auto">
                {level.unlocks.map((u) => (
                  <li key={u} className={`flex items-start gap-2 text-sm ${level.highlight ? "text-blue-50" : "text-gray-700"}`}>
                    <ShieldCheck className={`h-4 w-4 mt-0.5 flex-shrink-0 ${level.highlight ? "text-blue-200" : "text-green-500"}`} />
                    {u}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Why get verified?</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            A verified profile tells hirers you're serious, checked and ready to work — and they reward that.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-4 items-start bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="bg-orange-50 text-[#E87722] p-3 rounded-lg flex-shrink-0">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What we verify */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">What gets verified</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">Four quick checks turn your profile into a badge hirers trust.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whatWeVerify.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-gray-200 p-6"
            >
              <div className="bg-blue-50 text-[#1A6FB8] w-fit p-3 rounded-lg mb-4">
                <item.icon className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skill checks by sector */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Skill checks by sector</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
            Short, practical assessments — no exams, no trick questions. Here's what's covered.
          </p>
          <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
            {skillChecks.map((row, i) => (
              <div key={row.sector} className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-6 py-4 ${i < skillChecks.length - 1 ? "border-b border-gray-100" : ""}`}>
                <span className="text-sm font-bold text-gray-900 sm:w-52 flex-shrink-0">{row.sector}</span>
                <span className="text-sm text-gray-600">{row.checks}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Basic vs. verified profile</h2>
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">
          <div className="flex bg-gray-50 border-b border-gray-200 font-bold text-sm">
            <span className="flex-1 px-6 py-4"></span>
            <span className="flex-1 px-6 py-4 text-gray-500">Basic profile</span>
            <span className="flex-1 px-6 py-4 text-[#E87722]">Verified</span>
          </div>
          {comparison.map((row, i) => (
            <div key={row.aspect} className={`flex flex-col sm:flex-row ${i < comparison.length - 1 ? "border-b border-gray-100" : ""}`}>
              <span className="flex-1 px-6 pt-4 sm:py-4 text-sm font-bold text-gray-900">{row.aspect}</span>
              <span className="flex-1 px-6 pb-4 sm:py-4 text-sm text-gray-500">{row.basic}</span>
              <span className="flex-1 px-6 pb-4 sm:py-4 text-sm font-medium text-gray-800">{row.verified}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Process */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How to get verified</h2>
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
              <span className="bg-[#E87722]/10 text-[#E87722] font-bold text-lg px-4 py-2 rounded-full flex-shrink-0">{step.num}</span>
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">{step.title}</h4>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Verification questions, answered</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.details
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 font-bold text-gray-900 [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-6 pb-6 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to earn more?</h2>
        <p className="text-gray-600 mb-8">Join thousands of verified workers unlocking premium rates on iyouwork.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/signup/worker" className="inline-block bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors no-underline">
            Sign up and get verified
          </Link>
          <Link to="/workers/payments" className="inline-block border-2 border-gray-300 text-gray-900 hover:bg-gray-50 px-8 py-3 rounded-lg font-bold text-lg transition-colors no-underline">
            See how payouts work
          </Link>
        </div>
        <p className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-8">
          <RefreshCcw className="h-4 w-4" /> Re-verification reminders keep your badge current automatically.
        </p>
      </section>
    </div>
  );
}
