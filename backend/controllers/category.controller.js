import Category from "../models/Category.js";
import mongoose from "mongoose";
import { deleteImageFromCloud, uploadImageToCloud } from "../store/upLoadToCloud.js";

// Create a new category
export const createCategory = async (req, res) => {
   try {
      let imageUrls = [];
      if (req.file) {
         imageUrls = await uploadImageToCloud([req.file]);
      }
      const content = JSON.parse(req.body.content);
      const { name, description } = content;

      // Check if category already exists
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
         return res.status(400).json({ message: "Category already exists." });
      }

      const newCategory = new Category({
         name,
         description,
         image: imageUrls[0] || "",
      });

      const savedCategory = await newCategory.save();
      res.status(201).json({ category: savedCategory });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get all categories
export const getCategories = async (req, res) => {
   try {
      const categories = await Category.find().sort({ createdAt: -1 });
      res.status(200).json({ categories });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
   try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ message: "Invalid category ID." });
      }
      const category = await Category.findById(id).populate("products");
      if (!category) {
         return res.status(404).json({ message: "Category not found." });
      }
      res.status(200).json({ category });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const updateCategory = async (req, res) => {
   try {
      const { id } = req.params;
      const { name, description } = JSON.parse(req.body.content);

      // Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ message: "Invalid category ID." });
      }

      // Check if category exists
      const category = await Category.findById(id);
      if (!category) {
         return res.status(404).json({ message: "Category not found." });
      }

      let image = category.image;

      // Handle image upload
      if (req.file) {
         try {
            // Delete old image if it exists
            if (image) {
               await deleteImageFromCloud([image]);
            }

            // Upload new image
            const uploadedImages = await uploadImageToCloud([req.file]);
            image = uploadedImages[0];
         } catch (uploadError) {
            return res
               .status(500)
               .json({ message: "Image upload failed.", error: uploadError.message });
         }
      }

      // Update category details
      const updatedCategory = await Category.findByIdAndUpdate(
      id,
         {
            name,
            description,
            image,
            updatedAt: Date.now(),
         },
         { new: true, runValidators: true }
      );

      // If update fails
      if (!updatedCategory) {
         return res.status(404).json({ message: "Failed to update category." });
      }

      // Respond with updated category
      res.status(200).json({ category: updatedCategory });
   } catch (error) {
      res.status(500).json({ message: "Server error occurred.", error: error.message });
   }
};

// Delete a category by ID
export const deleteCategory = async (req, res) => {
   try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ message: "Invalid category ID." });
      }
      const deletedCategory = await Category.findByIdAndDelete(id);
      if (!deletedCategory) {
         return res.status(404).json({ message: "Category not found." });
      }
      if (deletedCategory.image) {
         await deleteImageFromCloud([deletedCategory.image]);
      }
      res.status(200).json({ message: "Category deleted successfully." });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Change category status (activate/deactivate)
export const changeCategoryStatus = async (req, res) => {
   try {
      const { id } = req.params;
      const { status } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ message: "Invalid category ID." });
      }

      const category = await Category.findById(id);
      if (!category) {
         return res.status(404).json({ message: "Category not found." });
      }

      category.status = status;
      category.updatedAt = Date.now();
      const updatedCategory = await category.save();

      res.status(200).json({ category: updatedCategory });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
