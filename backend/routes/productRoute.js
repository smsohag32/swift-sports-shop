import express from "express";
import {
   createProduct,
   getProducts,
   getProductById,
   updateProduct,
   deleteProduct,
   changeProductStatus,
} from "../controllers/product.controller.js";

import { upload } from "../utils/upload.js";

const router = express.Router();

// Routes
router.post("/products/", upload.array("images", 5), createProduct);

router.get("/products/", getProducts);

router.get("/products/:id", getProductById);

router.put("/products/:id", upload.array("images", 5), updateProduct);

router.delete("/products/:id", deleteProduct);

router.patch("/products/:id/status", changeProductStatus);

export default router;
