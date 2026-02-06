import React from 'react';

const ProfileCompleteEmpAlert = ({ profile, role, navigate }) => {

    // Return the JSX
    return (
        <>
            {role === 'self-emp' && profile && (
                <div className="space-y-3 mb-6">
                    {/* Business Name Warning */}
                    {!profile.line_manager_name && (
                        <div className="flex items-center justify-between p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg shadow-sm">
                            <div className="flex items-center">
                                <span className="text-orange-600 mr-3">⚠️</span>
                                <p className="text-sm text-orange-800">
                                    <span className="font-bold">Profile Incomplete:</span> Your Line Manager Name is missing. 
                                   Update your profile.
                                </p>
                            </div>
                            <button 
                                onClick={() => navigate("/emp-profile")}
                                className="text-sm font-bold text-orange-600 hover:text-orange-800 underline px-3"
                            >
                                Fix Now
                            </button>
                        </div>
                    )}

                    {/* Industries Warning */}
                    {(!profile.industries || profile.industries.length === 0) && (
                        <div className="flex items-center justify-between p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg shadow-sm">
                            <div className="flex items-center">
                                <span className="text-green-600 mr-3">ℹ️</span>
                                <p className="text-sm text-green-800">
                                    <span className="font-bold">Missing Services:</span> You haven't selected any industries. 
                                    You won't be able to find relevant workers.
                                </p>
                            </div>
                            <button 
                                onClick={() => navigate("/employee-services")}
                                className="text-sm font-bold text-green-600 hover:text-green-800 underline px-3"
                            >
                                Select Industries
                            </button>
                        </div>
                    )}

                    {/* Payment Warning */}
                    {!profile.stripe_account_id && (
                        <div className="flex items-center justify-between p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg shadow-sm">
                            <div className="flex items-center">
                                <span className="text-blue-600 mr-3">💳</span>
                                <p className="text-sm text-blue-800">
                                    <span className="font-bold">Connect Stripe:</span> Please add a stripe payment method to proceed.
                                </p>
                            </div>
                            <button 
                                onClick={() => navigate("/stripe-card")}
                                className="text-sm font-bold text-blue-600 hover:text-blue-800 underline px-3"
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

export default ProfileCompleteEmpAlert;