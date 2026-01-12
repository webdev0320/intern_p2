import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header_1 from "../Componants/1_Header";

import "./../App.css";

function FindWork() {
   return (
    <div className="bg-[#fff5f5] text-gray-900">

      {/* ================= HERO ================= */}
      <section className="container mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Find flexible jobs with <span className="text-pink-600">IYouWork</span>.
          </h1>
          <p className="mt-4 text-gray-600 max-w-lg">
            Download the IYouWork Jobs app and discover flexible jobs that suit you.
          </p>
          <button className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg">
            Download the app
          </button>
        </div>

        <img
          src="src/assets/hero-image-find-work.png"
          alt="Team working"
          className="rounded-xl shadow-lg w-full"
        />
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          {[
            "Earn money with jobs that bring you closer to your goals.",
            "Endless opportunities and new experiences with every mission.",
            "Instantly find the right companies that value your skills.",
          ].map((text, i) => (
            <div key={i} className="p-6">
              <div className="text-pink-600 text-3xl mb-3">★</div>
              <p className="text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SECTORS ================= */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">
          Find suitable inserts with IYouWork
        </h2>
        <p className="text-gray-600 max-w-2xl">
          At IYouWork, you’ll find flexible assignments in logistics, hospitality,
          retail, healthcare, and office sectors.
        </p>

        <div className="flex flex-wrap gap-3 mt-6">
          {["Retail", "Office", "Hospitality", "Logistics", "Healthcare", "Airport"].map(
            (tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full border text-sm cursor-pointer hover:bg-pink-600 hover:text-white transition"
              >
                {tag}
              </span>
            )
          )}
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-10 items-center">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-2xl font-semibold mb-4">Retail</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Sales assistant</li>
              <li>• Cleaning staff</li>
              <li>• Decorator</li>
              <li>• Cashier</li>
            </ul>
            <button className="mt-6 bg-pink-600 text-white px-5 py-2 rounded-lg">
              Learn more
            </button>
          </div>

          <img
            src="src/assets/hero-image-find-work.png"
            alt="Retail"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
      </section>

      {/* ================= GET STARTED ================= */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <img
            src="src/assets/hero-image-find-work.png"
            alt="Mobile profile"
            className="rounded-xl w-full"
          />

          <div>
            <span className="text-pink-600 uppercase text-sm font-semibold">
              The first steps
            </span>
            <h2 className="text-3xl font-bold mt-2">
              Here's how to get started with IYouWork
            </h2>
            <p className="text-gray-600 mt-4">
              We support you in achieving your professional and personal goals
              through flexible work.
            </p>
            <button className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg">
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="container mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Here's how it works:</h2>

          <div className="space-y-5 text-gray-600">
            <p>
              <strong>Create your profile:</strong> Download the app and upload
              your documents.
            </p>
            <p>
              <strong>Find and apply for jobs:</strong> Browse open positions and
              apply instantly.
            </p>
            <p>
              <strong>Your assignments, your decision:</strong> Work when and
              where you want.
            </p>
            <p>
              <strong>Fair pay:</strong> Transparent salary with benefits.
            </p>
          </div>

          <button className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg">
            Download the app
          </button>
        </div>

        <img
          src="src/assets/hero-image-find-work.png"
          alt="Jobs"
          className="rounded-xl w-full"
        />
      </section>

      {/* ================= COMMUNITY ================= */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex gap-3 flex-wrap">
            {[...Array(6)].map((_, i) => (
              <img
                key={i}
                src={`/avatar-${i + 1}.jpg`}
                className="w-16 h-16 rounded-full object-cover"
              />
            ))}
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">
              Become part of the IYouWork Community
            </h2>
            <p className="text-gray-600">
              Over 800,000 registered employees who value flexibility and growth.
            </p>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">
          This is what our Coopers say
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Thanks to IYouWork, I can work flexibly and still grow professionally.",
            "Flexible hours helped me focus on what matters most.",
          ].map((quote, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow">
              <p className="italic text-gray-600">“{quote}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Find flexible jobs with IYouWork
            </h2>
            <p className="text-gray-300 mb-6">
              Get the IYouWork Jobs app and register today.
            </p>
            <button className="bg-pink-600 px-6 py-3 rounded-lg">
              Download the app
            </button>
          </div>

          <img
            src="src/assets/hero-image-find-work.png"
            alt="Calendar"
            className="rounded-xl w-full"
          />
        </div>
      </section>

    </div>
  );
}

export default FindWork;
