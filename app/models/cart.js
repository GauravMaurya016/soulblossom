// app/models/cart.js
import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
      imageUrl: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);