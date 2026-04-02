import asyncHandler from "express-async-handler";
import Wishlist from "../models/Wishlist.js";

const getWishlist = asyncHandler(async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
    path: "products",
    populate: { path: "category" }
  });

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products");
  }

  res.json(wishlist);
});

const toggleWishlistProduct = asyncHandler(async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) wishlist = await Wishlist.create({ user: req.user._id, products: [] });

  const productId = req.body.productId;
  const exists = wishlist.products.some((product) => product.toString() === productId);

  if (exists) {
    wishlist.products = wishlist.products.filter((product) => product.toString() !== productId);
  } else {
    wishlist.products.push(productId);
  }

  await wishlist.save();
  const updated = await Wishlist.findOne({ user: req.user._id }).populate({
    path: "products",
    populate: { path: "category" }
  });

  res.json(updated);
});

export { getWishlist, toggleWishlistProduct };
