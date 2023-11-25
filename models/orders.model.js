import mongoose, { Schema } from "mongoose";

const ordersSchema = new Schema(
  {
    customerName: String,
    total: String,
    roasted: String,
    items: [],
    email: String,
    phone: String,
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", ordersSchema);
