import express from "express";
import { addOrder, getAllOrders, getOrdersByUser } from "../controllers/order.controller.js";

const router = express.Router();

// Route to create a new order
router.post("/order/add", addOrder);

// Route to get orders by user ID
router.get("/order/user/:userId", getOrdersByUser);

// Route to get all orders (Admin access)
router.get("/order/all", getAllOrders);

export default router;
