import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
   orderId: { type: String, required: true, unique: true },
   customer: {
      customerId: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      shippingAddress: {
         street: { type: String, required: true },
         city: { type: String, required: true },
         state: { type: String, required: true },
         zipCode: { type: String, required: true },
         country: { type: String, required: true },
      },
      billingAddress: {
         street: { type: String, required: true },
         city: { type: String, required: true },
         state: { type: String, required: true },
         zipCode: { type: String, required: true },
         country: { type: String, required: true },
      },
   },
   items: [
      {
         productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
         name: { type: String, required: true },
         quantity: { type: Number, required: true },
         price: { type: Number, required: true },
         total: { type: Number, required: true },
      },
   ],
   payment: {
      paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      method: { type: String, required: true },
      transactionId: { type: String, required: true },
      status: { type: String, enum: ["Pending", "Paid", "Failed"], required: true },
      amount: { type: Number, required: true },
      currency: { type: String, default: "USD" },
   },
   orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
   },
   shipping: {
      carrier: { type: String },
      trackingNumber: { type: String },
      shippingCost: { type: Number },
      estimatedDelivery: { type: Date },
   },
   timestamps: {
      orderPlaced: { type: Date, default: Date.now },
      orderShipped: { type: Date },
      orderDelivered: { type: Date },
   },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
