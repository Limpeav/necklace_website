import express from "express";
import { createOrder, getAllOrders, getMyOrders, updateOrderStatus } from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/mine", getMyOrders);
router.post("/", createOrder);
router.get("/", admin, getAllOrders);
router.put("/:id/status", admin, updateOrderStatus);

export default router;
