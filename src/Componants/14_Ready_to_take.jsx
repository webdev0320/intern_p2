import React from 'react'

const Ready_to_take = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-10 py-28 bg-[#2b2b2b] overflow-hidden">

      {/* ===== MOBILE TOP AVATARS (< md) ===== */}
      <div className="flex md:hidden justify-center gap-6 mb-8">
        <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-14 h-14 rounded-full" />
        <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-14 h-14 rounded-full" />
        <img src="https://randomuser.me/api/portraits/women/65.jpg" className="w-14 h-14 rounded-full" />
      </div>

      {/* ===== DESKTOP FLOATING AVATARS (md+) ===== */}
      <div className="hidden md:block">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" className="absolute left-28 top-[45%] w-16 h-16 rounded-full" />
        <img src="https://randomuser.me/api/portraits/women/44.jpg" className="absolute left-[20%] top-[100px] w-16 h-16 rounded-full" />
        <img src="https://randomuser.me/api/portraits/men/75.jpg" className="absolute left-[20%] bottom-28 w-16 h-16 rounded-full" />
        <img src="https://randomuser.me/api/portraits/women/65.jpg" className="absolute right-[20%] top-[100px] w-16 h-16 rounded-full" />
        <img src="https://randomuser.me/api/portraits/women/12.jpg" className="absolute right-28 top-[45%] w-16 h-16 rounded-full" />
        <img src="https://randomuser.me/api/portraits/men/41.jpg" className="absolute right-[20%] bottom-28 w-16 h-16 rounded-full" />
      </div>

      {/* ===== CENTER CONTENT ===== */}
      <div className="text-center max-w-2xl mx-auto px-4">
        <p className="text-sm font-semibold text-gray-300 mb-4">
          GET STARTED
        </p>

        <h1 className="text-3xl md:text-4xl font-semibold text-white leading-tight mb-6">
          Ready to take control of <br /> your workforce?
        </h1>

        <p className="text-gray-300 text-lg mb-8">
          Align labour cost with demand and boost shift
          performance – all from one platform.
        </p>

        <button className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition">
          Get started today
        </button>
      </div>

      {/* ===== MOBILE BOTTOM AVATARS (< md) ===== */}
      <div className="flex md:hidden justify-center gap-6 mt-8">
        <img src="https://randomuser.me/api/portraits/men/75.jpg" className="w-14 h-14 rounded-full" />
        <img src="https://randomuser.me/api/portraits/women/12.jpg" className="w-14 h-14 rounded-full" />
        <img src="https://randomuser.me/api/portraits/men/41.jpg" className="w-14 h-14 rounded-full" />
      </div>

    </section>
  )
}

export default Ready_to_take
