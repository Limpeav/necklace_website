import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Review from "../models/Review.js";

const getDashboardSummary = asyncHandler(async (req, res) => {
  const [usersCount, ordersCount, productsCount, reviewsCount, revenue] = await Promise.all([
    User.countDocuments(),
    Order.countDocuments(),
    Product.countDocuments(),
    Review.countDocuments(),
    Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalPrice" } } }])
  ]);

  res.json({
    usersCount,
    ordersCount,
    productsCount,
    reviewsCount,
    revenue: revenue[0]?.total || 0
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
});

const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find()
    .populate("user", "name email")
    .populate("product", "name slug")
    .sort({ createdAt: -1 });
  res.json(reviews);
});

const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  await review.deleteOne();
  res.json({ message: "Review deleted" });
});

export { getDashboardSummary, getUsers, getReviews, deleteReview };
