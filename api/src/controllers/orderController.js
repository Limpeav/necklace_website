import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const calculateTotals = (items) => {
  const itemsPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingPrice = itemsPrice > 250 ? 0 : 15;
  const taxPrice = Number((itemsPrice * 0.08).toFixed(2));
  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice: Number((itemsPrice + shippingPrice + taxPrice).toFixed(2))
  };
};

const createOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  const items = cart.items.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    image: item.product.images[0],
    price: item.product.discountPrice || item.product.price,
    quantity: item.quantity,
    selectedColor: item.selectedColor,
    selectedLength: item.selectedLength
  }));

  const totals = calculateTotals(items);

  const order = await Order.create({
    user: req.user._id,
    items,
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod || "card-placeholder",
    ...totals
  });

  await Promise.all(
    items.map(async (item) => {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock = Math.max(product.stock - item.quantity, 0);
        product.soldCount += item.quantity;
        await product.save();
      }
    })
  );

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
  res.json(orders);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = req.body.status || order.status;
  order.paymentStatus = req.body.paymentStatus || order.paymentStatus;
  await order.save();

  res.json(order);
});

export { createOrder, getMyOrders, getAllOrders, updateOrderStatus };
