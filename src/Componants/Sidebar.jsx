import React from "react";
import { FaXmark } from "react-icons/fa6";
import { GoQuestion, GoInfo, GoPersonAdd } from "react-icons/go";
import { BsPerson, BsCash } from "react-icons/bs";
import { TbFileInvoice } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { LiaTelegram } from "react-icons/lia";
import { IoSearch } from "react-icons/io5";
import { MdHistory, MdOutlineMarkEmailUnread } from "react-icons/md";
import { LuLogOut, LuWallet } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const navigate = useNavigate();
  var userId = localStorage.getItem("user_id");
  var email = localStorage.getItem("email");
  var name = localStorage.getItem("name");
  var role = localStorage.getItem("role");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
 useEffect(() => {
  setIsLoggedIn(!!userId);
}, [userId]);
  const phoneNumber = "+447823454547"; // WhatsApp number with country code
  const message = "Hello! I need support."; // Optional prefilled message
  return (
    <div
      className={`fixed top-0 -left-4 h-screen w-[350px] bg-white z-50 shadow-lg
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
          <div>
            <h2 className="font-semibold text-lg">{name}</h2>
            <p className="text-sm text-orange-500">
              {email}
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="divide-y">
        <button
          onClick={() => {
            navigate("/emp-find-work");
            setOpenSidebar(false); // close sidebar
          }}
          className="menu-btn"
        >
          <IoSearch /> Find a Worker
        </button>

        {role === "emp" && (        
          <button
            onClick={() => {
              navigate("/work-history/new");
              setOpenSidebar(false);
            }}
            className="menu-btn"
          >
            <MdHistory /> History
          </button>
         )}

        {role === "self-emp" && (        
          <button
            onClick={() => {
              navigate("/emp-work-history/new");
              setOpenSidebar(false);
            }}
            className="menu-btn"
          >
            <MdHistory /> History
          </button>
        )}


        <button
          onClick={() => {
            navigate("/messages");
            setOpenSidebar(false);
          }}
          className="menu-btn"
        >
          <LiaTelegram /> Messages
        </button>

        {role === "emp" && (
          <button
            onClick={() => {
              navigate("/spendings");
              setOpenSidebar(false);
            }}
            className="menu-btn"
          >
            <BsCash /> My Spendings
          </button>
        )}

        {role === "self-emp" && (
          <button
            onClick={() => {
              navigate("/earnings");
              setOpenSidebar(false);
            }}
            className="menu-btn"
          >
            <BsCash /> My Earnings
          </button>
        )}

        {role === "self-emp" && (
        <button
          onClick={() => {
            navigate("/emp-wallet");
            setOpenSidebar(false);
          }}
          className="menu-btn"
        >
          <LuWallet /> iYouWork Wallet
        </button>
        )}

        {role === "emp" && (
        <button
          onClick={() => {
            navigate("/wallet");
            setOpenSidebar(false);
          }}
          className="menu-btn"
        >
          <LuWallet /> iYouWork Wallet
        </button>
        )}

        {role === "emp" && (
        <button
          onClick={() => {
            navigate("/invoices");
            setOpenSidebar(false);
          }}
          className="menu-btn"
        >
          <TbFileInvoice />  My Invoices
        </button>
        )}

        {role === "self-emp" && (
        <button
          onClick={() => {
            navigate("/emp-invoices");
            setOpenSidebar(false);
          }}
          className="menu-btn"
        >
          <TbFileInvoice />  My Invoices
        </button>
        )}

         <button
          onClick={() => {
            const subject = "Dispute";
            const body = `Dear iYouWork Team,

              Here is the given information to open a dispute.

              Work ID:
              Work Role:
              Dispute Details:

              Thanks,
              Sincerely,`;

            window.location.href = `mailto:dispute@iyouwork.com?subject=${encodeURIComponent(
              subject
            )}&body=${encodeURIComponent(body)}`;

            setOpenSidebar(false);
          }}
          className="menu-btn"
        >
          <MdOutlineMarkEmailUnread /> Resolution Center
        </button>

        <button
          onClick={() => {
            navigate("/follow-workers");
            setOpenSidebar(false);
          }}
          className="menu-btn"
        >
          <FaRegStar /> Follow {role === "emp" ? "Workers" : role === "self-emp" ? "Hirers" : ""}
        </button>

        <button
          onClick={() => {
            navigate("/settings");
            setOpenSidebar(false);
          }}
          className="menu-btn"
        >
          <GoQuestion /> Settings
        </button>

        <button
          onClick={() => {
            navigate("/faqs");
            setOpenSidebar(false);
          }}
          className="menu-btn"
        >
          <GoQuestion /> FAQs
        </button>

        <button
          onClick={() => {
            // Open WhatsApp link in a new tab
            window.open(
              `https://wa.me/${phoneNumber.replace(/\+/g, "")}?text=${encodeURIComponent(
                message
              )}`,
              "_blank"
            );

            setOpenSidebar(false); // close sidebar if needed
          }}
          className="menu-btn"
        >
          <BsPerson /> Support Chat
        </button>

        <button
          onClick={() => {
            navigate("/about");
            setOpenSidebar(false);
          }}
          className="menu-btn"
        >
          <GoInfo /> About
        </button>

        <button
          onClick={() => {
            navigate("/invite");
            setOpenSidebar(false);
          }}
          className="menu-btn"
        >
          <GoPersonAdd /> Invite Friends
        </button>

        <button
          onClick={() => {
                                                        console.log('a');
                                                        localStorage.removeItem("token");
                                                        localStorage.removeItem("user");
                                                        localStorage.removeItem("user_id");
                                                        localStorage.removeItem("userData");
                                                        setIsLoggedIn(false);
                                                        window.location.href = "logout";
                                                        setOpen(false);
            }}
          className="menu-btn"
        >
          <LuLogOut /> Log out
        </button>

        <button
          onClick={() => {
            // handle delete account logic
            setOpenSidebar(false);
          }}
          className="menu-btn text-red-500"
        >
          Delete Account
        </button>

       
      </div>

    </div>
  );
};

export default Sidebar;
