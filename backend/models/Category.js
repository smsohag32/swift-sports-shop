import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({});

const Category = mongoose.models.categories || mongoose.model("categories", categorySchema);

export default Category;
