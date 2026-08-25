import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaChevronDown, FaBell, FaBars } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  DollarSign,
  ShieldCheck,
  Building,
  Briefcase,
  Users,
  Wrench,
  Cpu,
  Coins,
  Truck,
  Smartphone,
  Bell as BellIcon,
  MapPin,
} from "lucide-react";

import logo from '../assets/logo_p2.png'
import SignUp_btn from "./SignUp_btn.jsx"
import SignIn_btn from "./SignIn_btn.jsx";
import Sidebar from "./Sidebar.jsx";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const hirerLinks = [
  { title: "Post a gig", desc: "See how easy it is to fill your shifts.", path: "/post-a-gig", icon: Sparkles },
  { title: "Pricing & fees", desc: "One simple 2% service fee. No packages.", path: "/business/pricing", icon: DollarSign },
  { title: "Managed staffing", desc: "We run payroll, scheduling & compliance.", path: "/business/managed-staffing", icon: ShieldCheck },
  { title: "Hirer dashboard", desc: "See every tool built for hirers.", path: "/business/hirer-dashboard", icon: Building },
];

const workerLinks = [
  { title: "Browse gigs", desc: "See how finding work works.", path: "/workers/find-work", icon: Briefcase },
  { title: "How you get paid", desc: "Same-day payouts with zero worker fees.", path: "/workers/payments", icon: DollarSign },
  { title: "Skill verification", desc: "Become verified to unlock premium rates.", path: "/workers/get-verified", icon: ShieldCheck },
  { title: "Worker benefits", desc: "Autoworker protections & scheduling freedom.", path: "/workers/overview", icon: Users },
];

const industryLinks = [
  { title: "Labour & trades", desc: "General labourers, builders & certified trades.", path: "/business/industries/labour", icon: Wrench },
  { title: "IT & tech", desc: "Support techs, developers & engineers.", path: "/business/industries/it", icon: Cpu },
  { title: "Finance & accounts", desc: "Bookkeepers, payroll & credit control.", path: "/business/industries/finance", icon: Coins },
  { title: "Logistics & more", desc: "Drivers, pickers & warehouse crews.", path: "/business/industries/logistics", icon: Truck },
];

const appLinks = [
  { title: "Download on Play Store", desc: "Get our official Android worker app.", action: "download_play", icon: Smartphone },
  { title: "Download on App Store", desc: "Get our official iOS contractor app.", action: "download_apple", icon: Smartphone },
  { title: "Instant gig alerts", desc: "Receive real-time push alerts of new shifts.", action: "alerts", icon: BellIcon },
  { title: "Location-based gigs", desc: "Filter matching listings in your postal code.", path: "/find-jobs", icon: MapPin },
];

const navDropdowns = [
  { label: "For Hirers", links: hirerLinks },
  { label: "For Workers", links: workerLinks },
  { label: "Industries", links: industryLinks },
  { label: "Get the app", links: appLinks },
];

const Header = ({ open, setOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [currentTime, setCurrentTime] = useState("");
    const [signInOpen, setSignInOpen] = useState(false);
    const [signUpOpen, setSignUpOpen] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [stripeEnabled, setStripeEnabledForUser] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const userProfile = localStorage.getItem("userProfile");
    const profile = userProfile ? JSON.parse(userProfile) : null;
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("user_id");
    const email = localStorage.getItem("email");
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    dayjs.extend(utc);
    dayjs.extend(timezone);

    useEffect(() => {
        const updateClock = () => {
            const london = dayjs.utc().tz("Europe/London");
            setCurrentTime(london.format("MMM DD,YYYY - hh:mm:ss A") + " (GMT+0)");
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const user_id = localStorage.getItem("user_id");
        setIsLoggedIn(!!user_id);
        if (profile) {
            setStripeEnabledForUser(profile?.stripe_auth || false);
        }
    }, [userId, profile]);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.width = "100%";
        } else {
            document.body.style.overflow = "auto";
            document.body.style.position = "static";
        }
    }, [menuOpen]);

    useEffect(() => {
        setOpen(false);
        setActiveDropdown(null);
    }, [location.pathname]);

    const stripeConnect = async () => {
        try {
            if (profile?.stripe_account_id && profile?.stripe_auth !== 'not auth') {
                const payload = new FormData();
                payload.append("email", email);
                payload.append("stripe_account_id", profile?.stripe_account_id);
                payload.append("status", "test");
                payload.append("user_id", userId);
                const response = await fetch(`${BASE_URL}/api/payment/stripe_login_link`, { method: "POST", body: payload });
                const data = await response.json();
                if (data?.chargerecord?.url) window.open(data.chargerecord.url, "_blank", "noopener,noreferrer");
            } else {
                const payload = new FormData();
                payload.append("email", email);
                payload.append("country", profile?.country);
                payload.append("status", "test");
                payload.append("user_id", userId);
                const createResponse = await fetch(`${BASE_URL}/api/payment/create_stripe_account`, { method: "POST", body: payload });
                const createData = await createResponse.json();
                if (createData?.url) window.location.href = createData.url;
            }
        } catch (error) {
            console.error("Stripe error:", error);
        }
    };

    const sidebarVariants = { open: { x: 0 }, closed: { x: "-100%" } };
    const overlayVariants = { open: { opacity: 0.6 }, closed: { opacity: 0 } };

    return (
        <header className="fixed top-0 left-0 w-full bg-white z-50 border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center h-20 px-4">

                {/* Logo */}
                <div className="w-1/4 flex items-center justify-start">
                    <Link to="/" className="no-underline">
                        <img src={logo} className="w-16" alt="Logo" />
                    </Link>
                </div>

                {/* Center: Clock or Mega Menu Nav */}
                <div className="flex-1 flex justify-center items-center">
                    {isLoggedIn ? (
                        <div className="bg-gray-50 px-5 py-2 rounded-full border border-gray-100 shadow-inner">
                            <span className="font-mono text-sm md:text-base font-bold text-gray-700 tracking-wider">
                                {currentTime}
                            </span>
                        </div>
                    ) : (
                        <nav className="hidden md:block">
                            <ul className="flex space-x-8 items-center list-none p-0 m-0">
                                {navDropdowns.map((item) => (
                                    <li
                                        key={item.label}
                                        className="relative"
                                        onMouseEnter={() => setActiveDropdown(item.label)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <button className="flex items-center text-[15px] font-medium text-gray-800 py-2 hover:text-orange-500 transition-colors cursor-pointer bg-transparent border-none">
                                            {item.label}
                                            <IoIosArrowDown className={`ml-1.5 transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""}`} size={12} />
                                        </button>

                                        <AnimatePresence>
                                            {activeDropdown === item.label && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 8 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute top-full left-0 mt-0 w-72 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50"
                                                >
                                                    {item.links.map((link) => (
                                                        <Link
                                                            key={link.title}
                                                            to={link.path || "#"}
                                                            onClick={() => {
                                                                if (link.action === "download_play") {
                                                                    window.open("https://play.google.com/store/apps/details?id=com.iyouwork", "_blank");
                                                                } else if (link.action === "download_apple") {
                                                                    window.open("https://apps.apple.com/app/iyouwork", "_blank");
                                                                }
                                                                setActiveDropdown(null);
                                                            }}
                                                            className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors no-underline group"
                                                        >
                                                            <div className="bg-gray-100 group-hover:bg-orange-50 p-2 rounded-lg flex-shrink-0 transition-colors">
                                                                <link.icon className="h-4 w-4 text-gray-500 group-hover:text-orange-500 transition-colors" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">{link.title}</div>
                                                                <div className="text-xs text-gray-500 leading-relaxed mt-0.5">{link.desc}</div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </li>
                                ))}

                                <li>
                                    <Link to="/faqs" className="text-[15px] font-medium text-gray-800 no-underline hover:text-orange-500 transition-colors">
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="text-[15px] font-medium text-gray-800 no-underline hover:text-orange-500 transition-colors">
                                        About
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>

                {/* Right Actions */}
                <div className="w-1/4 flex items-center justify-end space-x-3">
                    {!isLoggedIn ? (
                        <div className="flex items-center space-x-2">
                            <button onClick={() => setSignInOpen(true)} className="px-5 py-2 border rounded-md font-medium hover:bg-blue-500 hover:text-white transition-all cursor-pointer">Sign in</button>
                            <button onClick={() => setSignUpOpen(true)} className="bg-orange-500 text-white px-5 py-2 rounded-md font-bold shadow-md cursor-pointer">Sign up</button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <button onClick={() => navigate("/notifications")} className="relative p-2 text-gray-500 cursor-pointer bg-transparent border-none">
                                <FaBell size={22} />
                                <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setOpen(!open)}
                                    className={`px-5 py-2 rounded-md text-white font-bold text-sm flex items-center space-x-2 cursor-pointer ${role === "emp" ? "bg-orange-500" : "bg-blue-500"}`}
                                >
                                    <span>Profile</span>
                                    <FaChevronDown className={open ? "rotate-180" : ""} size={12} />
                                </button>

                                {open && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-xl z-[60] py-2">
                                        <button onClick={() => { navigate(role === 'emp' ? "/hirer-profile" : "/emp-profile"); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer bg-transparent border-none">Basic Info</button>
                                        <button onClick={() => { navigate("/settings"); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer bg-transparent border-none">Settings</button>
                                        <button onClick={() => { navigate(role === 'emp' ? "/services" : "/employee-services"); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer bg-transparent border-none">Services</button>
                                        <button onClick={() => { navigate("/invite"); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer bg-transparent border-none">Invite Friends</button>
                                        {role === "emp" && (
                                            <button onClick={() => { navigate("/blocked-emp-list"); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer bg-transparent border-none">Blocked Worker List</button>
                                        )}
                                        {role === "self-emp" && (
                                            <button onClick={() => { navigate("/blocked-hirer-list"); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer bg-transparent border-none">Blocked Hirer List</button>
                                        )}
                                        {role === "self-emp" && (
                                            <button onClick={() => { stripeConnect(); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-blue-600 font-bold hover:bg-blue-50 border-t mt-1 cursor-pointer bg-transparent border-none">
                                                {stripeEnabled === 'charges_enabled' ? 'Bank Detail' : 'Connect Stripe'}
                                            </button>
                                        )}
                                        {role === "emp" && (
                                            <button onClick={() => { navigate("/stripe-card"); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-t mt-1 cursor-pointer bg-transparent border-none">Stripe Cards</button>
                                        )}
                                        <hr className="my-1 border-gray-100" />
                                        <button onClick={() => { localStorage.clear(); window.location.href = "/"; }} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer bg-transparent border-none">Logout</button>
                                    </div>
                                )}
                            </div>
                            <FaBars className="text-2xl cursor-pointer text-gray-700" onClick={() => setOpenSidebar(true)} />
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar & Modals */}
            <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
            <SignIn_btn isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
            <SignUp_btn isOpen={signUpOpen} onClose={() => setSignUpOpen(false)} />
        </header>
    );
};

export default Header;
