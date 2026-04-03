import { Link } from "react-router-dom";
import { formatCurrency, getEffectivePrice } from "../../utils/format";
import FallbackImage from "../FallbackImage";
import "../../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const displayId = product.productCode || product.name;

  return (
    <article className="product-card">
      <div className="product-image-container">
        <FallbackImage
          src={product.images[0]}
          alt={displayId}
          className="product-image"
        />
        <div className="product-image-overlay" />
        <div className="product-id-badge">
          ID: {displayId}
        </div>
      </div>

      <div className="product-info">
        <div className="product-price-container">
          {product.discountPrice ? (
            <div className="discount-wrapper">
              <span className="price-new">{formatCurrency(product.discountPrice)}</span>
              <span className="price-tag">-{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%</span>
            </div>
          ) : (
            <span className="product-price">{formatCurrency(product.price || 0)}</span>
          )}
          {product.discountPrice && <span className="product-price-original">{formatCurrency(product.price)}</span>}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
