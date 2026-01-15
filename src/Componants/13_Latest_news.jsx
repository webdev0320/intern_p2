import React from "react";

const Latest_news = () => {
    return (
        <section className="max-w-7xl mx-auto px-10 py-10">
            <div className=" items-center">
                {/* Header */}
                <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
                    Resources
                </p>

                <h2 className="text-4xl font-semibold text-gray-900 mb-10">
                    Latest news from Coople
                </h2>

                {/* Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[660px_1fr] lg:gap-0 gap-5">

                    {/* Left Featured Card */}
                    <div className="flex flex-col ">
                        {/* Width Controller */}
                        <div className="group max-w-[560px] cursor-pointer">
                            {/* Image */}
                            <div className="rounded-2xl overflow-hidden mb-6 h-[360px]">
                                <img
                                    src="https://images.prismic.io/coople/Z-Qt1ndAxsiBv8GQ_AdobeStock_222318855.jpeg"
                                    alt="Supermarket"
                                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                />
                            </div>

                            {/* Text */}
                            <h3 className="text-2xl font-semibold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-pink-500">
                                Switzerland’s largest supermarket chain transfers workforce
                                management for its entire student pool to Coople
                            </h3>

                            <p className="text-gray-600 mb-4">
                                In the heart of Geneva, one of Switzerland’s largest supermarket
                                chains faced a familiar challenge: managing a large student
                                workforce with th...
                            </p>

                            <p className="text-sm text-gray-500">
                                25 Mar 2025 • <span className="uppercase">Case Study</span>
                            </p>
                        </div>

                    </div>


                    {/* Right Side List */}
                    <div className="space-y-7 h-full flex flex-col ">
                        {/* Item 1 */}
                        <div className="group flex gap-4 cursor-pointer">
                            {/* Image wrapper (important for smooth zoom) */}
                            <div className="w-[150px] h-[150px] rounded-xl overflow-hidden">
                                <img
                                    src="https://images.prismic.io/coople/aD6XJ7h8WN-LVgbk_header_800k_EN.png?auto=format%2Ccompress&fit=crop&q=75&w=384"
                                    alt="Workers"
                                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                                />
                            </div>

                            {/* Text */}
                            <div className="flex flex-col justify-center">
                                <h4 className="text-2xl font-semibold text-gray-900 leading-snug transition-colors duration-300 group-hover:text-pink-500">
                                    Coople surpasses 800,000 <br /> registered workers in...
                                </h4>

                                <p className="text-sm text-gray-500 mt-2">
                                    2 Jun 2025 • <span className="uppercase">Article</span>
                                </p>
                            </div>
                        </div>


                        {/* Item 2 */}
                        <div className="group flex gap-4 cursor-pointer">
                            <div className="w-[150px] h-[150px] rounded-xl overflow-hidden">
                                <img
                                    src="https://images.prismic.io/coople/Z-QX0XdAxsiBv7x0_AdobeStock_536576628-1-.jpeg?auto=format%2Ccompress&fit=crop&q=75&w=384"
                                    alt="Office"
                                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h4 className="text-2xl font-semibold text-gray-900 leading-snug transition-colors duration-300 group-hover:text-pink-500">
                                    How Financial Times reduced <br /> their risk when hiring full-time...
                                </h4>
                                <p className="text-sm text-gray-500 mt-2">
                                    25 Mar 2025 • <span className="uppercase">Case Study</span>
                                </p>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="group flex gap-4 cursor-pointer">
                            <div className="w-[150px] h-[150px] rounded-xl overflow-hidden">
                                <img
                                    src="https://images.prismic.io/coople/Z-QVrXdAxsiBv7vX_AdobeStock_503960723.jpeg?auto=format%2Ccompress&fit=crop&q=75&w=384"
                                    alt="Warehouse"
                                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h4 className="text-2xl font-semibold text-gray-900 leading-snug transition-colors duration-300 group-hover:text-pink-500">
                                    How the RHIAG Group <br /> introduced new processes,...
                                </h4>
                                <p className="text-sm text-gray-500 mt-2">
                                    25 Mar 2025 • <span className="uppercase">Case Study</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Latest_news;
