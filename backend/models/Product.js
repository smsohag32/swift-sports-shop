import mongoose from "mongoose";

const productSchema = new mongoose.Schema({});

const Product = mongoose.models.products || mongoose.model("products", productSchema);

export default Product;
