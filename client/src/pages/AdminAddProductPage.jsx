import { useEffect, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/client";
import FallbackImage from "../components/FallbackImage";
import useAsync from "../hooks/useAsync";

const emptyProduct = {
  productCode: "",
  price: "",
  discountPrice: "",
  category: "",
  images: [],
  stock: ""
};

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
    reader.readAsDataURL(file);
  });

const sanitizeDecimalInput = (value) => value.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");

const sanitizeIntegerInput = (value) => value.replace(/\D/g, "");

const generateProductCode = () =>
  `VT${Math.floor(1000 + Math.random() * 9000)}`;

const AdminAddProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const isEditing = Boolean(productId);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [submitError, setSubmitError] = useState("");

  const categoriesAsync = useAsync(async () => (await api.get("/categories")).data, []);
  const categories = Array.isArray(categoriesAsync.data) ? categoriesAsync.data : [];

  useEffect(() => {
    if (!isEditing && !productForm.productCode) {
      setProductForm((current) => ({ ...current, productCode: generateProductCode() }));
    }
  }, [isEditing, productForm.productCode]);

  useEffect(() => {
    if (!productForm.category && categories[0]?._id) {
      setProductForm((current) => ({ ...current, category: categories[0]._id }));
    }
  }, [categories, productForm.category]);

  useEffect(() => {
    let ignore = false;

    const loadProduct = async () => {
      if (!isEditing) {
        setProductForm(emptyProduct);
        return;
      }

      const product = (await api.get(`/products/id/${productId}`)).data;

      if (!ignore) {
        setProductForm({
          productCode: product.productCode || (typeof product.name === "string" && product.name.startsWith("VT") ? product.name : generateProductCode()),
          price: product.price ?? "",
          discountPrice: product.discountPrice ?? "",
          category: product.category?._id || product.category || "",
          images: product.images || [],
          stock: product.stock ?? ""
        });
      }
    };

    loadProduct();

    return () => {
      ignore = true;
    };
  }, [isEditing, productId]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const uploadedImages = await Promise.all(files.map(fileToDataUrl));
    setProductForm((current) => ({
      ...current,
      images: [...current.images, ...uploadedImages]
    }));
    e.target.value = "";
  };

  const removeImage = (indexToRemove) => {
    setProductForm((current) => ({
      ...current,
      images: current.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const productCode = productForm.productCode || generateProductCode();

    const payload = {
      ...productForm,
      productCode,
      name: productCode,
      description: "",
      price: Number(productForm.price),
      discountPrice: productForm.discountPrice ? Number(productForm.discountPrice) : null,
      stock: Number(productForm.stock),
      images: productForm.images,
      material: ["Standard finish"],
      color: ["Default"],
      length: ["Standard"]
    };

    try {
      if (isEditing) {
        await api.put(`/products/${productId}`, payload);
      } else {
        await api.post("/products", payload);
      }

      navigate("/admin");
    } catch (error) {
      setSubmitError(error.response?.data?.message || "Failed to save product");
    }
  };

  return (
    <section className="min-h-screen bg-[#f4f7fb] px-8 py-10 text-slate-900 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">{isEditing ? "Edit Product" : "Add Product"}</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-900">{isEditing ? "Update product details" : "Create a new product"}</h1>
          </div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-6 py-4 text-lg font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft size={22} />
            Back
          </Link>
        </div>

        <form onSubmit={submitProduct} className="rounded-[2rem] bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-10">
          {submitError && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
              {submitError}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <input
              className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg outline-none md:col-span-2"
              placeholder="Product ID"
              value={productForm.productCode}
              readOnly
            />
            <div className="md:col-span-2">
              <label className="mb-4 block text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                Product images
              </label>
              <label className="flex min-h-52 cursor-pointer items-center justify-center rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center text-2xl text-slate-500 transition hover:border-blue-300 hover:text-slate-700">
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                Choose image files from your laptop
              </label>

              {!!productForm.images.length && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {productForm.images.map((image, index) => (
                    <div key={`${index}-${image.slice(0, 24)}`} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-3">
                      <FallbackImage src={image} alt={`Product upload ${index + 1}`} className="h-40 w-full rounded-[1rem] object-cover" />
                      <button type="button" className="mt-3 text-sm font-semibold text-red-500" onClick={() => removeImage(index)}>
                        Remove image
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <input
              className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg outline-none"
              type="text"
              inputMode="decimal"
              placeholder="Price"
              value={productForm.price}
              onChange={(e) => setProductForm((current) => ({ ...current, price: sanitizeDecimalInput(e.target.value) }))}
            />
            <input
              className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg outline-none"
              type="text"
              inputMode="decimal"
              placeholder="Discount price"
              value={productForm.discountPrice}
              onChange={(e) => setProductForm((current) => ({ ...current, discountPrice: sanitizeDecimalInput(e.target.value) }))}
            />
            <input
              className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg outline-none md:col-span-2"
              type="text"
              inputMode="numeric"
              placeholder="Stock"
              value={productForm.stock}
              onChange={(e) => setProductForm((current) => ({ ...current, stock: sanitizeIntegerInput(e.target.value) }))}
            />
          </div>

          <div className="mt-10">
            <button className="inline-flex items-center gap-3 rounded-3xl bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-5 text-xl font-medium text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-600 hover:to-blue-500">
              <Plus size={24} />
              {isEditing ? "Update product" : "Create product"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdminAddProductPage;
