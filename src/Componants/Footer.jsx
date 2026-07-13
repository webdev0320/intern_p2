import * as React from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    // Simulate API call with a 1.2 second delay
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <Logo className="h-8" />
            </Link>
            <p className="text-sm text-gray-600 mb-6 max-w-sm">
              Connecting freelance talent with task-based project requirements efficiently.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy policy</Link>
              <Link to="/terms" className="hover:text-gray-900 transition-colors">Terms of use</Link>
              <Link to="/faq" className="hover:text-gray-900 transition-colors">FAQ</Link>
              <Link to="/contact" className="hover:text-gray-900 transition-colors">Contact us</Link>
              <Link to="/trust" className="hover:text-gray-900 transition-colors">Trust & safety</Link>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-gray-900 mb-2">Subscribe to our newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">Keep updated on new job opportunities and platform announcements.</p>
            {status === "success" ? (
              <div 
                className="flex items-center gap-3 text-green-800 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm max-w-md animate-fade-in" 
                id="newsletter-success"
              >
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Successfully subscribed!</p>
                  <p className="text-xs text-green-600">Thank you for joining our community.</p>
                </div>
              </div>
            ) : (
              <form 
                className="flex flex-col gap-1.5 max-w-md"
                onSubmit={handleSubmit}
                id="newsletter-form"
              >
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="Enter your email address" 
                    className="flex-1 min-w-0 border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-1 focus:ring-brand-blue focus:border-brand-blue outline-none"
                    required
                    disabled={status === "submitting"}
                  />
                  <button 
                    type="submit" 
                    disabled={status === "submitting"}
                    className="bg-brand-blue hover:bg-brand-blue/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    <span>{status === "submitting" ? "Submitting..." : "Subscribe"}</span>
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-xs text-red-600 font-medium" id="newsletter-error">
                    {errorMessage}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 pt-8 border-t border-gray-200">
          &copy; {new Date().getFullYear()} iyouwork Ltd. All rights reserved. UK registered company.
        </div>
      </div>
    </footer>
  );
}
