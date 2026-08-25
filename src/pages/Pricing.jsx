import { motion } from "framer-motion";
import { Check, DollarSign, Calculator, ShieldCheck, Clock, FileText, Headphones, Users, Star, Percent } from "lucide-react";
import { Link } from "react-router-dom";

const included = [
  { icon: FileText, title: "Unlimited gig posting", desc: "Post as many gigs as you need. There's no charge to list a shift and no cap on how many you publish." },
  { icon: Users, title: "Worker vetting & compliance", desc: "ID verification, right-to-work checks and reference screening are all covered by the platform." },
  { icon: Calculator, title: "Automated invoicing", desc: "Invoices are generated and reconciled automatically after each completed shift — no admin for you." },
  { icon: ShieldCheck, title: "Secure payments", desc: "Payments are processed through the platform. Workers are paid within 5–7 days, automatically." },
  { icon: Star, title: "Ratings & reviews", desc: "Rate every hirer and worker after each shift to keep quality high across the community." },
  { icon: Headphones, title: "Seven-day support", desc: "Our UK-based support team is available every day of the week for both hirers and workers." },
];

const examples = [
  { shift: "One evening barista shift (£60)", workerGets: "£60.00", fee: "£1.20" },
  { shift: "Weekend warehouse crew (4 × £90)", workerGets: "£360.00", fee: "£7.20" },
  { shift: "Month of weekly cleaning shifts (4 × £120)", workerGets: "£480.00", fee: "£9.60" },
];

const faqs = [
  {
    q: "How does the 2% service fee work?",
    a: "When a worker completes a gig, we add a 2% service fee on top of the agreed rate. For example, on a £100 shift you'd pay £100 to the worker and £2 to iyouwork — a total of £102.",
  },
  {
    q: "Is it really free to post a gig?",
    a: "Yes. Creating an account, posting gigs and receiving applications are all completely free. You only ever pay the 2% fee when a shift is actually completed.",
  },
  {
    q: "Do workers pay any fees?",
    a: "No. Workers keep 100% of their agreed rate. The service fee is paid by the hirer, so workers always receive exactly what was advertised on the gig.",
  },
  {
    q: "Are there any hidden fees?",
    a: "None. Payment processing, worker vetting, compliance checks, invoicing and support are all included in the single 2% service fee. No subscriptions, no monthly minimums, no setup costs.",
  },
  {
    q: "When am I charged?",
    a: "You're only charged after a worker completes their shift and the invoice is generated. There's nothing to pay upfront and nothing to pay for unfilled or cancelled gigs.",
  },
  {
    q: "What happens if a worker doesn't show up?",
    a: "If a shift isn't worked, you aren't charged. Our ratings system and same-day rebooking make no-shows rare — but if it happens, you simply don't pay for that gig.",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-[#E87722]/10 text-[#E87722] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Percent className="h-4 w-4" /> Simple, transparent pricing
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">No packages. No plans. Just one small fee.</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
              Hiring through iyouwork costs exactly <strong>2%</strong> per completed gig — and everything else is free. No subscriptions, no monthly fees, no tiers to compare.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex flex-col items-center bg-white border-2 border-[#E87722]/30 rounded-3xl px-12 py-10 shadow-lg"
            >
              <span className="text-7xl font-extrabold text-[#E87722] leading-none">2%</span>
              <span className="text-gray-700 font-medium mt-3">service fee per completed gig invoice</span>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-5 text-sm text-gray-500">
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-green-500" /> Free to join</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-green-500" /> Free to post</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-green-500" /> Free for workers</span>
              </div>
              <Link
                to="/signup/hirer"
                className="mt-8 inline-block bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-lg font-bold transition-colors no-underline"
              >
                Start hiring — free
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Paying only makes sense when work gets done</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Traditional staffing agencies take 15–30% markups before a single hour is worked. With iyouwork, our interests stay aligned with yours: a flat 2%, charged only on shifts that actually happen.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { num: "01", title: "Post your gig for £0", desc: "List the role, pay rate, date and location. It's completely free and takes about three minutes." },
            { num: "02", title: "Hire who you like", desc: "Review applications from vetted workers and confirm your pick. Still nothing to pay." },
            { num: "03", title: "Pay 2% after completion", desc: "Once the shift is done, the worker is paid their full rate and we add our 2% service fee. That's it." },
          ].map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-8"
            >
              <span className="bg-[#E87722]/10 text-[#E87722] font-bold inline-block px-4 py-2 rounded-full mb-5">{step.num}</span>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Examples */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">What 2% looks like in practice</h2>
          <p className="text-gray-600 text-center mb-10">Real numbers — the worker always receives their full rate.</p>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
          >
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-white">
                  <th className="px-6 py-4 text-sm font-bold text-gray-900">Example hire</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-900">Workers receive</th>
                  <th className="px-6 py-4 text-sm font-bold text-[#E87722]">Our 2% fee</th>
                </tr>
              </thead>
              <tbody>
                {examples.map((row) => (
                  <tr key={row.shift} className="border-b border-gray-100 last:border-0">
                    <td className="px-6 py-4 text-sm text-gray-700">{row.shift}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{row.workerGets}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#E87722]">{row.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Everything included in the 2%</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          One small fee covers the entire platform — there are no add-ons to buy and no features locked behind upgrades.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {included.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <item.icon className="h-8 w-8 text-[#1A6FB8] mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workers free section */}
      <section className="py-16 bg-[#1A6FB8]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <DollarSign className="h-10 w-10 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Free for workers. Always.</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Workers never pay anything on iyouwork — no cut of earnings, no withdrawal fees, no premium memberships. You agree a rate, complete the shift, and 100% of it lands in your bank within 5–7 days.
            </p>
            <Link
              to="/signup/worker"
              className="mt-8 inline-block bg-white text-[#1A6FB8] hover:bg-blue-50 px-8 py-3 rounded-lg font-bold transition-colors no-underline"
            >
              Join as a worker
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently asked questions</h2>
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
                <span className="text-gray-400 group-open:hidden text-xl leading-none">+</span>
              </summary>
              <p className="px-6 pb-6 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
            </motion.details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to hire smarter?</h2>
        <p className="text-gray-600 mb-8">Create a free account today — you'll only ever pay 2% when a shift is completed.</p>
        <Link to="/signup/hirer" className="inline-block bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors no-underline">
          Create free account
        </Link>
      </section>
    </div>
  );
}
