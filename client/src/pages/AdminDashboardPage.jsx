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
    <section className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <div className="min-h-screen">
        <main className="bg-[#f4f7fb]">
          <div className="border-b border-slate-200 bg-white px-4 py-6 shadow-sm sm:px-8 sm:py-8 sm:px-10">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 p-3 text-white shadow-lg shadow-blue-500/20 sm:rounded-3xl sm:p-4">
                  <LayoutDashboard size={24} className="sm:h-7 sm:w-7" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Admin Panel</p>
                  <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">Product Management</h1>
                  <p className="mt-2 text-base text-slate-500 sm:mt-3 sm:text-xl">Manage your inventory with ease</p>
                </div>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
                <button
                  onClick={logout}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-base font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 sm:w-auto sm:rounded-3xl sm:px-6 sm:py-4 sm:text-lg"
                >
                  <LogOut size={22} />
                  Logout
                </button>
                <Link
                  to="/admin/products/new"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 px-5 py-3.5 text-base font-medium text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-600 hover:to-blue-500 sm:w-auto sm:rounded-3xl sm:px-6 sm:py-4 sm:text-lg"
                >
                  <Plus size={22} />
                  Add Product
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-4 sm:space-y-8 sm:p-8 sm:p-10">
            <div className="grid gap-6 xl:grid-cols-3">
              {loading && Array.from({ length: summaryCards.length }).map((_, index) => (
                <div key={index} className="h-52 animate-pulse rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]" />
              ))}

              {!loading && summaryCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.label} className="rounded-[2rem] bg-white p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="text-lg font-medium text-slate-500 sm:text-2xl">{card.label}</p>
                        <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl">{card.value}</p>
                        <p className="mt-3 text-sm text-slate-400 sm:mt-4 sm:text-lg">{card.hint}</p>
                      </div>
                      <div className={`rounded-[1.25rem] p-4 sm:rounded-[1.5rem] sm:p-5 ${card.accent}`}>
                        <Icon size={28} className="sm:h-8 sm:w-8" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-[2rem] bg-white p-5 sm:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
              <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
                <label className="flex items-center gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-slate-400">
                  <Search size={26} />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products by ID or name..."
                    className="w-full bg-transparent text-base outline-none placeholder:text-slate-300 sm:text-lg"
                  />
                </label>
              </div>
            </div>

            {error && (
              <div className="rounded-[2rem] border border-red-200 bg-red-50 px-6 py-5 text-lg text-red-600">
                {error}
              </div>
            )}

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {loading && Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[30rem] animate-pulse rounded-[2.25rem] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.14)] sm:h-[34rem]"
                />
              ))}

              {!loading && filteredProducts.map((product) => {
                const displayId = product.productCode || product.name;

                return (
                  <article key={product._id} className="overflow-hidden rounded-[2.25rem] border border-white/60 bg-white/55 shadow-[0_24px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl">
                    <div className="relative flex h-[20rem] w-full items-center justify-center overflow-hidden bg-white/40 p-0 backdrop-blur-xl sm:h-[25rem]">
                      <div className="absolute left-4 top-4 z-10 rounded-full border border-white/70 bg-white/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-800 backdrop-blur-md sm:left-5 sm:top-5 sm:px-5 sm:text-sm sm:tracking-[0.24em]">
                        ID: {displayId}
                      </div>
                      <FallbackImage
                        src={product.images?.[0]}
                        alt={displayId}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-5 bg-white/35 p-5 sm:p-7 backdrop-blur-xl">
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
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-blue-200/70 bg-white/60 px-4 py-3 text-base font-medium text-blue-700 transition hover:bg-blue-50/90 sm:text-lg"
                        >
                          <Pencil size={20} />
                          Edit
                        </Link>
                        <button
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-red-200/70 bg-white/60 px-4 py-3 text-base font-medium text-red-500 transition hover:bg-red-50/90 sm:text-lg"
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

              {!loading && !error && !filteredProducts.length && (
                <div className="col-span-full rounded-[2rem] bg-white p-10 text-lg text-slate-500 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                  No products matched the current search.
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
