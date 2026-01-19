import React from 'react'

const What_workforce = () => {
  return (
    <section className="bg-[#fdf3f5]">
      <div className="max-w-7xl mx-auto md:px-10 md:py-16 p-10 grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-12">

        {/* Left Content */}
        <div>
          <h2 className="text-4xl font-semibold text-gray-900 leading-snug">
            What workforce
            success looks like in
            practice.
          </h2>

          <p className="mt-6 text-gray-600 max-w-md">
            See how companies like yours reduce labour cost, boost flexibility,
            and simplify operations with Cooople.
          </p>

          <button className="mt-8 bg-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700 transition">
            Discover more
          </button>
        </div>

        {/* Testimonial 1 */}
        <div className="  p-2 ">
          <div className="mb-6">
            <img
              src="https://images.prismic.io/coople/aF6KJ3fc4bHWiyLz_VivaleNeuhegi.png?auto=format%2Ccompress&fit=max&w=750"
              alt="ZFV"
              className="w-[300px] h-32"
            />
          </div>
          <h1 className='text-[80px] -mt-10'>“</h1>
          <p className=" leading-5 -mt-14 text-sm">
           Scheduling and hiring temporary staff via the platform is extremely easy and efficient.
            The temporary workers we have available through Coople are very reliable and do an excellent
             job.
          </p>

          <p className="mt-6  font-semibold text-[10px]">
           - Clelia Hendl, Head of residential group 1, Vivale Neuhegi Winterthur
          </p>
        </div>

        {/* Testimonial 2 */}
        <div className="  p-2 ">
          <div className="mb-6">
            <img
              src="https://images.prismic.io/coople/aF6KKHfc4bHWiyL0_zfv.png?auto=format%2Ccompress&fit=max&w=750"
              alt="ZFV"
              className="w-[300px] h-32"
            />
          </div>
          <h1 className='text-[80px] -mt-10'>“</h1>
          <p className=" leading-5 -mt-14 text-sm">
            We have had an exclusive partnership with Cooople – formerly Staff
            Finder – for over 10 years. Our long-standing cooperation is based on
            mutual transparency, humanity, professionalism and loyalty.
          </p>

          <p className="mt-6  font-semibold text-[10px]">
            – Angela Tauro, CPO, Cooperative ZFV
          </p>
        </div>

      </div>
    </section>
  )
}

export default What_workforce