import * as React from "react";
import FAQAccordion from "../Componants/faq/FAQAccordion";
import { HelpCircle, ArrowRight, MessageSquareCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FAQPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen py-16 md:py-24 relative" id="faq-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle decorative background blur */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />

        {/* FAQ Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
          <span className="text-sm font-semibold tracking-wider text-[#FA822F] block mb-2">
            Knowledge Base
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 tracking-tight">
            Help & Resources
          </h1>
          <p className="text-gray-500 mt-4 text-base md:text-lg leading-relaxed">
            Quick, self-serve answers regarding payments, shift verification, dispatch contracts, and account controls on iyouwork.
          </p>
        </div>

        {/* FAQ Accordion Component with Searchable State */}
        <div className="relative z-10">
          <FAQAccordion />
        </div>

        {/* Footer Still Have Questions Banner */}
        <div className="text-center mt-16 pt-10 border-t border-gray-200/80 max-w-2xl mx-auto relative z-10" id="faq-footer-callout">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-base font-display font-bold text-gray-900">Still have unanswered questions?</h3>
              <p className="text-xs text-gray-500">Our support coordinators are ready to help with custom or complex dispatch requests.</p>
            </div>
            
            <button 
              onClick={() => navigate("/contact")}
              className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-[#1A6FB8] hover:bg-[#155a96] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer select-none shrink-0"
            >
              <MessageSquareCode className="h-4 w-4" />
              <span>Open Support Ticket</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
