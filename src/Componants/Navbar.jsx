import logo from "../assets/logo_p2.png";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import navEmployerDashboard from "../assets/images/nav_employer_dashboard_1783942317121.jpg";
import navWorkerApp from "../assets/images/nav_worker_app_1783942332270.jpg";
import navSectorsGrid from "../assets/images/nav_sectors_grid_1783942348409.jpg";
import navGetAppMockup from "../assets/images/nav_get_app_mockup_1783942365971.jpg";
import SignIn_Modal from "./SignIn_btn";
import SignUpModal from "./SignUp_btn";
import { 
  ChevronDown, 
  Menu, 
  X, 
  Building, 
  DollarSign, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  Users, 
  Lock, 
  Clock, 
  Briefcase,
  Wrench,
  Cpu,
  Coins,
  Truck,
  Smartphone,
  Bell,
  MapPin,
  Search,
  ExternalLink
} from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileHirersOpen, setIsMobileHirersOpen] = React.useState(false);
  const [isMobileWorkersOpen, setIsMobileWorkersOpen] = React.useState(false);
  const [isMobileIndustriesOpen, setIsMobileIndustriesOpen] = React.useState(false);
  const [isMobileAppOpen, setIsMobileAppOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState(null);
  const [notification, setNotification] = React.useState(null);
  const [isSignInOpen, setIsSignInOpen] = React.useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);

  React.useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const routeNavigate = useNavigate();

  const navigate = (path) => {
    routeNavigate(path);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const hirerLinks = [
    { title: "Post a gig", desc: "Deploy active contract shifts instantly.", path: "/post-job", icon: Sparkles },
    { title: "Pricing & fees", desc: "View our flat 8% platform cost breakdown.", path: "/business/pricing", icon: DollarSign },
    { title: "Managed staffing", desc: "Learn how we handle payroll & compliance.", path: "/business/vetting", icon: ShieldCheck },
    { title: "Hirer dashboard", desc: "Fully interactive simulation console.", path: "/hirer-dashboard", icon: Building }
  ];

  const workerLinks = [
    { title: "Browse gigs", desc: "Find high-paying local gigs near you.", path: "/find-worker", icon: Briefcase },
    { title: "How you get paid", desc: "Same-day payouts with zero worker fees.", path: "/workers/payments", icon: DollarSign },
    { title: "Skill verification", desc: "Become verified to unlock premium rates.", path: "/workers/get-verified", icon: ShieldCheck },
    { title: "Worker benefits", desc: "Autoworker protections & scheduling freedom.", path: "/workers/overview", icon: Users }
  ];

  const industryLinks = [
    { title: "Labour & trades", desc: "General warehouse, production crew, and setup.", path: "/business/industries/labour", icon: Wrench },
    { title: "IT & tech", desc: "Barista, specialty retail, and tech assistance.", path: "/business/industries/it", icon: Cpu },
    { title: "Finance & accounts", desc: "Retail cashiers and transactional operators.", path: "/business/industries/finance", icon: Coins },
    { title: "Logistics & more", desc: "Order picking, pallet handling, and staging.", path: "/business/industries/logistics", icon: Truck }
  ];

  const appLinks = [
    { title: "Download on Play Store", desc: "Get our official Android worker app.", action: "download_play", icon: Smartphone },
    { title: "Download on App Store", desc: "Get our official iOS contractor app.", action: "download_apple", icon: Smartphone },
    { title: "Instant gig alerts", desc: "Receive real-time push alerts of new shifts.", action: "alerts", icon: Bell },
    { title: "Location-based gigs", desc: "Filter matching listings in your postal code.", path: "/find-jobs", icon: MapPin }
  ];

  const handleLinkClick = (link) => {
    if (link.path) {
      if ((link.path === '/post-job' || link.path === '/hirer-dashboard') && !localStorage.getItem("token")) {
        navigate("/login/hirer");
      } else if (link.path === '/find-worker' && !localStorage.getItem("token")) {
        navigate("/login/worker");
      } else {
        navigate(link.path);
      }
    } else if (link.action) {
      if (link.action === "download_play") {
        setNotification({ message: "🤖 iyouwork for Android: Redirecting to Google Play Store download page...", type: "success" });
      } else if (link.action === "download_apple") {
        setNotification({ message: "🍎 iyouwork for iOS: Redirecting to Apple App Store download page...", type: "success" });
      } else if (link.action === "alerts") {
        setNotification({ message: "🔔 Instant gig alerts enabled! We've turned on push notifications for hot local gigs.", type: "info" });
      }
      setActiveDropdown(null);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50" id="main-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center py-2">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="iyouwork logo"
                className="h-12 md:h-14 w-auto object-contain max-h-full"
                referrerPolicy="no-referrer"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 h-full items-center">
            
            {/* For Hirers Dropdown */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown("hirers")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => navigate("/business/overview")}
                className={`text-gray-700 hover:text-[#FA822F] text-sm font-semibold flex items-center gap-1 py-7 transition-colors cursor-pointer ${activeDropdown === "hirers" ? "text-[#FA822F]" : ""}`}
              >
                For Hirers
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${activeDropdown === "hirers" ? "rotate-180 text-[#FA822F]" : ""}`} />
              </button>

              {activeDropdown === "hirers" && (
                <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[620px] bg-white border border-gray-200/80 rounded-2xl shadow-xl p-5 grid grid-cols-12 gap-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="col-span-7 space-y-2">
                    <span className="block text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2">Employer Channels</span>
                    <div className="space-y-1">
                      {hirerLinks.map((link, idx) => {
                        const Icon = link.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleLinkClick(link)}
                            className="w-full text-left p-2 rounded-xl hover:bg-orange-50/50 group transition-all flex items-start gap-3 cursor-pointer"
                          >
                            <div className="h-8 w-8 rounded-lg bg-orange-50 text-[#FA822F] flex items-center justify-center shrink-0 border border-orange-100/50 group-hover:scale-105 transition-transform">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-gray-800 group-hover:text-[#FA822F] transition-colors">{link.title}</h4>
                              <p className="text-[10px] text-gray-400 mt-0.5 leading-tight font-medium">{link.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="col-span-5 bg-orange-50/20 border border-orange-100/30 rounded-xl p-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="h-28 w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200/50">
                        <img 
                          src={navEmployerDashboard} 
                          alt="Employer Workspace" 
                          className="object-cover w-full h-full"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h5 className="text-[11px] font-bold text-gray-800 font-display">Employer Hub Platform</h5>
                      <p className="text-[10px] text-gray-500 leading-normal">Access our pre-vetted local labor pool and deploy shifts instantly without subscriptions.</p>
                    </div>
                    <span className="text-[9px] font-extrabold text-[#FA822F] tracking-widest uppercase mt-2 block">Zero Subscription Fee</span>
                  </div>
                </div>
              )}
            </div>

            {/* For Workers Dropdown */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown("workers")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => navigate("/workers/overview")}
                className={`text-gray-700 hover:text-[#1A6FB8] text-sm font-semibold flex items-center gap-1 py-7 transition-colors cursor-pointer ${activeDropdown === "workers" ? "text-[#1A6FB8]" : ""}`}
              >
                For Workers
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${activeDropdown === "workers" ? "rotate-180 text-[#1A6FB8]" : ""}`} />
              </button>

              {activeDropdown === "workers" && (
                <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[620px] bg-white border border-gray-200/80 rounded-2xl shadow-xl p-5 grid grid-cols-12 gap-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="col-span-7 space-y-2">
                    <span className="block text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2">Worker Resources</span>
                    <div className="space-y-1">
                      {workerLinks.map((link, idx) => {
                        const Icon = link.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleLinkClick(link)}
                            className="w-full text-left p-2 rounded-xl hover:bg-blue-50/50 group transition-all flex items-start gap-3 cursor-pointer"
                          >
                            <div className="h-8 w-8 rounded-lg bg-blue-50 text-[#1A6FB8] flex items-center justify-center shrink-0 border border-blue-100/50 group-hover:scale-105 transition-transform">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-gray-800 group-hover:text-[#1A6FB8] transition-colors">{link.title}</h4>
                              <p className="text-[10px] text-gray-400 mt-0.5 leading-tight font-medium">{link.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="col-span-5 bg-blue-50/20 border border-blue-100/30 rounded-xl p-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="h-28 w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200/50">
                        <img 
                          src={navWorkerApp} 
                          alt="Worker App" 
                          className="object-cover w-full h-full"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h5 className="text-[11px] font-bold text-gray-800 font-display">Verified Worker Dashboard</h5>
                      <p className="text-[10px] text-gray-500 leading-normal">Complete shifts, build rating cards, and unlock same-day fee-free debit payouts.</p>
                    </div>
                    <span className="text-[9px] font-extrabold text-[#1A6FB8] tracking-widest uppercase mt-2 block">100% Commission Free</span>
                  </div>
                </div>
              )}
            </div>

            {/* Industries Dropdown */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown("industries")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => navigate("/business/industries")}
                className={`text-gray-700 hover:text-[#FA822F] text-sm font-semibold flex items-center gap-1 py-7 transition-colors cursor-pointer ${activeDropdown === "industries" ? "text-[#FA822F]" : ""}`}
              >
                Industries
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${activeDropdown === "industries" ? "rotate-180 text-[#FA822F]" : ""}`} />
              </button>

              {activeDropdown === "industries" && (
                <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[620px] bg-white border border-gray-200/80 rounded-2xl shadow-xl p-5 grid grid-cols-12 gap-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="col-span-7 space-y-2">
                    <span className="block text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2">Gig Sectors</span>
                    <div className="space-y-1">
                      {industryLinks.map((link, idx) => {
                        const Icon = link.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleLinkClick(link)}
                            className="w-full text-left p-2 rounded-xl hover:bg-orange-50/50 group transition-all flex items-start gap-3 cursor-pointer"
                          >
                            <div className="h-8 w-8 rounded-lg bg-orange-50 text-[#FA822F] flex items-center justify-center shrink-0 border border-orange-100/50 group-hover:scale-105 transition-transform">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-gray-800 group-hover:text-[#FA822F] transition-colors">{link.title}</h4>
                              <p className="text-[10px] text-gray-400 mt-0.5 leading-tight font-medium">{link.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="col-span-5 bg-orange-50/20 border border-orange-100/30 rounded-xl p-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="h-28 w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200/50">
                        <img 
                          src={navSectorsGrid} 
                          alt="Labor Sectors" 
                          className="object-cover w-full h-full"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h5 className="text-[11px] font-bold text-gray-800 font-display">Sector Wage Benchmarks</h5>
                      <p className="text-[10px] text-gray-500 leading-normal">Check out standard pay rates and credentials across major local industries.</p>
                    </div>
                    <span className="text-[9px] font-extrabold text-[#FA822F] tracking-widest uppercase mt-2 block">Fair Pay Guarantees</span>
                  </div>
                </div>
              )}
            </div>

            {/* Get the app Dropdown */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown("app")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`text-gray-700 hover:text-[#1A6FB8] text-sm font-semibold flex items-center gap-1 py-7 transition-colors cursor-pointer ${activeDropdown === "app" ? "text-[#1A6FB8]" : ""}`}
              >
                Get the app
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${activeDropdown === "app" ? "rotate-180 text-[#1A6FB8]" : ""}`} />
              </button>

              {activeDropdown === "app" && (
                <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[620px] bg-white border border-gray-200/80 rounded-2xl shadow-xl p-5 grid grid-cols-12 gap-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="col-span-7 space-y-2">
                    <span className="block text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2">Mobile Access</span>
                    <div className="space-y-1">
                      {appLinks.map((link, idx) => {
                        const Icon = link.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleLinkClick(link)}
                            className="w-full text-left p-2 rounded-xl hover:bg-blue-50/50 group transition-all flex items-start gap-3 cursor-pointer"
                          >
                            <div className="h-8 w-8 rounded-lg bg-blue-50 text-[#1A6FB8] flex items-center justify-center shrink-0 border border-blue-100/50 group-hover:scale-105 transition-transform">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-gray-800 group-hover:text-[#1A6FB8] transition-colors">{link.title}</h4>
                              <p className="text-[10px] text-gray-400 mt-0.5 leading-tight font-medium">{link.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="col-span-5 bg-blue-50/20 border border-blue-100/30 rounded-xl p-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="h-28 w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200/50">
                        <img 
                          src={navGetAppMockup} 
                          alt="Mobile App download" 
                          className="object-cover w-full h-full"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h5 className="text-[11px] font-bold text-gray-800 font-display">On-The-Go Gig Access</h5>
                      <p className="text-[10px] text-gray-500 leading-normal">GPS check-ins, push notifications, ratings, same-day wallet direct direct clearings.</p>
                    </div>
                    <span className="text-[9px] font-extrabold text-[#1A6FB8] tracking-widest uppercase mt-2 block">Available Now</span>
                  </div>
                </div>
              )}
            </div>

            <Link to="/faq" className="text-gray-700 hover:text-[#1A6FB8] text-sm font-semibold transition-colors">
              FAQ
            </Link>
            
            <Link to="/about" className="text-gray-700 hover:text-[#1A6FB8] text-sm font-semibold transition-colors">
              About
            </Link>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center space-x-3">
            <button 
              onClick={() => navigate("/contact")}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 mr-1 transition-colors cursor-pointer"
            >
              Contact
            </button>
            <button 
              onClick={() => setIsSignInOpen(true)}
              className="text-sm font-semibold text-gray-950 border border-gray-200 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Sign in
            </button>
            <button 
              onClick={() => setIsSignUpOpen(true)}
              className="text-sm font-bold text-white bg-[#FA822F] hover:bg-[#e36d1b] px-6 py-2.5 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Sign up
            </button>
          </div>
          
          {/* Mobile menu icon */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation List */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in fade-in duration-200">
          
          {/* Mobile Hirers collapser */}
          <div className="border-b border-gray-100/50 pb-2">
            <button
              onClick={() => setIsMobileHirersOpen(!isMobileHirersOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-bold text-gray-800 hover:bg-gray-50"
            >
              <span>For Hirers</span>
              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isMobileHirersOpen ? "rotate-180" : ""}`} />
            </button>
            {isMobileHirersOpen && (
              <div className="pl-6 pt-1 pb-2 space-y-2">
                {hirerLinks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLinkClick(link)}
                    className="block w-full text-left text-sm font-semibold text-gray-600 hover:text-[#FA822F] py-1"
                  >
                    {link.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Workers collapser */}
          <div className="border-b border-gray-100/50 pb-2">
            <button
              onClick={() => setIsMobileWorkersOpen(!isMobileWorkersOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-bold text-gray-800 hover:bg-gray-50"
            >
              <span>For Workers</span>
              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isMobileWorkersOpen ? "rotate-180" : ""}`} />
            </button>
            {isMobileWorkersOpen && (
              <div className="pl-6 pt-1 pb-2 space-y-2">
                {workerLinks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLinkClick(link)}
                    className="block w-full text-left text-sm font-semibold text-gray-600 hover:text-[#1A6FB8] py-1"
                  >
                    {link.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Industries collapser */}
          <div className="border-b border-gray-100/50 pb-2">
            <button
              onClick={() => setIsMobileIndustriesOpen(!isMobileIndustriesOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-bold text-gray-800 hover:bg-gray-50"
            >
              <span>Industries</span>
              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isMobileIndustriesOpen ? "rotate-180" : ""}`} />
            </button>
            {isMobileIndustriesOpen && (
              <div className="pl-6 pt-1 pb-2 space-y-2">
                {industryLinks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLinkClick(link)}
                    className="block w-full text-left text-sm font-semibold text-gray-600 hover:text-[#FA822F] py-1"
                  >
                    {link.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Get the app collapser */}
          <div className="border-b border-gray-100/50 pb-2">
            <button
              onClick={() => setIsMobileAppOpen(!isMobileAppOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-bold text-gray-800 hover:bg-gray-50"
            >
              <span>Get the app</span>
              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isMobileAppOpen ? "rotate-180" : ""}`} />
            </button>
            {isMobileAppOpen && (
              <div className="pl-6 pt-1 pb-2 space-y-2">
                {appLinks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLinkClick(link)}
                    className="block w-full text-left text-sm font-semibold text-gray-600 hover:text-[#1A6FB8] py-1"
                  >
                    {link.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-bold text-gray-800 hover:bg-gray-50">FAQ</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-bold text-gray-800 hover:bg-gray-50">About</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-bold text-gray-800 hover:bg-gray-50">Contact</Link>
          
          <div className="mt-4 pt-4 border-t border-gray-150 flex flex-col space-y-2">
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSignInOpen(true);
              }}
              className="w-full text-center text-sm font-bold text-gray-950 border border-gray-200 px-4 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              Sign in
            </button>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSignUpOpen(true);
              }}
              className="w-full text-center text-sm font-bold text-white bg-[#FA822F] hover:bg-[#e36d1b] px-4 py-2.5 rounded-lg cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </div>
      )}

      {/* Exquisite Auto-dismissing Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm bg-slate-950 text-white px-5 py-4 rounded-2xl shadow-2xl border border-slate-800 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <div className="h-2 w-2 rounded-full bg-[#FA822F] mt-1.5 animate-pulse shrink-0" />
          <div className="space-y-1">
            <p className="text-xs font-semibold leading-normal">{notification.message}</p>
            <p className="text-[10px] text-slate-400 font-medium">iyouwork Verified Services</p>
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="text-slate-500 hover:text-white text-xs font-bold pl-2 cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      <SignIn_Modal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
    </nav>
  );
}
