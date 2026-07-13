import * as React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Send, 
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    subject: "general",
    role: "worker",
    message: ""
  });

  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [ticketNumber, setTicketNumber] = React.useState("");
  const [touched, setTouched] = React.useState({});

  const isHirer = form.role === "hirer";
  const themeTextClass = isHirer ? "text-[#E87722]" : "text-brand-blue";
  const themeBgClass = isHirer ? "bg-[#E87722]" : "bg-brand-blue";
  const themeHoverBgClass = isHirer ? "hover:bg-[#d06518]" : "hover:bg-[oklch(0.55_0.14_243.31)]";

  const validateField = (name, value) => {
    if (name === "name") {
      if (!value.trim()) return "Full name is required.";
      if (value.trim().length < 2) return "Name must be at least 2 characters.";
    }
    if (name === "email") {
      if (!value.trim()) return "Email address is required.";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Please enter a valid email address.";
    }
    if (name === "message") {
      if (!value.trim()) return "Message cannot be empty.";
      if (value.trim().length < 10) return "Message must be at least 10 characters long.";
    }
    return "";
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, form[field]);
    setErrors(prev => ({
      ...prev,
      [field]: errorMsg || undefined
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: errorMsg || undefined
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allTouched = { name: true, email: true, message: true, subject: true, role: true };
    setTouched(allTouched);

    const nameErr = validateField("name", form.name);
    const emailErr = validateField("email", form.email);
    const messageErr = validateField("message", form.message);

    if (nameErr || emailErr || messageErr) {
      setErrors({
        name: nameErr || undefined,
        email: emailErr || undefined,
        message: messageErr || undefined
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTicketNumber(`IY-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1200);
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      subject: "general",
      role: "worker",
      message: ""
    });
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 selection:bg-brand-blue/10 selection:text-brand-blue font-sans" id="contact-page-root">
      
      {/* Container with generous spacing */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        
        {/* Simplified Header */}
        <div className="text-left max-w-2xl space-y-4">
          <span className="text-sm font-semibold tracking-wider text-[#E87722]">
            Support Headquarters
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 tracking-tight leading-tight">
            Let's Keep Your <span className="text-brand-blue">Pipeline Moving</span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Have questions about posting shifts, fast payouts, or compliance checks? Our specialized support coordinators are online 24/7 to resolve any inquiry.
          </p>
        </div>

        {/* Structured Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-10 text-left">
            
            <div className="space-y-3">
              <h3 className="text-lg font-display font-bold text-gray-900 tracking-tight">Direct Support Channels</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Skip automated phone trees. Connect directly with real regional agents who understand your localized market operations.
              </p>
            </div>

            <div className="space-y-8 pt-2">
              
              {/* Channel 1 */}
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-xl bg-brand-blue/5 text-brand-blue border border-blue-100 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-500 tracking-wider">Email Support</span>
                  <a href="mailto:support@iyouwork.com" className="text-sm font-bold text-gray-900 hover:text-brand-blue transition-colors mt-0.5 block">
                    support@iyouwork.com
                  </a>
                  <p className="text-xs text-gray-500 mt-0.5">Average ticket triage time: 15 minutes</p>
                </div>
              </div>

              {/* Channel 2 */}
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-xl bg-[#E87722]/5 text-[#E87722] border border-orange-100 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-500 tracking-wider">Hotline Desk</span>
                  <a href="tel:+18005550199" className="text-sm font-bold text-gray-900 hover:text-[#E87722] transition-colors mt-0.5 block">
                    +1 (800) 555-0199
                  </a>
                  <p className="text-xs text-gray-500 mt-0.5">Urgent shift escalations or coordinates dispute</p>
                </div>
              </div>

              {/* Channel 3 */}
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-500 tracking-wider">Headquarters</span>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">
                    450 Mission St, San Francisco, CA 94105
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Bay Area Regional Dispatch & Engineering</p>
                </div>
              </div>

              {/* Channel 4 */}
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-xl bg-gray-100 text-gray-600 border border-gray-200 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-500 tracking-wider">Operating Hours</span>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">
                    24/7/365 Support Coverage
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Including weekends and public holidays</p>
                </div>
              </div>

            </div>

            {/* Direct Assurance Tip */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2.5 max-w-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-brand-blue" />
                <span className="text-xs font-bold text-gray-900">Secure Dispatch Escrow</span>
              </div>
              <p className="text-xs text-gray-500 leading-normal">
                All client funds are locked securely in an FDIC-insured digital ledger before shifts begin. We guarantee perfect records of time and payouts.
              </p>
            </div>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm" id="contact-form-container">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="contact-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-8 text-left">
                    <h2 className="text-xl font-display font-bold text-gray-900 flex items-center gap-2">
                      <MessageSquare className={`h-5 w-5 ${themeTextClass}`} />
                      <span>Submit a Support Request</span>
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Our ticketing pipeline auto-assigns an expert advisor to your case.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-xs font-bold text-gray-700">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur("name")}
                        placeholder="e.g. Elena Rostova"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue/30 focus:border-brand-blue transition-all bg-gray-50/20"
                        disabled={isSubmitting}
                      />
                      {touched.name && errors.name && (
                        <div className="flex items-center gap-1.5 text-xs text-red-600 font-semibold mt-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          <span>{errors.name}</span>
                        </div>
                      )}
                    </div>

                    {/* Email and Role Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Email */}
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="block text-xs font-bold text-gray-700">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          onBlur={() => handleBlur("email")}
                          placeholder="elena.r@yahoo.com"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue/30 focus:border-brand-blue transition-all bg-gray-50/20"
                          disabled={isSubmitting}
                        />
                        {touched.email && errors.email && (
                          <div className="flex items-center gap-1.5 text-xs text-red-600 font-semibold mt-1">
                            <AlertCircle className="h-3.5 w-3.5" />
                            <span>{errors.email}</span>
                          </div>
                        )}
                      </div>

                      {/* Account Role */}
                      <div className="space-y-1.5">
                        <label htmlFor="role" className="block text-xs font-bold text-gray-700">
                          I am registering as a
                        </label>
                        <select
                          id="role"
                          name="role"
                          value={form.role}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue/30 focus:border-brand-blue transition-all bg-white"
                          disabled={isSubmitting}
                        >
                          <option value="worker">Contract Worker / Applicant</option>
                          <option value="hirer">Business / Gig Poster</option>
                          <option value="other">General Inquirer / Partner</option>
                        </select>
                      </div>

                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="block text-xs font-bold text-gray-700">
                        Inquiry Category / Topic
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue/30 focus:border-brand-blue transition-all bg-white"
                        disabled={isSubmitting}
                      >
                        <option value="general">General Help & Account Settings</option>
                        <option value="payouts">Payout Auditing & Direct Deposit</option>
                        <option value="verification">Worker Verification Badge Process</option>
                        <option value="posting">Business Posting & Shift Scheduling</option>
                        <option value="technical">Technical Glitches & Device Errors</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="block text-xs font-bold text-gray-700">
                        Your Detailed Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        onBlur={() => handleBlur("message")}
                        placeholder="Tell us details of your question or issue, including specific Shift titles or Transaction IDs if applicable..."
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue/30 focus:border-brand-blue transition-all resize-none bg-gray-50/20"
                        disabled={isSubmitting}
                      />
                      {touched.message && errors.message ? (
                        <div className="flex items-center gap-1.5 text-xs text-red-600 font-semibold mt-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          <span>{errors.message}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-gray-400 mt-1 block">Min 10 characters required. Feel free to describe details thoroughly.</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center gap-2 text-white font-bold py-3.5 px-5 rounded-xl transition-all shadow-sm cursor-pointer select-none ${themeBgClass} ${themeHoverBgClass}`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Assigning Ticket...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <Send className="h-3.5 w-3.5" />
                          <span>Send Secure Message</span>
                        </div>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="text-center py-8 px-4"
                >
                  <div className={`w-16 h-16 ${isHirer ? "bg-orange-50 text-[#E87722] border border-orange-100" : "bg-blue-50/50 text-brand-blue border border-brand-blue/25"} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <CheckCircle className="h-8 w-8" />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Inquiry Lodged Safely
                  </h2>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 my-6 max-w-sm mx-auto">
                    <span className="block text-xs font-semibold text-gray-400 tracking-wider">Your Support Ticket ID</span>
                    <span className={`text-xl font-mono font-bold ${themeTextClass} tracking-widest`}>{ticketNumber}</span>
                  </div>

                  <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-gray-900">{form.name}</strong>. A support coordinator specializing in <strong className="text-gray-800">{form.subject}</strong> requests has been assigned and is reviewing your submission. A response will deliver directly to <strong className="text-gray-900">{form.email}</strong> within 15 minutes.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-8">
                    <button
                      onClick={resetForm}
                      className="w-full sm:w-auto px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg transition-all cursor-pointer border border-gray-200"
                    >
                      Send Another Ticket
                    </button>
                    <button
                      onClick={() => navigate("/")}
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 text-white text-xs font-bold rounded-lg transition-all cursor-pointer ${themeBgClass} ${themeHoverBgClass}`}
                    >
                      <span>Return Home</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </div>
  );
}
