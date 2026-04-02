import asyncHandler from "express-async-handler";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await Cart.findOne({ user: userId }).populate("items.product");
  }
  return cart;
};

const getCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  res.json(cart);
});

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity, selectedColor, selectedLength } = req.body;
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const cart = await getOrCreateCart(req.user._id);
  const existingItem = cart.items.find(
    (item) =>
      item.product._id.toString() === productId &&
      item.selectedColor === selectedColor &&
      item.selectedLength === selectedLength
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity, selectedColor, selectedLength });
  }

  await cart.save();
  const updated = await Cart.findOne({ user: req.user._id }).populate("items.product");
  res.status(201).json(updated);
});

const updateCartItem = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  const item = cart.items.id(req.params.itemId);

  if (!item) {
    res.status(404);
    throw new Error("Cart item not found");
  }

  item.quantity = req.body.quantity;
  await cart.save();
  const updated = await Cart.findOne({ user: req.user._id }).populate("items.product");
  res.json(updated);
});

const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  cart.items = cart.items.filter((item) => item._id.toString() !== req.params.itemId);
  await cart.save();
  const updated = await Cart.findOne({ user: req.user._id }).populate("items.product");
  res.json(updated);
});

const clearCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  cart.items = [];
  await cart.save();
  res.json(cart);
});

export { getCart, addToCart, updateCartItem, removeCartItem, clearCart };
