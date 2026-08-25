import { useState } from "react";
import { motion } from "framer-motion";

const steps = {
  hirer: [
    { num: "01", title: "Post a gig", desc: "Create a job listing in minutes — set the role, pay, location, and shift times." },
    { num: "02", title: "Review matches", desc: "Browse qualified workers who fit your requirements and availability." },
    { num: "03", title: "Hire and manage", desc: "Confirm your hire, track the shift, and pay seamlessly through the platform." },
  ],
  worker: [
    { num: "01", title: "Build your profile", desc: "Sign up, add your skills, availability, and experience in minutes." },
    { num: "02", title: "Browse and apply", desc: "Find gigs near you that match your schedule and apply with one tap." },
    { num: "03", title: "Get paid on time", desc: "Complete your shift and receive payment within 5–7 days, guaranteed." },
  ],
};

export default function HowItWorks() {
  const [tab, setTab] = useState("hirer");

  return (
    <section className="py-20 bg-gray-50 border-y border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">How it works</h2>
          <p className="text-gray-600 text-lg">Three simple steps to get started.</p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setTab("hirer")}
            className={`px-6 py-2 rounded-full font-semibold transition-colors cursor-pointer ${
              tab === "hirer" ? "bg-[#1A6FB8] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            For Hirers
          </button>
          <button
            onClick={() => setTab("worker")}
            className={`px-6 py-2 rounded-full font-semibold transition-colors cursor-pointer ${
              tab === "worker" ? "bg-[#1A6FB8] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            For Workers
          </button>
        </div>

        <div className="space-y-6">
          {steps[tab].map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex gap-5 items-start bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
            >
              <span className="bg-[#E87722]/10 text-[#E87722] font-bold text-lg px-4 py-2 rounded-full flex-shrink-0">
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
  );
}
