import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import app from "./app.js";
import User from "./models/User.js";
import Cart from "./models/Cart.js";
import Wishlist from "./models/Wishlist.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const ensureAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  const existing = await User.findOne({ email: adminEmail });
  if (existing) {
    let shouldSave = false;

    if (!existing.isAdmin) {
      existing.isAdmin = true;
      shouldSave = true;
    }

    if (process.env.ADMIN_NAME && existing.name !== process.env.ADMIN_NAME) {
      existing.name = process.env.ADMIN_NAME;
      shouldSave = true;
    }

    if (process.env.ADMIN_PASSWORD) {
      const passwordMatches = await existing.matchPassword(process.env.ADMIN_PASSWORD);
      if (!passwordMatches) {
        existing.password = process.env.ADMIN_PASSWORD;
        shouldSave = true;
      }
    }

    if (shouldSave) {
      await existing.save();
    }

    return;
  }

  const admin = await User.create({
    name: process.env.ADMIN_NAME || "Admin User",
    email: adminEmail,
    password: process.env.ADMIN_PASSWORD || "Admin123!",
    isAdmin: true
  });

  await Cart.create({ user: admin._id, items: [] });
  await Wishlist.create({ user: admin._id, products: [] });
};

const startServer = async () => {
  await connectDB();
  await ensureAdminUser();

  const port = process.env.PORT || 5001;
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
};

startServer();
