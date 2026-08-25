import * as React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FilePlus2,
  Users,
  Star,
  MessageSquare,
  ClipboardCheck,
  ReceiptText,
  Wallet,
  HeartHandshake,
  Bell,
  MapPin,
  ChevronDown,
} from "lucide-react";
import SignIn_Modal from "../Componants/SignIn_btn";

const features = [
  { icon: LayoutDashboard, title: "At-a-glance dashboard", desc: "Your rating, total feedback and company profile live on one home screen, so you always know how your business looks to workers." },
  { icon: FilePlus2, title: "Post & manage gigs", desc: "Create listings with pay rate, shift times, map-pin location and worker count. Duplicate recurring shifts or edit details anytime." },
  { icon: Users, title: "Applicant management", desc: "Review everyone who applied in one queue — open profiles, compare experience and confirm your picks in a couple of taps." },
  { icon: Star, title: "Two-way ratings", desc: "Rate workers after every shift and read feedback others left you. Great ratings attract great applicants." },
  { icon: MessageSquare, title: "Built-in chat", desc: "Message applicants before a booking and coordinate on the day — no phone numbers exchanged, full history kept." },
  { icon: ClipboardCheck, title: "Work history & timesheets", desc: "Every past gig, worker and hour is recorded. Filter history by worker, date or location for easy reconciliation." },
  { icon: ReceiptText, title: "Invoices & spend tracking", desc: "Invoices are generated automatically per completed shift. Track spend by period and download details when you need them." },
  { icon: Wallet, title: "Wallet & secure payments", desc: "Top up a platform wallet, pay by card through Stripe, and never chase an invoice — payouts to workers are automatic." },
  { icon: HeartHandshake, title: "Talent pool (followers)", desc: "Workers can follow your business. Build a loyal bench of regulars who get notified when you post new gigs." },
];

const tour = [
  { step: "01", title: "Set up your company profile", desc: "Add your logo, description and location. A complete profile ranks higher in search results and earns more applications." },
  { step: "02", title: "Post your first gig", desc: "Describe the role, set pay and pick the shift window on a map. Most listings take under three minutes." },
  { step: "03", title: "Confirm and coordinate", desc: "Chat with applicants, confirm your choice and track everything from your dashboard on web or mobile." },
  { step: "04", title: "Approve and relax", desc: "The worker completes the shift, payment clears automatically and both sides leave a rating. Repeat as needed." },
];

const faqs = [
  {
    q: "Is the hirer dashboard free to use?",
    a: "Yes. Creating an account, posting gigs, messaging applicants and managing your workforce are all free. You only pay our 2% service fee when a gig is completed.",
  },
  {
    q: "Can I manage multiple locations from one account?",
    a: "Yes. Each gig carries its own map-pin location, and you can filter your work history and spendings by location, date or worker.",
  },
  {
    q: "How do payments work for hirers?",
    a: "Pay securely by card via Stripe or keep a balance in your wallet. Workers are paid within 5–7 days of completing a shift, and invoices are generated for you automatically.",
  },
  {
    q: "Can I rehire workers I liked?",
    a: "Absolutely. Followed workers form your talent pool and are notified about your new gigs first — many hirers build long-term teams this way.",
  },
  {
    q: "What if a worker isn't right for my business?",
    a: "You can leave honest feedback after any shift and add workers to a blocked list so they can't apply to your future gigs.",
  },
];

export default function HirerDashboardOverview() {
  const navigate = useNavigate();
  const [isSignInOpen, setIsSignInOpen] = React.useState(false);

  const handlePrimaryCta = () => {
    if (localStorage.getItem("token")) {
      navigate("/hirer-dashboard");
    } else {
      setIsSignInOpen(true);
    }
  };

  return (
    <div id="hirer-dashboard-overview">
      {/* Hero */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-[#1A6FB8]/10 text-[#1A6FB8] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <LayoutDashboard className="h-4 w-4" /> Hirer tools &amp; features
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight mb-6">
            One dashboard to run your entire <span className="text-[#E87722]">flexible workforce</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Posting, hiring, chatting, paying and tracking — the iyouwork hirer dashboard puts every staffing job in one place, on web and mobile.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handlePrimaryCta}
              className="bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-md font-medium text-lg transition-colors cursor-pointer"
            >
              Explore the dashboard
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">Free to join · Only a 2% fee per completed gig</p>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Built for busy hirers</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Every feature exists to remove a task from your day — here's what's waiting inside your dashboard.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
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
        </div>
      </section>

      {/* Quick tour */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Your first week, sorted</h2>
          <p className="text-gray-600 text-lg">From empty account to fully staffed rota.</p>
        </motion.div>
        <div className="space-y-6">
          {tour.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-5 items-start bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
            >
              <span className="bg-[#E87722]/10 text-[#E87722] font-bold text-lg px-4 py-2 rounded-full flex-shrink-0">{step.step}</span>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Extras band */}
      <section className="py-14 bg-[#1A6FB8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Bell, label: "Real-time notifications" },
              { icon: MapPin, label: "Location-based matching" },
              { icon: ReceiptText, label: "Automatic invoicing" },
              { icon: Wallet, label: "Stripe-secured payments" },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <item.icon className="h-8 w-8 text-white mx-auto mb-2" />
                <div className="text-sm font-medium text-blue-100">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Questions about hirer tools</h2>
          <p className="text-gray-600 text-lg">Quick answers before you dive in.</p>
        </motion.div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.details
              key={faq.q}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
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

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gray-50 border-t border-gray-100 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6">See it working for your business</h2>
        <p className="text-xl text-gray-600 mb-10">Join thousands of UK hirers filling shifts faster with one simple dashboard.</p>
        <button
          onClick={handlePrimaryCta}
          className="bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-md font-medium text-lg transition-colors cursor-pointer"
        >
          Explore the dashboard
        </button>
      </motion.section>

      <SignIn_Modal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
    </div>
  );
}
