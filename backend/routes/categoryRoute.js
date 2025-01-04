import express from "express";
import {
   createCategory,
   getCategories,
   getCategoryById,
   updateCategory,
   deleteCategory,
   changeCategoryStatus,
} from "../controllers/category.controller.js";
import { upload } from "../utils/upload.js";

const router = express.Router();

// Routes
router.post("/categories/", upload.single("image"), createCategory);
router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById);
router.put("/categories/:id", upload.single("image"), updateCategory);
router.delete("/categories/:id", deleteCategory);
router.patch("/categories/:id/status", changeCategoryStatus);

export default router;
