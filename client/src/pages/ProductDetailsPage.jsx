import { Star } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";
import FallbackImage from "../components/FallbackImage";
import ProductCard from "../components/shop/ProductCard";
import ReviewList from "../components/shop/ReviewList";
import useAsync from "../hooks/useAsync";
import { formatCurrency, getEffectivePrice } from "../utils/format";

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedLength, setSelectedLength] = useState("");

  const { data, loading, error } = useAsync(async () => {
    const { data } = await api.get(`/products/${slug}`);
    return data;
  }, [slug]);

  if (loading) {
    return <section className="container-shell py-16 sm:py-20"><div className="h-[420px] animate-pulse rounded-[2rem] bg-white/5 sm:h-[600px]" /></section>;
  }

  if (error || !data) {
    return <section className="container-shell py-16 sm:py-20"><p className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error || "Product not found"}</p></section>;
  }

  const { product, reviews, relatedProducts } = data;
  const displayId = product.productCode || product.name;

  return (
    <section className="container-shell py-10 sm:py-14">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {product.images.map((image) => (
            <FallbackImage key={image} src={image} alt={displayId} className="h-72 w-full rounded-[1.5rem] object-cover sm:h-[360px] sm:rounded-[2rem]" />
          ))}
        </div>

        <div className="surface-card p-5 sm:p-8 md:p-10">
          <h1 className="mt-3 break-words font-display text-3xl leading-none text-white sm:text-4xl md:text-5xl">{displayId}</h1>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="text-2xl font-semibold text-white">{formatCurrency(getEffectivePrice(product))}</span>
            {product.discountPrice && <span className="text-sm text-stone-500 line-through">{formatCurrency(product.price)}</span>}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-stone-200">
              <Star size={14} className="text-gold" fill="currentColor" />
              {product.rating.toFixed(1)} rating
            </span>
          </div>

          {product.description && product.description !== displayId && (
            <p className="mt-6 text-sm leading-7 text-stone-300 sm:leading-8">{product.description}</p>
          )}

          <div className="mt-8 grid gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-400">Materials</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.material.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-stone-200">{item}</span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-400">Colors</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.color.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedColor(item)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${selectedColor === item ? "border-gold bg-gold text-black" : "border-white/10 bg-white/5 text-stone-200"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-400">Length</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.length.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedLength(item)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${selectedLength === item ? "border-gold bg-gold text-black" : "border-white/10 bg-white/5 text-stone-200"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-sm leading-7 text-stone-300">
              This product page is display-only. Browse variations, materials, and related styles without account or checkout steps.
            </div>

            <p className="text-sm text-stone-400">{product.stock > 0 ? `${product.stock} pieces available` : "Out of stock"}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[1fr_0.9fr] lg:gap-10">
        <div className="surface-card p-5 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-400">Customer reviews</p>
          <div className="mt-6">
            <ReviewList reviews={reviews} />
          </div>
        </div>
        <div className="surface-card space-y-4 p-5 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-400">Display mode</p>
          <p className="text-sm leading-7 text-stone-300">
            Authentication, saved lists, and checkout actions have been removed from the storefront so visitors can focus on browsing the collection.
          </p>
        </div>
      </div>

      <section className="mt-12 sm:mt-16">
        <div>
          <p className="eyebrow">Related products</p>
          <h2 className="section-title mt-3">More styles worth opening.</h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {relatedProducts.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default ProductDetailsPage;
