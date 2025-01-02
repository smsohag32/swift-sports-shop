import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
   },
   description: {
      type: String,
      trim: true,
   },
   products: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Product",
      },
   ],
   createdAt: {
      type: Date,
      default: Date.now,
   },
   updatedAt: {
      type: Date,
      default: Date.now,
   },
});

const Category = mongoose.models.categories || mongoose.model("categories", categorySchema);

export default Category;
