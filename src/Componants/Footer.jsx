import React from 'react'
import { Linkedin, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_p2.png"

const Footer = () => {
    return (
        <footer className="">
            <section className='bg-gray-100 p-7  text-gray-800'>
                {/* Top section */}
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="flex flex-wrap gap-10 justify-between ">
                        {/* Logo & language */}
                        <div className="space-y-6">
                            <img src={logo} className='w-16' alt="i u work" />
                            {/* <div className="flex items-center gap-2 text-sm">
                            <span>CH</span>
                            <span className="opacity-60">EN</span>
                        </div> */}
                            <div className="flex gap-4 pt-4">
                                <a className="p-2 rounded-full bg-gray-200 hover:bg-gray-300" href="#"><Linkedin size={18} /></a>
                                <a className="p-2 rounded-full bg-gray-200 hover:bg-gray-300" href="#"><Facebook size={18} /></a>
                                <a className="p-2 rounded-full bg-gray-200 hover:bg-gray-300" href="#"><Instagram size={18} /></a>
                            </div>
                        </div>

                        <div className='flex justify-between flex-wrap gap-8 md:gap-24 pr-9'>
                            {/* For Workers */}
                            <div>
                                <h3 className="font-semibold mb-4">FOR WORKERS</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="hover:text-orange-500 transition-colors duration-150 cursor-pointer">Latest jobs</li>
                                    <li className="hover:text-orange-500 transition-colors duration-150 cursor-pointer">Find work</li>
                                    <li className="hover:text-orange-500 transition-colors duration-150 cursor-pointer">Community</li>
                                    <li className="hover:text-orange-500 transition-colors duration-150 cursor-pointer">Registration process</li>
                                    <li className="hover:text-orange-500 transition-colors duration-150 cursor-pointer">Coopler payments</li>
                                    <li className="hover:text-orange-500 transition-colors duration-150 cursor-pointer">Help centre</li>
                                </ul>
                                <img
                                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                    alt="App Store"
                                    className="mt-6 w-40"
                                />
                            </div>


                            {/* For Businesses */}
                            <div>
                                <h3 className="font-semibold mb-4">FOR BUSINESSES</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="hover:text-orange-500 transition-colors duration-150 cursor-pointer">Temp Staffing Pricing</li>
                                    <li className="hover:text-orange-500 transition-colors duration-150 cursor-pointer">Help centre</li>
                                </ul>
                            </div>


                            {/* Coople */}
                            <div>
                                <h3 className="font-semibold mb-4">COOPLE</h3>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <Link to="/about" className="hover:text-orange-500 transition-colors duration-150">About us</Link>
                                    </li>
                                    <li className="hover:text-orange-500 transition-colors duration-150 cursor-pointer">Blog</li>
                                    <li className="hover:text-orange-500 transition-colors duration-150 cursor-pointer">Careers</li>
                                    <li>
                                        <Link to="/privacy-policy" className="hover:text-orange-500 transition-colors duration-150">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link to="/terms-and-conditions" className="hover:text-orange-500 transition-colors duration-150">Terms & Conditions</Link>
                                    </li>
                                    <li className="hover:text-orange-500 transition-colors duration-150 cursor-pointer">Imprint</li>
                                    <li className="hover:text-orange-500 transition-colors duration-150 cursor-pointer">Contact</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            {/* Bottom bar */}
            <div className="bg-gray-900 text-white text-sm py-4">
                <div className=" max-w-7xl mx-auto md:px-20 px-6">
                    © 2026 Coople. All rights reserved.
                </div>
            </div>

        </footer>

    )
}

export default Footer