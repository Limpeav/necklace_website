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

const AdminDashboardPage = () => {
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const productsAsync = useAsync(async () => (await api.get("/products")).data, []);
  const categoriesAsync = useAsync(async () => (await api.get("/categories")).data, []);

  const products = Array.isArray(productsAsync.data) ? productsAsync.data : [];
  const categories = Array.isArray(categoriesAsync.data) ? categoriesAsync.data : [];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = !searchTerm || [
        product.productCode,
        product.name,
        product.category?.name
      ].filter(Boolean).some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = !categoryFilter || product.category?._id === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

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
    <section className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <div className="min-h-screen">
        <main className="bg-[#f4f7fb]">
          <div className="border-b border-slate-200 bg-white px-8 py-8 shadow-sm sm:px-10">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-blue-500 p-4 text-white shadow-lg shadow-blue-500/20">
                  <LayoutDashboard size={28} />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Admin Panel</p>
                  <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Product Management</h1>
                  <p className="mt-3 text-xl text-slate-500">Manage your inventory with ease</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-6 py-4 text-lg font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
                >
                  <LogOut size={22} />
                  Logout
                </button>
                <Link
                  to="/admin/products/new"
                  className="inline-flex items-center gap-3 rounded-3xl bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-4 text-lg font-medium text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-600 hover:to-blue-500"
                >
                  <Plus size={22} />
                  Add Product
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-8 p-8 sm:p-10">
            <div className="grid gap-6 xl:grid-cols-3">
              {summaryCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.label} className="rounded-[2rem] bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="text-2xl font-medium text-slate-500">{card.label}</p>
                        <p className="mt-3 text-6xl font-semibold tracking-tight text-slate-900">{card.value}</p>
                        <p className="mt-4 text-lg text-slate-400">{card.hint}</p>
                      </div>
                      <div className={`rounded-[1.5rem] p-5 ${card.accent}`}>
                        <Icon size={32} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
              <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
                <label className="flex items-center gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-slate-400">
                  <Search size={26} />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products by name or category..."
                    className="w-full bg-transparent text-lg outline-none placeholder:text-slate-300"
                  />
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-lg text-slate-500 outline-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredProducts.map((product) => {
                const displayId = product.productCode || product.name;

                return (
                  <article key={product._id} className="overflow-hidden rounded-[2.25rem] border border-white/60 bg-white/55 shadow-[0_24px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl">
                    <div className="relative flex h-[25rem] w-full items-center justify-center overflow-hidden bg-white/40 p-0 backdrop-blur-xl">
                      <div className="absolute left-5 top-5 z-10 rounded-full border border-white/70 bg-white/45 px-5 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-800 backdrop-blur-md">
                        ID: {displayId}
                      </div>
                      <FallbackImage
                        src={product.images?.[0]}
                        alt={displayId}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-5 bg-white/35 p-7 backdrop-blur-xl">
                      <span className="inline-flex rounded-full border border-blue-300/60 bg-blue-50/80 px-4 py-2 text-sm font-medium text-blue-700">
                        {product.category?.name || "Uncategorized"}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-end gap-3">
                          <p className="text-4xl font-semibold tracking-tight text-slate-900">
                            {formatCurrency(product.discountPrice || product.price || 0)}
                          </p>
                          {product.discountPrice && (
                            <p className="text-lg text-slate-400 line-through">
                              {formatCurrency(product.price || 0)}
                            </p>
                          )}
                        </div>
                        <p className="mt-3 text-lg text-slate-500">
                          Stock: <span className="font-semibold text-emerald-600">{product.stock}</span>
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <Link
                          to={`/admin/products/${product._id}/edit`}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-blue-200/70 bg-white/60 px-4 py-3 text-lg font-medium text-blue-700 transition hover:bg-blue-50/90"
                        >
                          <Pencil size={20} />
                          Edit
                        </Link>
                        <button
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-red-200/70 bg-white/60 px-4 py-3 text-lg font-medium text-red-500 transition hover:bg-red-50/90"
                          onClick={() => deleteProduct(product._id)}
                        >
                          <Trash2 size={20} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}

              {!filteredProducts.length && (
                <div className="col-span-full rounded-[2rem] bg-white p-10 text-lg text-slate-500 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                  No products matched the current search or category filter.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
