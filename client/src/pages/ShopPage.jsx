import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/client";
import ProductCard from "../components/shop/ProductCard";
import useAsync from "../hooks/useAsync";

const defaultFilters = {
  search: "",
  category: "",
  material: "",
  color: "",
  minPrice: "",
  maxPrice: "",
  sort: "newest"
};

const getFiltersFromParams = (searchParams) => ({
  search: searchParams.get("search") || "",
  category: searchParams.get("category") || "",
  material: searchParams.get("material") || "",
  color: searchParams.get("color") || "",
  minPrice: searchParams.get("minPrice") || "",
  maxPrice: searchParams.get("maxPrice") || "",
  sort: searchParams.get("sort") || "newest"
});

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(() => getFiltersFromParams(searchParams));

  useEffect(() => {
    setFilters(getFiltersFromParams(searchParams));
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== defaultFilters[key]) {
        params.set(key, value);
      }
    });

    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();

    if (nextQuery !== currentQuery) {
      setSearchParams(params, { replace: true });
    }
  }, [filters, searchParams, setSearchParams]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== defaultFilters[key]) {
        params.set(key, value);
      }
    });
    return params.toString();
  }, [filters]);

  const { data: rawProducts, loading, error } = useAsync(async () => {
    const { data } = await api.get(`/products?${queryString}`);
    return data;
  }, [queryString]);

  const products = Array.isArray(rawProducts) ? rawProducts : [];

  return (
    <section className="container-shell py-14">
      <div className="surface-card overflow-hidden px-6 py-8 md:px-8 md:py-10">
        <p className="eyebrow">Contact</p>
        <div className="mt-4 grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] xl:items-start">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl leading-none text-white md:text-6xl">
              Contact VETA STORE through our social channels.
            </h1>
            <p className="mt-5 text-sm leading-7 text-stone-300">
              Reach us directly on Telegram, Facebook Page, or TikTok for product questions and updates.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <a
              href="https://t.me/Piseth1467"
              target="_blank"
              rel="noreferrer"
              className="rounded-[1.5rem] border border-gold/20 bg-gold/10 px-5 py-4 text-sm text-stone-100 transition hover:border-gold hover:bg-gold/15"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Telegram</p>
              <p className="mt-2 break-all text-base text-white">t.me/Piseth1467</p>
            </a>
            <a
              href="https://www.facebook.com/share/17Gr1Lm5du/?mibextid=wwXIfr"
              target="_blank"
              rel="noreferrer"
              className="rounded-[1.5rem] border border-gold/20 bg-gold/10 px-5 py-4 text-sm text-stone-100 transition hover:border-gold hover:bg-gold/15"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Facebook Page</p>
              <p className="mt-2 break-all text-base text-white">facebook.com/share/17Gr1Lm5du</p>
            </a>
            <a
              href="https://www.tiktok.com/@vtshop.vt"
              target="_blank"
              rel="noreferrer"
              className="rounded-[1.5rem] border border-gold/20 bg-gold/10 px-5 py-4 text-sm text-stone-100 transition hover:border-gold hover:bg-gold/15"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">TikTok</p>
              <p className="mt-2 break-all text-base text-white">tiktok.com/@vtshop.vt</p>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10">
        {error && <p className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</p>}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {loading && Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-[420px] animate-pulse rounded-[2rem] bg-white/5" />
          ))}
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {!loading && !error && products.length === 0 && (
          <div className="surface-card mt-6 p-8 text-sm text-stone-300">
            No products available.
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopPage;
