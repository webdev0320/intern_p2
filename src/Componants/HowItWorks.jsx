import * as React from "react";
import { UserPlus, FileText, Users, CheckCircle, Info } from "lucide-react";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = React.useState("hirer");

  const hirerSteps = [
    { title: "Create a free account", description: "Sign up on web or mobile. No subscription needed — pay only when you hire.", icon: UserPlus },
    { title: "Post your gig", description: "Describe the role, hours, location, and your hourly wage. Takes under 2 minutes.", icon: FileText },
    { title: "Workers apply", description: "Interested, qualified workers accept your gig. You review their profiles and confirm.", icon: Users },
    { title: "Pay securely, done", description: "Pay at gig confirmation. We hold funds safely and release to the worker in 5–7 days.", icon: CheckCircle },
  ];

  const workerSteps = [
    { title: "Sign up free", description: "Create your worker profile and verify your skills to access premium gigs.", icon: UserPlus },
    { title: "Browse & apply", description: "Find gigs near you that fit your schedule and skills. Apply with one click.", icon: FileText },
    { title: "Do the work", description: "Show up, complete the tasks professionally, and get a rating from the hirer.", icon: Users },
    { title: "Get paid fast", description: "Funds are released to your account securely within 5-7 days after completion.", icon: CheckCircle },
  ];

  const steps = activeTab === "hirer" ? hirerSteps : workerSteps;

  return (
    <section className="py-20 bg-gray-50 border-y border-gray-200" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">How iyouwork works</h2>
          <p className="text-gray-600 text-lg max-w-2xl">Whether you're filling a shift or finding one — it takes minutes.</p>
        </div>

        <div className="flex justify-center md:justify-start gap-3 mb-12">
          <button 
            onClick={() => setActiveTab("hirer")}
            className={`px-6 py-2 rounded-full text-sm font-medium border transition-colors ${activeTab === "hirer" ? "bg-[#E87722] text-white border-[#E87722]" : "bg-transparent text-gray-600 border-gray-300 hover:border-gray-400"}`}
          >
            I'm a hirer
          </button>
          <button 
            onClick={() => setActiveTab("worker")}
            className={`px-6 py-2 rounded-full text-sm font-medium border transition-colors ${activeTab === "worker" ? "bg-[#1A6FB8] text-white border-[#1A6FB8]" : "bg-transparent text-gray-600 border-gray-300 hover:border-gray-400"}`}
          >
            I'm a worker
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const themeColorClass = activeTab === "hirer" ? "text-[#E87722]" : "text-[#1A6FB8]";
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`${themeColorClass} text-sm font-semibold mb-4`}>Step 0{index + 1}</div>
                <div className={`${themeColorClass} mb-4`}><Icon className="h-8 w-8" /></div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>

        {activeTab === "hirer" && (
          <div className="mt-12 inline-flex items-center gap-2 bg-[#fff3e8] text-[#7a3a00] text-sm px-4 py-2 rounded-full border border-[#f5c08a]">
            <Info className="h-4 w-4" />
            <span>A 15–17% service fee is included in the hirer's payment — workers receive the full agreed wage.</span>
          </div>
        )}
      </div>
    </section>
  );
}
