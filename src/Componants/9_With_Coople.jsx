import React from 'react'

const With_Coople = () => {
    return (
        <section className="">
            <div className="max-w-7xl mx-auto p-7 md:p-14">
                <div className='flex gap-3 justify-center flex-col items-center p-3 md:p-8'>
                    <h2 className='md:text-3xl text-2xl font-semibold  text-start sm:text-center'>With Coople, you can quickly adapt your staffing model when business <br className='lg:block hidden' /> changes.</h2>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2  gap-5 items-center">


                    {/* Left Content */}
                    <div className='space-y-6'>
                        <div className=' space-y-5'>
                            <p className='font-bold text-sm'>WORKFORCE PLANNING</p>
                            <h2 className="text-xl md:text-2xl lg:text-4xl ">
                                Plan your own flexible team. Fill gaps fast.
                            </h2>
                        </div>


                        <div>
                            <p className="mt-6 text-gray-600 max-w-md">
                                Bring in your own flexible staff and manage them in one place.
                                If shifts go unfilled, instantly tap into Coople’s external pool 
                                of pre-vetted talent.
                            </p>

                            <button className="mt-8 bg-pink-600 text-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700 transition">
                                Learn more
                            </button>
                        </div>

                    </div>



                    {/* Right  Image */}
                    <div className="flex justify-center lg:justify-end">
                        <img
                            src="https://images.prismic.io/coople/aGPUOnfc4bHWi6jw_pools-EN.png?auto=format%2Ccompress&fit=crop&crop=faces%2Centropy&q=75&w=1200"
                            alt=""
                            className="rounded-2xl w-full max-w-xl object-cover"
                        />
                    </div>




                </div>
            </div>
        </section>
    )
}

export default With_Coople