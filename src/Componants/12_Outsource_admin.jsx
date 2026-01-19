import React from 'react'

const Outsource_admin = () => {
  return (
      <section className="">
            <div className="max-w-7xl mx-auto p-7 md:p-14">

                <div className="grid grid-cols-1 md:grid-cols-2  gap-16 items-center">


                    {/* Left Image */}
                    <div className=" order-2 md:order-1 flex justify-center lg:justify-end">
                        <img
                            src="https://images.prismic.io/coople/aF222Hfc4bHWixDv_homepage-payrolling-EN.png?auto=format%2Ccompress&rect=72%2C0%2C2016%2C2016&w=1200&fit=crop&crop=faces%2Centropy&q=75"
                            alt=""
                            className="rounded-2xl w-full max-w-xl object-cover"
                        />
                    </div>



                    {/* Right  Content */}

                    <div className=' order-1 md:order-2 space-y-6'>
                        <div className=' space-y-7'>
                            <p className='font-semibold text-sm'>PAYROLLING</p>
                            <h2 className="text-2xl font-[400] md:text-3xl lg:text-4xl ">
                                Outsource admin. Reduce risks.
                            </h2>
                        </div>


                        <div>
                            <p className="mt-6 text-lg max-w-md">
                                We handle payroll, contracts and legal employment for your flexible workers –
                                saving you time, reducing liability, and keeping everything compliant.
                            </p>

                            <button className="mt-8 bg-pink-600 text-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700 transition">
                                Learn more
                            </button>
                        </div>

                    </div>




                </div>
            </div>
        </section>
  )
}

export default Outsource_admin