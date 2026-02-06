import React from 'react';

const ProfileCompleteHirerAlert = ({ profile, role, navigate }) => {

    // Return the JSX
    return (
        <>
            {role === 'emp' && profile && (
                <div className="space-y-3 mb-6">
                    {/* Business Name Warning */}
                    {!profile.business_name && (
                        <div className="flex items-center justify-between p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg shadow-sm">
                            <div className="flex items-center">
                                <span className="text-orange-600 mr-3">⚠️</span>
                                <p className="text-sm text-orange-800">
                                    <span className="font-bold">Profile Incomplete:</span> Your business name is missing. 
                                    Workers cannot see your company.
                                </p>
                            </div>
                            <button 
                                onClick={() => navigate("/hirer-profile")}
                                className="text-sm font-bold text-orange-600 hover:text-orange-800 underline px-3"
                            >
                                Fix Now
                            </button>
                        </div>
                    )}

                    {/* Industries Warning */}
                    {(!profile.industries || profile.industries.length === 0) && (
                        <div className="flex items-center justify-between p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg shadow-sm">
                            <div className="flex items-center">
                                <span className="text-blue-600 mr-3">ℹ️</span>
                                <p className="text-sm text-blue-800">
                                    <span className="font-bold">Missing Services:</span> You haven't selected any industries. 
                                    You won't be able to find relevant workers.
                                </p>
                            </div>
                            <button 
                                onClick={() => navigate("/services")}
                                className="text-sm font-bold text-blue-600 hover:text-blue-800 underline px-3"
                            >
                                Select Industries
                            </button>
                        </div>
                    )}

                    {/* Payment Warning */}
                    {!profile.card_id && (
                        <div className="flex items-center justify-between p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-sm">
                            <div className="flex items-center">
                                <span className="text-red-600 mr-3">💳</span>
                                <p className="text-sm text-red-800">
                                    <span className="font-bold">Payment Missing:</span> Please add a payment method to hire workers and pay for tasks.
                                </p>
                            </div>
                            <button 
                                onClick={() => navigate("/stripe-card")}
                                className="text-sm font-bold text-red-600 hover:text-red-800 underline px-3"
                            >
                                Add Card
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ProfileCompleteHirerAlert;