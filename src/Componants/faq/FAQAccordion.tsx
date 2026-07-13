import * as React from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
  category: "general" | "workers" | "hirers" | "payments";
}

const faqs: FAQItem[] = [
  {
    question: "How much does it cost to use iyouwork?",
    answer: "It is completely free to sign up and browse gigs on iyouwork. For workers, the rate you see is the flat rate you keep. For business owners, we charge a low 8% service fee on top of the confirmed hourly gig wages to process secure transactions, maintain regional insurance buffers, and operate continuous vetting algorithms.",
    category: "general"
  },
  {
    question: "How fast do workers get paid?",
    answer: "Once a shift coordinator or business lead issues a checkout signal confirming the shift has concluded, payment is processed immediately. Standard direct deposits arrive in your connected banking wallet within 12 to 24 hours. No manual invoicing or waiting weeks for typical corporate cycles is necessary.",
    category: "payments"
  },
  {
    question: "Are the contractors on iyouwork pre-vetted?",
    answer: "Absolutely. Every worker on iyouwork undergoes an identity check, phone connection verification, and must hold basic local state cards (such as CA Food Handler Certifications) where required. Ratings are accumulated strictly based on on-site shift performance, with zero artificial boosters.",
    category: "workers"
  },
  {
    question: "What happens if a worker doesn't show up for a scheduled shift?",
    answer: "Reliability is our highest metric. If a worker fails to check in on-site or doesn't cancel within our standard 12-hour grace window, they receive a critical account warning. Two consecutive unexcused no-shows result in automatic account deactivation. Business owners are also refunded 100% of the shift deposit instantly.",
    category: "hirers"
  },
  {
    question: "How do I upgrade to the Verified Worker status badge?",
    answer: "You can apply directly from your profile settings. To unlock the badge, you must submit a government-issued ID card, pass our standard secure safety screening, complete at least one on-demand shift with a 4.8+ rating, and submit valid copies of local state hospitality or warehousing licenses.",
    category: "workers"
  },
  {
    question: "Is there a minimum hourly pay rate on the platform?",
    answer: "Yes, to protect contractors and ensure high-quality on-demand matches, iyouwork enforces a strict minimum pay standard of $15.00/hour for all categories. Most specialized event services and tech gigs naturally scale to between $25.00/hr and $65.00/hr based on expertise requirements.",
    category: "payments"
  },
  {
    question: "As a business owner, how do I edit or deactivate a posted shift?",
    answer: "Navigate to your hiring workspace and click the 'Active Listings' tab. You can update open spots, adjust the description, or deactivate a gig instantly. Note that once an applicant is officially hired for a spot, details of that specific shift position cannot be altered without mediation support.",
    category: "hirers"
  },
  {
    question: "How does the platform handle tax reporting?",
    answer: "Because workers operate as independent contractors, we aggregate all your completed earnings dynamically. If your total annual payouts exceed $600.00, our secure platform auto-generates a pre-filled IRS Form 1099-NEC and delivers it safely to your inbox and settings panel before January 31st.",
    category: "payments"
  }
];

const GROUPS = [
  { id: "general", title: "General:" },
  { id: "payments", title: "Payments:" },
  { id: "workers", title: "For Workers:" },
  { id: "hirers", title: "For Hirers:" }
] as const;

export default function FAQAccordion() {
  const [openKey, setOpenKey] = React.useState<string | null>(null);

  const toggleFAQ = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  return (
    <div className="space-y-10" id="searchable-faq-module">
      {GROUPS.map((group) => {
        // Filter FAQs belonging to this group
        const groupFaqs = faqs.filter((faq) => faq.category === group.id);
        
        if (groupFaqs.length === 0) return null;

        return (
          <div key={group.id} className="space-y-4" id={`faq-group-${group.id}`}>
            {/* Bold plain text group heading */}
            <h2 className="text-xl font-display font-bold text-gray-900 tracking-tight" id={`heading-${group.id}`}>
              {group.title}
            </h2>

            {/* Group items wrapper */}
            <div className="flex flex-col">
              {groupFaqs.map((faq, index) => {
                const itemKey = `${group.id}-${index}`;
                const isOpen = openKey === itemKey;
                
                // Theme colors (blue for workers/general, orange for hirers/payments)
                const isBlue = faq.category === "workers" || faq.category === "general";
                const accentColor = isBlue ? "text-[#1A6FB8]" : "text-[#FA822F]";
                const accentBorder = isBlue ? "border-l-4 border-l-[#1A6FB8]" : "border-l-4 border-l-[#FA822F]";
                
                return (
                  <div
                    key={itemKey}
                    className={`bg-white border border-gray-200/90 mb-[-1px] rounded-none shadow-none overflow-hidden transition-all duration-200 ${
                      isOpen ? `${accentBorder} border-l-4` : "border-l-gray-200"
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(itemKey)}
                      className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none cursor-pointer hover:bg-gray-50/50"
                    >
                      <h3 className={`font-bold text-gray-900 text-sm md:text-base leading-snug transition-colors ${isOpen ? accentColor : ""}`}>
                        {faq.question}
                      </h3>
                      <div className={`flex-shrink-0 ml-4 font-semibold ${isOpen ? accentColor : "text-gray-400"}`}>
                        {isOpen ? (
                          <Minus className="h-4.5 w-4.5 stroke-[2.5]" />
                        ) : (
                          <Plus className="h-4.5 w-4.5 stroke-[2.5]" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.18, ease: "easeInOut" }}
                        >
                          <div className="px-4 md:px-5 pb-5 pt-1 text-gray-600 text-xs md:text-sm leading-relaxed border-t border-gray-100 bg-gray-50/10">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
