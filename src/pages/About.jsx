import React from 'react'
import logo from "../assets/logo_p2.png"

const About = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-start md:px-16 py-10">
      {/* Logo */}
        <div className="flex justify-center w-full mb-8">
          <img
            src={logo}
            alt="IYouWork Logo"
            className="h-16 w-auto "
          />
        </div>
      <div className="">
        

        {/* Our Story Section */}
        <section className="mb-12 bg-gray-300 rounded-2xl shadow-lg p-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            In 2016, the Brexit Referendum was announced, which paved the way to
            severe unemployment in the UK. Ever since then, the increasing
            employment gap in the country started pushing the UK economy towards
            turmoil. Passionate about changing the UK's future, the founder of
            IYouWork wondered whether there was a way to eliminate unemployment
            in the country. Eventually, he came up with the idea of IYouWork - a
            platform that connects the UK population with reliable work
            opportunities and businesses with a talented workforce. By the time
            the idea of IYouWork matured, the whole world got kidnapped by
            Covid-19. Getting hit by another unforeseen circumstance only
            strengthened the founder's goal. He advanced towards his objective
            with renewed determination and enthusiasm, striving hard to position
            IYouWork as the saving grace of the UK. With the creation of
            IYouWork, things started looking up for unemployed people and
            businesses struggling with losing revenue. Not enough work
            opportunities available? Connect with IYouWork. Not enough skilled
            and unskilled workforce available? Connect with IYouWork. Eventually,
            the platform started gaining abundant freelancing talent; IYouWork
            became every person's go-to. The digital platform bridged the gap
            between Workers (finding work) and hirers (finding workforce) by
            connecting them in just a few clicks!
          </p>
        </section>

        {/* Our Aim Section */}
        <section className='bg-gray-300 rounded-2xl shadow-lg p-12'>
          <h2 className="text-3xl font-bold mb-6 text-center">Our Aim</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            IYouWork aims to contribute towards the social community and extend
            support to the UK economy by ensuring that the right businesses get
            connected with the right Workers at the right time.
          </p>
        </section>
      </div>
    </div>
  )
}

export default About
 