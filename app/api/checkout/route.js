import { NextResponse } from "next/server";
import connectDB from "@/lib/connectdb";
import Cart from "@/app/models/cart";
import Order from "@/app/models/order";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  await connectDB(process.env.DATABASE_URL);
  const cart = await Cart.findOne({ userId }).sort({ createdAt: -1 });
  return NextResponse.json({ items: cart?.items || [] });
}

export async function POST(req) {
  const data = await req.json();
  await connectDB(process.env.DATABASE_URL);

  // If only cart update (no address, etc.), save to Cart
  if (data.userId && data.items && !data.name) {
    // Remove previous cart for this user
    await Cart.deleteMany({ userId: data.userId });
    const cartDoc = new Cart({ userId: data.userId, items: data.items });
    await cartDoc.save();
    return NextResponse.json({ success: true, type: "cart" });
  }

  // Otherwise, treat as order (checkout)
  const orderNumber = "ORD-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
  const orderDoc = new Order({
    ...data,
    orderNumber,
    createdAt: new Date(),
  });
  await orderDoc.save();
  // Clear cart for this user after order
  await Cart.deleteMany({ userId: data.userId });
  return NextResponse.json({ success: true, orderNumber, type: "order" });
}

