import Order from "../models/Order.js";

// Create a new order
export const addOrder = async (req, res) => {
   try {
      const { orderId, customer, items, payment, orderStatus, shipping } = req.body;

      if (!orderId || !customer || !items || !payment) {
         return res.status(400).json({
            success: false,
            message: "Missing required fields: orderId, customer, items, or payment",
         });
      }

      if (!customer.customerId || !customer.name || !customer.email || !customer.phone) {
         return res.status(400).json({
            success: false,
            message: "Customer details are incomplete",
         });
      }

      if (!Array.isArray(items) || items.length === 0) {
         return res.status(400).json({
            success: false,
            message: "Order must contain at least one item",
         });
      }

      items.forEach((item) => {
         if (!item.productId || !item.name || !item.quantity || !item.price || !item.total) {
            return res.status(400).json({
               success: false,
               message: "Each item must have productId, name, quantity, price, and total",
            });
         }
      });

      if (!payment.method || !payment.transactionId || !payment.status || !payment.amount) {
         return res.status(400).json({
            success: false,
            message: "Payment details are incomplete",
         });
      }

      const newOrder = new Order(req.body);
      await newOrder.save();
      res.status(201).json({
         success: true,
         message: "Order placed successfully",
         order: newOrder,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Error placing order",
         error: error.message,
      });
   }
};

// Get orders by user
export const getOrdersByUser = async (req, res) => {
   try {
      const { userId } = req.params;
      const orders = await Order.find({ "customer.customerId": userId });
      if (!orders.length) {
         return res.status(404).json({ success: false, message: "No orders found for this user" });
      }
      res.status(200).json({ success: true, orders });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Error fetching orders",
         error: error.message,
      });
   }
};

// Get all orders (Admin)
export const getAllOrders = async (req, res) => {
   try {
      const orders = await Order.find();
      res.status(200).json({ success: true, orders });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Error fetching orders",
         error: error.message,
      });
   }
};
