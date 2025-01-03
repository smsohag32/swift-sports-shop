import express from "express";
import userRoute from "./userRoute.js";
import categoryRoute from "./categoryRoute.js";

const router = express.Router();

router.use("/api/v1", userRoute);
router.use("/api/v1", categoryRoute);

export default router;
