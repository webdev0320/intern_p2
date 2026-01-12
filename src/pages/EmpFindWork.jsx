import React, { useState } from "react";

const EmpFindWork = () => {
    const [payRate, setPayRate] = useState(50);
    const [distance, setDistance] = useState(50);
    const [remote, setRemote] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Filters Section */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-end">

                    {/* Dropdown */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Select Work
                        </label>
                        <select className="w-full border rounded-lg px-3 py-2">
                            <option>Web Developer</option>
                            <option>Designer</option>
                            <option>Electrician</option>
                            <option>Plumber</option>
                        </select>
                    </div>

                    {/* Pay Rate */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Pay Rate (£/hr): <span className="text-blue-600">£{payRate}</span>
                        </label>
                        <input
                            type="range"
                            min="10"
                            max="50"
                            value={payRate}
                            onChange={(e) => setPayRate(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    {/* Distance */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Distance: <span className="text-blue-600">{distance} miles</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    {/* Remote Checkbox */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={remote}
                            onChange={() => setRemote(!remote)}
                            className="w-5 h-5"
                        />
                        <label className="text-sm font-medium">
                            Remote Work
                        </label>
                    </div>

                </div>
            </div>

            {/* Location + Map Section */}
            <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">

                {/* Location Text */}
                <div className="p-4 border-b">
                    <p className="text-sm text-gray-600">📍 Location</p>
                    <h2 className="text-lg font-semibold">
                        J42J+P72, Street 17, New Gulzar-e-Quaid, Islamabad
                    </h2>
                </div>

                {/* Map */}
                <div className="h-[500px]">
                    <iframe
                        title="map"
                        src="https://maps.google.com/maps?q=Islamabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        className="w-full h-full border-0"
                    ></iframe>
                </div>

            </div>

        </div>
    );
};

export default EmpFindWork;
