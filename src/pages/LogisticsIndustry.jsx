import { Truck, Warehouse, Clock, ShieldCheck, Users, Boxes, Route, Forklift as ForkliftIcon } from "lucide-react";
import IndustryLayout from "../Componants/IndustryLayout.jsx";

const theme = {
  heroBg: "from-red-50",
  badge: "bg-red-100 text-[#993C1D]",
  accent: "text-[#993C1D]",
  iconBox: "bg-red-50 text-[#993C1D]",
};

export default function LogisticsIndustry() {
  return (
    <IndustryLayout
      theme={theme}
      icon={Truck}
      badgeLabel="Logistics & Delivery"
      title="Logistics & delivery staffing"
      intro="Warehouse staff, drivers, pickers and despatch crews — vetted workers ready to keep your operation moving, even at a few hours' notice."
      introParas={[
        "Logistics runs on timing. A late van, an absent picker or a backlog at the loading bay ripples through the whole day — and peak seasons can double your staffing needs for just a few weeks a year. Hiring permanent staff for those peaks is expensive; calling agencies means inflated markups and workers you've never seen before.",
        "iyouwork gives you direct access to a local pool of vetted warehouse and delivery workers who choose shifts that suit them. Post the gig with a map pin, pay rate and shift times, and watch applications arrive — most hirers confirm crews within hours, even for same-day starts.",
        "Every worker's certifications, attendance record and ratings travel with them, so you always know exactly who is turning up. And you only ever pay for shifts actually worked, plus our flat 2% service fee."
      ]}
      stats={[
        { val: "290+", label: "Active logistics gigs" },
        { val: "£11–18/hr", label: "Average pay range" },
        { val: "97%", label: "Fill rate" },
        { val: "4.8★", label: "Average hirer rating" },
      ]}
      benefits={[
        { icon: Clock, title: "Same-day cover", desc: "A van off the road or an absence on the line? Workers can be on-site within hours of posting." },
        { icon: ShieldCheck, title: "Licensed & insured", desc: "Drivers hold valid licences; forklift operators carry CPCS/NPORS certification, verified at sign-up." },
        { icon: Warehouse, title: "Every shift pattern", desc: "Earlies, lates, nights and weekend overtime — post the pattern that fits your operation." },
        { icon: Users, title: "Crews of any size", desc: "From one extra pair of hands to a 50-person peak-season surge — scale up and down freely." },
      ]}
      rates={[
        { role: "Order picker / packer", rate: "£12/hr", note: "Standard day shift, targets agreed on site" },
        { role: "Warehouse operative", rate: "£12–13/hr", note: "Loading, unloading and general movement of goods" },
        { role: "Delivery driver", rate: "£14/hr", note: "Multi-drop or scheduled routes, own or company vehicle" },
        { role: "Forklift operator", rate: "£16/hr", note: "Counterbalance or reach, certification required" },
        { role: "Night-shift operative", rate: "+15% premium", note: "Typical uplift on base rates for night work" },
      ]}
      roleSpotlights={[
        { icon: Warehouse, title: "Warehouse operative", desc: "Loads and unloads vehicles, moves stock between locations, keeps aisles clear and supports whatever the depot needs that shift." },
        { icon: Boxes, title: "Order picker / packer", desc: "Works to pick lists or handheld scanners, packs goods securely and hits agreed accuracy and throughput targets." },
        { icon: Route, title: "Delivery driver", desc: "Completes multi-drop or scheduled routes, obtains proof-of-delivery signatures and represents your business at customers' doors." },
        { icon: ForkliftIcon, title: "Forklift operator", desc: "Moves palletised stock safely with counterbalance or reach trucks — certification checked before they can apply." },
      ]}
      roles={["Warehouse Operatives", "Delivery Drivers", "Forklift Operators", "Order Pickers", "Pallet Builders", "Loading Bay Staff", "Inventory Clerks", "Despatch Assistants", "Stock Counters", "Van Drivers"]}
      requirements={[
        "Right-to-work verification",
        "Photo ID confirmed at sign-up",
        "Forklift certification (CPCS/NPORS) where relevant",
        "Driving licence checks for driving roles",
        "PPE and safety footwear per gig listing",
        "Ratings from previous shifts visible to you",
      ]}
      useCases={[
        { title: "Peak season surges", desc: "Black Friday, Christmas or summer peaks — add dozens of pickers and loaders for exactly the weeks you need them." },
        { title: "Absence & no-show cover", desc: "Someone calls in sick at 6am? Repost the gig and have confirmed cover before the first van leaves." },
        { title: "Inventory counts", desc: "Bring in extra counters and stock clerks for stocktakes without disturbing your core rota." },
        { title: "New site openings", desc: "Staff a new depot or fulfilment point with local workers from day one, then right-size after launch." },
      ]}
      steps={[
        { num: "01", title: "Post your shift", desc: "Set the role, pay, location pin, shift times and how many workers you need — it takes about three minutes." },
        { num: "02", title: "Confirm your crew", desc: "Review applications from nearby vetted workers, check ratings and certifications, confirm your picks." },
        { num: "03", title: "Run the shift & pay automatically", desc: "Track attendance in the app. Workers are paid within 5–7 days; you only ever pay our flat 2% fee on top." },
      ]}
      testimonials={[
        { name: "James M.", role: "Warehouse Manager, Manchester", initials: "JM", tone: "bg-blue-50 text-[#185FA5]", text: "We filled three last-minute shifts in under an hour. The workers turned up exactly as described and knew the plan from the app." },
        { name: "Sophie L.", role: "Transport Coordinator, Birmingham", initials: "SL", tone: "bg-orange-50 text-[#854F0B]", text: "Peak season used to mean begging agencies for drivers. This year I posted four weeks of routes and built a bench of regulars by week one." },
        { name: "Mark D.", role: "Depot Supervisor, Leeds", initials: "MD", tone: "bg-green-50 text-[#3B6D11]", text: "The certification badges save me so much hassle — I can see who's forklift-qualified before they even apply." },
      ]}
      faqs={[
        { q: "How fast can I get someone on site?", a: "Many same-day gigs are filled within two to three hours of posting. For planned peaks, post a week ahead to build your bench early." },
        { q: "Are forklift operators properly certified?", a: "Yes. Certification (CPCS/NPORS) is checked during verification and displayed on their profile before you hire." },
        { q: "Can I book the same workers regularly?", a: "That's the norm. Workers can follow your business so they're notified first about new shifts, building a reliable regular crew." },
        { q: "Do workers have their own transport for early starts?", a: "Many do, especially outside city centres — but check the gig applications or ask in chat if public transport access matters for your location." },
        { q: "Do you cover nights and weekends?", a: "Yes. Post any pattern you run; night-shift listings typically carry a pay premium which you set yourself." },
        { q: "What if a worker doesn't show up?", a: "You aren't charged for unworked shifts, and ratings make no-shows rare. Repost instantly from your history to backfill." },
        { q: "Do you handle payroll for temps?", a: "Fully. Timesheets are approved in-app, invoices are generated automatically and workers are paid within 5–7 days via Stripe." },
        { q: "What areas do you cover?", a: "Workers and gigs are matched by distance — set your location pin and radius, and only workers who can genuinely reach you apply." },
      ]}
      related={[
        { label: "Finance & accounting", path: "/business/industries/finance" },
        { label: "Labour & trades", path: "/business/industries/labour" },
        { label: "IT & tech", path: "/business/industries/it" },
      ]}
      ctaTitle="Need warehouse or driving cover fast?"
      ctaText="Post a gig and get matched with logistics workers near you within hours."
    />
  );
}
