import express from "express";
import { getWishlist, toggleWishlistProduct } from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/", getWishlist);
router.post("/toggle", toggleWishlistProduct);

export default router;
