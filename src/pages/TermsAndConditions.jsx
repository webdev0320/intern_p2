import React, { useState, useMemo } from "react";
import { Search, Printer, Scale, Users, CreditCard, ShieldAlert, FileWarning, HelpCircle, XCircle, CheckSquare, Mail, MapPin } from "lucide-react";

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    icon: Scale,
    content: `Welcome to IYouWork ("we", "us", "our", or the "Platform"). These Terms & Conditions govern your access to and use of our mobile applications, website, and services. 

By registering an account as a Worker ("Worker") or Hirer ("Hirer"), or by accessing our services in any manner, you agree to be bound by these Terms. If you do not agree to all terms, do not register for or use our services. You must be at least 18 years of age and reside/operate in the United Kingdom to use the Platform.`
  },
  {
    id: "service",
    title: "2. Description of Service",
    icon: HelpCircle,
    content: `IYouWork operates an on-demand digital matching marketplace connecting businesses (Hirers) with flexible local talent (Workers) for temporary shifts, contracts, and gig assignments. 

IYouWork provides the technology to match, communicate, track attendance (via GPS mapping), process invoices, and facilitate secure payments. Unless explicitly agreed in a separate written contract, IYouWork does not employ Workers; the contractual relationship for the completion of work is directly between the Hirer and the Worker. Each party is responsible for their own compliance with local labor, tax, and safety laws.`
  },
  {
    id: "accounts",
    title: "3. Registration & Verification",
    icon: Users,
    content: `To access the platform, you must register a secure account:

• Profile Credibility: You agree to provide accurate, current, and complete information during registration and keep your profile updated.
• Right to Work Verification: Workers must upload valid identification (passport, visa, NI card) proving their right to work in the UK. We reserve the right to suspend accounts that fail right-to-work audits.
• Account Security: You are solely responsible for maintaining the confidentiality of your login credentials and for all activity occurring under your account. You must notify us immediately of any unauthorized access.`
  },
  {
    id: "payments",
    title: "4. Fees, Invoices & Payments",
    icon: CreditCard,
    content: `We use Stripe for secure payment processing and payout flows:

• For Workers: Your payments are processed and paid out to your linked bank account after a job is successfully completed, the hours are approved by the Hirer, and the automated invoice is generated. You are responsible for any personal tax obligations (such as self-employment income tax/National Insurance) unless tax withholding is explicitly arranged.
• For Hirers: You agree to pay the hourly rate specified in the job posting, plus any agreed platform service fees and applicable VAT. Payment is automatically charged to your linked payment method (credit card, bank transfer) via Stripe once the Worker's timesheet is approved or auto-approved.
• Disputes: If a Hirer disputes hours logged, the funds will be held in escrow until the dispute is resolved through our Resolution Centre.`
  },
  {
    id: "cancellations",
    title: "5. Cancellations & Disputes",
    icon: XCircle,
    content: `Reliability is crucial for both workers and businesses on our platform:

• Hirer Cancellations: If a Hirer cancels a booked shift less than 24 hours before the scheduled start time, a cancellation fee (equivalent to a percentage of the shift value) may be charged and paid to the Worker as compensation.
• Worker Cancellations: If a Worker cancels a booked shift without a valid emergency, it will impact their reliability score. Multiple late cancellations or no-shows may lead to temporary or permanent account suspension.
• Dispute Resolution: Parties are encouraged to resolve timesheet disputes amicably. If no agreement is reached, IYouWork's customer support team will review GPS check-in logs and chat history to make a final binding decision regarding payment.`
  },
  {
    id: "conduct",
    title: "6. Code of Conduct & Safety",
    icon: ShieldAlert,
    content: `All users are expected to maintain professional standards:

• Respect & Safety: Discrimination, harassment, physical threat, or abusive language will result in immediate termination of account access.
• Attendance & Performance: Workers must check in on time and perform tasks to a professional standard.
• Health & Safety: Hirers must provide a safe working environment complying with UK Health and Safety laws and clearly state any physical requirements or PPE needed.
• Feedback System: Users rate each other after shifts. Ratings must be honest, fair, and free from retaliation.`
  },
  {
    id: "intellectual",
    title: "7. Intellectual Property",
    icon: CheckSquare,
    content: `All intellectual property, including code, layout, algorithms, logos, and graphics, belongs exclusively to IYouWork. 

You are granted a limited, non-exclusive, non-transferable, and revocable license to use our application for the sole purpose of matching, booking, and managing shifts. You may not copy, reverse engineer, or scrape data from the Platform without our prior written consent.`
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    icon: FileWarning,
    content: `To the maximum extent permitted by UK law:

• IYouWork is not liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.
• We make no warranties regarding the quality, safety, or legality of the shifts posted, the accuracy of worker profiles, or the completion of services by workers.
• Our total liability for any claim arising out of these terms shall not exceed the total platform fees paid by you in the 6 months preceding the event giving rise to liability.`
  }
];

const TermsAndConditions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("acceptance");

  // Handle printing
  const handlePrint = () => {
    window.print();
  };

  // Filter sections based on search term
  const filteredSections = useMemo(() => {
    if (!searchTerm.trim()) return SECTIONS;
    const lowerSearch = searchTerm.toLowerCase();
    return SECTIONS.filter(
      (sec) =>
        sec.title.toLowerCase().includes(lowerSearch) ||
        sec.content.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased print:bg-white print:text-black">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 text-white py-12 px-6 shadow-md print:bg-none print:text-black print:shadow-none print:py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="bg-orange-500 bg-opacity-40 text-amber-100 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-orange-400 print:hidden">
              Agreement & Terms
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight mt-2 text-white print:text-black print:text-2xl">
              Terms & Conditions
            </h1>
            <p className="text-amber-100 text-sm mt-2 print:text-slate-600">
              Last Updated: July 9, 2026 • Version 1.9
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 bg-white text-orange-700 hover:bg-slate-100 px-5 py-2.5 rounded-xl font-semibold shadow transition-all duration-200 w-fit print:hidden cursor-pointer"
          >
            <Printer size={18} />
            Print / Save PDF
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar (Desktop) / Header Filter (Mobile) */}
          <aside className="lg:col-span-1 space-y-6 print:hidden">
            {/* Search Input */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <label htmlFor="search" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Search Terms
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  id="search"
                  type="text"
                  placeholder="e.g. Payments, Cancellation"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Sticky Table of Contents */}
            <div className="sticky top-24 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hidden lg:block">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">
                Table of Contents
              </h3>
              <nav className="space-y-1">
                {SECTIONS.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeTab === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab(sec.id);
                        document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-amber-50 text-orange-700 font-semibold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Icon size={16} className={isActive ? "text-orange-600" : "text-slate-400"} />
                      <span>{sec.title.split(". ")[1]}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <section className="lg:col-span-3 space-y-8 print:col-span-4">
            {filteredSections.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
                <Search size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-700 mb-1">No Results Found</h3>
                <p className="text-slate-500 text-sm">
                  We couldn't find any matches for "{searchTerm}". Try another search term.
                </p>
              </div>
            ) : (
              filteredSections.map((sec) => {
                const Icon = sec.icon;
                return (
                  <article
                    key={sec.id}
                    id={sec.id}
                    className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md target:ring-2 target:ring-orange-500"
                  >
                    <div className="flex items-center gap-3.5 mb-5 pb-3 border-b border-slate-100">
                      <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 print:bg-none print:text-black">
                        <Icon size={22} />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900 print:text-black">
                        {sec.title}
                      </h2>
                    </div>

                    <div className="text-slate-600 text-base leading-relaxed whitespace-pre-line print:text-black">
                      {sec.content}
                    </div>
                  </article>
                );
              })
            )}

            {/* Governing Law / Support */}
            <article className="bg-slate-950 text-slate-100 rounded-3xl p-6 md:p-8 shadow-lg print:bg-white print:text-black print:border print:border-slate-200">
              <h2 className="text-2xl font-bold mb-6 text-white print:text-black">
                9. Governing Law & Dispute Resolution
              </h2>
              <p className="text-slate-300 mb-8 leading-relaxed print:text-slate-700">
                These terms are governed by the laws of England and Wales. Any disputes arising in connection with the Platform services shall be subject to the exclusive jurisdiction of the English courts.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl print:bg-slate-50 print:border">
                  <div className="p-2.5 rounded-xl bg-orange-500 bg-opacity-20 text-orange-400 print:text-orange-600">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider print:text-slate-500">
                      Contract Support
                    </p>
                    <a href="mailto:support@iyouwork.co.uk" className="text-sm font-semibold text-white hover:underline print:text-black">
                      support@iyouwork.co.uk
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl print:bg-slate-50 print:border">
                  <div className="p-2.5 rounded-xl bg-orange-500 bg-opacity-20 text-orange-400 print:text-orange-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider print:text-slate-500">
                      Corporate Address
                    </p>
                    <p className="text-sm font-semibold text-white print:text-black">
                      IYouWork Ltd, London, WC2N 5DU, UK
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;
