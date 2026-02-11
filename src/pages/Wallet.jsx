import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowDownLeft, ArrowUpRight } from "lucide-react";

const Wallet = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = localStorage.getItem("user_id") ;
  const email = localStorage.getItem("email") ;
  const role = localStorage.getItem("role") ;
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // TopUp & Transfer states
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [processing, setProcessing] = useState(false);

  // Transfer states
  const [showTransfer, setShowTransfer] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferEmail, setTransferEmail] = useState(email);
  const [transferOtpScreen, setTransferOtpScreen] = useState(false);
  const [transferId, setTransferId] = useState(null); 
  const [fromId, setFromId] = useState(null); 
  const [toId, setToId] = useState(null); 
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

  /* ---------------- HANDLE TRANSFER REQUEST ---------------- */
  const handleTransferRequest = async () => {
    if (!transferAmount || Number(transferAmount) <= 0) {
      alert("Enter valid amount");
      return;
    }
    if (!transferEmail) {
      alert("Enter receiver email");
      return;
    }

    setProcessing(true);
    try {
      // Call Balance_Transfer_Request API to send OTP

      const payloadRequest = new FormData();
      payloadRequest.append("FromEmail", localStorage.getItem("email"));
      payloadRequest.append("FromType", role);
      payloadRequest.append("RecieverEmail", transferEmail);
      payloadRequest.append("RecieverType", "self-emp");
      payloadRequest.append("amount", Number(transferAmount));

      const response = await fetch(`${BASE_URL}/api/payment/Balance_Transfer_Request`, {
        method: "POST",
        body: payloadRequest,
      });
      const data = await response.json();
      console.log("Transfer OTP response:", data);

      if (data.status === "success") {
        console.log(data);
        setShowTransfer(false);
        setTransferId(data.transferId);
        setFromId(data.From);
        setToId(data.To);
        setTransferOtpScreen(true);
      } else {
        alert(data.message || "Failed to request transfer");
      }
    } catch (error) {
      console.error("Transfer request error:", error);
      alert("Transfer request failed");
    } finally {
      setProcessing(false);
    }
  };

  /* ---------------- HANDLE TRANSFER OTP VERIFICATION ---------------- */
  const handleTransferOtpVerify = async () => {
    if (!otpInput) {
      alert("Enter OTP");
      return;
    }

     if (!transferId) {
        alert("Transfer ID not found. Please try again.");
        return;
      }

            console.log(fromId);  

    setProcessing(true);
    try {
      const payloadTransfer = new FormData();
      payloadTransfer.append("From", fromId);
      payloadTransfer.append("To", toId);
      payloadTransfer.append("FromType", role);
      payloadTransfer.append("RecieverEmail", transferEmail);
      payloadTransfer.append("RecieverType", "self-emp");
      payloadTransfer.append("amount", Number(transferAmount));
      payloadTransfer.append("Code", otpInput);
      payloadTransfer.append("transferId", transferId);

      const response = await fetch(`${BASE_URL}/api/payment/Balance_Transfer`, {
        method: "POST",
        body: payloadTransfer,
      });
      const data = await response.json();
      console.log("Transfer result:", data);

      if (data.status === "success") {
        alert("Transfer successful!");
        setTransferOtpScreen(false);
        setTransferAmount("");
        setTransferEmail("");
        setOtpInput("");
        fetchBalance();
        fetchWalletHistory();
      } else {
        alert(data.message || "Transfer failed");
      }
    } catch (error) {
      console.error("Transfer OTP verification error:", error);
      alert("Transfer failed");
    } finally {
      setProcessing(false);
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

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-xl font-bold mb-4 px-4">Wallet</h1>

      {/* ================= BALANCE CARD ================= */}
      <div className="bg-white rounded-3xl shadow p-6 text-center mx-4">
        <h2 className="text-2xl font-bold text-orange-600 mt-1">
          Balance : £ {Number(balance).toFixed(2)}
        </h2>

        <div className="flex justify-around mt-6">
          <button
            onClick={() => setShowTopUp(true)}
            className="flex flex-col items-center text-orange-500"
          >
            <ArrowDownLeft />
            <span className="text-sm mt-1">Top Up</span>
          </button>

          <button
            onClick={() => setShowTransfer(true)}
            className="flex flex-col items-center text-orange-500"
          >
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
            const isCredit = item.TransactionType?.toLowerCase() === "credit";
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

      {/* ================= TOP UP / TRANSFER MODAL ================= */}
      {(showTopUp || showOtpScreen || showTransfer || transferOtpScreen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 relative animate-slideUp">
            {/* Close button */}
            <button
              onClick={() => {
                setShowTopUp(false);
                setShowOtpScreen(false);
                setShowTransfer(false);
                setTransferOtpScreen(false);
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
                    className="w-full border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <button
                  disabled={processing}
                  onClick={handleTopUp}
                  className="w-full bg-orange-500 text-white py-4 rounded-xl text-lg font-semibold shadow-lg"
                >
                  {processing ? "Processing..." : "Send OTP"}
                </button>
              </>
            )}

            {/* Top Up OTP */}
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
                    className="w-full border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <button
                  disabled={processing}
                  onClick={handleVerifyOtp}
                  className="w-full bg-orange-500 text-white py-4 rounded-xl text-lg font-semibold shadow-lg"
                >
                  {processing ? "Processing..." : "Verify OTP & Topup"}
                </button>
              </>
            )}

            {/* Transfer Form */}
            {showTransfer && (
              <>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Wallet Transfer
                </h2>
                <div className="mb-4">
                      <label className="text-sm text-gray-600 mb-1 block">
                        Receiver Email
                      </label>
                      <input
                        type="email"
                        placeholder="Receiver Email"
                        value={transferEmail}
                        readOnly
                        className="w-full border rounded-xl px-4 py-3 text-lg bg-gray-100 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>

                <div className="mb-4">
                  <label className="text-sm text-gray-600 mb-1 block">
                    Amount
                  </label>
                  <input
                    type="number"
                    placeholder="£ 0.00"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <button
                  disabled={processing}
                  onClick={handleTransferRequest}
                  className="w-full bg-orange-500 text-white py-4 rounded-xl text-lg font-semibold shadow-lg"
                >
                  {processing ? "Processing..." : "Send OTP"}
                </button>
              </>
            )}

            {/* Transfer OTP */}
            {transferOtpScreen && (
              <>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Verify Transfer OTP
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
                    className="w-full border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <button
                  disabled={processing}
                  onClick={handleTransferOtpVerify}
                  className="w-full bg-orange-500 text-white py-4 rounded-xl text-lg font-semibold shadow-lg"
                >
                  {processing ? "Processing..." : "Verify OTP & Transfer"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
