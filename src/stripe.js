// src/stripe.js
import { loadStripe } from "@stripe/stripe-js";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!stripeKey) {
  throw new Error("Stripe public key is missing");
}

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);