import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import Wishlist from "../models/Wishlist.js";
import { categories, products } from "./seedData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const runSeed = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany(),
    Category.deleteMany(),
    Product.deleteMany(),
    Cart.deleteMany(),
    Wishlist.deleteMany()
  ]);

  const adminUser = await User.create({
    name: process.env.ADMIN_NAME || "Admin User",
    email: process.env.ADMIN_EMAIL || "admin@lunellejewelry.com",
    password: process.env.ADMIN_PASSWORD || "Admin123!",
    isAdmin: true
  });

  const createdCategories = await Category.insertMany(categories);
  const categoryMap = new Map(createdCategories.map((category) => [category.name, category._id]));

  const createdProducts = await Product.insertMany(
    products.map((product) => ({
      ...product,
      category: categoryMap.get(product.category)
    }))
  );

  await Cart.create({ user: adminUser._id, items: [] });
  await Wishlist.create({ user: adminUser._id, products: createdProducts.slice(0, 2).map((item) => item._id) });

  console.log("Seed completed");
  process.exit(0);
};

runSeed().catch((error) => {
  console.error(error);
  process.exit(1);
});
