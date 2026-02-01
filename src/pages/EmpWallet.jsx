import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowDownLeft, ArrowUpRight } from "lucide-react";

const EmpWallet = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = localStorage.getItem("user_id") || 30;

  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // TopUp & OTP states
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const DEFAULT_OTP = "1234";
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchBalance();
    fetchWalletHistory();
  }, []);

  /* ---------------- BALANCE API ---------------- */
  const fetchBalance = async () => {
    try {
      const payload = new FormData();
      payload.append("user_id", userId);

      const response = await fetch(`${BASE_URL}/api/payment/checkBalance`, {
        method: "POST",
        body: payload,
      });

      const data = await response.json();
      if (data.status === "success!") setBalance(data.Balance || 0);
    } catch (error) {
      console.error("Balance error:", error);
    }
  };

  /* ---------------- WALLET HISTORY API ---------------- */
  const fetchWalletHistory = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/users/walletHistory?user_id=${userId}`
      );
      const data = await response.json();
      if (data.status === "success!") setHistory(data.data || []);
    } catch (error) {
      console.error("History error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DATE FORMAT ---------------- */
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* ---------------- HANDLE TOPUP ---------------- */
  const handleTopUp = async () => {
    if (!topUpAmount || Number(topUpAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setProcessing(true);
    try {
      // Call Send_Otp API
      const response = await fetch(`${BASE_URL}/api/payment/Send_Otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });
      const data = await response.json();
      console.log("OTP sent response:", data);

      // Show OTP screen
      setShowTopUp(false);
      setShowOtpScreen(true);
    } catch (error) {
      console.error("Send OTP error:", error);
      alert("Failed to send OTP");
    } finally {
      setProcessing(false);
    }
  };

  /* ---------------- HANDLE OTP VERIFICATION ---------------- */
  const handleVerifyOtp = async () => {
    if (otpInput !== DEFAULT_OTP) {
      alert("Invalid OTP");
      return;
    }

    setProcessing(true);
    try {

       const payload = new FormData();
      payload.append("user_id", userId);
      payload.append("amount", Number(topUpAmount));
      payload.append("otp", otpInput);


      const response = await fetch(`${BASE_URL}/api/payment/walletCharge`, {
        method: "POST",
        body: payload,
      });
      const data = await response.json();
      console.log("Wallet charged:", data);

      if (data.status === "success!") {
        alert("Wallet topped up successfully!");
        setShowOtpScreen(false);
        setTopUpAmount("");
        setOtpInput("");
        fetchBalance();
        fetchWalletHistory();
        window.location.reload();
      } else {
        alert("Wallet top-up failed");
      }
    } catch (error) {
      console.error("WalletCharge error:", error);
      alert("Wallet top-up failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================= HEADER ================= */}
      <h1 className="text-xl font-bold mb-4 px-4">Wallet</h1>

      {/* ================= BALANCE CARD ================= */}
      <div className="bg-white rounded-3xl shadow p-6 text-center mx-4">
        <h2 className="text-2xl font-bold text-blue-600 mt-1">
          Balance : £ {Number(balance).toFixed(2)}
        </h2>

        <div className="flex justify-around mt-6">
          <button
            onClick={() => setShowTopUp(true)}
            className="flex flex-col items-center text-blue-500"
          >
            <ArrowDownLeft />
            <span className="text-sm mt-1">Withdraw</span>
          </button>

          <button className="flex flex-col items-center text-blue-500">
            <ArrowUpRight />
            <span className="text-sm mt-1">Transfer</span>
          </button>
        </div>
      </div>

      {/* ================= WALLET HISTORY ================= */}
      <div className="px-4 mt-6 pb-10">
        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {!loading && history.length === 0 && (
          <p className="text-center text-gray-400">No wallet history found</p>
        )}

        <div className="space-y-3">
          {history.map((item, index) => {
            const isCredit =
              item.TransactionType?.toLowerCase() === "credit";
            return (
              <div
                key={index}
                className={`rounded-xl p-4 flex justify-between items-start ${
                  isCredit ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <div className="flex gap-3">
                  {isCredit ? (
                    <ArrowDownLeft className="text-green-600 mt-1" />
                  ) : (
                    <ArrowUpRight className="text-red-600 mt-1" />
                  )}

                  <div>
                    <p
                      className={`font-semibold ${
                        isCredit ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {isCredit ? "Credit" : "Debit"} £{" "}
                      {Number(item.amount).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-700">{item.Description}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 whitespace-nowrap">
                  {formatDate(item.datetime)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= TOP UP MODAL ================= */}
      {(showTopUp || showOtpScreen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 relative animate-slideUp">
            {/* Close button */}
            <button
              onClick={() => {
                setShowTopUp(false);
                setShowOtpScreen(false);
              }}
              className="absolute top-4 right-4 text-gray-400 text-xl"
            >
              ✕
            </button>

            {/* Top Up Form */}
            {showTopUp && (
              <>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Wallet Topup
                </h2>
                <div className="mb-4">
                  <label className="text-sm text-gray-600 mb-1 block">
                    Enter Amount
                  </label>
                  <input
                    type="number"
                    placeholder="£ 0.00"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    className="w-full border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <button
                  disabled={processing}
                  onClick={handleTopUp}
                  className="w-full bg-blue-500 text-white py-4 rounded-xl text-lg font-semibold shadow-lg"
                >
                  {processing ? "Processing..." : "Send OTP"}
                </button>
              </>
            )}

            {/* OTP Verification */}
            {showOtpScreen && (
              <>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Verify OTP
                </h2>
                <div className="mb-4">
                  <label className="text-sm text-gray-600 mb-1 block">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    className="w-full border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <button
                  disabled={processing}
                  onClick={handleVerifyOtp}
                  className="w-full bg-blue-500 text-white py-4 rounded-xl text-lg font-semibold shadow-lg"
                >
                  {processing ? "Processing..." : "Verify OTP & Topup"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpWallet;
