import React from 'react'

const Test_Hire = () => {
    return (
        <section className="">
            <div className="max-w-7xl mx-auto p-7 md:p-10">

                <div className="grid grid-cols-1 md:grid-cols-2  gap-16 items-center">


                    {/* Left Content */}
                    <div className='  space-y-6'>
                        <div className=' space-y-7'>
                            <p className='font-semibold text-sm'>DIRECT HIRING</p>
                            <h2 className="text-2xl font-[400] md:text-3xl lg:text-4xl ">
                                Test. Hire. Build your team with confidence.
                            </h2>
                        </div>


                        <div>
                            <p className="mt-6 text-lg max-w-md">
                                Try candidates on the job and convert the best performers into
                                permanent hires – with less risk and more insight.
                            </p>

                            <button className="mt-8 bg-pink-600 text-sm text-white px-6 py-[12px] rounded-lg font-medium hover:bg-pink-700 transition">
                                Learn more
                            </button>
                        </div>

                    </div>


                    {/* Right Image */}
                    <div className="  flex justify-center lg:justify-end">
                        <img
                            src="https://images.prismic.io/coople/aF6Kjnfc4bHWiyL8_homepage-direct-hire-CH-EN.png?auto=format%2Ccompress&fit=crop&crop=faces%2Centropy&q=75&w=1200"
                            alt=""
                            className="rounded-2xl w-full max-w-xl object-cover"
                        />
                    </div>



                </div>
            </div>
        </section>
    )
}

export default Test_Hire