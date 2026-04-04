import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/client";
import ProductCard from "../components/shop/ProductCard";
import useAsync from "../hooks/useAsync";
import "../styles/ShopPage.css";

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

const socialChannels = [
  {
    name: "Telegram",
    handle: "@Piseth1467",
    href: "https://t.me/Piseth1467",
    Icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    )
  },
  {
    name: "Facebook Page",
    handle: "View page",
    href: "https://www.facebook.com/share/17Gr1Lm5du/?mibextid=wwXIfr",
    Icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    )
  },
  {
    name: "TikTok",
    handle: "@vtshop.vt",
    href: "https://www.tiktok.com/@vtshop.vt",
    Icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    )
  }
];

const getProductErrorMessage = (error) => {
  if (!error) {
    return "";
  }

  const normalized = error.toLowerCase();

  if (normalized.includes("timeout")) {
    return "Products are taking too long to load right now. Please try again in a moment.";
  }

  if (normalized.includes("network error")) {
    return "Unable to reach the shop right now. Please check the connection and try again.";
  }

  return "Unable to load products right now. Please try again shortly.";
};

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
    <section className="container-shell shop-container">
      <div className="surface-card contact-card">
        <p className="eyebrow">Contact</p>
        <div className="contact-grid">
          <div className="contact-copy">
            <h1 className="contact-title">
              Contact Venta through our social channels.
            </h1>
            <p className="contact-desc">
              Reach us directly on Telegram, Facebook Page, or TikTok for product questions and updates.
            </p>
          </div>
          <div className="social-links">
            {socialChannels.map(({ name, handle, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="social-link"
                aria-label={`Open ${name}`}
              >
                <p className="social-type">
                  <span className="social-icon">
                    <Icon />
                  </span>
                  {name}
                </p>
                <p className="social-value">{handle}</p>
                <span className="social-cta">Open channel</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="products-wrapper">
        {error && <p className="error-msg">{getProductErrorMessage(error)}</p>}
        <div className="product-grid">
          {loading && Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="product-skeleton" />
          ))}

          {!loading && products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

          {!loading && !error && products.length === 0 && (
            <div className="surface-card empty-state">
              No products available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
