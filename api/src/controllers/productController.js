import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import Review from "../models/Review.js";
import createSlug from "../utils/createSlug.js";

const buildProductQuery = (query) => {
  const filters = {};

  if (query.search) {
    filters.name = { $regex: query.search, $options: "i" };
  }

  if (query.category) filters.category = query.category;
  if (query.material) filters.material = query.material;
  if (query.color) filters.color = query.color;

  if (query.minPrice || query.maxPrice) {
    filters.price = {};
    if (query.minPrice) filters.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filters.price.$lte = Number(query.maxPrice);
  }

  return filters;
};

const buildSortQuery = (sortBy) => {
  switch (sortBy) {
    case "price-asc":
      return { price: 1 };
    case "price-desc":
      return { price: -1 };
    case "best-selling":
      return { soldCount: -1, createdAt: -1 };
    case "newest":
    default:
      return { createdAt: -1 };
  }
};

const generateProductCode = () =>
  `VT${Math.floor(1000 + Math.random() * 9000)}`;

const buildProductPayload = (body, existingProduct = {}) => {
  const productCode = body.productCode || existingProduct.productCode || generateProductCode();
  const displayName = body.name || productCode;

  return {
    productCode,
    name: displayName,
    slug: body.slug || createSlug(body.name || productCode || existingProduct.name || ""),
    description: body.description ?? existingProduct.description ?? "",
    price: Number(body.price),
    discountPrice: body.discountPrice === null || body.discountPrice === "" ? null : Number(body.discountPrice),
    category: body.category,
    images: Array.isArray(body.images) ? body.images : existingProduct.images,
    material: Array.isArray(body.material) ? body.material : existingProduct.material,
    color: Array.isArray(body.color) ? body.color : existingProduct.color,
    length: Array.isArray(body.length) ? body.length : existingProduct.length,
    stock: Number(body.stock),
    featured: typeof body.featured === "boolean" ? body.featured : existingProduct.featured
  };
};

const getProducts = asyncHandler(async (req, res) => {
  const filters = buildProductQuery(req.query);
  const sort = buildSortQuery(req.query.sort);
  const products = await Product.find(filters).populate("category").sort(sort);
  res.json(products);
});

const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ featured: true }).populate("category").limit(8);
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product);
});

const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate("category");

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const reviews = await Review.find({ product: product._id }).populate("user", "name").sort({ createdAt: -1 });
  const relatedProducts = await Product.find({
    category: product.category._id,
    _id: { $ne: product._id }
  })
    .limit(4)
    .populate("category");

  res.json({ product, reviews, relatedProducts });
});

const createProduct = asyncHandler(async (req, res) => {
  const payload = buildProductPayload(req.body);
  const product = await Product.create(payload);
  res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  Object.assign(product, buildProductPayload(req.body, product));

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await Review.deleteMany({ product: product._id });
  await product.deleteOne();
  res.json({ message: "Product deleted" });
});

const createReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const review = await Review.create({
    user: req.user._id,
    product: product._id,
    rating: req.body.rating,
    comment: req.body.comment
  });

  const reviews = await Review.find({ product: product._id });
  product.reviewsCount = reviews.length;
  product.rating = reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length;
  await product.save();

  res.status(201).json(review);
});

export {
  getProducts,
  getFeaturedProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview
};
