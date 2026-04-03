import { useMemo, useState } from "react";
import {
  AlertTriangle,
  LayoutDashboard,
  LogOut,
  Package,
  Pencil,
  Plus,
  Search,
  Trash2
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/client";
import FallbackImage from "../components/FallbackImage";
import useAsync from "../hooks/useAsync";
import { useAuth } from "../context/AuthContext";
import { formatCurrency } from "../utils/format";
import "../styles/Admin.css";

const AdminDashboardPage = () => {
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const productsAsync = useAsync(async () => (await api.get("/products")).data, []);
  const { loading, error } = productsAsync;

  const products = Array.isArray(productsAsync.data) ? productsAsync.data : [];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = !searchTerm || [
        product.productCode,
        product.name
      ].filter(Boolean).some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesSearch;
    });
  }, [products, searchTerm]);

  const refreshProducts = async () => {
    const data = (await api.get("/products")).data;
    productsAsync.setData(data);
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    await refreshProducts();
  };

  const summaryCards = [
    {
      label: "Total Products",
      value: products.length,
      hint: "Products currently in catalog",
      icon: Package,
      accent: "bg-blue-100 text-blue-600"
    },
    {
      label: "Low Stock Alert",
      value: products.filter((product) => product.stock <= 10).length,
      hint: "Items needing attention",
      icon: AlertTriangle,
      accent: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <section className="container-shell admin-section">
      <div className="admin-header-flex">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div className="surface-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LayoutDashboard size={24} style={{ color: '#6db3b6' }} />
          </div>
          <div>
            <p className="eyebrow" style={{ color: '#6db3b6' }}>Admin Panel</p>
            <h1 className="admin-title">Product Management</h1>
            <p className="mt-3 text-stone-300">Manage your inventory with ease</p>
          </div>
        </div>
        <div className="admin-actions">
          <Link to="/admin/products/new" className="btn-primary" style={{ display: "inline-flex" }}>
            <Plus size={20} /> Add Product
          </Link>
          <button onClick={logout} className="btn-secondary" style={{ display: "inline-flex" }}>
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      <div className="admin-summary-grid">
        {loading && Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="surface-card" style={{ height: '180px', animation: "pulse 2s infinite" }} />
        ))}

        {!loading && summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="surface-card admin-summary-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p className="eyebrow">{card.label}</p>
                  <p className="admin-summary-value mt-3">{card.value}</p>
                  <p className="mt-3 text-stone-400 text-sm">{card.hint}</p>
                </div>
                <div style={{ padding: '0.75rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.05)' }}>
                  <Icon size={24} style={{ color: '#f5f1ea' }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="admin-search-wrapper">
        <Search size={22} style={{ color: '#a8a29e' }} />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products by ID or name..."
        />
      </div>

      {error && (
        <div className="admin-error" style={{ marginBottom: '2rem' }}>
          {error}
        </div>
      )}

      <div className="admin-grid">
        {loading && Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="surface-card" style={{ height: '400px', animation: "pulse 2s infinite" }} />
        ))}

        {!loading && filteredProducts.map((product) => {
          const displayId = product.productCode || product.name;

          return (
            <article key={product._id} className="surface-card admin-product-card" style={{ padding: 0 }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10, background: 'rgba(11,12,14,0.8)', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em' }}>
                  ID: {displayId}
                </div>
                <FallbackImage
                  src={product.images?.[0]}
                  alt={displayId}
                  className="admin-product-image"
                />
              </div>
              <div className="admin-product-info">
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem' }}>
                    <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>{formatCurrency(product.discountPrice || product.price || 0)}</p>
                    {product.discountPrice && (
                      <p style={{ textDecoration: 'line-through', color: '#a8a29e' }}>{formatCurrency(product.price || 0)}</p>
                    )}
                  </div>
                  <p className="mt-3 text-stone-300">
                    Stock: <span style={{ color: '#6db3b6', fontWeight: 600 }}>{product.stock}</span>
                  </p>
                </div>
                <div className="admin-button-group mt-3">
                  <Link to={`/admin/products/${product._id}/edit`} className="btn-outline">
                    <Pencil size={18} /> Edit
                  </Link>
                  <button className="btn-danger" onClick={() => deleteProduct(product._id)}>
                    <Trash2 size={18} /> Delete
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {!loading && !error && !filteredProducts.length && (
          <div className="surface-card" style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: '#a8a29e' }}>
            No products matched the current search.
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboardPage;
