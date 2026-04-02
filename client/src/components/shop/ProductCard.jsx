import { Link } from "react-router-dom";
import { formatCurrency, getEffectivePrice } from "../../utils/format";
import FallbackImage from "../FallbackImage";

const ProductCard = ({ product }) => {
  const displayId = product.productCode || product.name;

  return (
    <article className="group surface-card overflow-hidden transition duration-300 hover:-translate-y-1.5">
      <div className="relative overflow-hidden">
        <Link to={`/shop/${product.slug}`}>
          <FallbackImage
            src={product.images[0]}
            alt={displayId}
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72 lg:h-80"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:left-4 sm:top-4 sm:text-xs sm:tracking-[0.22em]">
          ID: {displayId}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-lg font-semibold text-white">{formatCurrency(getEffectivePrice(product))}</span>
          {product.discountPrice && <span className="text-sm text-stone-500 line-through">{formatCurrency(product.price)}</span>}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
