import { useEffect, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/client";
import FallbackImage from "../components/FallbackImage";
import "../styles/Admin.css";

const emptyProduct = {
  productCode: "",
  price: "",
  discountPrice: "",
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
  const [loadingProduct, setLoadingProduct] = useState(isEditing);
  const [loadingError, setLoadingError] = useState("");

  useEffect(() => {
    if (!isEditing && !productForm.productCode) {
      setProductForm((current) => ({ ...current, productCode: generateProductCode() }));
    }
  }, [isEditing, productForm.productCode]);

  useEffect(() => {
    let ignore = false;

    const loadProduct = async () => {
      if (!isEditing) {
        setProductForm(emptyProduct);
        setLoadingProduct(false);
        return;
      }

      setLoadingProduct(true);
      setLoadingError("");

      try {
        const product = (await api.get(`/products/id/${productId}`)).data;

        if (!ignore) {
          setProductForm({
            productCode: product.productCode || (typeof product.name === "string" && product.name.startsWith("VT") ? product.name : generateProductCode()),
            price: product.price ?? "",
            discountPrice: product.discountPrice ?? "",
            images: product.images || [],
            stock: product.stock ?? ""
          });
        }
      } catch (error) {
        if (!ignore) {
          setLoadingError(error.response?.data?.message || "Failed to load product");
        }
      } finally {
        if (!ignore) {
          setLoadingProduct(false);
        }
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

  if (loadingProduct) {
    return (
      <section className="container-shell admin-section">
        <div style={{ padding: '4rem', textAlign: 'center', color: '#a8a29e' }}>
          Loading product details...
        </div>
      </section>
    );
  }

  return (
    <section className="container-shell admin-section">
      <div className="admin-header-flex">
        <div>
          <p className="eyebrow">{isEditing ? "Edit Product" : "Add Product"}</p>
          <h1 className="admin-title">{isEditing ? "Update product details" : "Create a new product"}</h1>
        </div>
        <div className="admin-actions">
          <Link to="/admin" className="btn-secondary" style={{ display: "inline-flex" }}>
            <ArrowLeft size={20} /> Back
          </Link>
        </div>
      </div>

      <form onSubmit={submitProduct} className="surface-card p-8 md:p-10">
        {loadingError && (
          <div className="admin-error" style={{ marginBottom: '2rem' }}>
            {loadingError}
          </div>
        )}

        {submitError && (
          <div className="admin-error" style={{ marginBottom: '2rem' }}>
            {submitError}
          </div>
        )}

        <div className="admin-form-grid">
          <div className="admin-form-full">
            <input
              className="input"
              style={{ width: '100%', background: 'rgba(255,255,255,0.02)', color: '#a8a29e' }}
              placeholder="Product ID"
              value={productForm.productCode}
              readOnly
            />
          </div>
          
          <div className="admin-form-full">
            <label className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>
              Product images
            </label>
            <label className="admin-upload-zone">
              <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleImageUpload} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={32} />
                <span>Choose image files from your computer</span>
              </div>
            </label>

            {!!productForm.images.length && (
              <div className="grid mt-4 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {productForm.images.map((image, index) => (
                  <div key={`${index}-${image.slice(0, 24)}`} className="surface-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <FallbackImage src={image} alt={`Product upload ${index + 1}`} style={{ height: '10rem', width: '100%', objectFit: 'cover', borderRadius: '1rem' }} />
                    <button type="button" className="btn-danger" style={{ padding: '0.5rem' }} onClick={() => removeImage(index)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="eyebrow" style={{ display: 'block', marginBottom: '0.5rem' }}>Price</label>
            <input
              className="input"
              style={{ width: '100%' }}
              type="text"
              inputMode="decimal"
              placeholder="E.g. 40.00"
              value={productForm.price}
              onChange={(e) => setProductForm((current) => ({ ...current, price: sanitizeDecimalInput(e.target.value) }))}
            />
          </div>

          <div>
            <label className="eyebrow" style={{ display: 'block', marginBottom: '0.5rem' }}>Discount price (optional)</label>
            <input
              className="input"
              style={{ width: '100%' }}
              type="text"
              inputMode="decimal"
              placeholder="E.g. 35.00"
              value={productForm.discountPrice}
              onChange={(e) => setProductForm((current) => ({ ...current, discountPrice: sanitizeDecimalInput(e.target.value) }))}
            />
          </div>

          <div className="admin-form-full">
            <label className="eyebrow" style={{ display: 'block', marginBottom: '0.5rem' }}>Stock Quantity</label>
            <input
              className="input"
              style={{ width: '100%' }}
              type="text"
              inputMode="numeric"
              placeholder="E.g. 100"
              value={productForm.stock}
              onChange={(e) => setProductForm((current) => ({ ...current, stock: sanitizeIntegerInput(e.target.value) }))}
            />
          </div>
        </div>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button className="btn-primary" style={{ display: 'inline-flex', width: '100%', justifyContent: 'center' }}>
            <Plus size={20} />
            {isEditing ? "Update product" : "Create product"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminAddProductPage;
