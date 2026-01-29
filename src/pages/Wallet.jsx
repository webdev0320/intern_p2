import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowDownLeft, ArrowUpRight } from "lucide-react";

const Wallet = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = localStorage.getItem("user_id") || 30;

  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");


  useEffect(() => {
    fetchBalance();
    fetchWalletHistory();
  }, []);

  /* ---------------- BALANCE API ---------------- */
  const fetchBalance = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/payment/checkBalance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        }
      );

      const data = await response.json();

      if (data.status === "success!") {
        setBalance(data.Balance || 0);
      }
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

      if (data.status === "success!") {
        setHistory(data.data || []);
      }
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================= HEADER ================= */}


      {/* ================= BALANCE CARD ================= */}

      <h1 className="text-xl font-bold mb-4">Wallet</h1>
        <div className="bg-white rounded-3xl shadow p-6 text-center">

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


            <button className="flex flex-col items-center text-orange-500">
              <ArrowUpRight />
              <span className="text-sm mt-1">Transfer</span>
            </button>
          </div>
        </div>

      {/* ================= WALLET HISTORY ================= */}
      <div className="px-4 mt-6 pb-10">
        {loading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        {!loading && history.length === 0 && (
          <p className="text-center text-gray-400">
            No wallet history found
          </p>
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
                        isCredit
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {isCredit ? "Credit" : "Debit"} £{" "}
                      {Number(item.amount).toFixed(2)}
                    </p>

                    <p className="text-sm text-gray-700">
                      {item.Description}
                    </p>
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
{showTopUp && (
  <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
    <div className="bg-white w-full rounded-t-3xl p-6 animate-slideUp">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Wallet Topup
        </h2>
        <button
          onClick={() => setShowTopUp(false)}
          className="text-gray-400 text-xl"
        >
          ✕
        </button>
      </div>

      {/* Amount Input */}
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

      {/* Topup Button */}
      <button
        onClick={() => {
          if (!topUpAmount || Number(topUpAmount) <= 0) {
            alert("Please enter valid amount");
            return;
          }

          console.log("Topup Amount:", topUpAmount);
          setShowTopUp(false);
        }}
        className="w-full bg-orange-500 text-white py-4 rounded-xl text-lg font-semibold shadow-lg"
      >
        Top Up
      </button>
    </div>
  </div>
)}


    </div>
  );
};

export default Wallet;
