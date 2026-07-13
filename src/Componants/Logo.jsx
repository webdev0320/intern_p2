import * as React from "react";
import logo from "../assets/logo_p2.png";

export default function Logo({ className = "h-11" }) {
  return (
    <div className="flex items-center select-none" id="iyouwork-brand-logo">
      <img
        src={logo}
        alt="iyouwork logo"
        className={`${className} w-auto object-contain max-h-full`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
