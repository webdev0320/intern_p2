import React from "react";
import { FaWhatsapp, FaFacebookF, FaLinkedinIn, FaInstagram, FaPinterestP, FaLink } from "react-icons/fa";
import gift from "../assets/gift_box.png"


const Invite = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-500">
      <div className="">
      
        {/* Gift box as an image */}
        <div className="flex justify-center mb-6 relative z-10">
          <img
            src={gift}
            alt="Gift box"
            className="w-40 h-40 object-cover rounded-lg"
          />
        </div>


        {/* Text */}
        <h2 className="text-white text-center text-xl md:text-2xl font-semibold mb-6 z-10">
          Invite your family & friends <br /> to give them a best experience
        </h2>

        {/* Social buttons */}
        <div className="flex justify-center flex-wrap gap-4 z-10">
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
            <button className="bg-white p-3 rounded-full text-green-500 hover:scale-110 transition-transform">
              <FaWhatsapp size={20} />
            </button>
          </a>

          <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
            <button className="bg-white p-3 rounded-full text-blue-600 hover:scale-110 transition-transform">
              <FaFacebookF size={20} />
            </button>
          </a>

          <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
            <button className="bg-white p-3 rounded-full text-blue-500 hover:scale-110 transition-transform">
              <FaLinkedinIn size={20} />
            </button>
          </a>

          <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
            <button className="bg-white p-3 rounded-full text-pink-600 hover:scale-110 transition-transform">
              <FaInstagram size={20} />
            </button>
          </a>

          <a href="https://www.pinterest.com/yourprofile" target="_blank" rel="noopener noreferrer">
            <button className="bg-white p-3 rounded-full text-red-600 hover:scale-110 transition-transform">
              <FaPinterestP size={20} />
            </button>
          </a>

          <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">
            <button className="bg-white p-3 rounded-full text-gray-600 hover:scale-110 transition-transform">
              <FaLink size={20} />
            </button>
          </a>
        </div>

      </div>
    </div>
  )
}

export default Invite