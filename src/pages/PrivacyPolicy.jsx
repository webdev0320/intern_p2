import React, { useState, useMemo } from "react";
import { Search, Printer, Shield, Lock, FileText, CheckCircle, ExternalLink, Mail, Phone, MapPin } from "lucide-react";

const SECTIONS = [
  {
    id: "overview",
    title: "1. Overview & Scope",
    icon: Shield,
    content: `Welcome to IYouWork ("we", "us", or "our"). We are committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how IYouWork collects, uses, shares, and protects personal information of users who register as Workers ("Workers") or Hirers ("Hirers") on our platform, which operates in the United Kingdom.

By accessing or using our services, you consent to the collection, transfer, storage, disclosure, and use of your personal data as outlined in this policy. If you do not agree with this policy, please do not use our services.`
  },
  {
    id: "collect",
    title: "2. Information We Collect",
    icon: FileText,
    content: `To provide our on-demand staffing services, we collect various types of information:

• Registration Information: When you create an account, we collect your full name, email address, password, phone number, and account type (Worker or Hirer).
• Profile Details (Workers): Date of birth, profile photo, work history, skills, certifications, qualifications, and billing or payout details.
• Profile Details (Hirers): Business name, registration details, sector, and company description.
• Verification & Compliance Data: To comply with UK Right to Work laws, we may collect documents such as passport scans, visas, National Insurance (NI) numbers, and proof of address.
• Location & GPS Data: With your permission, we track your geographical coordinates via the app to recommend nearby job opportunities, track attendance, and map site addresses.
• Payment & Financial Information: All payments are securely processed by Stripe. We collect bank details for payouts (Workers) and credit card/billing details (Hirers), but do not store raw card numbers on our servers.`
  },
  {
    id: "use",
    title: "3. How We Use Your Data",
    icon: CheckCircle,
    content: `We process your personal information for several critical purposes:

• Platform Operation: Facilitating connection, chat, and matching between Workers looking for work and Hirers offering shifts.
• Location-Based Matching: Suggesting local jobs to Workers and mapping the locations of jobs posted by Hirers.
• Verification & Compliance: Checking your identity, validating Right to Work in the UK, and preventing fraud.
• Payment Processing: Enabling secure payroll and transaction flows through Stripe integration.
• Notifications & Updates: Keeping you updated on shifts, feedback, applications, and general notifications.
• Customer Support: Diagnosing issues, resolving disputes, and maintaining app performance.`
  },
  {
    id: "gdpr",
    title: "4. GDPR & UK Data Protection Rights",
    icon: Lock,
    content: `Under the UK General Data Protection Regulation (GDPR) and Data Protection Act 2018, you hold key rights regarding your data:

• Right to Access: You can request copies of your personal data stored on our platform.
• Right to Rectification: You can request correction of inaccurate or incomplete information.
• Right to Erasure (Right to be Forgotten): You can request deletion of your account and personal data, subject to legal retention obligations.
• Right to Restrict Processing: You can request that we limit the processing of your data under specific circumstances.
• Right to Data Portability: You can request a copy of your personal data in a structured, machine-readable format.
• Right to Object: You have the right to object to processing based on legitimate interests or direct marketing.

To exercise these rights, please contact our Data Protection Officer at dpo@iyouwork.co.uk.`
  },
  {
    id: "sharing",
    title: "5. Information Sharing & Third Parties",
    icon: ExternalLink,
    content: `We do not sell your personal data. We share it only as necessary to run the platform or comply with legal requirements:

• Shared between Workers & Hirers: When a Worker applies for or is hired for a job, their profile details, ratings, name, and profile picture are shared with the Hirer. Once matched, communication channels are opened.
• Service Providers: We share data with third-party service providers (such as Stripe for payments, Leaflet/Mapbox mapping tools, and Firebase for hosting/database services).
• Legal & Regulatory Compliance: We may disclose data if required to do so by UK law, or in response to subpoenas, court orders, or requests from HMRC or law enforcement authorities.`
  },
  {
    id: "security",
    title: "6. Data Security & Retention",
    icon: Lock,
    content: `We implement industry-standard administrative, physical, and technical measures to protect your data from unauthorized access, loss, or alteration. Data is stored on secure cloud databases with end-to-end encryption.

We retain your personal data for as long as your account is active, or as long as necessary to fulfill the services, resolve disputes, and comply with tax or right-to-work legal retention guidelines (which may require holding data for up to 6 years after account termination for compliance purposes).`
  },
  {
    id: "cookies",
    title: "7. Cookies & Tracking",
    icon: FileText,
    content: `Our website and app use cookies to enhance user experience, remember login sessions, and analyze traffic.

• Essential Cookies: Necessary for security, account login, and page navigation.
• Functional Cookies: Remember your preferences, such as selected language or map filters.
• Performance/Analytics: Help us understand how users interact with IYouWork so we can optimize performance.

You can disable cookies through your browser settings, though some features of the platform may cease to function correctly.`
  }
];

const PrivacyPolicy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

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
      <header className="bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-800 text-white py-12 px-6 shadow-md print:bg-none print:text-black print:shadow-none print:py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="bg-blue-600 bg-opacity-40 text-blue-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-blue-400 print:hidden">
              Legal & Privacy
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight mt-2 text-white print:text-black print:text-2xl">
              Privacy Policy
            </h1>
            <p className="text-blue-100 text-sm mt-2 print:text-slate-600">
              Last Updated: July 9, 2026 • Version 2.1
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 bg-white text-indigo-700 hover:bg-slate-100 px-5 py-2.5 rounded-xl font-semibold shadow transition-all duration-200 w-fit print:hidden cursor-pointer"
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
                Search Policy
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  id="search"
                  type="text"
                  placeholder="e.g. GDPR, Right to Work"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
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
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Icon size={16} className={isActive ? "text-indigo-600" : "text-slate-400"} />
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
                    className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md target:ring-2 target:ring-indigo-500"
                  >
                    <div className="flex items-center gap-3.5 mb-5 pb-3 border-b border-slate-100">
                      <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 print:bg-none print:text-black">
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

            {/* DPO / Contact details */}
            <article className="bg-slate-900 text-slate-100 rounded-3xl p-6 md:p-8 shadow-lg print:bg-white print:text-black print:border print:border-slate-200">
              <h2 className="text-2xl font-bold mb-6 text-white print:text-black">
                8. Contact Our Privacy Team
              </h2>
              <p className="text-slate-300 mb-8 leading-relaxed print:text-slate-700">
                If you have questions, concerns, or requests regarding this Privacy Policy or your personal data rights under UK GDPR, please feel free to reach out directly:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-2xl print:bg-slate-50 print:border">
                  <div className="p-2.5 rounded-xl bg-indigo-500 bg-opacity-20 text-indigo-400 print:text-indigo-600">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider print:text-slate-500">
                      Email
                    </p>
                    <a href="mailto:privacy@iyouwork.co.uk" className="text-sm font-semibold text-white hover:underline print:text-black">
                      privacy@iyouwork.co.uk
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-2xl print:bg-slate-50 print:border">
                  <div className="p-2.5 rounded-xl bg-indigo-500 bg-opacity-20 text-indigo-400 print:text-indigo-600">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider print:text-slate-500">
                      Phone
                    </p>
                    <p className="text-sm font-semibold text-white print:text-black">
                      +44 (0) 20 8123 4567
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-2xl print:bg-slate-50 print:border">
                  <div className="p-2.5 rounded-xl bg-indigo-500 bg-opacity-20 text-indigo-400 print:text-indigo-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider print:text-slate-500">
                      Office
                    </p>
                    <p className="text-sm font-semibold text-white print:text-black">
                      London, WC2N 5DU, UK
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

export default PrivacyPolicy;
