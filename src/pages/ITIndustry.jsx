import { Cpu, MonitorSmartphone, ServerCog, Clock, ShieldCheck, Users, Headset, Network, Bug, LaptopMinimal } from "lucide-react";
import IndustryLayout from "../Componants/IndustryLayout.jsx";

const theme = {
  heroBg: "from-blue-50",
  badge: "bg-blue-100 text-[#185FA5]",
  accent: "text-[#185FA5]",
  iconBox: "bg-blue-50 text-[#185FA5]",
};

export default function ITIndustry() {
  return (
    <IndustryLayout
      theme={theme}
      icon={Cpu}
      badgeLabel="IT & Tech"
      title="IT & technology staffing"
      intro="Support technicians, helpdesk analysts, developers and network engineers — skills-checked contractors available same-day, on-site or remote."
      introParas={[
        "Tech problems don't respect headcount plans. A helpdesk queue triples after a patch Tuesday, a network upgrade needs three specialist days you don't have in-house, and recruitment for permanent engineers takes months you can't afford. Contractors solve the timing problem — but agencies typically take cut of 20–50% on day rates.",
        "iyouwork removes the middleman markup. Post the role with the stack, the outcome and whether it's remote or on-site, and receive applications from contractors whose certifications, assessments and contract history are already verified. Chat before confirming; hire by the shift, the week or a recurring pattern.",
        "The economics are simple: the contractor receives every penny of your advertised rate, invoices generate automatically, and our entire fee is a flat 2% per completed gig."
      ]}
      stats={[
        { val: "340+", label: "Active IT gigs" },
        { val: "£15–45/hr", label: "Average pay range" },
        { val: "95%", label: "Fill rate" },
        { val: "4.8★", label: "Average hirer rating" },
      ]}
      benefits={[
        { icon: Clock, title: "Rapid deployment", desc: "System down or project behind? Vetted IT contractors can start same-day — remote or at your office." },
        { icon: ShieldCheck, title: "Skills verified", desc: "Certifications and hands-on assessments are completed before a profile can apply to your gigs." },
        { icon: ServerCog, title: "Any engagement length", desc: "One helpdesk shift, a two-week migration or ongoing maintenance days — book exactly what you need." },
        { icon: Users, title: "Scale your tech team", desc: "Add specialists precisely when workloads spike, without the lead time of permanent hiring." },
      ]}
      rates={[
        { role: "Helpdesk analyst (1st line)", rate: "£15–17/hr", note: "Ticket triage, password resets, phone support" },
        { role: "IT support technician", rate: "£18–22/hr", note: "On-site deskside support and hardware swaps" },
        { role: "Network engineer", rate: "£28–35/hr", note: "Switching, routing, firewalls and site installs" },
        { role: "Web / software developer", rate: "£30–45/hr", note: "Feature work, fixes and integrations by the day" },
        { role: "QA tester", rate: "£20–26/hr", note: "Manual test cycles and regression passes" },
      ]}
      roleSpotlights={[
        { icon: Headset, title: "Helpdesk analyst", desc: "First-line triage: logs, categorises and resolves tickets, escalates correctly and keeps users updated — the front door of your IT function." },
        { icon: MonitorSmartphone, title: "IT support technician", desc: "Deskside hero: hardware swaps, device setup, printer diplomacy and hands-on fixes across your office or estate." },
        { icon: Network, title: "Network engineer", desc: "Designs and implements switching, routing, firewall and Wi-Fi changes — then documents everything for your team." },
        { icon: Bug, title: "QA tester", desc: "Runs structured manual test cycles, logs reproducible defects and gives developers clean regression coverage before release." },
      ]}
      roles={["IT Support Technicians", "Helpdesk Analysts", "Network Engineers", "Web Developers", "Software Developers", "Data Entry Specialists", "System Administrators", "QA Testers", "Cloud Support Engineers", "IT Procurement Assistants"]}
      requirements={[
        "Right-to-work verification",
        "Certifications checked (CompTIA, Microsoft, Cisco)",
        "Role-relevant skills assessments passed",
        "Two professional references confirmed",
        "Platform confidentiality terms accepted",
        "Ratings from previous contracts visible to you",
      ]}
      useCases={[
        { title: "Outage & incident cover", desc: "Surge capacity when tickets pile up — bring in experienced first- and second-line engineers for the days you need them." },
        { title: "Project backfill", desc: "Keep sprints moving while your permanent devs focus on delivery — testers and support covered." },
        { title: "Office moves & rollouts", desc: "Desk moves, hardware refreshes and new-site network setups handled by teams booked per phase." },
        { title: "Specialist expertise", desc: "Need a firewall migration or an integration built? Hire niche skills for a few days instead of a salary." },
      ]}
      steps={[
        { num: "01", title: "Post the role", desc: "Describe the stack, the outcome you need and whether it's remote or on-site. Set your rate — hourly or daily." },
        { num: "02", title: "Review verified talent", desc: "Applicants arrive with assessed skills, certifications and ratings from previous contracts visible." },
        { num: "03", title: "Start & pay per completion", desc: "They start fast; invoices generate automatically. You pay the agreed rate plus our flat 2% fee. That's all." },
      ]}
      testimonials={[
        { name: "Daniel O.", role: "CTO, Fintech Startup, London", initials: "DO", tone: "bg-orange-50 text-[#854F0B]", text: "We needed QA cover for a six-week release push. Two testers applied within an hour and slotted straight into our process." },
        { name: "Fiona W.", role: "Operations Manager, Leeds", initials: "FW", tone: "bg-green-50 text-[#3B6D11]", text: "Our office move needed three days of deskside support. Booked it as one gig — cables, kit and confusion all handled." },
        { name: "Marcus H.", role: "IT Manager, Retail Group, Bristol", initials: "MH", tone: "bg-red-50 text-[#993C1D]", text: "A certified network engineer did in two days what a quote from our usual supplier priced at two weeks. The 2% fee is nothing compared to agency margins." },
      ]}
      faqs={[
        { q: "How are IT skills verified?", a: "Role-relevant assessments plus certification checks (CompTIA, Microsoft, Cisco and similar) are completed during verification and shown on profiles." },
        { q: "Can engagements be fully remote?", a: "Yes — many gigs are remote-first. Specify in the listing what's required; workers filter accordingly." },
        { q: "Do contractors use their own equipment?", a: "For remote work, usually yes — state any minimum requirements (laptop spec, headset, secure connection) in the listing. On-site roles use your equipment." },
        { q: "What about NDAs and access control?", a: "Workers accept platform confidentiality terms, and you can require your own NDA before granting any system access." },
        { q: "Can we book someone for months?", a: "Absolutely. Recurring bookings are common — from two days a week to full-time-length coverage built from confirmed shifts." },
        { q: "Do you offer background or security-cleared staff?", a: "Workers' identity and history are verified on-platform; if a specific clearance level is required, list it in the gig so only suitable applicants respond." },
        { q: "What if the work isn't satisfactory?", a: "Raise it through the resolution centre with your evidence. Payments are tied to completed shifts, and ratings keep quality transparent for everyone." },
        { q: "What does it cost compared to agencies?", a: "No placement fees or agency margins: you set the rate, the worker gets all of it, and our service fee is a flat 2% per completed gig." },
      ]}
      related={[
        { label: "Logistics & delivery", path: "/business/industries/logistics" },
        { label: "Finance & accounting", path: "/business/industries/finance" },
        { label: "Labour & trades", path: "/business/industries/labour" },
      ]}
      ctaTitle="Need tech talent fast?"
      ctaText="Post a gig and get matched with vetted IT contractors within hours — on-site or remote."
    />
  );
}
