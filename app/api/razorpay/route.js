import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const { amount } = await req.json();
    const instance = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount,
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    const order = await instance.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}