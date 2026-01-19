import React from 'react'
import { FaRegCheckCircle } from "react-icons/fa";

const workforce_planning = () => {
    return (
        <section className="">
            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className='flex gap-3 justify-center flex-col items-center px-5'>
                    <h2 className='text-3xl text-center'>Your flexible workforce, organised. Every shift, optimised.</h2>
                    <p className='text-center'>
                        The Coople Flexwork Platform helps you structure and schedule your
                        flexible workforce efficiently – combining internal staff, payrolled
                        workers, and new talent into smart, reliable pools.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2  gap-14 items-center">


                    {/* Left Image */}
                    <div className="flex justify-center lg:justify-end">
                        <img
                            src="https://images.prismic.io/coople/aF6FP3fc4bHWiyJK_build-manage-EN-2.png?auto=format%2Ccompress&rect=210%2C0%2C1980%2C1980&w=1200&fit=crop&crop=faces%2Centropy&q=75"
                            alt=""
                            className="rounded-2xl w-full max-w-xl object-cover"
                        />
                    </div>


                    {/* Right Content */}
                    <div className='space-y-6  md:space-y-20'>
                        <h1 className="text-xl md:text-2xl lg:text-4xl text-gray-900 leading-tight">
                            Make workforce planning a competitive advantage:
                        </h1>


                        <ul className="mt-4 flex flex-col gap-3 text-sm pl-6 text-gray-700">
                            <li className="flex items-start gap-2">
                                <FaRegCheckCircle className="mt-1 " />
                                <span>Plan and schedule shifts centrally across locations and teams</span>
                            </li>

                            <li className="flex items-start gap-2">
                                <FaRegCheckCircle className="mt-1 " />
                                <span>Optimise the mix of your different staffing sources</span>
                            </li>

                            <li className="flex items-start gap-2">
                                <FaRegCheckCircle className="mt-1 " />
                                <span>Find, invite or rehire the right people</span>
                            </li>

                            <li className="flex items-start gap-2">
                                <FaRegCheckCircle className="mt-1 " />
                                <span>Ensure compliance with employment regulations when hiring external staff</span>
                            </li>
                        </ul>

                    </div>



                </div>
            </div>
        </section>
    )
}

export default workforce_planning