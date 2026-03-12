import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaArrowRight, FaChevronDown, FaBell, FaBars } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineMenu, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

import logo from '../assets/logo_p2.png'
import SignUp_btn from "./SignUp_btn.jsx"
import SignIn_btn from "./SignIn_btn.jsx";
import Sidebar from "./Sidebar.jsx";


import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";


const Header = ({ open, setOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
        const [currentTime, setCurrentTime] = useState("");

       // Ensure these are here
        dayjs.extend(utc);
        dayjs.extend(timezone);

        // ... inside your component
        useEffect(() => {
            const updateClock = () => {
                // 1. Get current time in UTC (Universal)
                // 2. Explicitly convert that UTC time to London
                const london = dayjs.utc().tz("Europe/London");
                
                setCurrentTime(london.format("MMM DD, YYYY - HH:mm:ss") + " (GMT+0)");
            };

            updateClock();
            const interval = setInterval(updateClock, 1000);
            return () => clearInterval(interval);
        }, []);

    // --- State Management ---
    const [signInOpen, setSignInOpen] = useState(false);
    const [signUpOpen, setSignUpOpen] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [stripeEnabled, setStripeEnabledForUser] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileDropdown, setMobileDropdown] = useState(null);

    const userProfile = localStorage.getItem("userProfile");
    const profile = userProfile ? JSON.parse(userProfile) : null;
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("user_id");
    const email = localStorage.getItem("email");
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // --- Sync Auth Status ---
    useEffect(() => {
        const user_id = localStorage.getItem("user_id");
        setIsLoggedIn(!!user_id);
        if (profile) {
            setStripeEnabledForUser(profile?.stripe_auth || false);
        }
    }, [userId, profile]);

    // --- Body Scroll Lock ---
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
    }, [location.pathname]);

    // --- Stripe Connectivity ---
    const stripeConnect = async () => {
        try {
            if (profile?.stripe_account_id && profile?.stripe_auth !== 'not auth') {
                const payload = new FormData();
                payload.append("email", email);
                payload.append("stripe_account_id", profile?.stripe_account_id);
                payload.append("status", "test");
                payload.append("user_id", userId);

                const response = await fetch(`${BASE_URL}/api/payment/stripe_login_link`, {
                    method: "POST",
                    body: payload,
                });
                const data = await response.json();
                if (data?.chargerecord?.url) window.open(data.chargerecord.url, "_blank", "noopener,noreferrer");
            } else {
                const payload = new FormData();
                payload.append("email", email);
                payload.append("country", profile?.country);
                payload.append("status", "test");
                payload.append("user_id", userId);

                const createResponse = await fetch(`${BASE_URL}/api/payment/create_stripe_account`, {
                    method: "POST",
                    body: payload,
                });
                const createData = await createResponse.json();
                if (createData?.url) window.location.href = createData.url;
            }
        } catch (error) {
            console.error("Stripe error:", error);
        }
    };

    const menuItems = [
        {
            text: "For businesses",
            link: "/For_businesses",
            dropdown: (
                <div className="flex p-4 w-[500px]">
                    <div className="w-1/2 pr-4 border-r border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase">Sectors we serve</h3>
                        <ul className="space-y-2 list-none p-0">
                            {["retail", "healthcare", "hospitality", "warehouse-logistics", "office", "events"].map((s) => (
                                <li key={s}><Link to={`/${s}`} className="flex justify-between text-sm no-underline text-gray-700 hover:text-orange-500">{s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')} <FaArrowRight /></Link></li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-1/2 pl-4">
                        <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase">Solutions</h3>
                        <ul className="space-y-2 list-none p-0">
                            {["workforce-planning", "temp-staffing", "direct-hiring", "payrolling"].map((s) => (
                                <li key={s}><Link to={`/${s}`} className="flex justify-between text-sm no-underline text-gray-700 hover:text-orange-500">{s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} <FaArrowRight /></Link></li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        },
        { text: "For workers", link: "/For_workers", dropdown: [{ text: "Find work", link: "/find-work" }, { text: "Payments", link: "/" }, { text: "Community", link: "/" }] },
        { text: "Resources", link: "/", dropdown: [{ text: "Blog", link: "/" }, { text: "Legal", link: "/" }, { text: "Help centre", link: "/" }] },
        { text: "About", link: "/", dropdown: [{ text: "Who are we", link: "/" }, { text: "Careers", link: "/" }] },
    ];

    const sidebarVariants = { open: { x: 0 }, closed: { x: "-100%" } };
    const overlayVariants = { open: { opacity: 0.6 }, closed: { opacity: 0 } };

    return (
        <header className="fixed top-0 left-0 w-full bg-white z-50 border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center h-20 px-4">
                
                {/* 1. LEFT: Logo (Fixed Width) */}
                <div className="w-1/4 flex items-center justify-start">
                    <Link to="/" className="no-underline">
                        <img src={logo} className="w-16" alt="Logo" />
                    </Link>
                </div>

                {/* 2. CENTER: Clock + Date (Centered) */}
                <div className="flex-1 flex justify-center items-center">
                    {isLoggedIn ? (
                        <div className="bg-gray-50 px-5 py-2 rounded-full border border-gray-100 shadow-inner">
                            <span className="font-mono text-sm md:text-base font-bold text-gray-700 tracking-wider">
                                {currentTime}
                            </span>
                        </div>
                    ) : (
                        <nav className="hidden md:block">
                            <ul className="flex space-x-6 items-center list-none p-0 m-0">
                                {menuItems.map((item, idx) => (
                                    <li key={idx} className="relative group">
                                        <Link to={item.link} className="flex items-center text-sm font-medium text-black no-underline py-2 hover:text-orange-500 transition-all">
                                            {item.text} {item.dropdown && <IoIosArrowDown className="ml-1" />}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                </div>

                {/* 3. RIGHT: Actions (Fixed Width) */}
                <div className="w-1/4 flex items-center justify-end space-x-3">
                    {!isLoggedIn ? (
                        <div className="flex items-center space-x-2">
                            <button onClick={() => setSignInOpen(true)} className="px-5 py-2 border rounded-md font-medium hover:bg-blue-500 hover:text-white transition-all">Sign in</button>
                            <button onClick={() => setSignUpOpen(true)} className="bg-orange-500 text-white px-5 py-2 rounded-md font-bold shadow-md">Sign up</button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <button onClick={() => navigate("/notifications")} className="relative p-2 text-gray-500">
                                <FaBell size={22} />
                                <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                            </button>

                            <div className="relative">
                                <button 
                                    onClick={() => setOpen(!open)}
                                    className={`px-5 py-2 rounded-md text-white font-bold text-sm flex items-center space-x-2 ${role === "emp" ? "bg-orange-500" : "bg-blue-500"}`}
                                >
                                    <span>Profile</span>
                                    <FaChevronDown className={open ? "rotate-180" : ""} size={12} />
                                </button>
                                
                                {open && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-xl z-[60] py-2">
                                        {/* Basic Info Logic */}
                                        <button onClick={() => { navigate(role === 'emp' ? "/hirer-profile" : "/emp-profile"); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Basic Info</button>
                                        <button onClick={() => { navigate("/settings"); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Settings</button>
                                        
                                        {/* Services Logic */}
                                        <button onClick={() => { navigate(role === 'emp' ? "/services" : "/employee-services"); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Services</button>
                                        
                                        {/* Action Items Logic */}
                                        <button onClick={() => { navigate("/invite"); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Invite Friends</button>
                                        
                                        {/* Role-Specific Lists */}
                                        {role === "emp" && (
                                            <button onClick={() => { navigate("/blocked-emp-list"); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Blocked Worker List</button>
                                        )}
                                        {role === "self-emp" && (
                                            <button onClick={() => { navigate("/blocked-hirer-list"); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Blocked Hirer List</button>
                                        )}

                                        {/* Stripe Logic */}
                                        {role === "self-emp" && (
                                            <button onClick={() => { stripeConnect(); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-blue-600 font-bold hover:bg-blue-50 border-t mt-1">
                                                {stripeEnabled === 'charges_enabled' ? 'Bank Detail' : 'Connect Stripe'}
                                            </button>
                                        )}
                                        {role === "emp" && (
                                            <button onClick={() => { navigate("/stripe-card"); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-t mt-1">Stripe Cards</button>
                                        )}

                                        <hr className="my-1 border-gray-100" />
                                        <button onClick={() => { localStorage.clear(); window.location.href = "/"; }} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">Logout</button>
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