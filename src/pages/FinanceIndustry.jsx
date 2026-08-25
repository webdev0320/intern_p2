import { Coins, TrendingUp, Users, ShieldCheck, Clock, Laptop, Calculator, Landmark, PhoneCall, LineChart } from "lucide-react";
import IndustryLayout from "../Componants/IndustryLayout.jsx";

const theme = {
  heroBg: "from-orange-50",
  badge: "bg-orange-100 text-[#854F0B]",
  accent: "text-[#854F0B]",
  iconBox: "bg-orange-50 text-[#854F0B]",
};

export default function FinanceIndustry() {
  return (
    <IndustryLayout
      theme={theme}
      icon={Coins}
      badgeLabel="Finance & Accounting"
      title="Finance & accounting staffing"
      intro="Skilled bookkeepers, payroll specialists, credit controllers and analysts — vetted, software-savvy and ready to start at short notice."
      introParas={[
        "Finance workloads don't arrive evenly. Month-end close, quarterly VAT, year-end audit and payroll deadlines pile pressure onto teams that are perfectly sized for the quiet weeks — and then hope for the best during the loud ones. Traditional agencies charge 15–30% markups to plug those gaps, with minimum engagement lengths and weeks of lead time.",
        "iyouwork works differently. Post exactly the finance help you need — a payroll specialist for three days at month-end, a credit controller two days a week, an analyst for audit season — and receive applications from pre-vetted professionals near you, usually within minutes. You see their software experience, qualifications and ratings before you confirm anything.",
        "And because our fee is a flat 2% added only when work is completed, flexible finance staffing finally makes financial sense. No retainers, no placement fees, no hidden margins buried in hourly rates."
      ]}
      stats={[
        { val: "180+", label: "Active finance gigs" },
        { val: "£16–28/hr", label: "Average pay range" },
        { val: "95%", label: "Fill rate" },
        { val: "4.7★", label: "Average hirer rating" },
      ]}
      benefits={[
        { icon: ShieldCheck, title: "Pre-vetted & reference-checked", desc: "Every finance worker passes identity, reference and skills checks before they can apply to your gigs." },
        { icon: Clock, title: "Rapid deployment", desc: "Month-end panic or a sudden resignation? Most finance roles are filled within 24–48 hours." },
        { icon: Laptop, title: "Platform-literate workers", desc: "Access people already trained in Xero, Sage, QuickBooks, FreeAgent and Excel-heavy workflows." },
        { icon: TrendingUp, title: "Scale with your calendar", desc: "One-day cover for year-end or a six-month contract while you hire permanently — flex both ways." },
      ]}
      rates={[
        { role: "Bookkeeper", rate: "£18/hr", note: "Day-to-day ledger management and reconciliations" },
        { role: "Accounts assistant", rate: "£17/hr", note: "Purchase/sales ledger, accruals and prepayments" },
        { role: "Payroll specialist", rate: "£22/hr", note: "Pay runs, RTI submissions, pension admin" },
        { role: "Credit controller", rate: "£16/hr", note: "Chasing aged debt and cash-collection focus" },
        { role: "Financial analyst", rate: "£28/hr", note: "Modelling, variance analysis and board packs" },
      ]}
      roleSpotlights={[
        { icon: Calculator, title: "Bookkeeper", desc: "Keeps sales and purchase ledgers accurate, reconciles bank feeds, processes invoices and prepares trial balances for your accountant." },
        { icon: Landmark, title: "Payroll specialist", desc: "Runs weekly or monthly payrolls end to end — RTI submissions, pensions enrolment, starter and leaver handling, and payslip queries." },
        { icon: PhoneCall, title: "Credit controller", desc: "Works your aged debt report with professional phone and email chasing, agrees payment plans and keeps cash flowing without burning customer goodwill." },
        { icon: LineChart, title: "Financial analyst", desc: "Builds budget-vs-actual variance reports, refreshes forecasting models and turns raw numbers into board-ready summaries." },
      ]}
      roles={["Bookkeepers", "Accounts Assistants", "Payroll Specialists", "Financial Analysts", "Tax Assistants", "Audit Clerks", "Credit Controllers", "Invoice Processors", "Purchase Ledger Clerks", "Management Accountants"]}
      requirements={[
        "Right-to-work verification",
        "Two professional references confirmed",
        "Accounting software proficiency (Xero, Sage, QuickBooks)",
        "Professional qualifications displayed (AAT, ACCA, CIMA)",
        "Role-specific skills assessments passed",
        "Platform confidentiality terms accepted",
      ]}
      useCases={[
        { title: "Month-end & year-end surges", desc: "Add extra pairs of hands exactly when your close process peaks — without carrying them all year." },
        { title: "Maternity & long-term cover", desc: "Keep payroll and receivables running smoothly through extended absences of permanent staff." },
        { title: "Audit season support", desc: "Experienced audit clerks and analysts who slot straight into busy-season workloads." },
        { title: "Growing SMEs", desc: "Get professional finance support a few days a week before committing to a full-time hire." },
      ]}
      steps={[
        { num: "01", title: "Post your finance gig", desc: "Specify the role, systems used (Xero, Sage…), rate and how long you need cover for." },
        { num: "02", title: "Review verified applicants", desc: "Compare profiles with skills assessments and ratings from previous finance engagements." },
        { num: "03", title: "Confirm & get started", desc: "Your specialist starts on-site or remote. Pay automatically after completed work — just 2% fee." },
      ]}
      testimonials={[
        { name: "Helen P.", role: "Finance Director, Leeds", initials: "HP", tone: "bg-orange-50 text-[#854F0B]", text: "Our payroll administrator left with a month's notice. We had a qualified specialist covering every pay run until the permanent replacement started." },
        { name: "Rajiv K.", role: "Practice Manager, London", initials: "RK", tone: "bg-blue-50 text-[#185FA5]", text: "Year-end used to mean overtime misery. Now we book two extra audit clerks for six weeks and everyone survives January." },
        { name: "Claire B.", role: "Business Owner, Bristol", initials: "CB", tone: "bg-green-50 text-[#3B6D11]", text: "A bookkeeper comes in every Tuesday through iyouwork. It's like having a finance department for the price of one day a week." },
      ]}
      faqs={[
        { q: "Are finance workers vetted?", a: "Yes. Identity, right-to-work, references and role-specific skills assessments are all completed before profiles can apply to your gigs." },
        { q: "Can they use our accounting software?", a: "Filter applicants by the platforms you run — Xero, QuickBooks, Sage and more appear directly on worker profiles." },
        { q: "Is this suitable for confidential work?", a: "Workers sign platform terms covering confidentiality, and you can require NDAs before granting access to your systems." },
        { q: "Can the work be done remotely?", a: "Many finance gigs are fully remote — bookkeeping, payroll processing and credit control all work well off-site. Specify your preference in the listing." },
        { q: "How do we assess someone before confirming?", a: "Chat in-app first, review their skills assessment results and check ratings from previous hirings. Many businesses also start with a single paid trial day." },
        { q: "What does it cost?", a: "Posting is free. You pay the advertised rate plus our flat 2% service fee only when work is completed — no retainers or agency markups." },
        { q: "Is there a minimum booking length?", a: "No. Book a single afternoon or a recurring weekly slot — you're never locked into more than the next confirmed shift." },
        { q: "What if someone isn't the right fit?", a: "End the engagement after any shift with no further obligation, leave honest feedback, and repost to find a better match immediately." },
      ]}
      related={[
        { label: "Logistics & delivery", path: "/business/industries/logistics" },
        { label: "Labour & trades", path: "/business/industries/labour" },
        { label: "IT & tech", path: "/business/industries/it" },
      ]}
      ctaTitle="Need finance support this month?"
      ctaText="Post a gig and get matched with vetted bookkeepers, payroll and credit control specialists in days — not weeks."
    />
  );
}
