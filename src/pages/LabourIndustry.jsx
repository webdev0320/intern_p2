import { Wrench, HardHat, Clock, ShieldCheck, Users, Hammer, Flame, Paintbrush, Ruler } from "lucide-react";
import IndustryLayout from "../Componants/IndustryLayout.jsx";

const theme = {
  heroBg: "from-green-50",
  badge: "bg-green-100 text-[#3B6D11]",
  accent: "text-[#3B6D11]",
  iconBox: "bg-green-50 text-[#3B6D11]",
};

export default function LabourIndustry() {
  return (
    <IndustryLayout
      theme={theme}
      icon={Wrench}
      badgeLabel="Labour & Trades"
      title="Labour & trades staffing"
      intro="General labourers, builders, electricians, plumbers and decorators — certified, tool-ready workers for construction sites, fit-outs and maintenance jobs."
      introParas={[
        "Construction and maintenance work is project-shaped by nature: a crew you needed all month is too many next week, and the week the handover slips you're suddenly two labourers short. Agency solutions come with heavy percentage markups and little visibility over who actually arrives at your gate.",
        "On iyouwork you post the job — one shift or a whole phase — and applications come in from local workers whose CSCS cards, trade certifications and site history are already verified. Chat before confirming if you have questions, and check ratings from other sites they've worked.",
        "Whether it's an emergency plumber call-out, three weeks of groundworks or painters for a final snagging push, you pay agreed hours plus a flat 2% fee. No placement charges, no payroll admin, no surprises."
      ]}
      stats={[
        { val: "510+", label: "Active labour gigs" },
        { val: "£12–25/hr", label: "Average pay range" },
        { val: "96%", label: "Fill rate" },
        { val: "4.8★", label: "Average hirer rating" },
      ]}
      benefits={[
        { icon: Clock, title: "Same-day cover", desc: "Absence on a deadline? Vetted labourers and tradespeople can be at your gate within hours." },
        { icon: ShieldCheck, title: "Certifications verified", desc: "CSCS cards, electrical and gas certifications are checked during sign-up and shown on profiles." },
        { icon: HardHat, title: "Site-ready", desc: "Workers arrive with their own PPE and tools where your gig listing specifies them." },
        { icon: Users, title: "Any project size", desc: "One mate for a day or a full crew for a six-week fit-out — flex the team to the job." },
      ]}
      rates={[
        { role: "General labourer", rate: "£12–13/hr", note: "Site cleanup, material handling, assisting trades" },
        { role: "Painter & decorator", rate: "£15–18/hr", note: "Prep through finish, own tools typically" },
        { role: "Carpenter / joiner", rate: "£18–22/hr", note: "Second fix, framing and finishing work" },
        { role: "Electrician", rate: "£20–24/hr", note: "Qualified to current regs, certification verified" },
        { role: "Plumber", rate: "£22–26/hr", note: "Emergency repairs through full installations" },
      ]}
      roleSpotlights={[
        { icon: Hammer, title: "General labourer", desc: "Keeps the site moving — moving materials, prepping work areas, cleaning down and assisting qualified trades wherever needed." },
        { icon: Flame, title: "Electrician", desc: "Handles installs, fault-finding and certification to current wiring regulations; qualification verified during sign-up." },
        { icon: Wrench, title: "Plumber", desc: "From burst-pipe call-outs to full bathroom installs — experienced on both emergency response and planned works." },
        { icon: Paintbrush, title: "Painter & decorator", desc: "Prepares surfaces properly, cuts clean lines and leaves finishes ready for handover, typically with own tools." },
      ]}
      roles={["General Labourers", "Builders", "Electricians", "Plumbers", "Carpenters", "Painters & Decorators", "Groundworkers", "Maintenance Technicians", "Demolition Operatives", "Plasterers", "Tilers", "Fencers"]}
      requirements={[
        "Right-to-work verification",
        "CSCS card checked where required",
        "Trade qualifications verified (electrical, gas, etc.)",
        "PPE as specified per gig listing",
        "Own tools where the listing states it",
        "References & site ratings visible to you",
      ]}
      useCases={[
        { title: "Deadline crunches", desc: "Handover next week and short on hands? Add labourers for the final push without long commitments." },
        { title: "Specialist day rates", desc: "Bring in an electrician or plumber for exactly the days their trade is needed — nothing more." },
        { title: "Maintenance contracts", desc: "Recurring gigs keep property portfolios maintained with familiar faces each visit." },
        { title: "Fit-outs & refurbs", desc: "Staff an entire refurbishment crew — groundworkers to decorators — from one platform." },
      ]}
      steps={[
        { num: "01", title: "Post the job", desc: "Describe the work, set the rate, pin the site location and list required tickets or tools." },
        { num: "02", title: "Pick your people", desc: "Review applications showing verified certifications (CSCS etc.) and ratings from past sites." },
        { num: "03", title: "Work & pay simply", desc: "Approve completed days in-app; everyone gets paid automatically. Your cost: just our flat 2% fee." },
      ]}
      testimonials={[
        { name: "Gary S.", role: "Site Manager, Manchester", initials: "GS", tone: "bg-orange-50 text-[#854F0B]", text: "Needed four labourers for a two-week push before handover. All four turned up every day, PPE sorted, and knew what was expected." },
        { name: "Aisha R.", role: "Landlord & Developer, Birmingham", initials: "AR", tone: "bg-blue-50 text-[#185FA5]", text: "I run refits between tenancies with a regular crew I found here. The same painter and carpenter have done my last five properties." },
        { name: "Neil T.", role: "Facilities Lead, Liverpool", initials: "NT", tone: "bg-red-50 text-[#993C1D]", text: "Emergency call-out used to mean ringing round. Now it's a gig posted from my phone and a certified plumber confirmed in minutes." },
      ]}
      faqs={[
        { q: "Are trade qualifications checked?", a: "Yes. CSCS cards, electrical qualifications and gas-safe registration are verified during worker sign-up and shown before you hire." },
        { q: "Do workers bring their own tools?", a: "Tradespeople generally do; general labourers usually don't. Specify exactly what's provided in the gig listing so there's no ambiguity." },
        { q: "Can I post for a multi-week project?", a: "Yes — post one recurring gig or separate phases. Many crews run whole projects as a series of confirmed bookings." },
        { q: "Do you supply materials?", a: "No — iyouwork provides the people, not materials. Order materials separately and note in the listing who supplies fixings and consumables." },
        { q: "What about site safety inductions?", a: "Run your normal induction on arrival. The gig description should note any requirements so workers come prepared." },
        { q: "What happens in bad weather?", a: "Outdoor gigs are subject to your normal site decisions — agree weather policy upfront and only approve time actually worked." },
        { q: "Is there insurance cover?", a: "Workers are self-employed professionals responsible for their own cover; many carry public liability insurance and can evidence it on request. Your listing should state any minimum cover required." },
        { q: "What does it cost me?", a: "Nothing to post. You pay agreed daily hours plus our flat 2% service fee per completed gig — no agency percentage buried in rates." },
      ]}
      related={[
        { label: "Logistics & delivery", path: "/business/industries/logistics" },
        { label: "Finance & accounting", path: "/business/industries/finance" },
        { label: "IT & tech", path: "/business/industries/it" },
      ]}
      ctaTitle="Need extra hands on site?"
      ctaText="Post a gig and get matched with vetted labourers and certified tradespeople within hours."
    />
  );
}
