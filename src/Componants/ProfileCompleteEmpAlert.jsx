import React from 'react';

const ProfileCompleteEmpAlert = ({ profile, role, navigate }) => {

 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
 const stripeConnect = async () => {
  try {
        console.log(profile);
    // 1️⃣ Fetch user profile
        var userId = localStorage.getItem("user_id");
        var email = localStorage.getItem("email");
        const payload = new FormData();
        payload.append("email", email);
        payload.append("country", profile?.country);
        payload.append("stripe_account_id", profile?.stripe_account_id);
        payload.append("status", "test");
        payload.append("user_id", userId);


    // 2️⃣ Check stripe_account_id

    if (profile?.stripe_account_id && profile?.stripe_auth!='not auth') {
      // ✅ Already has Stripe account → call Stripe login API
      console.log("Stripe account exists. Calling login API...");
        


        const loginResponse = await fetch(
              `${BASE_URL}/api/payment/stripe_login_link`,
              {
                method: "POST",
                body: payload,
              }
            );

            if (!loginResponse.ok) {
              throw new Error(`Stripe login API error! Status: ${loginResponse.status}`);
            }

            const loginData = await loginResponse.json();


            const stripeUrl = loginData?.chargerecord?.url;

            if (stripeUrl) {
             window.open(stripeUrl, "_blank", "noopener,noreferrer");

            } else {
              alert("Stripe login URL not found!");
            }




    } else {
      // ❌ No Stripe account → create Stripe account
      console.log("No Stripe account. Calling create Stripe account API...");

      const checkResponse = await fetch(`${BASE_URL}/api/payment/is_stripe_charge_enable`, {
        method: "POST",
        body: payload,
      });

      if (!checkResponse.ok) {
          const createResponse = await fetch(`${BASE_URL}/api/payment/create_stripe_account`, {
            method: "POST",
            body: payload,
          });

          if (!createResponse.ok) {
            throw new Error(`Create Stripe account error! Status: ${createResponse.status}`);
          }

          const createData = await createResponse.json();
          console.log("Create Stripe response:", createData);

          if (createData?.url) {
            window.location.href = createData.url; // redirect to Stripe onboarding
          } else {
            alert("Stripe account creation URL not found!");
          }
      }else{

      }  


    }
  } catch (error) {
    console.error("Stripe connect error:", error);
    alert("Something went wrong while connecting to Stripe.");
  }
};


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
                                onClick={() => {
                                                        stripeConnect();
                                }}
                                className="text-sm font-bold text-blue-600 hover:text-blue-800 underline px-3"
                            >
                                Connect Stripe
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ProfileCompleteEmpAlert;