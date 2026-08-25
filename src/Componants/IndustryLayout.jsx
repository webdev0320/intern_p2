import { motion } from "framer-motion";
import { Check, ChevronDown, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function IndustryLayout({
  theme,
  icon: BadgeIcon,
  badgeLabel,
  title,
  intro,
  introParas = [],
  stats,
  benefits,
  roles,
  rates,
  roleSpotlights = [],
  requirements = [],
  useCases,
  steps,
  testimonials = [],
  faqs,
  related = [],
  ctaTitle,
  ctaText,
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className={`py-20 bg-gradient-to-b ${theme.heroBg} to-white`}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className={`inline-flex items-center gap-2 ${theme.badge} px-4 py-2 rounded-full text-sm font-semibold mb-6`}>
              <BadgeIcon className="h-4 w-4" /> {badgeLabel}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{intro}</p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to="/signup/hirer" className="inline-block bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors no-underline">
                Post a gig
              </Link>
              <Link to="/business/pricing" className="inline-block border-2 border-gray-300 text-gray-900 hover:bg-gray-50 px-8 py-3 rounded-lg font-bold text-lg transition-colors no-underline">
                View pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="text-center">
              <div className={`text-2xl md:text-3xl font-extrabold ${theme.accent}`}>{s.val}</div>
              <div className="text-sm text-gray-600 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      {introParas.length > 0 && (
        <section className="py-16 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Flexible {badgeLabel.toLowerCase()} staffing, explained</h2>
          <div className="space-y-5">
            {introParas.map((para, i) => (
              <p key={i} className="text-gray-600 leading-relaxed">{para}</p>
            ))}
          </div>
        </section>
      )}

      {/* Benefits */}
      <section className={`py-16 ${introParas.length === 0 ? "max-w-6xl mx-auto px-4" : "bg-gray-50 border-y border-gray-200"}`}>
        <div className={introParas.length > 0 ? "max-w-6xl mx-auto px-4" : ""}>
          <h2 className="text-3xl font-bold text-center mb-4">Why businesses hire here</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">The advantages of flexible staffing through iyouwork in this sector.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-4 items-start bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className={`${theme.iconBox} p-3 rounded-lg flex-shrink-0`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Typical rates */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Typical rates &amp; shifts</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">Indicative pay for common roles — set whatever rate the market needs.</p>
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
          {rates.map((row, i) => (
            <div key={row.role} className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-6 py-4 ${i < rates.length - 1 ? "border-b border-gray-100" : ""}`}>
              <span className="text-sm font-bold text-gray-900 sm:w-56 flex-shrink-0">{row.role}</span>
              <span className={`text-sm font-extrabold sm:w-24 flex-shrink-0 ${theme.accent}`}>{row.rate}</span>
              <span className="text-sm text-gray-500">{row.note}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Role spotlights */}
      {roleSpotlights.length > 0 && (
        <section className="py-16 bg-gray-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Key roles in detail</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">What these professionals actually do on a shift with your business.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {roleSpotlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white rounded-2xl border border-gray-200 p-6"
                >
                  <div className={`${theme.iconBox} w-fit p-3 rounded-lg mb-4`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Roles */}
      <section className="py-16 max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Roles we cover</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {roles.map((role, i) => (
            <motion.span
              key={role}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="bg-white border border-gray-200 px-5 py-2.5 rounded-full text-sm font-medium text-gray-700 hover:border-[#E87722] hover:text-[#E87722] transition-colors"
            >
              {role}
            </motion.span>
          ))}
        </div>
      </section>

      {/* Requirements */}
      {requirements.length > 0 && (
        <section className="py-16 bg-gray-50 border-y border-gray-200">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Checks &amp; requirements we handle</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
              Every worker in this sector is verified against these before they can apply to your gigs.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
              {requirements.map((req, i) => (
                <motion.div key={req} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }} className="flex items-start gap-3">
                  <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${theme.accent}`} />
                  <span className="text-sm text-gray-700">{req}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Use cases */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">When businesses call on us</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">Common reasons companies in this sector post gigs.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white border border-gray-200 rounded-2xl p-6"
            >
              <Check className={`h-5 w-5 mb-3 ${theme.accent}`} />
              <h3 className="font-bold text-gray-900 mb-1.5">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm"
              >
                <span className="bg-[#E87722]/10 text-[#E87722] font-bold inline-block px-4 py-2 rounded-full mb-5">{step.num}</span>
                <h3 className="font-bold text-gray-900 text-xl mb-2">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted in this sector</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
              >
                <div className="flex text-[#E87722] mb-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 italic mb-6">"{t.text}"</blockquote>
                <figcaption className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${t.tone} flex items-center justify-center font-bold`}>{t.initials}</div>
                  <div>
                    <div className="font-bold text-gray-900">{t.name}</div>
                    <span className="text-sm text-gray-500">{t.role}</span>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className={`py-16 ${testimonials.length > 0 ? "bg-gray-50 border-y border-gray-200" : "max-w-3xl mx-auto"}`}>
        <div className={testimonials.length > 0 ? "max-w-3xl mx-auto px-4" : "px-4"}>
          <h2 className="text-3xl font-bold text-center mb-10">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.details
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 font-bold text-gray-900 [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-6 pb-6 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Worker band */}
      <section className="py-14 bg-[#1A6FB8]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Looking for {badgeLabel.toLowerCase()} work instead?</h2>
          <p className="text-blue-100 mb-8">Create a free worker profile and get notified about {badgeLabel.toLowerCase()} gigs near you.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup/worker" className="inline-block bg-white text-[#1A6FB8] hover:bg-blue-50 px-8 py-3 rounded-lg font-bold transition-colors no-underline">
              Join as a worker
            </Link>
            <Link to="/workers/find-work" className="inline-block border-2 border-white/60 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-bold transition-colors no-underline">
              How finding work works
            </Link>
          </div>
        </div>
      </section>

      {/* Related industries */}
      {related.length > 0 && (
        <section className="py-12 max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Staffing in other industries</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {related.map((r) => (
              <Link key={r.path} to={r.path} className="inline-block bg-gray-100 hover:bg-gray-200 px-5 py-2.5 rounded-full text-sm font-medium text-gray-700 transition-colors no-underline">
                {r.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pb-20 pt-4 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">{ctaTitle}</h2>
        <p className="text-gray-600 mb-8">{ctaText}</p>
        <Link to="/post-job" className="inline-block bg-[#E87722] hover:bg-[#d6691c] text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors no-underline">
          Post a gig now
        </Link>
      </section>
    </div>
  );
}
