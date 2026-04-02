import express from "express";
import { body } from "express-validator";
import { createCategory, getCategories } from "../controllers/categoryController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import validate from "../middleware/validateMiddleware.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", protect, admin, [body("name").notEmpty()], validate, createCategory);

export default router;
