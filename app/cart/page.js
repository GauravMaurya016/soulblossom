"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react"; 
import { Anonymous_Pro } from "next/font/google";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "@/app/redux/features/cartslice";
import { removeFromCart, updateQuantity } from "@/app/redux/features/cartslice";


const inter = Anonymous_Pro({ subsets: ["latin"], weight: "700" });

const Cart = () => {
  const { user } = useUser();
  const userId = user?.id;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);


  // Fetch cart items from MongoDB on mount
  useEffect(() => {
    if (!userId){
      console.log("No userId found, skipping cart fetch.");
      return;
    }
    fetch(`/api/checkout?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setCart(data.items));
      });
  }, [userId, dispatch]);


  // Save cart to MongoDB
const saveCartToMongo = async (updatedItems) => {
  await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, items: updatedItems }), // userId included!
  });
};

const removeItem = (id) => {
  dispatch(removeFromCart(id));
  saveCartToMongo(cartItems.filter(item => item.id !== id));
};

const updateItemQuantity = (id, delta) => {
  dispatch(updateQuantity({ id, delta }));
  const updated = cartItems.map(item =>
    item.id === id
      ? { ...item, quantity: Math.max(1, item.quantity + delta) }
      : item
  );
  saveCartToMongo(updated);
};


  return (
    <main className="flex flex-col min-h-[80vh] justify-center w-full max-w-screen-lg mx-auto gap-3 p-4">
      <section className="bg-neutral-200 w-full md:w-2/3 p-6 rounded-lg shadow-lg">
        <div>
          <h1
            className={`text-4xl text-center font-extrabold m-6 hover:underline decoration-4 underline-offset-8 transition duration-300 ease-in-out ${inter.className}`}
          >
            Shopping Cart
          </h1>
          <div className="flex flex-col gap-6">
          
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row justify-between items-center p-5 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105"
              >
                <div className="images">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="rounded-lg border-2 border-gray-300"
                  />
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-gray-700 font-medium">
                      Price: ${item.price}
                    </p>
                    <div className="flex items-center justify-center">
                      <button className="px-2 bg-gray-300 rounded-full hover:bg-gray-400 transition duration-200"
                              onClick={() => updateItemQuantity(item.id, -1)}>
                        -
                      </button>
                      <p className="text-gray-700 mx-2">
                        Quantity: {item.quantity}
                      </p>
                      <button className="px-2 bg-gray-300 rounded-full hover:bg-gray-400 transition duration-200"
                              onClick={() => updateItemQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <button
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-6 py-2.5 mb-2 transition duration-200"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-neutral-200 w-full md:w-1/3 rounded-lg">
        <div className="p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Order Summary</h2>
          <p className="mb-4 font-medium">
            Total costs including shipping and taxes.
          </p>
          <div className="h-[2px] w-full bg-gray-300"></div>
          <div className="flex flex-col ">
            <div className=" border rounded-md">
              <h2 className="text-lg font-medium">Shipping Cost</h2>
              <p className="text-gray-600">Calculated at checkout</p>
            </div>
            <div className=" border rounded-md">
              <h2 className="text-lg font-medium">Taxes</h2>
              <p className="text-gray-600">Applicable taxes applied</p>
            </div>
            <div className=" border rounded-md">
              <h2 className="text-lg font-medium">Platform Fees</h2>
              <p className="text-gray-600">Included in the price</p>
            </div>
            <div className=" border rounded-md">
              <h2 className="text-lg font-medium">Shipping Address</h2>
              <p className="text-gray-600">Address will be confirmed at checkout</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold">Total: $</h3>
            <p className="text-2xl font-bold">
              {cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </p>
          </div>
          <Link href="/checkout">
          <button
            type="button"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 transition duration-200"
            >
            Checkout
          </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Cart;