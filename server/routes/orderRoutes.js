import express from "express";
import { createOrder, getMyOrders, getAllOrders, getSingleOrder, updateOrderStatus } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/", getAllOrders);
router.get("/:id", getSingleOrder);
router.put("/:id/status", updateOrderStatus);

export default router;