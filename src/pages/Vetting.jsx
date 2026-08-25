import { motion } from "framer-motion";
import { ShieldCheck, FileCheck, UserCheck, BadgeCheck, ClipboardCheck, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const checks = [
  { icon: UserCheck, title: "Right to Work", desc: "Every worker is verified for legal eligibility to work in the UK." },
  { icon: FileCheck, title: "DBS Checks", desc: "Enhanced DBS screening for roles requiring criminal record checks." },
  { icon: BadgeCheck, title: "Reference Verification", desc: "We contact previous employers to confirm work history and performance." },
  { icon: ClipboardCheck, title: "Skills Assessment", desc: "Role-specific skill tests to ensure competency before deployment." },
  { icon: Eye, title: "Identity Verification", desc: "Photo ID and address verification to prevent fraud." },
  { icon: ShieldCheck, title: "Ongoing Compliance", desc: "Continuous monitoring of certifications, visas, and right-to-work status." },
];

const process = [
  { step: "01", title: "Worker signs up", desc: "Workers create a profile and submit their documents through the app." },
  { step: "02", title: "Automated checks", desc: "Our system runs identity, right-to-work, and DBS checks instantly." },
  { step: "03", title: "Manual review", desc: "Our compliance team reviews references and verifies employment history." },
  { step: "04", title: "Verified & ready", desc: "Workers receive a verification badge and can start accepting gigs." },
];

export default function Vetting() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-[#1A6FB8]/10 text-[#1A6FB8] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <ShieldCheck className="h-4 w-4" /> Managed staffing
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Worker vetting & compliance</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We handle payroll, compliance, and vetting so you can focus on running your business. Every worker is pre-screened before they reach you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Checks */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">What we check</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">Every worker on iyouwork goes through a multi-step verification process before they can accept gigs.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {checks.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
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

      {/* Process */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="space-y-6">
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-5 items-start bg-white p-6 rounded-xl border border-gray-200"
              >
                <span className="bg-[#E87722]/10 text-[#E87722] font-bold text-lg px-4 py-2 rounded-full flex-shrink-0">
                  {step.step}
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

      {/* CTA */}
      <section className="py-20 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Hire with confidence</h2>
        <p className="text-gray-600 mb-8">Every worker is vetted, compliant, and ready to start. No surprises.</p>
        <Link to="/signup/hirer" className="inline-block bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors no-underline">
          Get started for free
        </Link>
      </section>
    </div>
  );
}
