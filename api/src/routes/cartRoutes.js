import express from "express";
import { body } from "express-validator";
import { addToCart, clearCart, getCart, removeCartItem, updateCartItem } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";
import validate from "../middleware/validateMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/", getCart);
router.post(
  "/",
  [body("productId").notEmpty(), body("quantity").isInt({ min: 1 })],
  validate,
  addToCart
);
router.put("/:itemId", [body("quantity").isInt({ min: 1 })], validate, updateCartItem);
router.delete("/:itemId", removeCartItem);
router.delete("/", clearCart);

export default router;
