"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setCart } from "../app/redux/features/cartslice";
import { useDispatch } from "react-redux";
import { useUser } from "@clerk/nextjs";
import { clearCart } from "../app/redux/features/cartslice";

const Checkout = () => {
  const { user } = useUser();
  const userId = user?.id; // Clerk's user id
  const cartItems = useSelector((state) => state.cart.items);
  const amount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userId) return;
    fetch(`/api/checkout?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setCart(data.items));
      });
  }, [userId, dispatch]);
  
const [info, setInfo] = useState({
    name: "",
    address: "",
    city: "",
    zipCode: "",
    mobileNumber: "",
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    cvv: "",
  });

  const [showToast, setShowToast] = useState(false);

  // Razorpay handler

  const [orderNumber, setOrderNumber] = useState("");

  const handleRazorpay = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount * 100 }),
    });
    const data = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "SoulBlossom",
      description: "Order Payment",
      order_id: data.id,
      handler: async function (response) {
        // Save order to backend
        const orderRes = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            items: cartItems,
            name: info.name,
            address: info.address,
            city: info.city,
            zipCode: info.zipCode,
            mobileNumber: info.mobileNumber,
            amount,
          }),
        });
        const orderData = await orderRes.json();
        setOrderNumber(orderData.orderNumber || "");
        setShowToast(true);
        dispatch(clearCart()); // Clear Redux cart after order
        setTimeout(() => setShowToast(false), 4000);
      },
      prefill: {
        name: info.name,
        contact: info.mobileNumber,
      },
      theme: { color: "#3399cc" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {showToast && <div className="toast">Order placed successfully!</div>}
      <h2 className="text-2xl font-bold mb-4">Billing Address</h2>
      <form onSubmit={handleRazorpay} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            value={info.name}
            onChange={(e) => setInfo({ ...info, name: e.target.value })}
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            value={info.address}
            onChange={(e) => setInfo({ ...info, address: e.target.value })}
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            value={info.city}
            onChange={(e) => setInfo({ ...info, city: e.target.value })}
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Zip Code
          </label>
          <input
            value={info.zipCode}
            onChange={(e) => setInfo({ ...info, zipCode: e.target.value })}
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            value={info.mobileNumber}
            onChange={(e) => setInfo({ ...info, mobileNumber: e.target.value })}
            type="tel"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
            placeholder="e.g., +1234567890"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4">Payment Options</h2>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
