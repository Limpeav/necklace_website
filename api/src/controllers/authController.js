import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Wishlist from "../models/Wishlist.js";
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password, phone });
  await Cart.create({ user: user._id, items: [] });
  await Wishlist.create({ user: user._id, products: [] });

  res.status(201).json({
    token: generateToken({ id: user._id }),
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin
    }
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    token: generateToken({ id: user._id }),
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin
    }
  });
});

const getProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = req.body.name || user.name;
  user.phone = req.body.phone ?? user.phone;
  if (req.body.password) user.password = req.body.password;

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    isAdmin: updatedUser.isAdmin
  });
});

export { registerUser, loginUser, getProfile, updateProfile };
