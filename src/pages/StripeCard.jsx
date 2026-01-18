import React, { useEffect, useState } from "react";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";

const ELEMENT_OPTIONS = {
  style: {
    base: { fontSize: "16px", color: "#32325d", "::placeholder": { color: "#aab7c4" } },
    invalid: { color: "#fa755a" },
  },
};

const StripeCard = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [prevCard, setPrevCard] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = localStorage.getItem("user_id") || 17;

  // 1️⃣ Fetch previous card on page load
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/users/cardHistory?user_id=${userId}`);
        const data = await response.json();
        if (data?.data) {
          setPrevCard(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch previous card", err);
      }
    };

    fetchCard();
  }, [BASE_URL, userId]);

  // 2️⃣ Handle new card submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!stripe || !elements) return;

    setLoading(true);
    const card = elements.getElement(CardNumberElement);

    const { token, error } = await stripe.createToken(card);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append("token", token.id);
      payload.append("user_id", userId);

      const response = await fetch(`${BASE_URL}/api/users/user_card_change`, {
        method: "POST",
        body: payload,
      });

      const data = await response.json();
      console.log("Backend Response:", data);

      if (!response.ok) {
        setError(data.message || "Something went wrong!");
      } else {
        alert("Card updated successfully!");
        setPrevCard({ card: { ...data.data.card } }); // update displayed card
        setShowForm(false); // hide form after success
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Stripe Card</h1>

        {/* 3️⃣ Show previous card */}
        {prevCard ? (
          <div className="mb-6 p-4 border rounded bg-gray-50">
            <p className="text-gray-700">
              <strong>Card:</strong> **** **** **** {prevCard.card.last4}
            </p>
            <p className="text-gray-700">
              <strong>Brand:</strong> {prevCard.card.brand.toUpperCase()}
            </p>
            <p className="text-gray-700">
              <strong>Expiry:</strong> {prevCard.card.exp_month}/{prevCard.card.exp_year}
            </p>
          </div>
        ) : (
          <p className="mb-6 text-gray-500">No card on file.</p>
        )}

        {/* 4️⃣ Toggle Add Card form */}
        {!showForm && (
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded mb-6"
            onClick={() => setShowForm(true)}
          >
            Add New Card
          </button>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="max-w-md space-y-4">
            <div className="border p-3 rounded">
              <label>Card Number</label>
              <CardNumberElement options={ELEMENT_OPTIONS} />
            </div>

            <div className="border p-3 rounded">
              <label>Expiry</label>
              <CardExpiryElement options={ELEMENT_OPTIONS} />
            </div>

            <div className="border p-3 rounded">
              <label>CVC</label>
              <CardCvcElement options={ELEMENT_OPTIONS} />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={!stripe || loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
            >
              {loading ? "Processing..." : "Add Card"}
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="mt-2 text-gray-600 underline"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default StripeCard;
