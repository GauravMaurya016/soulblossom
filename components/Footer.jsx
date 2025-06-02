"use client"
import React from 'react'
import { Anonymous_Pro } from "next/font/google";
const inter = Anonymous_Pro({ subsets: ["latin"], weight: "700" });

const Footer = () => {
  return (
    <footer className={`bg-neutral-100 p-5 text-center border-t-3  border-blue-600 ${inter.className}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-black m-0 font-bold text-3xl">Soulblossom</h2>
        <p className="text-black my-1.5 text-xl">Your one-stop shop for beautiful flowers</p>
        <div className="flex justify-center gap-4 mt-2.5">
          <a href="/about" className="text-black no-underline font-bold">About Us</a>
          <a href="/contact" className="text-black no-underline font-bold">Contact</a>
          <a href="/privacy" className="text-black no-underline font-bold">Privacy Policy</a>
        </div>
        <div className="flex justify-center gap-4 mt-2.5 cursor-pointer">
          <img src="/visa.png" alt="Visa" className='w-12 self-center' />
          <img src="/mastercard.png" alt="MasterCard" />
          <img src="/paypal.png" alt="PayPal" />
          <img src="/amex.png" alt="American Express" />
        </div>
        <p className="text-black mt-3.5 text-lg">© {new Date().getFullYear()} Soulblossom. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer