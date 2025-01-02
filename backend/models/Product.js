import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true,
   },
   description: {
      type: String,
      required: true,
      trim: true,
   },
   price: {
      type: Number,
      required: true,
      min: 0,
   },
   brand: {
      type: String,
      required: true,
   },
   sizes: [
      {
         type: String,
         enum: ["S", "M", "L", "XL", "XXL"],
      },
   ],
   colors: [
      {
         type: String,
      },
   ],
   stock: {
      type: Number,
      required: true,
      min: 0,
   },
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
   },
   images: [
      {
         url: String,
         alt: String,
      },
   ],
   reviews: [
      {
         user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
         },
         rating: {
            type: Number,
            min: 1,
            max: 5,
         },
         comment: String,
         createdAt: {
            type: Date,
            default: Date.now,
         },
      },
   ],
   createdAt: {
      type: Date,
      default: Date.now,
   },
   status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
   },
   updatedAt: {
      type: Date,
      default: Date.now,
   },
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
