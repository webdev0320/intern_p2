import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineMenu, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
// import logo from "../assets/logo.svg"
import logo from '../assets/logo_p2.png'

import SignUp_btn from "./SignUp_btn.jsx"


const Header = () => {
    // JS for sign up btn
    const [signUpModalOpen, setSignUpModalOpen] = useState(false);
     // JS for sign up btn
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileDropdown, setMobileDropdown] = useState(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.width = "100%";
            document.body.style.height = "100%";
        } else {
            document.body.style.overflow = "auto";
            document.body.style.position = "static";
        }

        return () => {
            document.body.style.overflow = "auto";
            document.body.style.position = "static";
        };
    }, [menuOpen]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log("Searching for:", searchQuery);
            // Handle search logic here
            // For example: navigate to search results page
            // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);

            // Close search bar after submit
            setSearchOpen(false);
            setSearchQuery("");
        }
    };

    const menuItems = [
        {
            text: "For businesses",
            link: "/For_businesses",
            dropdown: (
                <div className="flex p-4">
                    {/* Left Column: Sectors we serve */}
                    <div className="w-full pr-4">
                        <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Sectors we serve</h3>
                        <ul className="space-y-2 md:mt-8">
                            <li>
                                <Link
                                    to="/retail"
                                    className="block flex justify-between px-2 py-1.5 hover:text-orange-500 text-sm no-underline text-gray-700 hover:bg-gray-50 rounded"
                                >
                                    Retail
                                    <FaArrowRight className="mt-1" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/healthcare"
                                    className="block flex justify-between px-2 py-1.5 hover:text-orange-500 text-sm no-underline text-gray-700 hover:bg-gray-50 rounded"
                                >
                                    Healthcare
                                    <FaArrowRight className="mt-1" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/hospitality"
                                    className="block flex justify-between px-2 py-1.5 hover:text-orange-500 text-sm no-underline text-gray-700 hover:bg-gray-50 rounded"
                                >
                                    Hospitality
                                    <FaArrowRight className="mt-1" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/warehouse-logistics"
                                    className="block flex justify-between px-2 py-1.5 hover:text-orange-500 text-sm no-underline text-gray-700 hover:bg-gray-50 rounded"
                                >
                                    Warehouse and Logistics
                                    <FaArrowRight className="mt-1" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/office"
                                    className="block flex justify-between px-2 py-1.5 hover:text-orange-500 text-sm no-underline text-gray-700 hover:bg-gray-50 rounded"
                                >
                                    Office
                                    <FaArrowRight className="mt-1" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/events"
                                    className="block flex justify-between px-2 py-1.5 hover:text-orange-500 text-sm no-underline text-gray-700 hover:bg-gray-50 rounded"
                                >
                                    Events
                                    <FaArrowRight className="mt-1" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Right Column: Solutions for businesses */}
                    <div className="w-full pl-4 ">
                        <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Solutions for businesses</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/workforce-planning"
                                    className="block flex justify-between px-2 py-1.5 hover:text-orange-500 text-sm no-underline text-gray-700 hover:bg-gray-50 rounded"
                                >
                                    Workforce Planning
                                    <FaArrowRight className="mt-1" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/temp-staffing"
                                    className="block flex justify-between px-2 py-1.5 hover:text-orange-500 text-sm no-underline text-gray-700 hover:bg-gray-50 rounded"
                                >
                                    Temp Staffing
                                    <FaArrowRight className="mt-1" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/direct-hiring"
                                    className="block flex justify-between px-2 py-1.5 hover:text-orange-500 text-sm no-underline text-gray-700 hover:bg-gray-50 rounded"
                                >
                                    Direct Hiring
                                    <FaArrowRight className="mt-1" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/payrolling"
                                    className="block flex justify-between px-2 py-1.5 hover:text-orange-500 text-sm no-underline text-gray-700 hover:bg-gray-50 rounded"
                                >
                                    Payrolling
                                    <FaArrowRight className="mt-1" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            text: "For workers",
            link: "/For_workers",
            dropdown: [
                { text: "Find work",            link: "/" },
                { text: "Registration process", link: "/" },
                { text: "Payments",             link: "/" },
                { text: "Community",            link: "/" },
                { text: "Help centre",          link: "/" },
                { text: "Download app",         link: "/" },
            ]
        },
        {
            text: "Resources",
            link: "/",
            dropdown: [
                { text: "Customer Stories", link: "/" },
                { text: "Blog",             link: "/" },
                { text: "Legal",            link: "/" },
                { text: "Hospitality",      link: "/" },
                { text: "Help and contact", link: "/" }, 
            ]
        },
        {
            text: "About",
            link: "/",
            dropdown: [
                { text: "Who are we", link: "/" },
                { text: "Careers",    link: "/" },
                
            ]
        },
    ];

    const sidebarVariants = {
        open: { x: 0, transition: { type: "tween", duration: 0.3 } },
        closed: { x: "-100%", transition: { type: "tween", duration: 0.3 } },
    };

    const overlayVariants = {
        open: { opacity: 1, transition: { duration: 0.3 } },
        closed: { opacity: 0, transition: { duration: 0.3 } },
    };

    const searchVariants = {
        open: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        },
        closed: {
            opacity: 0,
            scale: 0.95,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        },
    };

    return (
        <header className="fixed md:top-0 md:left-0 left-0 w-full bg-white z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between  p-4">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <Link to="/" className="text-black md:block hidden hover:text-black no-underline">
                        <img src={logo} className="w-16" alt="" />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex flex-1 justify-center">
                    <ul className="flex space-x-6 items-center border-b border-gray-300">
                        {menuItems.map((item, idx) => (
                            <li key={idx} className="relative group">
                                <div className="flex items-center">
                                    <Link
                                        to={item.link}
                                        className="flex items-center cursor-pointer py-3 relative hover:text-orange-500 text-sm transition-colors duration-300 no-underline text-black"
                                    >
                                        {item.text}
                                        {item.dropdown && <IoIosArrowDown className="ml-1" />}
                                       <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#eb7515] opacity-0 group-hover:left-0 group-hover:w-full group-hover:opacity-100 transition-all duration-300 origin-center"></span>
                                    </Link>
                                </div>

                                {/* Dropdown on hover for desktop */}
                                {item.dropdown && (
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                                        {typeof item.dropdown === 'object' && !Array.isArray(item.dropdown) ? (
                                            // It's a React component (For businesses)
                                            <div className="w-96 bg-white border border-gray-200 rounded-md shadow-lg">
                                                {item.dropdown}
                                            </div>
                                        ) : (
                                            // It's an array of link objects (other menu items)
                                            <ul className="w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                                                {Array.isArray(item.dropdown) && item.dropdown.map((drop, dIdx) => (
                                                    <li key={dIdx}>
                                                        <Link
                                                            to={drop.link}
                                                            className="block flex justify-between px-4 py-2.5 hover:bg-gray-50 text-sm no-underline text-black hover:text-orange-500"
                                                        >
                                                            {drop.text}
                                                            <FaArrowRight className="mt-1" />
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>


                <div className="flex items-center justify-between w-full md:w-auto">


                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? (
                            <MdClose size={24} className="text-black" />
                        ) : (
                            <MdOutlineMenu size={24} className="text-black" />
                        )}
                    </button>

                    {/*  Button */}
                    <div className="flex items-center space-x-3">
                        <button className="px-5 py-2 hover:bg-[#1E6EA7] rounded-md bg-transparent border hover:text-white transition-all duration-200 font-medium ">
                            Sign in
                        </button>
                            {/* // Update the sign up button in your header: */}
                        <button
                                className="btn-primary"
                            onClick={() => setSignUpModalOpen(true)}
                        >
                            Sign up
                        </button>

                        {/* Add the modal at the bottom of your Header return statement (before closing </header>): */}
                        <SignUp_btn
                            isOpen={signUpModalOpen}
                            onClose={() => setSignUpModalOpen(false)}
                        />
                    </div>




                </div>
            </div>

            {/* Semi-transparent Black Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="overlay"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={overlayVariants}
                        className="fixed inset-0 bg-black z-40 md:hidden"
                        style={{
                            opacity: 0.6,
                            transition: 'opacity 0.3s ease'
                        }}
                        onClick={() => setMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Menu Sidebar */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="sidebar"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={sidebarVariants}
                        className="fixed top-0 left-0 w-3/4 max-w-sm h-full bg-white shadow-2xl z-50 md:hidden"
                    >
                        <div className="p-6 h-full overflow-y-auto">
                            <div className="flex justify-between items-center mb-8">
                                <div className="text-2xl font-bold">
                                    <Link
                                        to="/"
                                        className="text-black hover:text-black no-underline"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <img src={logo} className="w-16 mt-2" alt="" />
                                    </Link>
                                </div>
                                <button
                                    onClick={() => setMenuOpen(false)}
                                    className="text-black p-2 rounded-full hover:bg-gray-100 transition-colors"
                                    aria-label="Close menu"
                                >
                                    <MdClose size={28} />
                                </button>
                            </div>

                            <ul className="flex flex-col space-y-1">
                                {menuItems.map((item, idx) => (
                                    <li key={idx} className="pb-2">
                                        {item.dropdown ? (
                                            <div className="flex flex-col">
                                                <div
                                                    className="flex items-center justify-between cursor-pointer py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                                                    onClick={() =>
                                                        mobileDropdown === idx
                                                            ? setMobileDropdown(null)
                                                            : setMobileDropdown(idx)
                                                    }
                                                >
                                                    <span className="font-medium text-black">{item.text}</span>
                                                    <IoIosArrowDown
                                                        className={`text-black transition-transform duration-200 ${mobileDropdown === idx ? "rotate-180" : ""
                                                            }`}
                                                    />
                                                </div>

                                                {mobileDropdown === idx && (
                                                    <div className="ml-4 mt-1 border-l border-gray-200 pl-4">
                                                        <div className="py-2" onClick={(e) => e.stopPropagation()}>
                                                            {typeof item.dropdown === 'object' && !Array.isArray(item.dropdown) ? (
                                                                // For businesses dropdown (React component)
                                                                <div className="space-y-4">
                                                                    <div>
                                                                        <h4 className="font-bold text-gray-800 mb-2 text-sm">Sectors we serve</h4>
                                                                        <ul className="space-y-1">
                                                                            <li>
                                                                                <Link
                                                                                    to="/retail"
                                                                                    className="block py-2 px-3 rounded-lg text-gray-700 hover:text-orange-500 transition-colors duration-300 no-underline"
                                                                                    onClick={() => setMenuOpen(false)}
                                                                                >
                                                                                    Retail
                                                                                </Link>
                                                                            </li>
                                                                            <li>
                                                                                <Link
                                                                                    to="/healthcare"
                                                                                    className="block py-2 px-3 rounded-lg text-gray-700 hover:text-orange-500 transition-colors duration-300 no-underline"
                                                                                    onClick={() => setMenuOpen(false)}
                                                                                >
                                                                                    Healthcare
                                                                                </Link>
                                                                            </li>
                                                                            <li>
                                                                                <Link
                                                                                    to="/hospitality"
                                                                                    className="block py-2 px-3 rounded-lg text-gray-700 hover:text-orange-500 transition-colors duration-300 no-underline"
                                                                                    onClick={() => setMenuOpen(false)}
                                                                                >
                                                                                    Hospitality
                                                                                </Link>
                                                                            </li>
                                                                            <li>
                                                                                <Link
                                                                                    to="/warehouse-logistics"
                                                                                    className="block py-2 px-3 rounded-lg text-gray-700 hover:text-orange-500 transition-colors duration-300 no-underline"
                                                                                    onClick={() => setMenuOpen(false)}
                                                                                >
                                                                                    Warehouse and Logistics
                                                                                </Link>
                                                                            </li>
                                                                            <li>
                                                                                <Link
                                                                                    to="/office"
                                                                                    className="block py-2 px-3 rounded-lg text-gray-700 hover:text-orange-500 transition-colors duration-300 no-underline"
                                                                                    onClick={() => setMenuOpen(false)}
                                                                                >
                                                                                    Office
                                                                                </Link>
                                                                            </li>
                                                                            <li>
                                                                                <Link
                                                                                    to="/events"
                                                                                    className="block py-2 px-3 rounded-lg text-gray-700 hover:text-orange-500 transition-colors duration-300 no-underline"
                                                                                    onClick={() => setMenuOpen(false)}
                                                                                >
                                                                                    Events
                                                                                </Link>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-bold text-gray-800 mb-2 text-sm">Solutions for businesses</h4>
                                                                        <ul className="space-y-1">
                                                                            <li>
                                                                                <Link
                                                                                    to="/workforce-planning"
                                                                                    className="block py-2 px-3 rounded-lg text-gray-700 hover:text-orange-500 transition-colors duration-300 no-underline"
                                                                                    onClick={() => setMenuOpen(false)}
                                                                                >
                                                                                    Workforce Planning
                                                                                </Link>
                                                                            </li>
                                                                            <li>
                                                                                <Link
                                                                                    to="/temp-staffing"
                                                                                    className="block py-2 px-3 rounded-lg text-gray-700 hover:text-orange-500 transition-colors duration-300 no-underline"
                                                                                    onClick={() => setMenuOpen(false)}
                                                                                >
                                                                                    Temp Staffing
                                                                                </Link>
                                                                            </li>
                                                                            <li>
                                                                                <Link
                                                                                    to="/direct-hiring"
                                                                                    className="block py-2 px-3 rounded-lg text-gray-700 hover:text-orange-500 transition-colors duration-300 no-underline"
                                                                                    onClick={() => setMenuOpen(false)}
                                                                                >
                                                                                    Direct Hiring
                                                                                </Link>
                                                                            </li>
                                                                            <li>
                                                                                <Link
                                                                                    to="/payrolling"
                                                                                    className="block py-2 px-3 rounded-lg text-gray-700 hover:text-orange-500 transition-colors duration-300 no-underline"
                                                                                    onClick={() => setMenuOpen(false)}
                                                                                >
                                                                                    Payrolling
                                                                                </Link>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                // Other dropdowns (array of links)
                                                                <ul className="space-y-1">
                                                                    {Array.isArray(item.dropdown) && item.dropdown.map((drop, dIdx) => (
                                                                        <li key={dIdx}>
                                                                            <Link
                                                                                to={drop.link}
                                                                                className="block py-2.5 px-3 rounded-lg text-gray-700 hover:text-orange-500 transition-colors duration-300 no-underline"
                                                                                onClick={() => setMenuOpen(false)}
                                                                            >
                                                                                {drop.text}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <Link
                                                to={item.link}
                                                className="block font-medium py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors no-underline text-black hover:text-orange-500"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                {item.text}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;