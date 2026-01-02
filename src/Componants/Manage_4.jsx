import React from 'react'
import { GiCheckMark } from "react-icons/gi";

const Manage_4 = () => {
    return (
        <section className="bg-[#fdf3f5]">
            <div className="max-w-7xl mx-auto px-6 py-20">

                <div className='grid md:grid-cols-3 sm:grid-cols-2   gap-6 text-xl md:px-20 px-5'>
                    <div className='flex items-start gap-3'>
                        <GiCheckMark className='mt-1 text-green-500 w-10 ' />
                        <p>Manage internal and external worker pools in one simple <br className='md:block hidden' /> platform</p>
                    </div>
                    <div className='flex items-start gap-3'>
                        <GiCheckMark className='mt-1 text-green-500 w-10 ' />
                        <p>End-to-end platform with planning, hiring, scheduling, and <br className='md:block hidden' /> payroll tools.</p>
                    </div>
                    <div className='flex items-start gap-3'>
                        <GiCheckMark className='mt-1 text-green-500 w-10 ' />
                        <p>Instant access to 800,000+ flexible workers, ready when you <br className='md:block hidden' /> need them.</p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Manage_4
