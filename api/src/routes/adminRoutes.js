import express from "express";
import { deleteReview, getDashboardSummary, getReviews, getUsers } from "../controllers/adminController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, admin);
router.get("/summary", getDashboardSummary);
router.get("/users", getUsers);
router.get("/reviews", getReviews);
router.delete("/reviews/:id", deleteReview);

export default router;
