import express from "express";
import { body } from "express-validator";
import {
  createProduct,
  createReview,
  deleteProduct,
  getFeaturedProducts,
  getProductById,
  getProductBySlug,
  getProducts,
  updateProduct
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import validate from "../middleware/validateMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/featured/list", getFeaturedProducts);
router.get("/id/:id", protect, admin, getProductById);
router.get("/:slug", getProductBySlug);
router.post(
  "/",
  protect,
  admin,
  [body("price").isNumeric()],
  validate,
  createProduct
);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);
router.post(
  "/:id/reviews",
  protect,
  [body("rating").isInt({ min: 1, max: 5 }), body("comment").notEmpty()],
  validate,
  createReview
);

export default router;
