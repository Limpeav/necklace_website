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
          <span className="product-price">{formatCurrency(getEffectivePrice(product))}</span>
          {product.discountPrice && <span className="product-price-original">{formatCurrency(product.price)}</span>}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
