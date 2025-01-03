import Category from "../models/Category.js";
import mongoose from "mongoose";

// Create a new category
export const createCategory = async (req, res) => {
   try {
      const { name, description } = req.body;

      // Check if category already exists
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
         return res.status(400).json({ message: "Category already exists." });
      }

      const newCategory = new Category({
         name,
         description,
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
      const categories = await Category.find();
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

// Update a category by ID
export const updateCategory = async (req, res) => {
   try {
      const { id } = req.params;
      const { name, description } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ message: "Invalid category ID." });
      }

      const updatedCategory = await Category.findByIdAndUpdate(
         id,
         { name, description, updatedAt: Date.now() },
         { new: true, runValidators: true }
      );

      if (!updatedCategory) {
         return res.status(404).json({ message: "Category not found." });
      }

      res.status(200).json({ category: updatedCategory });
   } catch (error) {
      res.status(500).json({ message: error.message });
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
