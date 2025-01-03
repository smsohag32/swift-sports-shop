import express from "express";
import {
   createCategory,
   getCategories,
   getCategoryById,
   updateCategory,
   deleteCategory,
   changeCategoryStatus,
} from "../controllers/category.controller.js";

const router = express.Router();

// Routes
router.post("/categories", createCategory); // Create category
router.get("/categories", getCategories); // Get all categories
router.get("/categories/:id", getCategoryById);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory); // Delete category by ID
router.patch("/categories/:id/status", changeCategoryStatus); // Change category status

export default router;
