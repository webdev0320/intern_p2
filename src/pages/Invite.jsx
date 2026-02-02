import React, { useEffect, useState } from 'react';
import {
  FaWhatsapp,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaPinterestP,
  FaLink,
} from "react-icons/fa";
import gift from "../assets/gift_box.png";

const Invite = () => {
  // Prefilled message
  const message = `https://play.google.com/store/apps/details?id=com.iyouwork.android
Referral Email: nabeel@iyouwork.com
Please enter this email in the referral email on registration.`;

  const [color, setColor] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    const colorCode = role === "emp" ? "orange" : role === "self-emp" ? "blue" : "";
    setColor(colorCode);
  }, []); // run once on mount

  // Copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    alert("Link copied to clipboard!");
  };

  return (
    <div
      className={`flex flex-col justify-center items-center min-h-screen px-4 ${
        color === "orange" ? "bg-orange-500" :
        color === "blue" ? "bg-blue-500" :
        "bg-gray-500"
      }`}
    >
      <div className="text-center">
        {/* Gift box image */}
        <div className="flex justify-center mb-6 relative z-10">
          <img
            src={gift}
            alt="Gift box"
            className="w-40 h-40 object-cover rounded-lg"
          />
        </div>

        {/* Header */}
        <h2 className="text-white text-center text-xl md:text-2xl font-semibold mb-6 z-10">
          Invite your family & friends <br /> to give them the best experience
        </h2>

        {/* Social buttons */}
        <div className="flex justify-center flex-wrap gap-4 z-10">
          {/* WhatsApp */}
          <button
            onClick={() =>
              window.open(
                `https://wa.me/?text=${encodeURIComponent(message)}`,
                "_blank"
              )
            }
            className="bg-white p-3 rounded-full text-green-500 hover:scale-110 transition-transform"
          >
            <FaWhatsapp size={20} />
          </button>

          {/* Facebook */}
          <button
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(message)}`,
                "_blank"
              )
            }
            className="bg-white p-3 rounded-full text-blue-600 hover:scale-110 transition-transform"
          >
            <FaFacebookF size={20} />
          </button>

          {/* LinkedIn */}
          <button
            onClick={() =>
              window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(message)}`,
                "_blank"
              )
            }
            className="bg-white p-3 rounded-full text-blue-500 hover:scale-110 transition-transform"
          >
            <FaLinkedinIn size={20} />
          </button>

          {/* Instagram */}
          <button
            onClick={() => {
              alert(
                "Instagram does not support direct text sharing via web. Please copy the link to share."
              );
            }}
            className="bg-white p-3 rounded-full text-pink-600 hover:scale-110 transition-transform"
          >
            <FaInstagram size={20} />
          </button>

          {/* Pinterest */}
          <button
            onClick={() =>
              window.open(
                `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(message)}`,
                "_blank"
              )
            }
            className="bg-white p-3 rounded-full text-red-600 hover:scale-110 transition-transform"
          >
            <FaPinterestP size={20} />
          </button>

          {/* Copy Link */}
          <button
            onClick={copyToClipboard}
            className="bg-white p-3 rounded-full text-gray-600 hover:scale-110 transition-transform"
          >
            <FaLink size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invite;
