import React from 'react'
import hero_img from "../assets/hero_img.jpg"

const Hero_2 = () => {
    return (
        <section className="bg-[#fdf3f5]">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                    {/* Left Content */}
                    <div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-[400] text-gray-900 leading-tight">
                            The right worker for <br className='md:block hidden' />
                            every shift - <br className='md:block hidden' />
                            effortlessly.
                        </h1>


                        <p className="mt-6 text-gray-700 text-lg max-w-xl">
                            With Coople’s Flexwork Platform, you perfect your staffing for maximum productivity and minimum cost.
                        </p>


                        <button className="btn-primary mt-3 ">
                            Get started
                        </button>
                    </div>


                    {/* Right Image */}
                    <div className="flex justify-center lg:justify-end">
                        <img
                            src={hero_img}
                            alt="Working together"
                            className="rounded-2xl w-full max-w-xl object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero_2