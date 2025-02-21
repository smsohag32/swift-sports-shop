import express from "express";
import userRoute from "./userRoute.js";
import categoryRoute from "./categoryRoute.js";
import productRoute from "./productRoute.js";
import orderRoutes from "./orderRoutes.js";

const router = express.Router();

router.use("/api/v1", userRoute);
router.use("/api/v1", categoryRoute);
router.use("/api/v1", productRoute);
router.use("/api/v1", orderRoutes);

export default router;
