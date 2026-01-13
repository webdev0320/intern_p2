import React from "react";
import { FaXmark } from "react-icons/fa6";
import { GoQuestion, GoInfo, GoPersonAdd } from "react-icons/go";
import { BsPerson, BsCash } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { LiaTelegram } from "react-icons/lia";
import { IoSearch } from "react-icons/io5";
import { MdHistory, MdOutlineMarkEmailUnread } from "react-icons/md";
import { LuLogOut, LuWallet } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-[350px] bg-white z-50 shadow-lg
        transition-transform duration-300 overflow-y-auto
        ${openSidebar ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Header */}
      <div className="relative p-5 border-b">
        <FaXmark
          className="absolute right-4 top-4 text-2xl cursor-pointer"
          onClick={() => setOpenSidebar(false)}
        />
        <div className="flex items-center gap-4">
          <img src="" className="w-14 h-14 rounded-full bg-gray-300" />
          <div>
            <h2 className="font-semibold text-lg">Talha Raheem</h2>
            <p className="text-sm text-orange-500">
              malikabutalharaheem@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="divide-y">
        <button onClick={() => navigate("/find-worker")} className="menu-btn">
          <IoSearch /> Find a Worker
        </button>
        <button onClick={() => navigate("/history")} className="menu-btn">
          <MdHistory /> History
        </button>
        <button onClick={() => navigate("/messages")} className="menu-btn">
          <LiaTelegram /> Messages
        </button>
        <button onClick={() => navigate("/spendings")} className="menu-btn">
          <BsCash /> My Spendings
        </button>
        <button onClick={() => navigate("/wallet")} className="menu-btn">
          <LuWallet /> Wallet
        </button>
        <button onClick={() => navigate("/resolution")} className="menu-btn">
          <MdOutlineMarkEmailUnread /> Resolution Center
        </button>
        <button onClick={() => navigate("/follow-workers")} className="menu-btn">
          <FaRegStar /> Follow Workers
        </button>
        <button onClick={() => navigate("/settings")} className="menu-btn">
          <GoQuestion /> Settings
        </button>
        <button onClick={() => navigate("/faqs")} className="menu-btn">
          <GoQuestion /> FAQs
        </button>
        <button onClick={() => navigate("/support")} className="menu-btn">
          <BsPerson /> Support Chat
        </button>
        <button onClick={() => navigate("/about")} className="menu-btn">
          <GoInfo /> About
        </button>
        <button onClick={() => navigate("/invite")} className="menu-btn">
          <GoPersonAdd /> Invite Friends
        </button>
        <button className="menu-btn">
          <LuLogOut /> Log out
        </button>
        <button className="menu-btn text-red-500">Delete Account</button>
      </div>
    </div>
  );
};

export default Sidebar;
