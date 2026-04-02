import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productCode: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, default: null },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    images: [{ type: String, required: true }],
    material: [{ type: String, required: true }],
    color: [{ type: String, required: true }],
    length: [{ type: String, required: true }],
    stock: { type: Number, default: 0, min: 0 },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    soldCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
