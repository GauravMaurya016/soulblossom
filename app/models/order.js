import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [],
  name: String,
  address: String,
  city: String,
  zipCode: String,
  mobileNumber: String,
  amount: Number,
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.models.Order || mongoose.model("Order", orderSchema);
