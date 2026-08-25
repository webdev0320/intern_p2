import { motion } from "framer-motion";
import {
  DollarSign,
  Wallet,
  Clock,
  CreditCard,
  Banknote,
  ShieldCheck,
  FileText,
  TrendingUp,
  Landmark,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: Clock, title: "Paid within 5–7 days", desc: "Shift payments are processed automatically. No chasing invoices, no delays." },
  { icon: Wallet, title: "Zero worker fees", desc: "Workers keep 100% of their earnings. No platform commission deducted from your pay." },
  { icon: CreditCard, title: "Direct bank transfer", desc: "Earnings are transferred directly to your linked bank account via Stripe." },
  { icon: ShieldCheck, title: "Secure & encrypted", desc: "All payment data is processed through Stripe with bank-level encryption." },
  { icon: Banknote, title: "Transparent history", desc: "View all past payments, invoices, and earnings in your dashboard." },
  { icon: DollarSign, title: "Instant payouts available", desc: "Need your money faster? Use instant payout for a small fee." },
];

const steps = [
  { num: "01", title: "Complete a shift", desc: "Work your gig and mark it as completed in the app." },
  { num: "02", title: "Hirer confirms", desc: "The hirer confirms the shift was completed successfully." },
  { num: "03", title: "Payment processed", desc: "Stripe processes the payment and initiates the bank transfer." },
  { num: "04", title: "Money in your account", desc: "Funds arrive in your bank account within 5–7 business days." },
];

const setupSteps = [
  { icon: BadgeCheck, title: "Verify your identity", desc: "Confirm your name and address during sign-up — banking rules require this before any payout can be made." },
  { icon: CreditCard, title: "Connect Stripe", desc: "From your profile menu tap 'Connect Stripe' and follow the secure prompts. It takes about five minutes, once only." },
  { icon: Landmark, title: "Add your bank account", desc: "Tell us where your earnings should land. You can change the account anytime from your Stripe dashboard." },
  { icon: TrendingUp, title: "Start earning", desc: "That's everything. From here, completed shifts pay out automatically — nothing to set up per gig." },
];

const tools = [
  { icon: Wallet, title: "Wallet", desc: "See your current balance at a glance and review every credit as it lands, shift by shift." },
  { icon: TrendingUp, title: "My Earnings", desc: "Track what you've earned over time across every gig you've completed on the platform." },
  { icon: FileText, title: "Invoices", desc: "Each completed shift generates an invoice automatically — open one to see exactly what it's for." },
  { icon: Clock, title: "Work History", desc: "A full record of past gigs with dates, hours and hirers. Useful for budgeting and references." },
];

const faqs = [
  {
    q: "When exactly do I get paid?",
    a: "Payments are initiated as soon as your shift is confirmed complete by the hirer, and typically arrive within 5–7 business days depending on your bank.",
  },
  {
    q: "Does iyouwork take a cut of my pay?",
    a: "No. Workers keep 100% of the agreed rate. The hirer pays our 2% service fee separately, on top of what they agreed to pay you.",
  },
  {
    q: "How do I set up my payment details?",
    a: "Open your profile menu, tap 'Connect Stripe' and follow the secure verification steps, including adding the bank account where earnings should be deposited.",
  },
  {
    q: "Can I change my bank account later?",
    a: "Yes. Update your payout account anytime through your connected Stripe profile — all future payments will go to the new account.",
  },
  {
    q: "What happens if there's a dispute about a shift?",
    a: "If a completion is questioned, the case goes to our resolution process where both sides share their side of the story before any outcome is decided.",
  },
  {
    q: "Do I need to create invoices myself?",
    a: "Never. An invoice is generated automatically for every completed shift and saved to your Invoices page for download whenever you need records.",
  },
];

const payExample = [
  { label: "Gig rate you agreed", value: "£100.00" },
  { label: "iyouwork commission", value: "£0.00" },
  { label: "Platform / worker fees", value: "£0.00" },
  { label: "You receive", value: "£100.00" },
];

export default function Payments() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <DollarSign className="h-4 w-4" /> Worker payments
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How you get paid</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
              Fast, reliable, and transparent. Your earnings are processed automatically — no paperwork, no chasing, and never a fee taken from your rate.
            </p>
            <div className="grid grid-cols-3 max-w-lg mx-auto gap-4">
              {[
                { val: "100%", label: "Of your rate, always" },
                { val: "5–7 days", label: "Straight to your bank" },
                { val: "£0", label: "Worker fees" },
              ].map((s) => (
                <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <div className="text-xl md:text-2xl font-extrabold text-green-700">{s.val}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Built to pay workers properly</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Getting paid should be the easiest part of the job. Here's how we make sure it stays that way.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="bg-green-50 text-green-700 p-3 rounded-lg inline-flex mb-4">
                <item.icon className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Payment flow */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Payment flow</h2>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-5 items-start bg-white p-6 rounded-xl border border-gray-200"
              >
                <span className="bg-[#1A6FB8]/10 text-[#1A6FB8] font-bold text-lg px-4 py-2 rounded-full flex-shrink-0">
                  {step.num}
                </span>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">{step.title}</h4>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PayExampleSection />

      <SetupSection />

      <ToolsSection />

      <FaqSection />

      {/* CTA */}
      <section className="py-20 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Start earning today</h2>
        <p className="text-gray-600 mb-8">Sign up, find a gig, and get paid — all within a week.</p>
        <Link to="/signup/worker" className="inline-block bg-[#1A6FB8] hover:bg-[#155a94] text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors no-underline">
          Sign up as a worker
        </Link>
      </section>
    </div>
  );
}

function PayExampleSection() {
  return (
    <section className="py-16 max-w-3xl mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-center mb-4">Where every pound goes</h2>
        <p className="text-gray-600 text-center mb-10">
          No deductions, no surprises. Here's the maths on a £100 shift.
        </p>
        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {payExample.map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center justify-between px-6 py-4 ${i < payExample.length - 1 ? "border-b border-gray-100" : ""} bg-white`}
            >
              <span className={`text-sm ${i === payExample.length - 1 ? "font-bold text-gray-900" : "text-gray-600"}`}>{row.label}</span>
              <span className={`text-sm ${i === payExample.length - 1 ? "font-extrabold text-green-700" : "font-medium text-gray-900"}`}>{row.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function SetupSection() {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Getting set up takes five minutes</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Do this once when you join and every payout after that is automatic.
        </p>
        <div className="grid md:grid-cols-4 gap-6">
          {setupSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="bg-green-50 text-green-700 w-fit p-3 rounded-lg mb-4">
                <step.icon className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolsSection() {
  return (
    <section className="py-16 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-4">Every penny tracked in your app</h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
        Your money is never a mystery — four built-in views keep you in control.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="bg-[#1A6FB8]/10 text-[#1A6FB8] w-fit p-3 rounded-lg mb-4">
              <tool.icon className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">{tool.title}</h4>
            <p className="text-sm text-gray-600">{tool.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="py-16 max-w-3xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Payment questions, answered</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <motion.details
            key={faq.q}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
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
      <p className="text-center text-sm text-gray-400 mt-8">
        Still unsure about something? Our support team answers payment questions seven days a week.
      </p>
    </section>
  );
}
