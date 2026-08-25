import React from "react";
import { Linkedin, Facebook, Instagram, MapPin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_p2.png";

const workerLinks = [
  { label: "Browse gigs", path: "/workers/find-work" },
  { label: "How you get paid", path: "/workers/payments" },
  { label: "Get verified", path: "/workers/get-verified" },
  { label: "Worker benefits", path: "/workers/overview" },
  { label: "Find work near me", path: "/emp-find-work" },
];

const businessLinks = [
  { label: "Post a gig", path: "/post-a-gig" },
  { label: "Pricing & fees", path: "/business/pricing" },
  { label: "Managed staffing", path: "/business/managed-staffing" },
  { label: "Hirer dashboard features", path: "/business/hirer-dashboard" },
  { label: "Worker vetting & compliance", path: "/business/vetting" },
  { label: "Hire finance staff", path: "/business/industries/finance" },
  { label: "Hire logistics staff", path: "/business/industries/logistics" },
  { label: "Hire labour & trades", path: "/business/industries/labour" },
  { label: "Hire IT contractors", path: "/business/industries/it" },
];

const companyLinks = [
  { label: "About us", path: "/about" },
  { label: "FAQs", path: "/faqs" },
  { label: "Help & support", path: "/support" },
  { label: "Privacy policy", path: "/privacy-policy" },
  { label: "Terms & conditions", path: "/terms-and-conditions" },
];

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-wrap gap-10 justify-between">
                    <div className="max-w-xs space-y-5">
                        <Link to="/" className="inline-block">
                            <img src={logo} className="w-16" alt="iyouwork logo" />
                        </Link>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            iyouwork is the UK flexible staffing platform for the gig economy. Hire vetted workers for your shifts or find flexible work near you — free to join for hirers and workers alike.
                        </p>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2"><MapPin size={15} className="flex-shrink-0 text-[#E87722]" /> London, United Kingdom</div>
                            <div className="flex items-center gap-2"><Mail size={15} className="flex-shrink-0 text-[#E87722]" /> support@iyouwork.com</div>
                        </div>
                        <div className="flex gap-4 pt-2">
                            <a aria-label="LinkedIn" className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors" href="#"><Linkedin size={18} /></a>
                            <a aria-label="Facebook" className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors" href="#"><Facebook size={18} /></a>
                            <a aria-label="Instagram" className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors" href="#"><Instagram size={18} /></a>
                        </div>
                    </div>

                    <nav aria-label="For workers">
                        <h3 className="font-semibold mb-4">FOR WORKERS</h3>
                        <ul className="space-y-2 text-sm">
                            {workerLinks.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path} className="hover:text-orange-500 transition-colors duration-150">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label="For businesses">
                        <h3 className="font-semibold mb-4">FOR BUSINESSES</h3>
                        <ul className="space-y-2 text-sm">
                            {businessLinks.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path} className="hover:text-orange-500 transition-colors duration-150">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label="Company and legal">
                        <h3 className="font-semibold mb-4">COMPANY</h3>
                        <ul className="space-y-2 text-sm">
                            {companyLinks.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path} className="hover:text-orange-500 transition-colors duration-150">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex gap-3 mt-6">
                            <a href="#" aria-label="Download on the App Store">
                                <img
                                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                    alt="Download iyouwork on the App Store"
                                    className="w-36"
                                />
                            </a>
                            <a href="#" aria-label="Get it on Google Play">
                                <img
                                    src="https://play.google.com/intl/en_gb/badges/static/images/badges/en_badge_web_generic.png"
                                    alt="Get iyouwork on Google Play"
                                    className="w-40"
                                />
                            </a>
                        </div>
                    </nav>
                </div>
            </div>

            <div className="bg-gray-900 text-white text-sm py-4">
                <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-3">
                    <span>© 2026 iYouWork. All rights reserved.</span>
                    <span className="text-gray-400">Flexible jobs &amp; temp staffing across the UK</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
